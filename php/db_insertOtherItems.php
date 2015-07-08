<?php
    require("config.php");
    
    $ResultID = 0;
    $ResourceID= $_POST['ResourceID'];
    $ItemType= $_POST['ItemType'];
    $ItemDescrip = $_POST['ItemDescrip'];
    $ItemQty = $_POST['ItemQty'];
    $ItemCost = $_POST['ItemCost'];
    $ItemTotal = $_POST['ItemTotal'];
    $ItemMaint = $_POST['ItemMaint'];
    $ItemYrs = $_POST['ItemYrs'];
    $ItemAnnCost = $_POST['ItemAnnCost'];
    $ItemMaintTotal = $_POST['ItemMaintTotal'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[OtherItems] " 
                ."(ResourceID, ItemType, ItemDescrip, ItemQty, ItemCost, ItemTotal, ItemMaint, ItemYrs, ItemAnnCost, ItemMaintTotal) "
                ."VALUES ('$ResourceID', '$ItemType', '$ItemDescrip', '$ItemQty', '$ItemCost', '$ItemTotal', '$ItemMaint', '$ItemYrs', '$ItemAnnCost', '$ItemMaintTotal')";

    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();           

    echo json_encode($ResultID);
?>

