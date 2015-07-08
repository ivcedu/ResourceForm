<?php
    require("config.php");
    
    if (isset($_POST['ResourceType']))
    {
        $ResourceType = $_POST['ResourceType'];
        
        $query = "SELECT RTID FROM [IVCRESOURCES].[dbo].[ResourceType] WHERE ResourceType = '" .$ResourceType. "'";
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetch();

        echo json_encode($data["RTID"]);
    }
?>