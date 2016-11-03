<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    
    $query = "SELECT vpp_Ckb "
            . "FROM [IVCRESOURCES].[dbo].[rateVPP] "
            . "WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();
    
    echo json_encode($data["vpp_Ckb"]);