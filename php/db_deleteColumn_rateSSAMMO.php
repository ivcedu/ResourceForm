<?php
    require("config.php");
    
    $ssaColumnName = filter_input(INPUT_POST, 'ssaColumnName');

    $query = "ALTER TABLE rateSSAMMO DROP COLUMN " . $ssaColumnName;
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);