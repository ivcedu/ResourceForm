<?php
    require("config.php");
    
    $spaUserName = filter_input(INPUT_POST, 'spaUserName');
    $spaUserEmail = filter_input(INPUT_POST, 'spaUserEmail');
    $spaUserAdmin = filter_input(INPUT_POST, 'spaUserAdmin');

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[mbrSPAC] (spaUserName, spaUserEmail, spaUserAdmin) "
                . "VALUES ('$spaUserName', '$spaUserEmail', '$spaUserAdmin')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);