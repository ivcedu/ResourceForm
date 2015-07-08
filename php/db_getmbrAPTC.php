<?php
    require("config.php");
    
    $aptUserEmail = filter_input(INPUT_POST, 'aptUserEmail');
    $aptUserAdmin = filter_input(INPUT_POST, 'aptUserAdmin');
    
    $sql_where = "";
    if ($aptUserAdmin === "false") {
        $sql_where = "WHERE aptUserEmail = '".$aptUserEmail."'";
    }
       
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[mbrAPTC] ".$sql_where;
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);