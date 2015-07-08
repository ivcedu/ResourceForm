<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $RTID = $_POST['RTID'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[ResourceTypeItemNew] (ResourceID, RTID) "
                ."VALUES ('$ResourceID', '$RTID')";    
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
?>