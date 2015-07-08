<?php
    require("config.php");

    $JobRange = filter_input(INPUT_POST, 'JobRange');
    
    $query = "SELECT Salary FROM [IVCRESOURCES].[dbo].[CMSalaryRange] WHERE JobRange = '" . $JobRange . "'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data['Salary']);