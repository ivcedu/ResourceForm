<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $FiscalYear = filter_input(INPUT_POST, 'FiscalYear');

    $query = "UPDATE [IVCRESOURCES].[dbo].[Resource] SET FiscalYear = '".$FiscalYear."' "
                ."WHERE ResourceID = '" . $ResourceID ."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);