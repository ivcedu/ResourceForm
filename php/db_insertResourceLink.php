<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $ResourceParentID = $_POST['ResourceParentID'];
    $ResourceLinkNum = $_POST['ResourceLinkNum'];
    $Child = $_POST['Child'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[ResourceLink] " 
                ."(ResourceID, ResourceParentID, ResourceLinkNum, Child) "
                ."VALUES ('$ResourceID', '$ResourceParentID', '$ResourceLinkNum', '$Child')"; 
    
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