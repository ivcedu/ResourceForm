<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    
    $query = "SELECT appr.ApproverName, appr.ApproverEmail, rmgr.mgr_Rating "
            . "FROM [IVCRESOURCES].[dbo].[rateMgr] AS rmgr LEFT JOIN [IVCRESOURCES].[dbo].[Approver] AS appr ON rmgr.ApproverID = appr.ApproverID "
            . "WHERE rmgr.ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);