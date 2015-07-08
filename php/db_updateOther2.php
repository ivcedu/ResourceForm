<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID= $_POST['ResourceID'];
        $Description= $_POST['Description'];
        $TotalAmount = $_POST['TotalAmount'];

        $query = "UPDATE [IVCRESOURCES].[dbo].[Other2] " 
                    ."SET Description = '".$Description."', TotalAmount = '".$TotalAmount."' "
                    ."WHERE ResourceID = '".$ResourceID ."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute();           

        echo json_encode($result);
    }
?>

