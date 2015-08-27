<?php
    require("config.php");
    
    $EnableDate = filter_input(INPUT_POST, 'EnableDate');

    $query = "UPDATE [IVCRESOURCES].[dbo].[EnableSubmitBtn] "
                . "SET EnableDate = '".$EnableDate."' "
                . "WHERE EnableSubmitBtnID = 1";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);