<?php
    require("config.php");
    
    $mbrSSAMMO_ID = filter_input(INPUT_POST, 'mbrSSAMMO_ID');
    $ssaUserName = filter_input(INPUT_POST, 'ssaUserName');
    $ssaUserEmail = filter_input(INPUT_POST, 'ssaUserEmail');
    $ssaUserActive = filter_input(INPUT_POST, 'ssaUserActive');
    $ssaUserAdmin = filter_input(INPUT_POST, 'ssaUserAdmin');

    $query = "UPDATE [IVCRESOURCES].[dbo].[mbrSSAMMO] "
                ."SET ssaUserName = '".$ssaUserName."', ssaUserEmail = '".$ssaUserEmail."', ssaUserActive = '".$ssaUserActive."', ssaUserAdmin = '".$ssaUserAdmin."' "
                . "WHERE mbrSSAMMO_ID = '".$mbrSSAMMO_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);