<?php
    require("config.php");

    $FiscalYear = filter_input(INPUT_POST, 'FiscalYear');
    
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[FundSrcBudget] WHERE FiscalYear = '".$FiscalYear."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);