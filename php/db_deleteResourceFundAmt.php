<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    
    $query = "DELETE [IVCRESOURCES].[dbo].[ResourceFundAmt] WHERE ResourceID = '".$ResourceID ."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);