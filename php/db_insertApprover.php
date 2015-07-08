<?php
    require("config.php");
    
    $AppName = filter_input(INPUT_POST, 'AppName');
    $AppEmail = filter_input(INPUT_POST, 'AppEmail');
    $AppTitle = filter_input(INPUT_POST, 'AppTitle');
    $AppDepart = filter_input(INPUT_POST, 'AppDepart');

    $ApproverID = searchCreator($dbConn, $AppEmail);
    if ($ApproverID == 0) {
        $query = "INSERT INTO [IVCRESOURCES].[dbo].[Approver] (ApproverName, ApproverEmail, ApproverTitle, ApproverDepartment) "
                    ."VALUES ('$AppName', '$AppEmail', '$AppTitle', '$AppDepart')";

        try {
            $dbConn->beginTransaction();
            $cmd = $dbConn->prepare($query);
            $cmd->execute();
            $dbConn->commit();
            $ApproverID = $dbConn->lastInsertId();
        } catch (PDOException $e) {
            $dbConn->rollBack();
        }
    }            

    echo json_encode($ApproverID);
    
    function searchCreator($dbConn, $AppEmail) {        
        $query = "SELECT ApproverID FROM [IVCRESOURCES].[dbo].[Approver] WHERE ApproverEmail = '".$AppEmail."'";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute();
        $data = $cmd->fetch();
        
        if(!$data) {
            return 0;
        }
        else {
            return intval($data["ApproverID"]);
        }
    }