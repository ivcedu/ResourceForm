<?php
    require("config.php");
    
    $ssaColumnName = filter_input(INPUT_POST, 'ssaColumnName');

    $query = "ALTER TABLE rateSSAMMO ADD " . $ssaColumnName . " INT";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);