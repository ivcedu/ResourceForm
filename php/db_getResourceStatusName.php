<?php
    require("config.php");
    
    $RSID = filter_input(INPUT_POST, 'RSID');
       
    $query = "SELECT ResourceStatus FROM [IVCRESOURCES].[dbo].[ResourceStatus] WHERE RSID = '".$RSID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data["ResourceStatus"]);