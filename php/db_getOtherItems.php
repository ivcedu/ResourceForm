<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT ItemType, ItemDescrip, ItemQty, ItemCost, ItemTotal, ItemMaint, ItemYrs, ItemAnnCost, ItemMaintTotal "
                    ."FROM [IVCRESOURCES].[dbo].[OtherItems] "
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
                $rows[$index] = array($row['ItemType'], $row['ItemDescrip'], $row['ItemQty'], $row['ItemCost'], $row['ItemTotal'], $row['ItemMaint'], $row['ItemYrs'], $row['ItemAnnCost'], $row['ItemMaintTotal']);
                $index++;
            }
        }

        echo json_encode($rows);
    }
?>

