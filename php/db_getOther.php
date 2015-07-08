<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT ItemReq, Location, ASInformation, ContServTotal, MaintenanceTotal, TaxTotal, OtherTotal, TravConfTotal, RentLeasTotal, AdvertTotal, TotalTaxable, TotalNontaxable, GrandTotal, Alternative "
                    ."FROM [IVCRESOURCES].[dbo].[Other] "
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
                $rows[$index] = array($row['ItemReq'], $row['Location'], $row['ASInformation'], $row['ContServTotal'], $row['MaintenanceTotal'], $row['TaxTotal'],
                                        $row['OtherTotal'], $row['TravConfTotal'], $row['RentLeasTotal'], $row['AdvertTotal'], $row['TotalTaxable'],
                                        $row['TotalNontaxable'], $row['GrandTotal'], $row['Alternative']);
                $index++;
            }
        }

        echo json_encode($rows);
    }
?>
