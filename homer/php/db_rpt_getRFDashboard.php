<?php
    require("config.php");
    
    $FiscalYear = filter_input(INPUT_POST, 'FiscalYear');
    $ReviewPeriodID = filter_input(INPUT_POST, 'ReviewPeriodID');
       
    $dbConn->setAttribute(constant('PDO::SQLSRV_ATTR_DIRECT_QUERY'), true);
    
    $query_create_table = "CREATE TABLE #RESULT(ResourceID int, RType nvarchar(255), Amount money)";
    
    $sql_review_period = "";
    if ($ReviewPeriodID === "-1") {
        $sql_review_period = " AND rsrp.ReviewPeriodID IS NULL";
    }
    else if ($ReviewPeriodID !== "0") {
        $sql_review_period = " AND rsrp.ReviewPeriodID = '".$ReviewPeriodID."'";
    }
    
    $query_insert = "INSERT INTO #RESULT SELECT resr.ResourceID, rsty.ResourceType, "
                    . "CASE WHEN rsty.RTID = 1 OR rsty.RTID = 2 OR rsty.RTID = 3 "
                    . "THEN (SELECT TOP(1) AnnualTotal FROM [IVCRESOURCES].[dbo].[Personnel] WHERE ResourceID = resr.ResourceID ORDER BY PersonnelID DESC) "
                    . "WHEN rsty.RTID = 9 "
                    . "THEN (SELECT TOP(1) Total FROM [IVCRESOURCES].[dbo].[Instructional] WHERE ResourceID = resr.ResourceID ORDER BY InstructionalID DESC) "
                    . "WHEN rsty.RTID = 4 "
                    . "THEN (SELECT TOP(1) CASE WHEN ProjAmt = 0.0 THEN EstAmt ELSE ProjAmt END FROM [IVCRESOURCES].[dbo].[Facilities] WHERE ResourceID = resr.ResourceID ORDER BY FacilitiesID DESC) "
                    . "WHEN rsty.RTID = 5 "
                    . "THEN (SELECT TOP(1) GrandTotal FROM [IVCRESOURCES].[dbo].[Technology] WHERE ResourceID = resr.ResourceID ORDER BY TechnologyID DESC) "
                    . "WHEN rsty.RTID = 7 "
                    . "THEN (SELECT TOP(1) TotalAmount FROM [IVCRESOURCES].[dbo].[Other2] WHERE ResourceID = resr.ResourceID ORDER BY Other2ID DESC) "
                    . "ELSE 0.0 END AS TotalAmount "
                    . "FROM [IVCRESOURCES].[dbo].[Resource] AS resr LEFT JOIN [IVCRESOURCES].[dbo].[ResourceTypeItem] AS rtim ON rtim.ResourceID = resr.ResourceID "
                    . "LEFT JOIN [IVCRESOURCES].[dbo].[ResourceType] AS rsty ON rsty.RTID = rtim.RTID "
                    . "LEFT JOIN [IVCRESOURCES].[dbo].[ResourceRP] AS rsrp ON rsrp.ResourceID = resr.ResourceID "
                    . "WHERE resr.FiscalYear = '".$FiscalYear."' AND resr.RSID <> 1 AND resr.RSID <> 18 AND resr.RSID <> 20 AND resr.RSID <> 21".$sql_review_period;
    
    $query_get_result = "SELECT RType, COUNT(RType) AS TotalCount, "
                        ."CONVERT(DECIMAL(5,2),(CONVERT(DECIMAL(5,2),COUNT(RType))/CONVERT(DECIMAL(5,2),(SELECT COUNT(RType) FROM #RESULT)))*100) AS Pct_Count, "
                        ."SUM(Amount) AS TotalAmount, (SUM(Amount)/(SELECT CASE WHEN SUM(Amount) = 0 THEN 1 ELSE SUM(Amount) END FROM #RESULT))*100 AS Pct_Amount FROM #RESULT GROUP BY RType";
    
    $query_drop_table = "DROP TABLE #RESULT";
    
    // create table
    $dbConn->query($query_create_table);
    // insert to table
    $dbConn->query($query_insert);
    // get result            
    $cmd = $dbConn->prepare($query_get_result);
    $cmd->execute();
    $data = $cmd->fetchAll();
    // drop table
    $dbConn->query($query_drop_table);
    
    echo json_encode($data);