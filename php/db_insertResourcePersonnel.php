<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $Range = $_POST['Range'];
    $Month = $_POST['Month'];
    $Step = $_POST['Step'];
    $HrsWk = $_POST['HrsWk'];
    $AnnualSalary = $_POST['AnnualSalary'];
    $AnnualBenefits = $_POST['AnnualBenefits'];
    $AnnualTotal = $_POST['AnnualTotal'];
    $PositionImpact = $_POST['PositionImpact'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[ResourcePersonnel] " 
                ."(ResourceID, Range, Month, Step, HrsWk, AnnualSalary, AnnualBenefits, AnnualTotal, PositionImpact) "
                ."VALUES ('$ResourceID', '$Range', '$Month', '$Step', '$HrsWk', '$AnnualSalary', '$AnnualBenefits', '$AnnualTotal', '$PositionImpact')";  
    
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
