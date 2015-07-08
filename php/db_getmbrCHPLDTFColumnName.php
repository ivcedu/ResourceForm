<?php
    require("config.php");
    
    $chpUserEmail = filter_input(INPUT_POST, 'chpUserEmail');
       
    $query = "SELECT chpColumnName FROM [IVCRESOURCES].[dbo].[mbrCHPLDTF] WHERE chpUserEmail = '".$chpUserEmail."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();
    
    echo json_encode($data['chpColumnName']);