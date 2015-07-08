<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[rateBDRPC] (ResourceID) VALUES ('$ResourceID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);