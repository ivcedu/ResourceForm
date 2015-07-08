<?php
    require("config.php");
    
    if (isset($_POST['PositionName']))
    {
        $PositionName= $_POST['PositionName'];
        
        $query = "SELECT CMID FROM [IVCRESOURCES].[dbo].[ClassifiedManagement] WHERE PositionName = '" . $PositionName . "'";
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
                $rows[$index] = array($row['CMID']);
                $index++;
            }
        }

        echo json_encode($rows);
    }
?>

