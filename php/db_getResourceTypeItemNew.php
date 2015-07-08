<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT rt.ResourceType "
                    ."FROM [IVCRESOURCES].[dbo].[ResourceTypeItem] AS rti LEFT JOIN [IVCRESOURCES].[dbo].[ResourceType] AS rt ON rti.RTID = rt.RTID "
                    ."WHERE ResourceID = '".$ResourceID."'";
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetch();

        echo json_encode($data["ResourceType"]);
    }
?>