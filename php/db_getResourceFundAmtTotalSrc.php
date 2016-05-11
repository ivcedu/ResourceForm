<?php
    require("config.php");
    
    $Column = filter_input(INPUT_POST, 'Column');
    $FiscalYear = filter_input(INPUT_POST, 'FiscalYear');
    
    $query = "SELECT SUM(".$Column.") AS ".$Column."_total "
            . "FROM [IVCRESOURCES].[dbo].[ResourceFundAmt] AS rsfa LEFT JOIN [IVCRESOURCES].[dbo].[Resource] AS resr ON rsfa.ResourceID = resr.ResourceID "
            . "WHERE resr.RSID <> 18 AND resr.RSID <> 21 AND resr.FiscalYear = '".$FiscalYear."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data[$Column."_total"]);