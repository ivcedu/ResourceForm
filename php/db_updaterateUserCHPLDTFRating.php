<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $column = filter_input(INPUT_POST, 'column');
    $rating = filter_input(INPUT_POST, 'rating');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateCHPLDTF] "
                ."SET ".$column." = '".$rating."' "
                ."WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);