<?php
    require("config.php");

    $FiscalYear = filter_input(INPUT_POST, 'FiscalYear');
    $FundSrcCol = filter_input(INPUT_POST, 'FundSrcCol');
    
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[FundSrcType] AS fst LEFT JOIN [IVCRESOURCES].[dbo].[FundSrcBudget] AS fsb ON fst.FundSrcCol = fsb.FundSrcCol "
                ."WHERE fsb.FiscalYear = '".$FiscalYear."' AND fst.FundSrcCol = '".$FundSrcCol."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);