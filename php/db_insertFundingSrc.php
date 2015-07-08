<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $General = $_POST['General'];
    $Perkins = $_POST['Perkins'];
    $BSI = $_POST['BSI'];
    $IVCFoundation = $_POST['IVCFoundation'];
    $ASIVC = $_POST['ASIVC'];
    $Other = $_POST['Other'];
    $OtherDescription = $_POST['OtherDescription'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[FundingSrc] (ResourceID, General, Perkins, BSI, IVCFoundation, ASIVC, Other, OtherDescription) "
                ."VALUES ('$ResourceID', '$General', '$Perkins', '$BSI', '$IVCFoundation', '$ASIVC', '$Other', '$OtherDescription')";  
    
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

