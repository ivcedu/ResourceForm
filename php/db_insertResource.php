<?php
    require("config.php");
    
    $ResourceID = "";
    $LoginID= $_POST['LoginID'];
    $CreatorID = $_POST['CreatorID'];
    $FiscalYear = $_POST['FiscalYear'];
    $ProposalTitle = $_POST['ProposalTitle'];
    $NeedFor = $_POST['NeedFor'];
    $strDate = $_POST['strDate'];
    $status = $_POST['status'];
    $onetime = $_POST['onetime'];
    $NeedBy = $_POST['NeedBy'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[Resource] (LoginID, CreatorID, strDate, FiscalYear, ProposalTitle, NeedFor, RSID, OneTime, NeedBy) "
                ."VALUES ('$LoginID', '$CreatorID', '$strDate', '$FiscalYear', '$ProposalTitle', '$NeedFor', '$status', '$onetime', '$NeedBy')"; 
    
    try {
        $dbConn->beginTransaction();
        $cmd = $dbConn->prepare($query);
        $cmd->execute();
        $dbConn->commit();
        $ResourceID = $dbConn->lastInsertId();
    } catch (PDOException $e) {
        $dbConn->rollBack();
    }

    echo json_encode($ResourceID);
?>

