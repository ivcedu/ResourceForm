<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID = $_POST['ResourceID'];
    $ItemReq= $_POST['ItemReq'];
    $Location = $_POST['Location'];
    $EstAmt = $_POST['EstAmt'];
    $EstDescrip = $_POST['EstDescrip'];
    $Alternative = $_POST['Alternative'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[Facilities] " 
                ."(ResourceID, ItemReq, Location, EstAmt, EstDescrip, Alternative) "
                ."VALUES ('$ResourceID', '$ItemReq', '$Location', '$EstAmt', '$EstDescrip', '$Alternative')";
    
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
