<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $Complete = filter_input(INPUT_POST, 'Complete');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateAll] "
                ."SET Complete = '".$Complete."' "
                ."WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);