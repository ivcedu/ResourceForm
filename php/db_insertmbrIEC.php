<?php
    require("config.php");
    
    $iecUserName = filter_input(INPUT_POST, 'iecUserName');
    $iecUserEmail = filter_input(INPUT_POST, 'iecUserEmail');
    $iecUserAdmin = filter_input(INPUT_POST, 'iecUserAdmin');

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[mbrIEC] (iecUserName, iecUserEmail, iecUserAdmin) "
                . "VALUES ('$iecUserName', '$iecUserEmail', '$iecUserAdmin')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);