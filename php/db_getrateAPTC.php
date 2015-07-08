<?php
    require("config.php");
    
    $rateAPTC_ID = filter_input(INPUT_POST, 'rateAPTC_ID');
    
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[rateAPTC] WHERE rateAPTC_ID = '".$rateAPTC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);