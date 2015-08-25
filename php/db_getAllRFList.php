<?php
    require("config.php");
    
    $bSubmitted = filter_input(INPUT_POST, 'bSubmitted');
    $FiscalYear = filter_input(INPUT_POST, 'FiscalYear');
    
    $sql_where = "WHERE resr.FiscalYear = '".$FiscalYear."'";
    if ($bSubmitted === "true") {
        $sql_where = $sql_where." AND resr.RSID <> 1";
    }
       
    $query = "SELECT resr.ResourceID, "
                ."resr.ProposalTitle, "
                ."CASE WHEN rsty.ResourceType IS NULL THEN '' ELSE rsty.ResourceType END ResourceType, "
                ."CASE WHEN resr.RSID = 12 OR resr.RSID = 14 OR resr.RSID = 15 OR resr.RSID = 16 OR resr.RSID = 17 OR resr.RSID = 19 "
                ."THEN 'Committee' ELSE rsst.ResourceStatus END AS ResourceStatus, "
                ."CASE WHEN rsty.RTID = 1 OR rsty.RTID = 2 OR rsty.RTID = 3 "
                ."THEN (SELECT TOP(1) AnnualTotal FROM [IVCRESOURCES].[dbo].[Personnel] WHERE ResourceID = resr.ResourceID ORDER BY PersonnelID DESC) "
                ."WHEN rsty.RTID = 9 "
                ."THEN (SELECT TOP(1) Total FROM [IVCRESOURCES].[dbo].[Instructional] WHERE ResourceID = resr.ResourceID ORDER BY InstructionalID DESC) "
                ."WHEN rsty.RTID = 4 "
                ."THEN (SELECT TOP(1) CASE WHEN ProjAmt = 0.0 THEN EstAmt ELSE ProjAmt END FROM [IVCRESOURCES].[dbo].[Facilities] WHERE ResourceID = resr.ResourceID ORDER BY FacilitiesID DESC) "
                ."WHEN rsty.RTID = 5 "
                ."THEN (SELECT TOP(1) GrandTotal FROM [IVCRESOURCES].[dbo].[Technology] WHERE ResourceID = resr.ResourceID ORDER BY TechnologyID DESC) "
                ."WHEN rsty.RTID = 7 "
                ."THEN (SELECT TOP(1) TotalAmount FROM [IVCRESOURCES].[dbo].[Other2] WHERE ResourceID = resr.ResourceID ORDER BY Other2ID DESC) "
                ."ELSE 0.0 END TotalAmount, "
                ."CASE WHEN rslk.ResourceLinkNum IS NULL THEN '' ELSE rslk.ResourceLinkNum END ResourceLink "
                ."FROM [IVCRESOURCES].[dbo].[Creator] AS crtr RIGHT JOIN [IVCRESOURCES].[dbo].[Resource] AS resr ON crtr.CreatorID = resr.CreatorID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceStatus] AS rsst ON resr.RSID = rsst.RSID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceTypeItem] AS rtim ON rtim.ResourceID = resr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceType] AS rsty ON rsty.RTID = rtim.RTID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceLink] AS rslk ON resr.ResourceID = rslk.ResourceID "
                .$sql_where;
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    echo json_encode($data);