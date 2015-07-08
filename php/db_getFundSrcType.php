<?php
    require("config.php");

    $FundSrcCol = filter_input(INPUT_POST, 'FundSrcCol');
    
    $query = "SELECT * FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = '".$FundSrcCol."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);