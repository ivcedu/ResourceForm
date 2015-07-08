<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $ProgramID = $_POST['ProgramID'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[ResourceProg] "
                    ."SET ProgramID = '".$ProgramID."' "
                    ."WHERE ResourceID = '" . $ResourceID ."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>

