<?php
    require("config.php");
    
    $LoginName = filter_input(INPUT_POST, 'LoginName');
    $LoginEmail = filter_input(INPUT_POST, 'LoginEmail');
    $LoginTitle = filter_input(INPUT_POST, 'LoginTitle');
    $LoginDepart = filter_input(INPUT_POST, 'LoginDepart');

    $LoginID = searchLogin($dbConn, $LoginEmail);
    if ($LoginID === "") {
        $query2 = "INSERT INTO [IVCRESOURCES].[dbo].[Login] (LoginName, LoginEmail, LoginTitle, LoginDepartment) "
                    ."VALUES ('$LoginName', '$LoginEmail', '$LoginTitle', '$LoginDepart')";

        $cmd = $dbConn->prepare($query2);
        $cmd->execute();
        $LoginID = $dbConn->lastInsertId();
    }

    echo json_encode($LoginID);
    
    function searchLogin($dbConn, $LoginEmail) {        
        $query1 = "SELECT LoginID FROM [IVCRESOURCES].[dbo].[Login] WHERE LoginEmail = '".$LoginEmail."'";
        $cmd = $dbConn->prepare($query1);
        $cmd->execute();
        $data = $cmd->fetch();
        
        return $data["LoginID"];
    }