<?php
    require("config.php");
    
    if (isset($_POST['PositionName']))
    {
        $PositionName= $_POST['PositionName'];
        
        $query = "SELECT CBID FROM [IVCRESOURCES].[dbo].[ClassifiedBargaining] WHERE PositionName = '" . $PositionName . "'";
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetch();

        echo json_encode($data["CBID"]);
    }
?>