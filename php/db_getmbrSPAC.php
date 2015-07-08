<?php
    require("config.php");
    
    $spaUserEmail = filter_input(INPUT_POST, 'spaUserEmail');
    $spaUserAdmin = filter_input(INPUT_POST, 'spaUserAdmin');
    
    $sql_where = "";
    if ($spaUserAdmin === "false") {
        $sql_where = "WHERE spaUserEmail = '".$spaUserEmail."'";
    }
       
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[mbrSPAC] ".$sql_where;
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);