<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');

    $query = "DELETE [IVCRESOURCES].[dbo].[rateBDRPC] WHERE ResourceID = '".$ResourceID ."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);