<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        if ($Table !== "") {
            $query = "SELECT CCName, CCEmail, CCTitle, CCDepartment "
                        ."FROM [IVCRESOURCES].[dbo].[CC] "
                        ."WHERE ResourceID = '" .$ResourceID. "'";
            $cmd = $dbConn->prepare($query);
            $cmd->execute(); 
            $data = $cmd->fetchAll();
            echo json_encode($data);
        }
    }
?>

