<?php
    require("config.php");
    
    $rateAPTC_ID = filter_input(INPUT_POST, 'rateAPTC_ID');
    $column = filter_input(INPUT_POST, 'column');
    $rating = filter_input(INPUT_POST, 'rating');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateAPTC] "
                ."SET ".$column." = '".$rating."' "
                ."WHERE rateAPTC_ID = '".$rateAPTC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);