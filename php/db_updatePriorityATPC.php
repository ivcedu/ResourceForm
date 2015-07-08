<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $ATPC = $_POST['ATPC'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[Priority] SET ATPC = '".$ATPC."' "
                    ."WHERE ResourceID = '".$ResourceID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>