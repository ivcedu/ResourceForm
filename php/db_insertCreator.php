<?php
    require("config.php");
    
    $CreatorName = filter_input(INPUT_POST, 'CreatorName');
    $CreatorEmail = filter_input(INPUT_POST, 'CreatorEmail');
    $CreatorTitle = filter_input(INPUT_POST, 'CreatorTitle');
    $CreatorDepart = filter_input(INPUT_POST, 'CreatorDepart');

    $CreatorID = searchCreator($dbConn, $CreatorEmail);
    if ($CreatorID == 0) {
        $query = "INSERT INTO [IVCRESOURCES].[dbo].[Creator] (CreatorName, CreatorEmail, CreatorTitle, CreatorDepartment) "
                    ."VALUES ('$CreatorName', '$CreatorEmail', '$CreatorTitle', '$CreatorDepart')";

        try {
            $dbConn->beginTransaction();
            $cmd = $dbConn->prepare($query);
            $cmd->execute();
            $dbConn->commit();
            $CreatorID = $dbConn->lastInsertId();
        } catch (PDOException $e) {
            $dbConn->rollBack();
        }
    }            

    echo json_encode($CreatorID);
    
    function searchCreator($dbConn, $CreatorEmail) {        
        $query = "SELECT CreatorID FROM [IVCRESOURCES].[dbo].[Creator] WHERE CreatorEmail = '".$CreatorEmail."'";
        $cmd = $dbConn->prepare($query);
        $cmd->execute();
        $data = $cmd->fetch();
        
        if(!$data) {
            return 0;
        }
        else {
            return intval($data["CreatorID"]);
        }
    }