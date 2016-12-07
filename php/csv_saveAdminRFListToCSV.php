<?php
    require("config.php");
    
    $FiscalYear = filter_input(INPUT_GET, 'FiscalYear');
    $Status = filter_input(INPUT_GET, 'Status');
    $StageLevel = filter_input(INPUT_GET, 'StageLevel');
    $StageAppEmail = filter_input(INPUT_GET, 'StageAppEmail');
    $ResourceType = filter_input(INPUT_GET, 'ResourceType');
    $Program = filter_input(INPUT_GET, 'Program');
    $FundingSrc = filter_input(INPUT_GET, 'FundingSrc');
    $OneTime = filter_input(INPUT_GET, 'OneTime');
    
    $sql_where = "WHERE resr.FiscalYear = '".$FiscalYear."' AND ";
    $sql_status = "";
    $sql_stage_level = "";
    $sql_resource_type = "";
    $sql_program = "";
    $sql_fund_src = "";
    $sql_fund_src_col = "";
    $sql_one_time = "";
    
    if ($Status === "Active") {
        $sql_status = "(resr.RSID = '7' OR resr.RSID = '8' OR resr.RSID = '9' OR resr.RSID = '10' OR resr.RSID = '11')";
    }
    else {
        $sql_status = "(resr.RSID = '18' OR resr.RSID = '20' OR resr.RSID = '21')";
    }
    
    if ($StageLevel !== "All") {        
        switch ($StageLevel) {
            case "Facilities Review":
                $sql_stage_level = "stlv.StageLevel = 'Facilities Review'";
                break;
            case "IT Review":
                $sql_stage_level = "stlv.StageLevel = 'IT Review'";
                break;
            case "Dean/Director":
                $sql_stage_level = "stlv.StageLevel = 'Dean/Director'";
                break;
            case "VP":
                $sql_stage_level = "stlv.StageLevel = 'VP'";
                break;
            case "President":
                $sql_stage_level = "stlv.StageLevel = 'President'";
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
            case "Me":
                $sql_stage_level = "appr.ApproverEmail = '".$StageAppEmail."'";
                break;
        }
    }
    
    if ($ResourceType !== "All Resource") {
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
    
    if ($Program !== "All Program") {
        switch ($Program) {
            case "New Program":
                $sql_program = "rspr.ProgramID = '1'";
                break;
            case "Baseline":
                $sql_program = "rspr.ProgramID = '2'";
                break;
        }
    }
    
    switch ($FundingSrc) {
        case "0":
            $sql_fund_src_col = "fs_0";
            break;
        case "1":
            $sql_fund_src_col = "fs_1";
            break;
        case "2":
            $sql_fund_src_col = "fs_2";
            break;
        case "3":
            $sql_fund_src_col = "fs_3";
            break;
        case "4":
            $sql_fund_src_col = "fs_4";
            break;
        case "5":
            $sql_fund_src_col = "fs_5";
            break;
        case "6":
            $sql_fund_src_col = "fs_6";
            break;
        case "7":
            $sql_fund_src_col = "fs_7";
            break;
        case "8":
            $sql_fund_src_col = "fs_8";
            break;
        case "9":
            $sql_fund_src_col = "fs_9";
            break;
        case "10":
            $sql_fund_src_col = "fs_10";
            break;
        case "11":
            $sql_fund_src_col = "fs_11";
            break;
        case "12":
            $sql_fund_src_col = "fs_12";
            break;
        case "13":
            $sql_fund_src_col = "fs_13";
            break;
        case "14":
            $sql_fund_src_col = "fs_14";
            break;
        case "15":
            $sql_fund_src_col = "fs_15";
            break;
        case "16":
            $sql_fund_src_col = "fs_16";
            break;
        case "17":
            $sql_fund_src_col = "fs_17";
            break;
        case "18":
            $sql_fund_src_col = "fs_18";
            break;
        case "19":
            $sql_fund_src_col = "fs_19";
            break;
        case "20":
            $sql_fund_src_col = "fs_20";
            break;
        case "21":
            $sql_fund_src_col = "fs_21";
            break;
        case "22":
            $sql_fund_src_col = "fs_22";
            break;
        case "23":
            $sql_fund_src_col = "fs_23";
            break;
    }
    if ($FundingSrc !== "0") {
        $sql_fund_src = "rsfs.".$sql_fund_src_col." = '1'";
    }
    
    if ($OneTime !== "All Request") {
        if ($OneTime === "One Time") {
            $sql_one_time = "resr.OneTime = '1'";
        }
        else {
            $sql_one_time = "resr.OneTime = '0'";
        } 
    }
    
    ////////////////////////////////////////////////////////////////////////////
    $sql_where = $sql_where.$sql_status;
    
    if ($sql_stage_level !== "") {
        $sql_where = $sql_where." AND ".$sql_stage_level;
    }
    if ($sql_resource_type !== "") {   
        $sql_where = $sql_where." AND ".$sql_resource_type;
    }
    if ($sql_program !== "") {   
        $sql_where = $sql_where." AND ".$sql_program;
    }
    if ($sql_fund_src !== "") {   
        $sql_where = $sql_where." AND ".$sql_fund_src;
    }
    if ($sql_one_time !== "") {   
        $sql_where = $sql_where." AND ".$sql_one_time;
    }
        
    $query = "SELECT resr.ResourceID, "
                ."resr.ProposalTitle, "
                ."resr.NeedFor, "
                ."stlv.StageLevel, "
                ."crtr.CreatorName, "
                ."CASE WHEN rsty.RTID = 1 OR rsty.RTID = 2 OR rsty.RTID = 3 "
                ."THEN (SELECT TOP(1) AnnualTotal FROM [IVCRESOURCES].[dbo].[Personnel] WHERE ResourceID = resr.ResourceID ORDER BY PersonnelID DESC) "
                ."WHEN rsty.RTID = 9 "
                ."THEN (SELECT TOP(1) Total FROM [IVCRESOURCES].[dbo].[Instructional] WHERE ResourceID = resr.ResourceID ORDER BY InstructionalID DESC) "
                ."WHEN rsty.RTID = 4 "
                ."THEN (SELECT TOP(1) CASE WHEN ProjAmt = 0.0 THEN EstAmt ELSE ProjAmt END FROM [IVCRESOURCES].[dbo].[Facilities] WHERE ResourceID = resr.ResourceID ORDER BY FacilitiesID DESC) "
                ."WHEN rsty.RTID = 5 "
                ."THEN (SELECT TOP(1) GrandTotal FROM [IVCRESOURCES].[dbo].[Technology] WHERE ResourceID = resr.ResourceID ORDER BY TechnologyID DESC) "
                ."WHEN rsty.RTID = 7 "
                ."THEN (SELECT TOP(1) TotalAmount FROM [IVCRESOURCES].[dbo].[Other2] WHERE ResourceID = resr.ResourceID ORDER BY Other2ID DESC) "
                ."ELSE 0.0 END TotalAmount, "
                ."rsty.ResourceType, "
                ."CASE WHEN rslk.ResourceLinkNum IS NULL THEN '' ELSE rslk.ResourceLinkNum END ResourceLink, "
                ."appr.ApproverEmail, "
                ."appr.ApproverName, "
                ."prio.DepartMgr, "
                ."prio.VPP, "
                ."(SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = '".$sql_fund_src_col."') AS Funding, "
                ."resr.NeedBy, "
                ."resr.ApprovalID "
                ."FROM [IVCRESOURCES].[dbo].[ResourceStage] AS rcst LEFT JOIN [IVCRESOURCES].[dbo].[StageLevel] AS stlv ON rcst.StageLevelID = stlv.StageLevelID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Resource] AS resr ON rcst.ResourceID = resr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceStatus] AS rsst ON resr.RSID = rsst.RSID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceTypeItem] AS rtim ON rtim.ResourceID = resr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceType] AS rsty ON rsty.RTID = rtim.RTID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceLink] AS rslk ON resr.ResourceID = rslk.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Approver] AS appr ON rcst.ApproverID = appr.ApproverID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Priority] AS prio ON resr.ResourceID = prio.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceProg] AS rspr ON resr.ResourceID = rspr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Creator] AS crtr ON crtr.CreatorID = resr.CreatorID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceFundSrc] AS rsfs ON rsfs.ResourceID = resr.ResourceID "
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
    fputcsv($out, array('ResourceID', 'ProposalTitle', 'Link', 'Stage', 'Need By Date', 'Creator', 'Approver', 'Resource', 'Funding', 'T. Amount', 'Mgr', 'VPP'));
    // Write all the user records to the spreadsheet
    foreach($data as $row) {
        fputcsv($out, array($row['ResourceID'], $row['ProposalTitle'], $row['ResourceLink'], $row['StageLevel'], $row['NeedBy'], 
                            $row['CreatorName'], $row['ApproverName'], $row['ResourceType'], 
                            ($row['Funding'] === null ? "Multiple" : $row['Funding']), 
                            $row['TotalAmount'], 
                            ($row['DepartMgr'] === "-1" ? "" : $row['DepartMgr']) , 
                            ($row['VPP'] === "-1" ? "" : $row['VPP'])));
    }
    
    fclose($out);
    exit;