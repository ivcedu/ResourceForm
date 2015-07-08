<?php
    require("config.php");

    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[ResourceFundAmt] WHERE ResourceID = '".$ResourceID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $result = $cmd->fetchAll();

    echo json_encode($result);