<?php
    require("config.php");
    
    $spaColumnName = filter_input(INPUT_POST, 'spaColumnName');

    $query = "ALTER TABLE rateSPAC DROP COLUMN " . $spaColumnName;
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);