<?php
    require("config.php");
    
    $EnableDate = filter_input(INPUT_POST, 'EnableDate');

    $query = "UPDATE [IVCRESOURCES].[dbo].[EnableMgrWorksheet] "
                . "SET EnableDate = '".$EnableDate."' "
                . "WHERE EnableMgrWorksheetID = 1";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);