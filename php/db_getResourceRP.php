<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
       
    $query = "SELECT TOP(1) * FROM [IVCRESOURCES].[dbo].[ResourceRP] WHERE ResourceID = '" .$ResourceID. "'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);