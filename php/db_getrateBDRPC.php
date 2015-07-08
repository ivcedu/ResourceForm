<?php
    require("config.php");
    
    $rateBDRPC_ID = filter_input(INPUT_POST, 'rateBDRPC_ID');
    
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[rateBDRPC] WHERE rateBDRPC_ID = '".$rateBDRPC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);