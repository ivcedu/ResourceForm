<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $ResourcePage = $_POST['ResourcePage'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[ResourceStep] "
                    ."SET ResourcePage = '".$ResourcePage."' "
                    ."WHERE ResourceID = '" . $ResourceID ."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>