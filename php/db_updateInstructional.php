<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID= $_POST['ResourceID'];
        $sch_div= $_POST['sch_div'];
        $ex_life = $_POST['ex_life'];
        $descrip = $_POST['descrip'];
        $qty = $_POST['qty'];
        $cost = $_POST['cost'];
        $total = $_POST['total'];

        $query = "UPDATE [IVCRESOURCES].[dbo].[Instructional] " 
                    ."SET SchDiv = '".$sch_div."', Lifespan = '".$ex_life."', Description = '".$descrip."', Qty = '".$qty."', Cost = '".$cost."', Total = '".$total."' "
                    ."WHERE ResourceID = '".$ResourceID ."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute();           

        echo json_encode($result);
    }
?>


