<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $StageLevelID = $_POST['StageLevelID'];
        $ResourceStatusID = $_POST['ResourceStatusID'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[ResourceStage] SET StageLevelID = '".$StageLevelID."', ResourceStatusID = '".$ResourceStatusID."' "
                    ."WHERE ResourceID = '".$ResourceID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>