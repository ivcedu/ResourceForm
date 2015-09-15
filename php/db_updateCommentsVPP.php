<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $ApproverID = filter_input(INPUT_POST, 'ApproverID');
    $Comments = filter_input(INPUT_POST, 'Comments');

    $query = "UPDATE [IVCRESOURCES].[dbo].[CommentsVPP] "
                ."SET ApproverID = '".$ApproverID."', DTStamp = getdate(), Comments = '".$Comments."' "
                ."WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);