<?php
    require("config.php");
    
    $mbrSPAC_ID = filter_input(INPUT_POST, 'mbrSPAC_ID');
    $spaUserName = filter_input(INPUT_POST, 'spaUserName');
    $spaUserEmail = filter_input(INPUT_POST, 'spaUserEmail');
    $spaUserActive = filter_input(INPUT_POST, 'spaUserActive');
    $spaUserAdmin = filter_input(INPUT_POST, 'spaUserAdmin');

    $query = "UPDATE [IVCRESOURCES].[dbo].[mbrSPAC] "
                ."SET spaUserName = '".$spaUserName."', spaUserEmail = '".$spaUserEmail."', spaUserActive = '".$spaUserActive."', spaUserAdmin = '".$spaUserAdmin."' "
                . "WHERE mbrSPAC_ID = '".$mbrSPAC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);