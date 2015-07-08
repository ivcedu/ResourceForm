<?php
    require("config.php");
    
    $spaColumnName = filter_input(INPUT_POST, 'spaColumnName');

    $query = "ALTER TABLE rateSPAC ADD " . $spaColumnName . " INT";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);