 <?php
    require("config.php");
    
    if (isset($_POST['LoginEmail']))
    {        
        $LoginEmail = filter_input(INPUT_POST, 'LoginEmail');
        
        $query = "SELECT ccur.ResourceID, "
                    ."resr.ProposalTitle, "
                    ."CASE WHEN rsty.ResourceType IS NULL THEN '' ELSE rsty.ResourceType END ResourceType, "
                    ."CASE WHEN resr.RSID = 12 OR resr.RSID = 14 OR resr.RSID = 15 OR resr.RSID = 16 OR resr.RSID = 17 OR resr.RSID = 19 "
                    ."THEN 'Committee' ELSE rsst.ResourceStatus END AS ResourceStatus, "
                    ."CASE WHEN rsty.RTID = 1 OR rsty.RTID = 2 OR rsty.RTID = 3 "
                    ."THEN (SELECT TOP(1) AnnualTotal FROM [IVCRESOURCES].[dbo].[Personnel] WHERE ResourceID = ccur.ResourceID ORDER BY PersonnelID DESC) "
                    ."WHEN rsty.RTID = 9 "
                    ."THEN (SELECT TOP(1) Total FROM [IVCRESOURCES].[dbo].[Instructional] WHERE ResourceID = ccur.ResourceID ORDER BY InstructionalID DESC) "
                    ."WHEN rsty.RTID = 4 "
                    ."THEN (SELECT TOP(1) EstAmt FROM [IVCRESOURCES].[dbo].[Facilities] WHERE ResourceID = ccur.ResourceID ORDER BY FacilitiesID DESC) "
                    ."WHEN rsty.RTID = 5 "
                    ."THEN (SELECT TOP(1) GrandTotal FROM [IVCRESOURCES].[dbo].[Technology] WHERE ResourceID = ccur.ResourceID ORDER BY TechnologyID DESC) "
                    ."WHEN rsty.RTID = 7 "
                    ."THEN (SELECT TOP(1) TotalAmount FROM [IVCRESOURCES].[dbo].[Other2] WHERE ResourceID = ccur.ResourceID ORDER BY Other2ID DESC) "
                    ."ELSE 0.0 END TotalAmount, "
                    ."crat.CreatorName "
                    ."FROM [IVCRESOURCES].[dbo].[CC] AS ccur LEFT JOIN [IVCRESOURCES].[dbo].[Resource] AS resr ON ccur.ResourceID = resr.ResourceID "
                    ."LEFT JOIN [IVCRESOURCES].[dbo].[Creator] AS crat ON resr.CreatorID = crat.CreatorID "
                    ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceTypeItem] AS rtim ON rtim.ResourceID = resr.ResourceID "
                    ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceType] AS rsty ON rsty.RTID = rtim.RTID "
                    ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceStatus] AS rsst ON resr.RSID = rsst.RSID "
                    ."WHERE ccur.CCEmail = '" .$LoginEmail. "' AND resr.RSID <> 1 "
                    ."GROUP BY ccur.ResourceID, resr.ProposalTitle, rsty.ResourceType, crat.CreatorName, rsst.ResourceStatus, rsty.RTID";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();
        echo json_encode($data);
    }
?>