<?php
    require("config.php");
    
    $rateSSAMMO_ID = filter_input(INPUT_POST, 'rateSSAMMO_ID');
    
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[rateSSAMMO] WHERE rateSSAMMO_ID = '".$rateSSAMMO_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);