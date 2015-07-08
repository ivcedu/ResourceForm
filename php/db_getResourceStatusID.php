<?php
    require("config.php");
    
    if (isset($_POST['ResourceStatus']))
    {
        $ResourceStatus = $_POST['ResourceStatus'];
        $query = "SELECT RSID FROM [IVCRESOURCES].[dbo].[ResourceStatus] WHERE ResourceStatus = '".$ResourceStatus."'";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetch();
        
        echo json_encode($data["RSID"]);
    }
?>