<?php
    require("config.php");
    
    if (isset($_POST['ProgramType']))
    {
        $ProgramType = $_POST['ProgramType'];
        
        $query = "SELECT ProgramID FROM [IVCRESOURCES].[dbo].[Program] WHERE ProgramType = '".$ProgramType."'";
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetch();

        echo json_encode($data["ProgramID"]);
    }
?>

