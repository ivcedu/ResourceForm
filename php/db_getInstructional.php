<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT SchDiv, Lifespan, Description, Qty, Cost, Total, InstructionalID "
                    ."FROM [IVCRESOURCES].[dbo].[Instructional] "
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
                $rows[$index] = array($row['SchDiv'], $row['Lifespan'], $row['Description'], $row['Qty'], $row['Cost'], $row['Total'], $row['InstructionalID']);
                $index++;
            }
        }

        echo json_encode($rows);
    }
?>

