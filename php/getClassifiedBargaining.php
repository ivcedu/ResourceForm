<?php
    require("config.php");

    $query = "SELECT CBID, PositionName FROM [IVCRESOURCES].[dbo].[ClassifiedBargaining] ORDER BY PositionName ASC";
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
            $rows[$index] = array($row['CBID'], $row['PositionName']);
            $index++;
        }
    }

    echo json_encode($rows);
?>

