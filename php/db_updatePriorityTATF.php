<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $TATF = $_POST['TATF'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[Priority] SET TATF = '".$TATF."' "
                    ."WHERE ResourceID = '".$ResourceID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>