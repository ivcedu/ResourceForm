<?php
    require("config.php");
    
    if (isset($_POST['ApproverEmail']))
    {
        $ApproverEmail = $_POST['ApproverEmail'];
        
        $query = "SELECT ApproverID FROM [IVCRESOURCES].[dbo].[Approver] WHERE ApproverEmail = '".$ApproverEmail."'";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetch();

        echo json_encode($data["ApproverID"]);
    }
?>