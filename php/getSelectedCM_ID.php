<?php
    require("config.php");
    
    if (isset($_POST['PositionName']))
    {
        $PositionName= $_POST['PositionName'];
        
        $query = "SELECT CMID FROM [IVCRESOURCES].[dbo].[ClassifiedManagement] WHERE PositionName = '" . $PositionName . "'";
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetch();

        echo json_encode($data["CMID"]);
    }
?>

