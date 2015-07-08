<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
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

        $query = "UPDATE [IVCRESOURCES].[dbo].[Personnel] " 
                    ."SET PersonnelTypeID = '".$PersonnelTypeID."', Title = '".$Title."', Range = '".$Range."', Month = '".$Month."', Step = '".$Step."', "
                    ."HrsWk = '".$HrsWk."', AnnualSalary = '".$AnnualSalary."', AnnualBenefits = '".$AnnualBenefits."', "
                    ."AnnualTotal = '".$AnnualTotal."', PositionImpact = '".$PositionImpact."', HrRate = '".$HrRate."', NewPosition = '".$NewPosition."' "
                    ."WHERE ResourceID = '".$ResourceID ."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute();           

        echo json_encode($result);
    }
?>

