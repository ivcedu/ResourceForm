<?php
    require("config.php");
    
    $chpUserName = filter_input(INPUT_POST, 'chpUserName');
    $chpUserEmail = filter_input(INPUT_POST, 'chpUserEmail');
    $chpUserAdmin = filter_input(INPUT_POST, 'chpUserAdmin');

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[mbrCHPLDTF] (chpUserName, chpUserEmail, chpUserAdmin) "
                . "VALUES ('$chpUserName', '$chpUserEmail', '$chpUserAdmin')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);