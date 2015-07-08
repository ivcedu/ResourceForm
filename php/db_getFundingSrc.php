<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT General, Perkins, BSI, IVCFoundation, ASIVC, Other, OtherDescription "
                    ."FROM [IVCRESOURCES].[dbo].[FundingSrc] "
                    ."WHERE ResourceID = '" .$ResourceID. "'";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();
        echo json_encode($data);
    }
?>