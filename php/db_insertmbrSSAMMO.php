<?php
    require("config.php");
    
    $ssaUserName = filter_input(INPUT_POST, 'ssaUserName');
    $ssaUserEmail = filter_input(INPUT_POST, 'ssaUserEmail');
    $ssaUserAdmin = filter_input(INPUT_POST, 'ssaUserAdmin');

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[mbrSSAMMO] (ssaUserName, ssaUserEmail, ssaUserAdmin) "
                . "VALUES ('$ssaUserName', '$ssaUserEmail', '$ssaUserAdmin')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);