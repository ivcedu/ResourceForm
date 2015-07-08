<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $ColumnName = filter_input(INPUT_POST, 'ColumnName');
    $Value = filter_input(INPUT_POST, 'Value');

    $query = "UPDATE [IVCRESOURCES].[dbo].[ResourceFundAmt] "
                ."SET ".$ColumnName." = '".$Value."' "
                . "WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);