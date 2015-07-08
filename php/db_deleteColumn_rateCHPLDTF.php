<?php
    require("config.php");
    
    $chpColumnName = filter_input(INPUT_POST, 'chpColumnName');

    $query = "ALTER TABLE rateCHPLDTF DROP COLUMN " . $chpColumnName;
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);