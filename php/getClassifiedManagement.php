<?php
    require("config.php");

    $query = "SELECT CMID, PositionName FROM [IVCRESOURCES].[dbo].[ClassifiedManagement] ORDER BY PositionName ASC";
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
            $rows[$index] = array($row['CMID'], $row['PositionName']);
            $index++;
        }
    }

    echo json_encode($rows);
?>

