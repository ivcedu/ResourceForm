<?php
    require("config.php");

    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    
    $query = "SELECT ResourceFSBSIID FROM [IVCRESOURCES].[dbo].[ResourceFSBSI] WHERE ResourceID = '".$ResourceID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data["ResourceFSBSIID"]);