<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $RSID = filter_input(INPUT_POST, 'RSID');
    $ApprovalID = filter_input(INPUT_POST, 'ApprovalID');

    $query = "UPDATE [IVCRESOURCES].[dbo].[Resource] SET RSID = '".$RSID."', ApprovalID = '".$ApprovalID."' "
                ."WHERE ResourceID = '" . $ResourceID ."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);