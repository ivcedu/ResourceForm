<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT Description, TotalAmount, Other2ID "
                    ."FROM [IVCRESOURCES].[dbo].[Other2] "
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
                $rows[$index] = array($row['Description'], $row['TotalAmount'], $row['Other2ID']);
                $index++;
            }
        }

        echo json_encode($rows);
    }
?>

