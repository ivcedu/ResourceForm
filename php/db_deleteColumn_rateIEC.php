<?php
    require("config.php");
    
    $iecColumnName = filter_input(INPUT_POST, 'iecColumnName');

    $query = "ALTER TABLE rateIEC DROP COLUMN " . $iecColumnName;
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);