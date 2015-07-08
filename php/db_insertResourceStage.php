<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $StageLevelID = $_POST['StageLevelID'];
    $ApproverID = $_POST['ApproverID'];
    $ResourceStatusID = $_POST['ResourceStatusID'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[ResourceStage] " 
                ."(ResourceID, StageLevelID, ApproverID, ResourceStatusID) "
                ."VALUES ('$ResourceID', '$StageLevelID', '$ApproverID', '$ResourceStatusID')";      
    
    try {
        $dbConn->beginTransaction();
        $cmd = $dbConn->prepare($query);
        $cmd->execute();
        $dbConn->commit();
        $ResultID = $dbConn->lastInsertId();
    } catch (PDOException $e) {
        $dbConn->rollBack();
    }

    echo json_encode($ResultID);
?>