<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID= $_POST['ResourceID'];

        $query = "DELETE [IVCRESOURCES].[dbo].[Instructional] WHERE ResourceID = '".$ResourceID ."'";
        $query2 = "DELETE [IVCRESOURCES].[dbo].[Instructional] WHERE ResourceID = '".$ResourceID ."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute();    
        
        $cmd = $dbConn->prepare($query2);
        $result = $cmd->execute();

        echo json_encode($result);
    }
?>

