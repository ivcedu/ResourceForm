<?php
    require("config.php");
    
    $mbrBDRPC_ID = filter_input(INPUT_POST, 'mbrBDRPC_ID');
    
    $query = "DELETE [IVCRESOURCES].[dbo].[mbrBDRPC] WHERE mbrBDRPC_ID = '".$mbrBDRPC_ID ."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);