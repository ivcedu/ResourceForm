<?php
    require("config.php");
    
    $Active = filter_input(INPUT_POST, 'Active');
    $ReviewPeriod = filter_input(INPUT_POST, 'ReviewPeriod');
    $RPStartDate = filter_input(INPUT_POST, 'RPStartDate');
    $RPEndDate = filter_input(INPUT_POST, 'RPEndDate');

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[ReviewPeriod] " 
                ."(Active, ReviewPeriod, RPStartDate, RPEndDate) "
                ."VALUES ('$Active', '$ReviewPeriod', '$RPStartDate', '$RPEndDate')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);