<?php
    require("config.php");
    
    $mbrAPTC_ID = filter_input(INPUT_POST, 'mbrAPTC_ID');
    $aptColumnName = filter_input(INPUT_POST, 'aptColumnName');

    $query = "UPDATE [IVCRESOURCES].[dbo].[mbrAPTC] "
                ."SET aptColumnName = '".$aptColumnName."' "
                . "WHERE mbrAPTC_ID = '".$mbrAPTC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);