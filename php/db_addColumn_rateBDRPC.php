<?php
    require("config.php");
    
    $bdrColumnName = filter_input(INPUT_POST, 'bdrColumnName');

    $query = "ALTER TABLE rateBDRPC ADD " . $bdrColumnName . " INT";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);