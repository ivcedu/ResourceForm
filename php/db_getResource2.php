<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT cr.CreatorName, cr.CreatorEmail, cr.CreatorTitle "
                    ."FROM [IVCRESOURCES].[dbo].[Resource] AS rs LEFT JOIN [IVCRESOURCES].[dbo].[Creator] AS cr ON rs.CreatorID = cr.CreatorID "
                    ."WHERE rs.ResourceID = '" .$ResourceID. "'";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();
        echo json_encode($data);
    }
?>