<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $ApproverID = filter_input(INPUT_POST, 'ApproverID');
    $Active = filter_input(INPUT_POST, 'Active');

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[rateMgr] (ResourceID, ApproverID, Active) "
                ."VALUES ('$ResourceID', '$ApproverID', '$Active')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);