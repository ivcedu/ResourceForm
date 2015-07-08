<?php
    require("config.php");
    
    if (isset($_POST['StageLevel']))
    {
        $StageLevel = $_POST['StageLevel'];
        $query = "SELECT StageLevelID FROM [IVCRESOURCES].[dbo].[StageLevel] WHERE StageLevel = '".$StageLevel."'";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetch();
        
        echo json_encode($data["StageLevelID"]);
    }
?>