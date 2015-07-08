<?php
    require("config.php");
    
    $ssaUserEmail = filter_input(INPUT_POST, 'ssaUserEmail');
    $ssaUserAdmin = filter_input(INPUT_POST, 'ssaUserAdmin');
    
    $sql_where = "";
    if ($ssaUserAdmin === "false") {
        $sql_where = "WHERE ssaUserEmail = '".$ssaUserEmail."'";
    }
       
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[mbrSSAMMO] ".$sql_where;
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);