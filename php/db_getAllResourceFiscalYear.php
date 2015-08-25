<?php
    require("config.php");
    
    $query = "SELECT FiscalYear FROM [IVCRESOURCES].[dbo].[Resource] GROUP BY FiscalYear ORDER BY FiscalYear DESC";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);