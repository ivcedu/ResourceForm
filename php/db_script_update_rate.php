<?php
    require("config.php");
    
    $query = filter_input(INPUT_POST, 'query');
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);