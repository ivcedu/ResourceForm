<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $StageLevelID = $_POST['StageLevelID'];
        $ApproverID = $_POST['ApproverID'];
        $ResourceStatusID = $_POST['ResourceStatusID'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[ResourceStage] SET StageLevelID = '".$StageLevelID."', ApproverID = '".$ApproverID."', ResourceStatusID = '".$ResourceStatusID."' "
                    ."WHERE ResourceID = '".$ResourceID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>