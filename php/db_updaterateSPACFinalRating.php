<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $FinalRating = filter_input(INPUT_POST, 'FinalRating');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateSPAC] "
                ."SET FinalRating = '".$FinalRating."' "
                ."WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);