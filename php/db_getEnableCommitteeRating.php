<?php
    require("config.php");
    
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[EnableCommitteeRating]";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);