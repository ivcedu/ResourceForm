<?php
    require("config.php");
    
    $rateCHPLDTF_ID = filter_input(INPUT_POST, 'rateCHPLDTF_ID');
    $column = filter_input(INPUT_POST, 'column');
    $rating = filter_input(INPUT_POST, 'rating');

    $query = "UPDATE [IVCRESOURCES].[dbo].[rateCHPLDTF] "
                ."SET ".$column." = '".$rating."' "
                ."WHERE rateCHPLDTF_ID = '".$rateCHPLDTF_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);