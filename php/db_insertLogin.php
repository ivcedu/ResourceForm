<?php
    require("config.php");
    
    $LoginName = filter_input(INPUT_POST, 'LoginName');
    $LoginEmail = filter_input(INPUT_POST, 'LoginEmail');
    $LoginTitle = filter_input(INPUT_POST, 'LoginTitle');
    $LoginDepart = filter_input(INPUT_POST, 'LoginDepart');

    $LoginID = searchLogin($dbConn, $LoginEmail);
    if ($LoginID == 0) {
        $query = "INSERT INTO [IVCRESOURCES].[dbo].[Login] (LoginName, LoginEmail, LoginTitle, LoginDepartment) "
                    ."VALUES ('$LoginName', '$LoginEmail', '$LoginTitle', '$LoginDepart')";

        try {
            $dbConn->beginTransaction();
            $cmd = $dbConn->prepare($query);
            $cmd->execute();
            $dbConn->commit();
            $LoginID = $dbConn->lastInsertId();
        } catch (PDOException $e) {
            $dbConn->rollBack();
        }
    }            

    echo json_encode($LoginID);
    
    function searchLogin($dbConn, $LoginEmail)
    {        
        $query = "SELECT LoginID FROM [IVCRESOURCES].[dbo].[Login] WHERE LoginEmail = '".$LoginEmail."'";
        $cmd = $dbConn->prepare($query);
        $cmd->execute();
        $data = $cmd->fetch();
        
        if(!$data) {
            return 0;
        }
        else {
            return intval($data["LoginID"]);
        }
    }