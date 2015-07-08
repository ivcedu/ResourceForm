<?php
    require("config.php");
    
    $iecColumnName = filter_input(INPUT_POST, 'iecColumnName');

    $query = "ALTER TABLE rateIEC ADD " . $iecColumnName . " INT";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);