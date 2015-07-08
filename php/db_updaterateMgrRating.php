<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $ApproverID = filter_input(INPUT_POST, 'ApproverID');
    $rating = filter_input(INPUT_POST, 'rating');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateMgr] "
                ."SET ApproverID = '".$ApproverID."', mgr_Rating = '".$rating."' "
                ."WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);