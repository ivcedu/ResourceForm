<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $RTID = $_POST['RTID'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[ResourceTypeItem] (ResourceID, RTID) "
                ."VALUES ('$ResourceID', '$RTID')";    
    
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

