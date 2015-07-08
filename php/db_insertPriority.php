<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $DepartMgr = $_POST['DepartMgr'];
    $VPP = $_POST['VPP'];
    $CHPLDTF = $_POST['CHPLDTF'];
    $TATF = $_POST['TATF'];
    $SSAMMO = $_POST['SSAMMO'];
    $ATPC = $_POST['ATPC'];
    $BDRPC = $_POST['BDRPC'];
    $SPAC = $_POST['SPAC'];
    $PEC = $_POST['PEC'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[Priority] " 
                ."(ResourceID, DepartMgr, VPP, CHPLDTF, TATF, SSAMMO, ATPC, BDRPC, SPAC, PEC) "
                ."VALUES ('$ResourceID', '$DepartMgr', '$VPP', '$CHPLDTF', '$TATF', '$SSAMMO', '$ATPC', '$BDRPC', '$SPAC', '$PEC')";  
    
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