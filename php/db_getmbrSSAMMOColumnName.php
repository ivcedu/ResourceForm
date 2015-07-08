<?php
    require("config.php");
    
    $ssaUserEmail = filter_input(INPUT_POST, 'ssaUserEmail');
       
    $query = "SELECT ssaColumnName FROM [IVCRESOURCES].[dbo].[mbrSSAMMO] WHERE ssaUserEmail = '".$ssaUserEmail."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();
    
    echo json_encode($data['ssaColumnName']);