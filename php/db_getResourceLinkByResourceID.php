<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID= $_POST['ResourceID'];
        
        $query = "SELECT ResourceParentID "
                    ."FROM [IVCRESOURCES].[dbo].[ResourceLink] "
                    ."WHERE ResourceID = '" .$ResourceID. "'";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetch();
        
        echo json_encode($data["ResourceParentID"]);
    }
?>