<?php
    require("config.php");
    
    $EnableDate = filter_input(INPUT_POST, 'EnableDate');

    $query = "UPDATE [IVCRESOURCES].[dbo].[EnableCommitteeWorksheet] "
                . "SET EnableDate = '".$EnableDate."' "
                . "WHERE EnableCommitteeWorksheetID = 1";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);