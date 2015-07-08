<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT FileLinkName, FileName "
                    ."FROM [IVCRESOURCES].[dbo].[PerkinsAttach] "
                    ."WHERE ResourceID = '".$ResourceID."'";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();
        
        echo json_encode($data);
    }
?>
