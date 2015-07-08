<?php
    require("config.php");
    
    $aptColumnName = filter_input(INPUT_POST, 'aptColumnName');

    $query = "ALTER TABLE rateAPTC ADD " . $aptColumnName . " INT";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);