<?php
    require("config.php");
    
    $mbrAPTC_ID = filter_input(INPUT_POST, 'mbrAPTC_ID');
    
    $query = "DELETE [IVCRESOURCES].[dbo].[mbrAPTC] WHERE mbrAPTC_ID = '".$mbrAPTC_ID ."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);