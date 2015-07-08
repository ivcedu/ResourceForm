<?php
    require("config.php");
    
    if (isset($_POST['CMID']))
    {
        $CMID = $_POST['CMID'];
        
        $query = "SELECT PositionName FROM [IVCRESOURCES].[dbo].[ClassifiedManagement] WHERE CMID = '" . $CMID . "'";
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
                $rows[$index] = array($row['PositionName']);
                $index++;
            }
        }

        echo json_encode($rows);
    }
?>

