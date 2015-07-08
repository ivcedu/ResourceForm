<?php
    require("config.php");
    
    $mbrSPAC_ID = filter_input(INPUT_POST, 'mbrSPAC_ID');
    $spaColumnName = filter_input(INPUT_POST, 'spaColumnName');

    $query = "UPDATE [IVCRESOURCES].[dbo].[mbrSPAC] "
                ."SET spaColumnName = '".$spaColumnName."' "
                . "WHERE mbrSPAC_ID = '".$mbrSPAC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);