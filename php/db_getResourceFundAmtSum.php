<?php
    require("config.php");

    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    
    $query = "SELECT (fs_1_amt + fs_2_amt + fs_3_amt + fs_4_amt + fs_5_amt + fs_6_amt + fs_7_amt + fs_8_amt + fs_9_amt + fs_10_amt + "
            . "fs_11_amt + fs_12_amt + fs_13_amt + fs_14_amt + fs_15_amt + fs_16_amt + fs_17_amt + fs_18_amt + fs_19_amt + fs_20_amt + "
            . "fs_21_amt + fs_22_amt + fs_23_amt) AS NewTotal "
            . "FROM [IVCRESOURCES].[dbo].[ResourceFundAmt] WHERE ResourceID = '".$ResourceID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data["NewTotal"]);