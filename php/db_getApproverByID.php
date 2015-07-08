<?php
    require("config.php");
    
    if (isset($_POST['ApproverID']))
    {
        $ApproverID = $_POST['ApproverID'];
        
        $query = "SELECT ApproverName, ApproverEmail, ApproverTitle, ApproverDepartment FROM [IVCRESOURCES].[dbo].[Approver] WHERE ApproverID = '".$ApproverID."'";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();
        echo json_encode($data);
    }
?>