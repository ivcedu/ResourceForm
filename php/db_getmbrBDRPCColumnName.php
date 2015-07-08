<?php
    require("config.php");
    
    $bdrUserEmail = filter_input(INPUT_POST, 'bdrUserEmail');
       
    $query = "SELECT bdrColumnName FROM [IVCRESOURCES].[dbo].[mbrBDRPC] WHERE bdrUserEmail = '".$bdrUserEmail."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();
    
    echo json_encode($data['bdrColumnName']);