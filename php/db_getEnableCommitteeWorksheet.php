<?php
    require("config.php");

    $query = "SELECT EnableDate FROM [IVCRESOURCES].[dbo].[EnableCommitteeWorksheet]";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data["EnableDate"]);