<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID= $_POST['ResourceID'];
        $ItemReq= $_POST['ItemReq'];
        $Location = $_POST['Location'];
        $EstAmt = $_POST['EstAmt'];
        $EstDescrip = $_POST['EstDescrip'];
        $Alternative = $_POST['Alternative'];

        $query = "UPDATE [IVCRESOURCES].[dbo].[Facilities] " 
                    ."SET ItemReq = '".$ItemReq."', Location = '".$Location."', EstAmt = '".$EstAmt."', EstDescrip = '".$EstDescrip."', Alternative = '".$Alternative."' "
                    ."WHERE ResourceID = '".$ResourceID ."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute();           

        echo json_encode($result);
    }
?>