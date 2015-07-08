<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $Resubmit = $_POST['Resubmit'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[Backtodraft] SET Resubmit = '".$Resubmit."' "
                    ."WHERE ResourceID = '".$ResourceID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>