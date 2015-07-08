<?php
    require("config.php");
    
    if (isset($_POST['PersonnelType']))
    {
        $PersonnelType = $_POST['PersonnelType'];
        
        $query = "SELECT PersonnelTypeID FROM [IVCRESOURCES].[dbo].[PersonnelType] WHERE PersonnelType = '" .$PersonnelType. "'";
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetch();

        echo json_encode($data["PersonnelTypeID"]);
    }
?>