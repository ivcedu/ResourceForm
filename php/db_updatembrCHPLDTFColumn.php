<?php
    require("config.php");
    
    $mbrCHPLDTF_ID = filter_input(INPUT_POST, 'mbrCHPLDTF_ID');
    $chpColumnName = filter_input(INPUT_POST, 'chpColumnName');

    $query = "UPDATE [IVCRESOURCES].[dbo].[mbrCHPLDTF] "
                ."SET chpColumnName = '".$chpColumnName."' "
                . "WHERE mbrCHPLDTF_ID = '".$mbrCHPLDTF_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);