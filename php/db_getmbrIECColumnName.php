<?php
    require("config.php");
    
    $iecUserEmail = filter_input(INPUT_POST, 'iecUserEmail');
       
    $query = "SELECT iecColumnName FROM [IVCRESOURCES].[dbo].[mbrIEC] WHERE iecUserEmail = '".$iecUserEmail."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();
    
    echo json_encode($data['iecColumnName']);