<?php
    require("config.php");
    
    $aptUserEmail = filter_input(INPUT_POST, 'aptUserEmail');
       
    $query = "SELECT aptColumnName FROM [IVCRESOURCES].[dbo].[mbrAPTC] WHERE aptUserEmail = '".$aptUserEmail."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();
    
    echo json_encode($data['aptColumnName']);