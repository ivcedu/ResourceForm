<?php
    require("config.php");
       
    $query = "SELECT resr.ProposalTitle, "
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
                ."rsty.ResourceType, "
                ."crtr.CreatorName, "
                ."stlv.StageLevel, "
                ."rssa.* "
                ."FROM [IVCRESOURCES].[dbo].[ResourceStage] AS rcst LEFT JOIN [IVCRESOURCES].[dbo].[StageLevel] AS stlv ON rcst.StageLevelID = stlv.StageLevelID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Resource] AS resr ON rcst.ResourceID = resr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceStatus] AS rsst ON resr.RSID = rsst.RSID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceTypeItem] AS rtim ON rtim.ResourceID = resr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceType] AS rsty ON rsty.RTID = rtim.RTID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Creator] AS crtr ON crtr.CreatorID = resr.CreatorID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS rssa ON resr.ResourceID = rssa.ResourceID "
                ."WHERE rssa.Active = 1 AND resr.RSID <> 18 AND resr.RSID <> 21";
                
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);