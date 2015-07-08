<?php
    require("config.php");
    
    $mbrIEC_ID = filter_input(INPUT_POST, 'mbrIEC_ID');
    $iecColumnName = filter_input(INPUT_POST, 'iecColumnName');

    $query = "UPDATE [IVCRESOURCES].[dbo].[mbrIEC] "
                ."SET iecColumnName = '".$iecColumnName."' "
                . "WHERE mbrIEC_ID = '".$mbrIEC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);