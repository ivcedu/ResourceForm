<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID = $_POST['ResourceID'];
    $Test = $_POST['Test'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[rf_test] (ResourceID, Test) "
                ."VALUES ('$ResourceID', '$Test')";
    
    try {
        $dbConn->beginTransaction();
        $cmd = $dbConn->prepare($query);
        $cmd->execute();
        $dbConn->commit();
        $ResultID = $dbConn->lastInsertId();  
    } catch (PDOException $e) {
        $dbConn->rollBack();
//        echo json_encode("DB Error: ".$e->getMessage());
    }
        
    echo json_encode($ResultID);
?>