<?php
    require("config.php");
    
    $mbrAPTC_ID = filter_input(INPUT_POST, 'mbrAPTC_ID');
    $aptUserName = filter_input(INPUT_POST, 'aptUserName');
    $aptUserEmail = filter_input(INPUT_POST, 'aptUserEmail');
    $aptUserActive = filter_input(INPUT_POST, 'aptUserActive');
    $aptUserAdmin = filter_input(INPUT_POST, 'aptUserAdmin');

    $query = "UPDATE [IVCRESOURCES].[dbo].[mbrAPTC] "
                ."SET aptUserName = '".$aptUserName."', aptUserEmail = '".$aptUserEmail."', aptUserActive = '".$aptUserActive."', aptUserAdmin = '".$aptUserAdmin."' "
                . "WHERE mbrAPTC_ID = '".$mbrAPTC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);