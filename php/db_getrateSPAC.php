<?php
    require("config.php");
    
    $rateSPAC_ID = filter_input(INPUT_POST, 'rateSPAC_ID');
    
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[rateSPAC] WHERE rateSPAC_ID = '".$rateSPAC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);