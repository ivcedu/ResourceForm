<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT ItemReq, Location, EstAmt, EstDescrip, Alternative, FacilitiesID, ProjAmt, ProjDescrip "
                    ."FROM [IVCRESOURCES].[dbo].[Facilities] "
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
                $rows[$index] = array($row['ItemReq'], $row['Location'], $row['EstAmt'], $row['EstDescrip'], $row['Alternative'], $row['FacilitiesID'], $row['ProjAmt'], $row['ProjDescrip']);
                $index++;
            }
        }

        echo json_encode($rows);
    }
?>

