<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $ApproverID = filter_input(INPUT_POST, 'ApproverID');
    $rating = filter_input(INPUT_POST, 'rating');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateVPP] "
                ."SET ApproverID = '".$ApproverID."', vpp_Rating = '".$rating."' "
                ."WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);