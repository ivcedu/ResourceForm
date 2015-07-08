<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $SSAMMO = $_POST['SSAMMO'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[Priority] SET SSAMMO = '".$SSAMMO."' "
                    ."WHERE ResourceID = '".$ResourceID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>