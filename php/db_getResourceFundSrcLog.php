<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');

    $query = "SELECT CONVERT(VARCHAR(10), DTStamp, 101) + STUFF(RIGHT(CONVERT(VARCHAR(26), DTStamp, 109), 15), 7, 7, ' ') AS DTStamp, LoginName, Note "
            . "FROM [IVCRESOURCES].[dbo].[ResourceFundSrcLog] "
            . "WHERE ResourceID = '".$ResourceID."' ORDER BY RFSLogID DESC";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);