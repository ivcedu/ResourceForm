<?php
    require("config.php");
    
    $rateSSAMMO_ID = filter_input(INPUT_POST, 'rateSSAMMO_ID');
    $column = filter_input(INPUT_POST, 'column');
    $rating = filter_input(INPUT_POST, 'rating');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateSSAMMO] "
                ."SET ".$column." = '".$rating."' "
                ."WHERE rateSSAMMO_ID = '".$rateSSAMMO_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);