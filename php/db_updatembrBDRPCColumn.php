<?php
    require("config.php");
    
    $mbrBDRPC_ID = filter_input(INPUT_POST, 'mbrBDRPC_ID');
    $bdrColumnName = filter_input(INPUT_POST, 'bdrColumnName');

    $query = "UPDATE [IVCRESOURCES].[dbo].[mbrBDRPC] "
                ."SET bdrColumnName = '".$bdrColumnName."' "
                . "WHERE mbrBDRPC_ID = '".$mbrBDRPC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);