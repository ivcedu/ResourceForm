<?php
    require("config.php");
    
    $ResultID = 0;
    $ResourceID= $_POST['ResourceID'];
    $rev_type = $_POST['rev_type'];
    $rev_descrip = $_POST['rev_descrip'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[Revenue] " 
                ."(ResourceID, RevType, RevDescrip) "
                ."VALUES ('$ResourceID', '$rev_type', '$rev_descrip')";
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();           

    echo json_encode($ResultID);
?>