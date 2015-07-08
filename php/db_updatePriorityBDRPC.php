<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $BDRPC = $_POST['BDRPC'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[Priority] SET BDRPC = '".$BDRPC."' "
                    ."WHERE ResourceID = '".$ResourceID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>