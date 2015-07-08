<?php
    require("config.php");
    
    $mbrIEC_ID = filter_input(INPUT_POST, 'mbrIEC_ID');
    
    $query = "DELETE [IVCRESOURCES].[dbo].[mbrIEC] WHERE mbrIEC_ID = '".$mbrIEC_ID ."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);