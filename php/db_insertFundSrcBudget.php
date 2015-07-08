<?php
    require("config.php");
    
    $FiscalYear = filter_input(INPUT_POST, 'FiscalYear');
    $FundSrcCol = filter_input(INPUT_POST, 'FundSrcCol');
    $BudgetAmt = filter_input(INPUT_POST, 'BudgetAmt');
    $BalanceAmt = filter_input(INPUT_POST, 'BalanceAmt');

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[FundSrcBudget] (FiscalYear, FundSrcCol, BudgetAmt, BalanceAmt) "
                . "VALUES ('$FiscalYear', '$FundSrcCol', '$BudgetAmt', '$BalanceAmt')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);