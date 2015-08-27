<?php
    require("config.php");

    $query = "SELECT EnableDate FROM [IVCRESOURCES].[dbo].[EnableMgrWorksheet]";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data["EnableDate"]);