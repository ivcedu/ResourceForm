<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $RSID = $_POST['RSID'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[Resource] SET RSID = '".$RSID."' "
                    ."WHERE ResourceID = '" . $ResourceID ."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>