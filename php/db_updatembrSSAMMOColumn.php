<?php
    require("config.php");
    
    $mbrSSAMMO_ID = filter_input(INPUT_POST, 'mbrSSAMMO_ID');
    $ssaColumnName = filter_input(INPUT_POST, 'ssaColumnName');

    $query = "UPDATE [IVCRESOURCES].[dbo].[mbrSSAMMO] "
                ."SET ssaColumnName = '".$ssaColumnName."' "
                . "WHERE mbrSSAMMO_ID = '".$mbrSSAMMO_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);