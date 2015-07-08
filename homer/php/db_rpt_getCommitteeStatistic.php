<?php
    require("config.php");
    
    $query = "SELECT resr.ResourceID, "
                ."rapt.Active AS APTC, "
                ."rbdr.Active AS BDRPC, "
                ."rchp.Active AS CHPLDTF, "
                ."riec.Active AS IEC, "
                ."rspa.Active AS SPAC, "
                ."rssa.Active AS SSAMMO, "
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
                ."ELSE 0.0 END AS TotalAmount "
                ."FROM [IVCRESOURCES].[dbo].[Resource] AS resr LEFT JOIN [IVCRESOURCES].[dbo].[ResourceTypeItem] AS rtim ON rtim.ResourceID = resr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceType] AS rsty ON rsty.RTID = rtim.RTID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[rateAPTC] AS rapt ON (rapt.ResourceID = resr.ResourceID AND rapt.Active = 1) "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[rateBDRPC] AS rbdr ON (rbdr.ResourceID = resr.ResourceID AND rbdr.Active = 1) "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[rateCHPLDTF] AS rchp ON (rchp.ResourceID = resr.ResourceID AND rchp.Active = 1) "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[rateIEC] AS riec ON (riec.ResourceID = resr.ResourceID AND riec.Active = 1) "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[rateSPAC] AS rspa ON (rspa.ResourceID = resr.ResourceID AND rspa.Active = 1) "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS rssa ON (rssa.ResourceID = resr.ResourceID AND rssa.Active = 1) "
                ."WHERE resr.RSID <> 1 AND resr.RSID <> 18 AND resr.RSID <> 20 AND resr.RSID <> 21";
               
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $data = $cmd->fetchAll();
    
    echo json_encode($data);