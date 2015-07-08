<?php
    require("config.php");
    
    $rateIEC_ID = filter_input(INPUT_POST, 'rateIEC_ID');
    $column = filter_input(INPUT_POST, 'column');
    $rating = filter_input(INPUT_POST, 'rating');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateIEC] "
                ."SET ".$column." = '".$rating."' "
                ."WHERE rateIEC_ID = '".$rateIEC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);