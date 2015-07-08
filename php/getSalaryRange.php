<?php
    require("config.php");

    $query = "SELECT JobRange, Salary FROM [IVCRESOURCES].[dbo].[SalaryRange] ORDER BY JobRange ASC";
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
            $rows[$index] = array($row['JobRange'], $row['Salary']);
            $index++;
        }
    }

    echo json_encode($rows);
?>

