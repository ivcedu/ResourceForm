<?php
    require("config.php");
    
    $FiscalYear = filter_input(INPUT_POST, 'FiscalYear');
    
    $query = "SELECT SUM(fs_1_amt) AS fs_1_amt_total, SUM(fs_2_amt) AS fs_2_amt_total, SUM(fs_3_amt) AS fs_3_amt_total, SUM(fs_4_amt) AS fs_4_amt_total, SUM(fs_5_amt) AS fs_5_amt_total, "
            . "SUM(fs_6_amt) AS fs_6_amt_total, SUM(fs_7_amt) AS fs_7_amt_total, SUM(fs_8_amt) AS fs_8_amt_total, SUM(fs_9_amt) AS fs_9_amt_total, SUM(fs_10_amt) AS fs_10_amt_total, "
            . "SUM(fs_11_amt) AS fs_11_amt_total, SUM(fs_12_amt) AS fs_12_amt_total, SUM(fs_13_amt) AS fs_13_amt_total, SUM(fs_14_amt) AS fs_14_amt_total, SUM(fs_15_amt) AS fs_15_amt_total, "
            . "SUM(fs_16_amt) AS fs_16_amt_total, SUM(fs_17_amt) AS fs_17_amt_total, SUM(fs_18_amt) AS fs_18_amt_total, SUM(fs_19_amt) AS fs_19_amt_total, SUM(fs_20_amt) AS fs_20_amt_total, "
            . "SUM(fs_21_amt) AS fs_21_amt_total, SUM(fs_22_amt) AS fs_22_amt_total, SUM(fs_23_amt) AS fs_23_amt_total "
            . "FROM [IVCRESOURCES].[dbo].[ResourceFundAmt] AS rsfa LEFT JOIN [IVCRESOURCES].[dbo].[Resource] AS resr ON rsfa.ResourceID = resr.ResourceID "
            . "WHERE resr.FiscalYear = '".$FiscalYear."' AND resr.RSID <> 18 AND resr.RSID <> 21";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);