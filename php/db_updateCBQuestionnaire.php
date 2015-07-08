<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID= $_POST['ResourceID'];
        $Field1 = $_POST['Field1'];
        $Field2 = $_POST['Field2'];
        $Field3 = $_POST['Field3'];
        $Field4 = $_POST['Field4'];
        $Field5 = $_POST['Field5'];
        $Field6 = $_POST['Field6'];
        $Field7 = $_POST['Field7'];
        $Field8 = $_POST['Field8'];
        $Field9 = $_POST['Field9'];
        $Field10 = $_POST['Field10'];
        $Field11 = $_POST['Field11'];
        $Field12 = $_POST['Field12'];
        $Field13 = $_POST['Field13'];
        $Field14 = $_POST['Field14'];

        $query = "UPDATE [IVCRESOURCES].[dbo].[CBQuestionnaire] " 
                    ."SET Field1 = '".$Field1."', Field2 = '".$Field2."', Field3 = '".$Field3."', Field4 = '".$Field4."', Field5 = '".$Field5."', "
                    ."Field6 = '".$Field6."', Field7 = '".$Field7."', Field8 = '".$Field8."', Field9 = '".$Field9."', Field10 = '".$Field10."', "
                    ."Field11 = '".$Field11."', Field12 = '".$Field12."', Field13 = '".$Field13."', Field14 = '".$Field14."' "
                    ."WHERE ResourceID = '".$ResourceID ."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute();           

        echo json_encode($result);
    }
?>

