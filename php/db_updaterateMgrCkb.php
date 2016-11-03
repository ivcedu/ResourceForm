<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $mgr_Ckb = filter_input(INPUT_POST, 'mgr_Ckb');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateMgr] "
                ."SET mgr_Ckb = '".$mgr_Ckb."' "
                ."WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);