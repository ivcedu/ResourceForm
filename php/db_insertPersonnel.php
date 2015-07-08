<?php
    require("config.php");
    
    $ResultID = "";
    $ResourceID= $_POST['ResourceID'];
    $PersonnelTypeID = $_POST['PersonnelTypeID'];
    $Title = $_POST['Title'];
    $Range = $_POST['Range'];
    $Month = $_POST['Month'];
    $Step = $_POST['Step'];
    $HrsWk = $_POST['HrsWk'];
    $AnnualSalary = $_POST['AnnualSalary'];
    $AnnualBenefits = $_POST['AnnualBenefits'];
    $AnnualTotal = $_POST['AnnualTotal'];
    $PositionImpact = $_POST['PositionImpact'];
    $HrRate = $_POST['HrRate'];
    $NewPosition = $_POST['NewPosition'];

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[Personnel] " 
                ."(ResourceID, PersonnelTypeID, Title, Range, Month, Step, HrsWk, AnnualSalary, AnnualBenefits, AnnualTotal, PositionImpact, HrRate, NewPosition) "
                ."VALUES ('$ResourceID', '$PersonnelTypeID', '$Title', '$Range', '$Month', '$Step', '$HrsWk', '$AnnualSalary', '$AnnualBenefits', '$AnnualTotal', '$PositionImpact', '$HrRate', '$NewPosition')";  
    
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
