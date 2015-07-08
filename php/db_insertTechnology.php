<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $ItemReq= $_POST['ItemReq'];
    $Location = $_POST['Location'];
    $ASInformation = $_POST['ASInformation'];
    $HardwareTotal = $_POST['HardwareTotal'];
    $MaintenanceTotal = $_POST['MaintenanceTotal'];
    $TaxTotal = $_POST['TaxTotal'];
    $SoftwareTotal = $_POST['SoftwareTotal'];
    $ShippingTotal = $_POST['ShippingTotal'];
    $InstallationTotal = $_POST['InstallationTotal'];
    $AdditionalTotal = $_POST['AdditionalTotal'];
    $TotalTaxable = $_POST['TotalTaxable'];
    $TotalNontaxable = $_POST['TotalNontaxable'];
    $GrandTotal = $_POST['GrandTotal'];
    $Alternative = $_POST['Alternative'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[Technology] " 
                ."(ResourceID, ItemReq, Location, ASInformation, HardwareTotal, MaintenanceTotal, TaxTotal, SoftwareTotal, "
                ."ShippingTotal, InstallationTotal, AdditionalTotal, TotalTaxable, TotalNontaxable, GrandTotal, Alternative) "
                ."VALUES ('$ResourceID', '$ItemReq', '$Location', '$ASInformation', '$HardwareTotal', '$MaintenanceTotal', '$TaxTotal', '$SoftwareTotal', "
                ."'$ShippingTotal', '$InstallationTotal', '$AdditionalTotal', '$TotalTaxable', '$TotalNontaxable', '$GrandTotal', '$Alternative')";   
    
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
