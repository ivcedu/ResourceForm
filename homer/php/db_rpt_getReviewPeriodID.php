<?php
    require("config.php");
    
    $SubmitDate = filter_input(INPUT_POST, 'SubmitDate');
       
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[ReviewPeriod] WHERE CONVERT(DATE, '".$SubmitDate."') BETWEEN RPStartDate AND RPEndDate";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);