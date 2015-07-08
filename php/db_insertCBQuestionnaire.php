<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $Field1 = $_POST['Field1'];
    $Field2 = $_POST['Field2'];
    $Field3 = $_POST['Field3'];
    $Field4 = $_POST['Field4'];
    $Field5 = $_POST['Field5'];
    $Field6 = $_POST['Field6'];
    $Field7 = $_POST['Field7'];
    $Field8 = $_POST['Field8'];
    $Field9 = $_POST['Field9'];
    $Field10 = $_POST['Field10'];
    $Field11 = $_POST['Field11'];
    $Field12 = $_POST['Field12'];
    $Field13 = $_POST['Field13'];
    $Field14 = $_POST['Field14'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[CBQuestionnaire] " 
                ."(ResourceID, Field1, Field2, Field3, Field4, Field5, Field6, Field7, Field8, Field9, Field10, Field11, Field12, Field13, Field14) "
                ."VALUES ('$ResourceID', '$Field1', '$Field2', '$Field3', '$Field4', '$Field5', '$Field6', '$Field7', '$Field8', '$Field9', '$Field10', '$Field11', '$Field12', '$Field13', '$Field14')";
    
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

