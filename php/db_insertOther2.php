<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $Description= $_POST['Description'];
    $TotalAmount = $_POST['TotalAmount'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[Other2] " 
                ."(ResourceID, Description, TotalAmount) "
                ."VALUES ('$ResourceID', '$Description', '$TotalAmount')";    
    
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

