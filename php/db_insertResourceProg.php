<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $ProgramID = $_POST['ProgramID'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[ResourceProg] (ResourceID, ProgramID) "
                ."VALUES ('$ResourceID', '$ProgramID')"; 
    
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

