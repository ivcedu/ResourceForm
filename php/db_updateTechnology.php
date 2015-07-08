<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
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

        $query = "UPDATE [IVCRESOURCES].[dbo].[Technology] " 
                    ."SET ItemReq = '".$ItemReq."', Location = '".$Location."', ASInformation = '".$ASInformation."', HardwareTotal = '".$HardwareTotal."', MaintenanceTotal = '".$MaintenanceTotal."', "
                    ."TaxTotal = '".$TaxTotal."', SoftwareTotal = '".$SoftwareTotal."', ShippingTotal = '".$ShippingTotal."', InstallationTotal = '".$InstallationTotal."', "
                    ."AdditionalTotal = '".$AdditionalTotal."', TotalTaxable = '".$TotalTaxable."', TotalNontaxable = '".$TotalNontaxable."', GrandTotal = '".$GrandTotal."', Alternative = '".$Alternative."' "
                    ."WHERE ResourceID = '".$ResourceID ."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute();           

        echo json_encode($result);
    }
?>

