<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $Connect = $_POST['Connect'];
        $BEP = $_POST['BEP'];
        $Impact = $_POST['Impact'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[Resource] "
                    ."SET Connect = '".$Connect."', BEP = '".$BEP."', Impact = '".$Impact."' "
                    ."WHERE ResourceID = '".$ResourceID ."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>