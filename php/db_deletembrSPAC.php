<?php
    require("config.php");
    
    $mbrSPAC_ID = filter_input(INPUT_POST, 'mbrSPAC_ID');
    
    $query = "DELETE [IVCRESOURCES].[dbo].[mbrSPAC] WHERE mbrSPAC_ID = '".$mbrSPAC_ID ."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);