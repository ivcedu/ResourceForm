<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $sch_div= $_POST['sch_div'];
    $ex_life = $_POST['ex_life'];
    $descrip = $_POST['descrip'];
    $qty = $_POST['qty'];
    $cost = $_POST['cost'];
    $total = $_POST['total'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[Instructional] " 
                ."(ResourceID, SchDiv, Lifespan, Description, Qty, Cost, Total) "
                ."VALUES ('$ResourceID', '$sch_div', '$ex_life', '$descrip', '$qty', '$cost', '$total')";
    
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