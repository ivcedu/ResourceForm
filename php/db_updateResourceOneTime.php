<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $OneTime = filter_input(INPUT_POST, 'OneTime');

    $query = "UPDATE [IVCRESOURCES].[dbo].[Resource] "
                ."SET OneTime = '".$OneTime."' "
                . "WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);