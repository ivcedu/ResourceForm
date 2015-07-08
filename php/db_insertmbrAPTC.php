<?php
    require("config.php");
    
    $aptUserName = filter_input(INPUT_POST, 'aptUserName');
    $aptUserEmail = filter_input(INPUT_POST, 'aptUserEmail');
    $aptUserAdmin = filter_input(INPUT_POST, 'aptUserAdmin');

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[mbrAPTC] (aptUserName, aptUserEmail, aptUserAdmin) "
                . "VALUES ('$aptUserName', '$aptUserEmail', '$aptUserAdmin')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);