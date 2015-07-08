<?php
    require("config.php");
    
    if (isset($_POST['CreatorEmail']))
    {
        $CreatorEmail = $_POST['CreatorEmail'];
        
        $query = "SELECT CreatorID FROM [IVCRESOURCES].[dbo].[Creator] WHERE CreatorEmail = '" .$CreatorEmail. "'";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetch();

        echo json_encode($data["CreatorID"]);
    }
?>