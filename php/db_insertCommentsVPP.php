<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $ApproverID = filter_input(INPUT_POST, 'ApproverID');
    $Comments = filter_input(INPUT_POST, 'Comments');

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[CommentsVPP] (ResourceID, ApproverID, Comments) "
                . "VALUES ('$ResourceID', '$ApproverID', '$Comments')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);