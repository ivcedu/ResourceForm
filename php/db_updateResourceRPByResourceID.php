<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $ReviewPeriodID = filter_input(INPUT_POST, 'ReviewPeriodID');

    $query = "UPDATE [IVCRESOURCES].[dbo].[ResourceRP] " 
                . "SET ReviewPeriodID = '".$ReviewPeriodID."' "
                . "WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);