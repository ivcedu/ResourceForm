<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT ItemReq, Location, ASInformation, HardwareTotal, MaintenanceTotal, TaxTotal, SoftwareTotal, ShippingTotal, InstallationTotal, AdditionalTotal, TotalTaxable, TotalNontaxable, GrandTotal, Alternative, TechnologyID "
                    ."FROM [IVCRESOURCES].[dbo].[Technology] "
                    ."WHERE ResourceID = '" .$ResourceID. "'";
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();
        $rstCount = count($data);

        $index = 0;
        $rows = array(array());
        if ($rstCount > 0)
        {
            foreach($data as $row)
            {
                $rows[$index] = array($row['ItemReq'], $row['Location'], $row['ASInformation'], $row['HardwareTotal'], $row['MaintenanceTotal'], $row['TaxTotal'],
                                        $row['SoftwareTotal'], $row['ShippingTotal'], $row['InstallationTotal'], $row['AdditionalTotal'], $row['TotalTaxable'],
                                        $row['TotalNontaxable'], $row['GrandTotal'], $row['Alternative'], $row['TechnologyID']);
                $index++;
            }
        }

        echo json_encode($rows);
    }
?>