<?php
    require("config.php");
    
    $StageLevel = $_GET['StageLevel'];
    $StageAppEmail = $_GET['StageAppEmail'];
    $ResourceType = $_GET['ResourceType'];
    $FundingSrc = $_GET['FundingSrc'];
    $Program = $_GET['Program'];
    $OneTime = $_GET['OneTime'];
    
    $sql_where = "";
    $sql_stage_level = "";
    $sql_resource_type = "";
//    $sql_funding_src = "";
    $sql_program = "";
    $sql_one_time = "";
    
    if ($StageLevel != "All") {        
        switch ($StageLevel) {
            case "Facilities Review":
                $sql_stage_level = "stlv.StageLevel = 'Facilities Review'";
                break;
            case "IT Review":
                $sql_stage_level = "stlv.StageLevel = 'IT Review'";
                break;
            case "Dean/Director":
                if ($StageAppEmail == "ykim160@ivc.edu" || $StageAppEmail == "bhagan@ivc.edu") {
                    $sql_stage_level = "stlv.StageLevel = 'Dean/Director'";
                }
                else {
                    $sql_stage_level = "stlv.StageLevel = 'Dean/Director' AND appr.ApproverEmail = '".$StageAppEmail."'";
                }
                break;
            case "VP":
                if ($StageAppEmail == "ykim160@ivc.edu" || $StageAppEmail == "bhagan@ivc.edu") {
                    $sql_stage_level = "stlv.StageLevel = 'VP'";
                }
                else {
                    $sql_stage_level = "stlv.StageLevel = 'VP' AND appr.ApproverEmail = '".$StageAppEmail."'";
                }
                break;
            case "President":
                if ($StageAppEmail == "ykim160@ivc.edu" || $StageAppEmail == "bhagan@ivc.edu") {
                    $sql_stage_level = "stlv.StageLevel = 'President'";
                }
                else {
                    $sql_stage_level = "stlv.StageLevel = 'President' AND appr.ApproverEmail = '".$StageAppEmail."'";
                }
                break;
            case "CHPLDTF":
                $sql_stage_level = "stlv.StageLevel = 'CHPLDTF'";
                break;
            case "SSAMMO":
                $sql_stage_level = "stlv.StageLevel = 'SSAMMO'";
                break;
            case "APTC":
                $sql_stage_level = "stlv.StageLevel = 'APTC'";
                break;
            case "BDRPC":
                $sql_stage_level = "stlv.StageLevel = 'BDRPC'";
                break;
            case "SPAC":
                $sql_stage_level = "stlv.StageLevel = 'SPAC'";
                break;
            case "PEC":
                $sql_stage_level = "stlv.StageLevel = 'PEC'";
                break;
            case "Closed":
                $sql_stage_level = "stlv.StageLevel = 'Closed'";
                break;
            case "Partially Funded":
                $sql_stage_level = "stlv.StageLevel = 'Partially Funded'";
                break;
            case "Fully Funded":
                $sql_stage_level = "stlv.StageLevel = 'Fully Funded'";
                break;
        }
    }
    
    if ($ResourceType != "All Resource") {
        switch ($ResourceType) {
            case "Classified Bargaining":
                $sql_resource_type = "rsty.ResourceType = 'Classified Bargaining'";
                break;
            case "Classified Management":
                $sql_resource_type = "rsty.ResourceType = 'Classified Management'";
                break;
            case "Short-Term Hourly":
                $sql_resource_type = "rsty.ResourceType = 'Short-Term Hourly'";
                break;
            case "Facilities":
                $sql_resource_type = "rsty.ResourceType = 'Facilities'";
                break;
            case "Instructional":
                $sql_resource_type = "rsty.ResourceType = 'Instructional'";
                break;
            case "Technology":
                $sql_resource_type = "rsty.ResourceType = 'Technology'";
                break;
            case "Other":
                $sql_resource_type = "rsty.ResourceType = 'Other'";
                break;
        }
    }
    
//    if ($FundingSrc != "All Funding") {
//        switch ($FundingSrc) {
//            case "General":
//                $sql_funding_src = "fdsr.General = '1'";
//                break;
//            case "Perkins":
//                $sql_funding_src = "fdsr.Perkins = '1'";
//                break;
//            case "BSI":
//                $sql_funding_src = "fdsr.BSI = '1'";
//                break;
//            case "IVC Foundation":
//                $sql_funding_src = "fdsr.IVCFoundation = '1'";
//                break;
//            case "ASIVC":
//                $sql_funding_src = "fdsr.ASIVC = '1'";
//                break;
//            case "Other":
//                $sql_funding_src = "fdsr.Other = '1'";
//                break;
//        }
//    }
    
    if ($Program != "All Program") {
        switch ($Program) {
            case "New Program":
                $sql_program = "rspr.ProgramID = '1'";
                break;
            case "Baseline":
                $sql_program = "rspr.ProgramID = '2'";
                break;
        }
    }
    
    if ($OneTime != "All Request") {
        $sql_one_time = "resr.OneTime = '1'";
    }
    
    ////////////////////////////////////////////////////////////////////////////
    if ($sql_stage_level != "") {
        $sql_where = "WHERE ".$sql_stage_level;
    }
    if ($sql_resource_type != "") {
        if ($sql_where !== "") {
            $sql_where = $sql_where." AND ".$sql_resource_type;
        }
        else {
            $sql_where = "WHERE ".$sql_resource_type;
        }
    }
