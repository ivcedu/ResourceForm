<?php
    require("config.php");
    
    $chpColumnName = filter_input(INPUT_POST, 'chpColumnName');

    $query = "ALTER TABLE rateCHPLDTF ADD " . $chpColumnName . " INT";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);