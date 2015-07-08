<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $Item = $_POST['Item'];
    $Qty = $_POST['Qty'];
    $Cost= $_POST['Cost'];
    $Total = $_POST['Total'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[Other2Items] " 
                ."(ResourceID, Item, Qty, Cost, Total) "
                ."VALUES ('$ResourceID', '$Item', '$Qty', '$Cost', '$Total')";
    
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