//    if ($sql_funding_src != "") {
//        if ($sql_where !== "") {
//            $sql_where = $sql_where." AND ".$sql_funding_src;
//        }
//        else {
//            $sql_where = "WHERE ".$sql_funding_src;
//        }
//    }
    if ($sql_program != "") {
        if ($sql_where !== "") {
            $sql_where = $sql_where." AND ".$sql_program;
        }
        else {
            $sql_where = "WHERE ".$sql_program;
        }
    }
    if ($sql_one_time != "") {
        if ($sql_where !== "") {
            $sql_where = $sql_where." AND ".$sql_one_time;
        }
        else {
            $sql_where = "WHERE ".$sql_one_time;
        }
    }
        
    $query = "SELECT resr.ResourceID, "
                ."resr.ProposalTitle, "
                ."stlv.StageLevel, "
                ."crtr.CreatorName, "
                ."CASE WHEN rsty.RTID = 1 OR rsty.RTID = 2 OR rsty.RTID = 3 "
                ."THEN (SELECT TOP(1) AnnualTotal FROM [IVCRESOURCES].[dbo].[Personnel] WHERE ResourceID = resr.ResourceID ORDER BY PersonnelID DESC) "
                ."WHEN rsty.RTID = 9 "
                ."THEN (SELECT TOP(1) Total FROM [IVCRESOURCES].[dbo].[Instructional] WHERE ResourceID = resr.ResourceID ORDER BY InstructionalID DESC) "
                ."WHEN rsty.RTID = 4 "
                ."THEN (SELECT TOP(1) EstAmt FROM [IVCRESOURCES].[dbo].[Facilities] WHERE ResourceID = resr.ResourceID ORDER BY FacilitiesID DESC) "
                ."WHEN rsty.RTID = 5 "
                ."THEN (SELECT TOP(1) GrandTotal FROM [IVCRESOURCES].[dbo].[Technology] WHERE ResourceID = resr.ResourceID ORDER BY TechnologyID DESC) "
                ."WHEN rsty.RTID = 7 "
                ."THEN (SELECT TOP(1) TotalAmount FROM [IVCRESOURCES].[dbo].[Other2] WHERE ResourceID = resr.ResourceID ORDER BY Other2ID DESC) "
                ."ELSE 0.0 END TotalAmount, "
                ."rsty.ResourceType "
                //."CASE WHEN rslk.ResourceLinkNum IS NULL THEN '' ELSE rslk.ResourceLinkNum END ResourceLink, "
                //."appr.ApproverEmail, "
//                ."resr.Connect, "
//                ."resr.BEP, "
//                ."resr.Impact, "
//                ."prio.DepartMgr, "
//                ."prio.VPP, "
//                ."prio.CHPLDTF, "
                //."prio.TATF, "
//                ."prio.SSAMMO, "
//                ."prio.ATPC, "
//                ."prio.BDRPC, "
//                ."prio.SPAC, "
//                ."prio.PEC "
                //."resr.ApprovalID "
                ."FROM [IVCRESOURCES].[dbo].[ResourceStage] AS rcst LEFT JOIN [IVCRESOURCES].[dbo].[StageLevel] AS stlv ON rcst.StageLevelID = stlv.StageLevelID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Resource] AS resr ON rcst.ResourceID = resr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceStatus] AS rsst ON resr.RSID = rsst.RSID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceTypeItem] AS rtim ON rtim.ResourceID = resr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceType] AS rsty ON rsty.RTID = rtim.RTID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceLink] AS rslk ON resr.ResourceID = rslk.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Approver] AS appr ON rcst.ApproverID = appr.ApproverID "
                //."LEFT JOIN [IVCRESOURCES].[dbo].[FundingSrc] AS fdsr ON resr.ResourceID = fdsr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Priority] AS prio ON resr.ResourceID = prio.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceProg] AS rspr ON resr.ResourceID = rspr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Creator] AS crtr ON crtr.CreatorID = resr.CreatorID "
                .$sql_where;

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
   
    // filename for download
    $filename = "export_list.csv";  
    header("Content-Disposition: attachment; filename=\"$filename\"");
    header("Content-Type: text/csv;");
    $out = fopen("php://output", 'w+');

    // Write the spreadsheet column titles / labels
    fputcsv($out, array('ResourceID', 'ProposalTitle', 'StageLevel', 'CreatorName', 'ResourceType', 'TotalAmount'));
    // Write all the user records to the spreadsheet
    foreach($data as $row)
    {
        fputcsv($out, array($row['ResourceID'], $row['ProposalTitle'], $row['StageLevel'], $row['CreatorName'], $row['ResourceType'], $row['TotalAmount']));
    }
    
    fclose($out);
    exit;
?>