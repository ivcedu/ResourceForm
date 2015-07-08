<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $CHPLDTF = $_POST['CHPLDTF'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[Priority] SET CHPLDTF = '".$CHPLDTF."' "
                    ."WHERE ResourceID = '".$ResourceID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>