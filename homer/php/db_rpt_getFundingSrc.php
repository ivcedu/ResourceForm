<?php
    require("config.php");
    
    $FiscalYear = filter_input(INPUT_POST, 'FiscalYear');
    
    $query = "SELECT rffs.fs_1, rffs.fs_2, rffs.fs_3, rffs.fs_4, rffs.fs_5, rffs.fs_6, rffs.fs_7, rffs.fs_8, rffs.fs_9, rffs.fs_10, "
                ."rffs.fs_11, rffs.fs_12, rffs.fs_13, rffs.fs_14, rffs.fs_15, rffs.fs_16, rffs.fs_17, rffs.fs_18, rffs.fs_19, rffs.fs_20, "
                ."rffs.fs_21, rffs.fs_22, rffs.fs_23, "
                ."rsfa.fs_1_amt, rsfa.fs_2_amt, rsfa.fs_3_amt, rsfa.fs_4_amt, rsfa.fs_5_amt, rsfa.fs_6_amt, rsfa.fs_7_amt, rsfa.fs_8_amt, rsfa.fs_9_amt, rsfa.fs_10_amt, "
                ."rsfa.fs_11_amt, rsfa.fs_12_amt, rsfa.fs_13_amt, rsfa.fs_14_amt, rsfa.fs_15_amt, rsfa.fs_16_amt, rsfa.fs_17_amt, rsfa.fs_18_amt, rsfa.fs_19_amt, rsfa.fs_20_amt, "
                ."rsfa.fs_21_amt, rsfa.fs_22_amt, rsfa.fs_23_amt, rsfa.TotalAmount, "
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
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceFundSrc] AS rffs ON rffs.ResourceID = resr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceFundAmt] AS rsfa ON rsfa.ResourceID = resr.ResourceID "
                ."WHERE resr.FiscalYear = '".$FiscalYear."' AND resr.RSID <> 1 AND resr.RSID <> 18";
               
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $data = $cmd->fetchAll();
    
    echo json_encode($data);