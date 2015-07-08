<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID= $_POST['ResourceID'];

        $query = "DELETE [IVCRESOURCES].[dbo].[Other2Items] WHERE ResourceID = '".$ResourceID ."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute();           

        echo json_encode($result);
    }
?>

