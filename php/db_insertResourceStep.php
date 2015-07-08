<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $ResourceStep = $_POST['ResourceStep'];
    $ResourcePage = $_POST['ResourcePage'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[ResourceStep] (ResourceID, ResourceStep, ResourcePage) "
                ."VALUES ('$ResourceID', '$ResourceStep', '$ResourcePage')";
    
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
