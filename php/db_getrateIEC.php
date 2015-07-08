<?php
    require("config.php");
    
    $rateIEC_ID = filter_input(INPUT_POST, 'rateIEC_ID');
    
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[rateIEC] WHERE rateIEC_ID = '".$rateIEC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);