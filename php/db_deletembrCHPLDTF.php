<?php
    require("config.php");
    
    $mbrCHPLDTF_ID = filter_input(INPUT_POST, 'mbrCHPLDTF_ID');
    
    $query = "DELETE [IVCRESOURCES].[dbo].[mbrCHPLDTF] WHERE mbrCHPLDTF_ID = '".$mbrCHPLDTF_ID ."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);