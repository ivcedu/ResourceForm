<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT Field1, Field2, Field3, Field4, Field5, Field6, Field7, Field8, Field9, Field10, Field11, Field12, Field13, Field14 "
                    ."FROM [IVCRESOURCES].[dbo].[CBQuestionnaire] "
                    ."WHERE ResourceID = '" .$ResourceID. "'";
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();
        echo json_encode($data);
    }
?>

