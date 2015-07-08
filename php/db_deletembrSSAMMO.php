<?php
    require("config.php");
    
    $mbrSSAMMO_ID = filter_input(INPUT_POST, 'mbrSSAMMO_ID');
    
    $query = "DELETE [IVCRESOURCES].[dbo].[mbrSSAMMO] WHERE mbrSSAMMO_ID = '".$mbrSSAMMO_ID ."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);