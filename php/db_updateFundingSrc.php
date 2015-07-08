<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $General = $_POST['General'];
        $Perkins = $_POST['Perkins'];
        $BSI = $_POST['BSI'];
        $IVCFoundation = $_POST['IVCFoundation'];
        $ASIVC = $_POST['ASIVC'];
        $Other = $_POST['Other'];
        $OtherDescription = $_POST['OtherDescription'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[FundingSrc] "
                    ."SET General = '".$General."', Perkins = '".$Perkins."', BSI = '".$BSI."', IVCFoundation = '".$IVCFoundation."', "
                    ."ASIVC = '".$ASIVC."', Other = '".$Other."', OtherDescription = '".$OtherDescription."' "
                    ."WHERE ResourceID = '".$ResourceID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>