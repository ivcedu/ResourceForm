<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $Active = filter_input(INPUT_POST, 'Active');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateIEC] "
                ."SET Active = '".$Active."' "
                ."WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);