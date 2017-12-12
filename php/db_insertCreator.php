<?php
    require("config.php");
    
    $CreatorName = filter_input(INPUT_POST, 'CreatorName');
    $CreatorEmail = filter_input(INPUT_POST, 'CreatorEmail');
    $CreatorTitle = filter_input(INPUT_POST, 'CreatorTitle');
    $CreatorDepart = filter_input(INPUT_POST, 'CreatorDepart');
    
    $CreatorName = str_replace("'", "''", $CreatorName);
    $CreatorEmail = str_replace("'", "", $CreatorEmail);

    $CreatorID = searchCreator($dbConn, $CreatorEmail);
    if ($CreatorID === null) {
        $query = "INSERT INTO [IVCRESOURCES].[dbo].[Creator] (CreatorName, CreatorEmail, CreatorTitle, CreatorDepartment) "
                    ."VALUES ('$CreatorName', '$CreatorEmail', '$CreatorTitle', '$CreatorDepart')";

        $cmd = $dbConn->prepare($query);
        $cmd->execute();
        $CreatorID = $dbConn->lastInsertId();
    }            

    echo json_encode($CreatorID);
    
    function searchCreator($dbConn, $CreatorEmail) {        
        $query = "SELECT CreatorID FROM [IVCRESOURCES].[dbo].[Creator] WHERE CreatorEmail = '".$CreatorEmail."'";
        $cmd = $dbConn->prepare($query);
        $cmd->execute();
        $data = $cmd->fetch();
        
        return $data["CreatorID"];
    }