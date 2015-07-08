<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID= $_POST['ResourceID'];
        $ProjAmt = $_POST['ProjAmt'];
        $ProjDescrip = $_POST['ProjDescrip'];

        $query = "UPDATE [IVCRESOURCES].[dbo].[Facilities] " 
                    ."SET ProjAmt = '".$ProjAmt."', ProjDescrip = '".$ProjDescrip."' "
                    ."WHERE ResourceID = '".$ResourceID ."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute();           

        echo json_encode($result);
    }
?>