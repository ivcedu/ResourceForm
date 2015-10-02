<?php
    require("config.php");
    
    $LoginEmail = filter_input(INPUT_POST, 'LoginEmail');
    $LoginName = filter_input(INPUT_POST, 'LoginName');
    $LoginTitle = filter_input(INPUT_POST, 'LoginTitle');
    $LoginDepartment = filter_input(INPUT_POST, 'LoginDepartment');
    
    $query = "UPDATE [IVCRESOURCES].[dbo].[Login] "
            . "SET LoginName = '".$LoginName."', LoginTitle = '".$LoginTitle."', LoginDepartment = '".$LoginDepartment."' "
            . "WHERE LoginEmail = '".$LoginEmail."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();
    
    echo json_encode($result);