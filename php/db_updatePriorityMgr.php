<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $DepartMgr = $_POST['DepartMgr'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[Priority] SET DepartMgr = '".$DepartMgr."' "
                    ."WHERE ResourceID = '".$ResourceID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>