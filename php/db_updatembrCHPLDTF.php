<?php
    require("config.php");
    
    $mbrCHPLDTF_ID = filter_input(INPUT_POST, 'mbrCHPLDTF_ID');
    $chpUserName = filter_input(INPUT_POST, 'chpUserName');
    $chpUserEmail = filter_input(INPUT_POST, 'chpUserEmail');
    $chpUserActive = filter_input(INPUT_POST, 'chpUserActive');
    $chpUserAdmin = filter_input(INPUT_POST, 'chpUserAdmin');

    $query = "UPDATE [IVCRESOURCES].[dbo].[mbrCHPLDTF] "
                ."SET chpUserName = '".$chpUserName."', chpUserEmail = '".$chpUserEmail."', chpUserActive = '".$chpUserActive."', chpUserAdmin = '".$chpUserAdmin."' "
                . "WHERE mbrCHPLDTF_ID = '".$mbrCHPLDTF_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);