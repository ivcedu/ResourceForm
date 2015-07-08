<?php
    require("config.php");

    $FiscalYear = filter_input(INPUT_POST, 'FiscalYear');
    $FundSrcCol = filter_input(INPUT_POST, 'FundSrcCol');
    
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[FundSrcBudget] WHERE FiscalYear = '".$FiscalYear."' AND FundSrcCol = '".$FundSrcCol."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);