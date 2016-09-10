<?php
    require("config.php");
    
    $ReviewPeriodID = filter_input(INPUT_POST, 'ReviewPeriodID');
    $Active = filter_input(INPUT_POST, 'Active');
    $ReviewPeriod = filter_input(INPUT_POST, 'ReviewPeriod');
    $RPStartDate = filter_input(INPUT_POST, 'RPStartDate');
    $RPEndDate = filter_input(INPUT_POST, 'RPEndDate');

    $query = "UPDATE [IVCRESOURCES].[dbo].[ReviewPeriod] " 
                . "SET Active = '".$Active."', ReviewPeriod = '".$ReviewPeriod."', "
                . "RPStartDate = CONVERT(DATE, '".$RPStartDate."'), RPEndDate = CONVERT(DATE, '".$RPEndDate."') "
                . "WHERE ReviewPeriodID = '".$ReviewPeriodID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);