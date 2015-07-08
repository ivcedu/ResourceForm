<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $ResourceStep = $_POST['ResourceStep'];
        $ResourcePage = $_POST['ResourcePage'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[ResourceStep] "
                    ."SET ResourceStep = '".$ResourceStep."', ResourcePage = '".$ResourcePage."' "
                    ."WHERE ResourceID = '" . $ResourceID ."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>