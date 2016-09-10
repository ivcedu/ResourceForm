<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $ReviewPeriodID = filter_input(INPUT_POST, 'ReviewPeriodID');

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[ResourceRP] " 
                ."(ResourceID, ReviewPeriodID) "
                ."VALUES ('$ResourceID', '$ReviewPeriodID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);