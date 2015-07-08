<?php
    require("config.php");
    
    $mbrIEC_ID = filter_input(INPUT_POST, 'mbrIEC_ID');
    $iecUserName = filter_input(INPUT_POST, 'iecUserName');
    $iecUserEmail = filter_input(INPUT_POST, 'iecUserEmail');
    $iecUserActive = filter_input(INPUT_POST, 'iecUserActive');
    $iecUserAdmin = filter_input(INPUT_POST, 'iecUserAdmin');

    $query = "UPDATE [IVCRESOURCES].[dbo].[mbrIEC] "
                ."SET iecUserName = '".$iecUserName."', iecUserEmail = '".$iecUserEmail."', iecUserActive = '".$iecUserActive."', iecUserAdmin = '".$iecUserAdmin."' "
                . "WHERE mbrIEC_ID = '".$mbrIEC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);