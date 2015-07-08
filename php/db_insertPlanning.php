<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $Objective = $_POST['Objective'];
    $Goal = $_POST['Goal'];
    $Description = $_POST['Description'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[Planning] " 
                ."(ResourceID, Objective, Goal, Description) "
                ."VALUES ('$ResourceID', '$Objective', '$Goal', '$Description')";   
    
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