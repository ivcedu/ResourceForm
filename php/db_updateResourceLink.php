<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID= $_POST['ResourceID'];
        $ResourceParentID = $_POST['ResourceParentID'];
        $ResourceLinkNum = $_POST['ResourceLinkNum'];
        $Child = $_POST['Child'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[ResourceLink] "
                    ."SET ResourceParentID = '".$ResourceParentID."', ResourceLinkNum = '".$ResourceLinkNum."', Child = '".$Child."' "
                    ."WHERE ResourceID = '" . $ResourceID ."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>