<?php
    require("config.php");
    
    $rateCHPLDTF_ID = filter_input(INPUT_POST, 'rateCHPLDTF_ID');
    
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[rateCHPLDTF] WHERE rateCHPLDTF_ID = '".$rateCHPLDTF_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);