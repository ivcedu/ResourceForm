<?php
    require("config.php");
    
    if (isset($_POST['LoginEmail']))
    {
        $LoginEmail = $_POST['LoginEmail'];
        $sql_approver = "";
        
        if ($LoginEmail != "ykim160@ivc.edu")
            $sql_approver = "AND appr.ApproverEmail = '".$LoginEmail."'";
        
        $query = "SELECT resr.ResourceID, "
                    ."resr.ProposalTitle, "
                    ."stlv.StageLevel, "
                    ."rsst.ResourceStatus, "
                    ."(SELECT TOP(1) EstAmt FROM [IVCRESOURCES].[dbo].[Facilities] WHERE ResourceID = resr.ResourceID ORDER BY FacilitiesID DESC) AS TotalAmount, "
                    ."crtr.CreatorName, "
                    ."resr.ApprovalID "
                    ."FROM [IVCRESOURCES].[dbo].[ResourceStage] AS rcst LEFT JOIN [IVCRESOURCES].[dbo].[Approver] AS appr ON rcst.ApproverID = appr.ApproverID "
                    ."LEFT JOIN [IVCRESOURCES].[dbo].[StageLevel] AS stlv ON rcst.StageLevelID = stlv.StageLevelID "
                    ."LEFT JOIN [IVCRESOURCES].[dbo].[Resource] AS resr ON rcst.ResourceID = resr.ResourceID "
                    ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceStatus] AS rsst ON resr.RSID = rsst.RSID "
                    ."LEFT JOIN [IVCRESOURCES].[dbo].[Creator] AS crtr ON resr.CreatorID = crtr.CreatorID "
                    ."WHERE stlv.StageLevel = 'Facilities Review' ".$sql_approver;
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();
        echo json_encode($data);
    }
?>