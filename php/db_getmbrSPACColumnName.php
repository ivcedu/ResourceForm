<?php
    require("config.php");
    
    $spaUserEmail = filter_input(INPUT_POST, 'spaUserEmail');
       
    $query = "SELECT spaColumnName FROM [IVCRESOURCES].[dbo].[mbrSPAC] WHERE spaUserEmail = '".$spaUserEmail."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();
    
    echo json_encode($data['spaColumnName']);