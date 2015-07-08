<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');

    $query = "UPDATE [IVCRESOURCES].[dbo].[Resource] SET SubmissionDate = getdate() "
                ."WHERE ResourceID = '" . $ResourceID ."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);