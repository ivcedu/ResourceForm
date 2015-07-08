<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $SPAC = $_POST['SPAC'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[Priority] SET SPAC = '".$SPAC."' "
                    ."WHERE ResourceID = '".$ResourceID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>