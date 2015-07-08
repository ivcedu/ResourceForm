<?php
    require("config.php");
    
    $bdrUserEmail = filter_input(INPUT_POST, 'bdrUserEmail');
    $bdrUserAdmin = filter_input(INPUT_POST, 'bdrUserAdmin');
    
    $sql_where = "";
    if ($bdrUserAdmin === "false") {
        $sql_where = "WHERE bdrUserEmail = '".$bdrUserEmail."'";
    }
       
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[mbrBDRPC] ".$sql_where;
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);