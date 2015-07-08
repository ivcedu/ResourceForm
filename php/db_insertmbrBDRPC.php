<?php
    require("config.php");
    
    $bdrUserName = filter_input(INPUT_POST, 'bdrUserName');
    $bdrUserEmail = filter_input(INPUT_POST, 'bdrUserEmail');
    $bdrUserAdmin = filter_input(INPUT_POST, 'bdrUserAdmin');

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[mbrBDRPC] (bdrUserName, bdrUserEmail, bdrUserAdmin) "
                . "VALUES ('$bdrUserName', '$bdrUserEmail', '$bdrUserAdmin')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);