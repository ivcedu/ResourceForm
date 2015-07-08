<?php
    require("config.php");
    
    if (isset($_POST['ResourceParentID']))
    {
        $ResourceParentID= $_POST['ResourceParentID'];

        $query = "DELETE [IVCRESOURCES].[dbo].[ResourceLink] WHERE ResourceParentID = '".$ResourceParentID."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute();           

        echo json_encode($result);
    }
?>