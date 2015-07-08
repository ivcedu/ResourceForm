<?php
    require("config.php");
    
    $iecUserEmail = filter_input(INPUT_POST, 'iecUserEmail');
    $iecUserAdmin = filter_input(INPUT_POST, 'iecUserAdmin');
    
    $sql_where = "";
    if ($iecUserAdmin === "false") {
        $sql_where = "WHERE iecUserEmail = '".$iecUserEmail."'";
    }
       
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[mbrIEC] ".$sql_where;
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);