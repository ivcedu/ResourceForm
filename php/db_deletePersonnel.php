<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID= $_POST['ResourceID'];

        $query = "DELETE [IVCRESOURCES].[dbo].[Personnel] WHERE ResourceID = '".$ResourceID ."'";
        $query2 = "DELETE [IVCRESOURCES].[dbo].[PersonnelAttach] WHERE ResourceID = '".$ResourceID ."'";
        $query3 = "DELETE [IVCRESOURCES].[dbo].[CBQuestionnaire] WHERE ResourceID = '".$ResourceID ."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute();   
        
        $cmd = $dbConn->prepare($query2);
        $result = $cmd->execute();
        
        $cmd = $dbConn->prepare($query3);
        $result = $cmd->execute();

        echo json_encode($result);
    }
?>

