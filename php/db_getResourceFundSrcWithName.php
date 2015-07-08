<?php
    require("config.php");

    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    
    $query = "SELECT ResourceID, "
            . "fs_1, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_1') AS fs_1_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_1') AS fs_1_name, "
            . "fs_2, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_2') AS fs_2_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_2') AS fs_2_name, "
            . "fs_3, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_3') AS fs_3_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_3') AS fs_3_name, "
            . "fs_4, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_4') AS fs_4_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_4') AS fs_4_name, "
            . "fs_5, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_5') AS fs_5_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_5') AS fs_5_name, "
            . "fs_6, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_6') AS fs_6_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_6') AS fs_6_name, "
            . "fs_7, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_7') AS fs_7_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_7') AS fs_7_name, "
            . "fs_8, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_8') AS fs_8_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_8') AS fs_8_name, "
            . "fs_9, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_9') AS fs_9_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_9') AS fs_9_name, "
            . "fs_10, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_10') AS fs_10_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_10') AS fs_10_name, "
            . "fs_11, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_11') AS fs_11_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_11') AS fs_11_name, "
            . "fs_12, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_12') AS fs_12_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_12') AS fs_12_name, "
            . "fs_13, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_13') AS fs_13_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_13') AS fs_13_name, "
            . "fs_14, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_14') AS fs_14_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_14') AS fs_14_name, "
            . "fs_15, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_15') AS fs_15_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_15') AS fs_15_name, "
            . "fs_16, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_16') AS fs_16_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_16') AS fs_16_name, "
            . "fs_17, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_17') AS fs_17_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_17') AS fs_17_name, "
            . "fs_18, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_18') AS fs_18_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_18') AS fs_18_name, "
            . "fs_19, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_19') AS fs_19_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_19') AS fs_19_name, "
            . "fs_20, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_20') AS fs_20_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_20') AS fs_20_name, "
            . "fs_21, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_21') AS fs_21_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_21') AS fs_21_name, "
            . "fs_22, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_22') AS fs_22_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_22') AS fs_22_name, "
            . "fs_23, (SELECT FundSrcCol FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_23') AS fs_23_column, (SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = 'fs_23') AS fs_23_name "
            . "FROM [IVCRESOURCES].[dbo].[ResourceFundSrc] WHERE ResourceID = '".$ResourceID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);