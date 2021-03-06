<?php
    require("config.php");
    
    $FiscalYear = filter_input(INPUT_POST, 'FiscalYear');
       
    $query = "SELECT resr.ResourceID, "
                ."resr.ProposalTitle, "
                ."CASE WHEN rslk.ResourceLinkNum IS NULL THEN '' ELSE rslk.ResourceLinkNum END ResourceLink, "
                ."CASE WHEN rsty.ResourceType IS NULL THEN '' ELSE rsty.ResourceType END ResourceType, "
                ."CASE WHEN resr.RSID = 12 OR resr.RSID = 14 OR resr.RSID = 15 OR resr.RSID = 16 OR resr.RSID = 17 OR resr.RSID = 19 "
                ."THEN 'Committee' ELSE rsst.ResourceStatus END AS ResourceStatus, "
                ."crtr.CreatorName, "
                ."CASE WHEN rsty.RTID = 1 OR rsty.RTID = 2 OR rsty.RTID = 3 "
                ."THEN (SELECT TOP(1) AnnualTotal FROM [IVCRESOURCES].[dbo].[Personnel] WHERE ResourceID = resr.ResourceID ORDER BY PersonnelID DESC) "
                ."WHEN rsty.RTID = 9 "
                ."THEN (SELECT TOP(1) Total FROM [IVCRESOURCES].[dbo].[Instructional] WHERE ResourceID = resr.ResourceID ORDER BY InstructionalID DESC) "
                ."WHEN rsty.RTID = 4 "
                ."THEN (SELECT TOP(1) EstAmt FROM [IVCRESOURCES].[dbo].[Facilities] WHERE ResourceID = resr.ResourceID ORDER BY FacilitiesID DESC) "
                ."WHEN rsty.RTID = 5 "
                ."THEN (SELECT TOP(1) GrandTotal FROM [IVCRESOURCES].[dbo].[Technology] WHERE ResourceID = resr.ResourceID ORDER BY TechnologyID DESC) "
                ."WHEN rsty.RTID = 7 "
                ."THEN (SELECT TOP(1) TotalAmount FROM [IVCRESOURCES].[dbo].[Other2] WHERE ResourceID = resr.ResourceID ORDER BY Other2ID DESC) "
                ."ELSE 0.0 END TotalAmount "
                ."FROM [IVCRESOURCES].[dbo].[Resource] AS resr LEFT JOIN [IVCRESOURCES].[dbo].[ResourceTypeItem] AS rtim ON rtim.ResourceID = resr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceType] AS rsty ON rsty.RTID = rtim.RTID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceStatus] AS rsst ON resr.RSID = rsst.RSID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceLink] AS rslk ON resr.ResourceID = rslk.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Creator] AS crtr ON resr.CreatorID = crtr.CreatorID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceFundSrc] AS rfsr ON rfsr.ResourceID = resr.ResourceID "
                ."WHERE resr.FiscalYear = '".$FiscalYear."' AND rfsr.fs_2 = 1";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);