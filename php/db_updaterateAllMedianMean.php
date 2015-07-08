<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $Median = filter_input(INPUT_POST, 'Median');
    $Mean = filter_input(INPUT_POST, 'Mean');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateAll] "
                ."SET Median = '".$Median."', Mean = '".$Mean."' "
                ."WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);