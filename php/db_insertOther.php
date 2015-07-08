<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $ItemReq= $_POST['ItemReq'];
    $Location = $_POST['Location'];
    $ASInformation = $_POST['ASInformation'];
    $ContServTotal = $_POST['ContServTotal'];
    $MaintenanceTotal = $_POST['MaintenanceTotal'];
    $TaxTotal = $_POST['TaxTotal'];
    $OtherTotal = $_POST['OtherTotal'];
    $TravConfTotal = $_POST['TravConfTotal'];
    $RentLeasTotal = $_POST['RentLeasTotal'];
    $AdvertTotal = $_POST['AdvertTotal'];
    $TotalTaxable = $_POST['TotalTaxable'];
    $TotalNontaxable = $_POST['TotalNontaxable'];
    $GrandTotal = $_POST['GrandTotal'];
    $Alternative = $_POST['Alternative'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[Other] " 
                ."(ResourceID, ItemReq, Location, ASInformation, ContServTotal, MaintenanceTotal, TaxTotal, OtherTotal, "
                ."TravConfTotal, RentLeasTotal, AdvertTotal, TotalTaxable, TotalNontaxable, GrandTotal, Alternative) "
                ."VALUES ('$ResourceID', '$ItemReq', '$Location', '$ASInformation', '$ContServTotal', '$MaintenanceTotal', '$TaxTotal', '$OtherTotal', "
                ."'$TravConfTotal', '$RentLeasTotal', '$AdvertTotal', '$TotalTaxable', '$TotalNontaxable', '$GrandTotal', '$Alternative')";
    
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

