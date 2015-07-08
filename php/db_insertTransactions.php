<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $LoginName = $_POST['LoginName'];
    $Note = $_POST['Note'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[Transactions] " 
                ."(ResourceID, LoginName, Note) "
                ."VALUES ('$ResourceID', '$LoginName', '$Note')";  
    
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