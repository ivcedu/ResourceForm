<?php
    require("config.php");
    
    if (isset($_POST['CBID']))
    {
        $CBID = $_POST['CBID'];
        
        $query = "SELECT PositionName FROM [IVCRESOURCES].[dbo].[ClassifiedBargaining] WHERE CBID = '" . $CBID . "'";
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
