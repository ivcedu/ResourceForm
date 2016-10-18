<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $RatingCkb = filter_input(INPUT_POST, 'RatingCkb');

    $query = "UPDATE [IVCRESOURCES].[dbo].[Priority] SET RatingCkb = '".$RatingCkb."' "
                ."WHERE ResourceID = '".$ResourceID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);