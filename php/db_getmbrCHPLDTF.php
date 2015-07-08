<?php
    require("config.php");
    
    $chpUserEmail = filter_input(INPUT_POST, 'chpUserEmail');
    $chpUserAdmin = filter_input(INPUT_POST, 'chpUserAdmin');
    
    $sql_where = "";
    if ($chpUserAdmin === "false") {
        $sql_where = "WHERE chpUserEmail = '".$chpUserEmail."'";
    }
       
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[mbrCHPLDTF] ".$sql_where;
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);