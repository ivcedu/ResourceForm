<?php
    require("config.php");

    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $Column = filter_input(INPUT_POST, 'Column');
    
    $query = "SELECT ".$Column." FROM [IVCRESOURCES].[dbo].[rateBDRPC] WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();
    
    echo json_encode($data[$Column]);