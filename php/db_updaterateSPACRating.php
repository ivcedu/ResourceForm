<?php
    require("config.php");
    
    $rateSPAC_ID = filter_input(INPUT_POST, 'rateSPAC_ID');
    $column = filter_input(INPUT_POST, 'column');
    $rating = filter_input(INPUT_POST, 'rating');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateSPAC] "
                ."SET ".$column." = '".$rating."' "
                ."WHERE rateSPAC_ID = '".$rateSPAC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);