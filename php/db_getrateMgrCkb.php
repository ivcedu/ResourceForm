<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    
    $query = "SELECT mgr_Ckb "
            . "FROM [IVCRESOURCES].[dbo].[rateMgr] "
            . "WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();
    
    echo json_encode($data["mgr_Ckb"]);