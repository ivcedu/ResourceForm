<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT Title, [Range], [Month], Step, HrsWk, AnnualSalary, AnnualBenefits, AnnualTotal, PositionImpact, PersonnelTypeID, PersonnelID, HrRate, NewPosition "
                    ."FROM [IVCRESOURCES].[dbo].[Personnel] "
                    ."WHERE ResourceID = '" .$ResourceID. "'";
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();
        $rstCount = count($data);

        $index = 0;
        $rows = array(array());
        if ($rstCount > 0)
        {
            foreach($data as $row)
            {
                $rows[$index] = array($row['Title'], $row['Range'], $row['Month'], $row['Step'], $row['HrsWk'], $row['AnnualSalary'], $row['AnnualBenefits'], 
                                      $row['AnnualTotal'], $row['PositionImpact'], $row['PersonnelTypeID'], $row['PersonnelID'], $row['HrRate'], $row['NewPosition']);
                $index++;
            }
        }

        echo json_encode($rows);
    }
?>

