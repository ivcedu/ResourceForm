<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $CreatorID = $_POST['CreatorID'];
        $strDate = $_POST['strDate'];
        $FiscalYear = $_POST['FiscalYear'];
        $ProposalTitle = $_POST['ProposalTitle'];
        $NeedFor = $_POST['NeedFor'];
        $status = $_POST['status'];
        $onetime = $_POST['onetime'];
        $NeedBy = $_POST['NeedBy'];
        
        $query = "UPDATE [IVCRESOURCES].[dbo].[Resource] "
                    ."SET CreatorID = '".$CreatorID."', strDate = '".$strDate."', FiscalYear = '".$FiscalYear."', ProposalTitle = '".$ProposalTitle."', "
                    ."NeedFor = '".$NeedFor."', RSID = '".$status."', [TimeStamp] = GETDATE(), OneTime = '".$onetime."', NeedBy = '".$NeedBy."' "
                    ."WHERE ResourceID = '" . $ResourceID ."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
