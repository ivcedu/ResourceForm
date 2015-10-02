<?php
    require("config.php");

    $CreatorEmail = filter_input(INPUT_POST, 'CreatorEmail');
    $CreatorName = filter_input(INPUT_POST, 'CreatorName');
    $CreatorTitle = filter_input(INPUT_POST, 'CreatorTitle');
    $CreatorDepartment = filter_input(INPUT_POST, 'CreatorDepartment');
    
    $query = "UPDATE [IVCRESOURCES].[dbo].[Creator] "
            . "SET CreatorName = '".$CreatorName."', CreatorTitle = '".$CreatorTitle."', CreatorDepartment = '".$CreatorDepartment."' "
            . "WHERE CreatorEmail = '".$CreatorEmail."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();
    
    echo json_encode($result);