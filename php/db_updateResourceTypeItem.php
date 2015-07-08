<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $RTID = $_POST['RTID'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[ResourceTypeItem] "
                    ."SET RTID = '".$RTID."' "
                    ."WHERE ResourceID = '" . $ResourceID ."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>

