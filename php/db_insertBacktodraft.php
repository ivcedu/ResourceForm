<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $Resubmit = $_POST['Resubmit'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[Backtodraft] " 
                ."(ResourceID, Resubmit) "
                ."VALUES ('$ResourceID', '$Resubmit')";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();           

    echo json_encode($ResultID);
?>