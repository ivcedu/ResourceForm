<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $vpp_Ckb = filter_input(INPUT_POST, 'vpp_Ckb');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateVPP] "
                ."SET vpp_Ckb = '".$vpp_Ckb."' "
                ."WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);