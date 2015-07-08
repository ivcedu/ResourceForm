<?php
    require("config.php");
    
    $ECRatingID = filter_input(INPUT_POST, 'ECRatingID');
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');

    $query = "UPDATE [IVCRESOURCES].[dbo].[EnableCommitteeRating] "
                ."SET StartDate = '".$StartDate."', EndDate = '".$EndDate."' "
                ."WHERE ECRatingID = '".$ECRatingID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);