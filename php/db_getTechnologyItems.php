<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT ItemType, ItemDescrip, ItemQty, ItemCost, ItemTotal, ItemMaint, ItemYrs, ItemAnnCost, ItemMaintTotal "
                    ."FROM [IVCRESOURCES].[dbo].[TechnologyItems] "
                    ."WHERE ResourceID = '" .$ResourceID. "'";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();
        echo json_encode($data);
    }
?>

