<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $CCName = $_POST['CCName'];
    $CCEmail = $_POST['CCEmail'];
    $CCTitle = $_POST['CCTitle'];
    $CCDepartment = $_POST['CCDepartment'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[CC] (ResourceID, CCName, CCEmail, CCTitle, CCDepartment) "
                ."VALUES ('$ResourceID', '$CCName', '$CCEmail', '$CCTitle', '$CCDepartment')"; 
    
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
