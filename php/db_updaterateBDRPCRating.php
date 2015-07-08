<?php
    require("config.php");
    
    $rateBDRPC_ID = filter_input(INPUT_POST, 'rateBDRPC_ID');
    $column = filter_input(INPUT_POST, 'column');
    $rating = filter_input(INPUT_POST, 'rating');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateBDRPC] "
                ."SET ".$column." = '".$rating."' "
                ."WHERE rateBDRPC_ID = '".$rateBDRPC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);