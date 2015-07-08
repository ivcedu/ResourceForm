<?php
    require("config.php");
    
    $FiscalYear = filter_input(INPUT_POST, 'FiscalYear');
    $FundSrcCol = filter_input(INPUT_POST, 'FundSrcCol');
    $BudgetAmt = filter_input(INPUT_POST, 'BudgetAmt');
    $BalanceAmt = filter_input(INPUT_POST, 'BalanceAmt');

    $query = "UPDATE [IVCRESOURCES].[dbo].[FundSrcBudget] "
                ."SET BudgetAmt = '".$BudgetAmt."', BalanceAmt = '".$BalanceAmt."' "
                . "WHERE FiscalYear = '".$FiscalYear."' AND FundSrcCol = '".$FundSrcCol."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);