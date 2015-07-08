<?php
    require("config.php");
    
    if (isset($_POST['ResourceParentID']))
    {
        $ResourceParentID= $_POST['ResourceParentID'];
        
        $query = "SELECT ResourceParentID, ResourceLinkNum, Child "
                    ."FROM [IVCRESOURCES].[dbo].[ResourceLink] "
                    ."WHERE ResourceParentID = '" .$ResourceParentID. "'";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();
        echo json_encode($data);
    }
?>