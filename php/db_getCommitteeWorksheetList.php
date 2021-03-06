<?php
    require("config.php");
    
    $FiscalYear = filter_input(INPUT_POST, 'FiscalYear');
    $ReviewPeriodID = filter_input(INPUT_POST, 'ReviewPeriodID');
    
    $sql_review_period = "";
    if ($ReviewPeriodID === "-1") {
        $sql_review_period = " AND rsrp.ReviewPeriodID IS NULL";
    }
    else if ($ReviewPeriodID !== "0") {
        $sql_review_period = " AND rsrp.ReviewPeriodID = '".$ReviewPeriodID."'";
    }
    
    $query = "SELECT resr.ResourceID, "
                . "resr.FiscalYear, "
                . "resr.ProposalTitle, "
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
                . "ELSE 0.0 END TotalAmount, "
                . "rsty.ResourceType, "
                . "crtr.CreatorName, "
                . "prio.DepartMgr, "
                . "prio.VPP, "
                . "rall.Median AS ALL_Median, "
                . "rall.Mean AS ALL_Mean, "
                . "rapt.Active AS APTC_Active, "
                . "rapt.Median AS APTC_Median, "
                . "rapt.Mean AS APTC_Mean, "
                . "rbdr.Active AS BDRPC_Active, "
                . "rbdr.Median AS BDRPC_Median, "
                . "rbdr.Mean AS BDRPC_Mean, "
                . "rchp.Active AS CHPLDTF_Active, "
                . "rchp.Median AS CHPLDTF_Median, "
                . "rchp.Mean AS CHPLDTF_Mean, "
                . "riec.Active AS IEC_Active, "
                . "riec.Median AS IEC_Median, "
                . "riec.Mean AS IEC_Mean, "
                . "rspa.Active AS SPAC_Active, "
                . "rspa.Median AS SPAC_Median, "
                . "rspa.Mean AS SPAC_Mean, "
                . "rssa.Active AS SSAMMO_Active, "
                . "rssa.Median AS SSAMMO_Median, "
                . "rssa.Mean AS SSAMMO_Mean "
                . "FROM [IVCRESOURCES].[dbo].[ResourceStage] AS rcst LEFT JOIN [IVCRESOURCES].[dbo].[StageLevel] AS stlv ON rcst.StageLevelID = stlv.StageLevelID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[Resource] AS resr ON rcst.ResourceID = resr.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[ResourceStatus] AS rsst ON resr.RSID = rsst.RSID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[ResourceTypeItem] AS rtim ON rtim.ResourceID = resr.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[ResourceType] AS rsty ON rsty.RTID = rtim.RTID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[Priority] AS prio ON resr.ResourceID = prio.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[Creator] AS crtr ON crtr.CreatorID = resr.CreatorID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[rateAll] AS rall ON rall.ResourceID = resr.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[ResourceRP] AS rsrp ON rsrp.ResourceID = resr.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[rateAPTC] AS rapt ON rapt.ResourceID = resr.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[rateBDRPC] AS rbdr ON rbdr.ResourceID = resr.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[rateCHPLDTF] AS rchp ON rchp.ResourceID = resr.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[rateIEC] AS riec ON riec.ResourceID = resr.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[rateSPAC] AS rspa ON rspa.ResourceID = resr.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS rssa ON rssa.ResourceID = resr.ResourceID "
                . "WHERE resr.RSID <> 18 AND resr.RSID <> 20 AND resr.RSID <> 21 AND resr.RSID <> 22 "
                . "AND resr.RSID <> 7 AND resr.RSID <> 8 AND resr.RSID <> 9 AND resr.RSID <> 10 AND resr.RSID <> 11 AND resr.FiscalYear = '".$FiscalYear."'".$sql_review_period;

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);