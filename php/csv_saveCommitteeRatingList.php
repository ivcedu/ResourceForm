<?php
    require("config.php");
    
    $SqlSelect = filter_input(INPUT_GET, 'SqlSelect');
    $SqlFrom = filter_input(INPUT_GET, 'SqlFrom');
    $SqlWhere = filter_input(INPUT_GET, 'SqlWhere');
    
    $RatedByID = filter_input(INPUT_GET, 'RatedByID');
    $ResourceType = filter_input(INPUT_GET, 'ResourceType');
    $Program = filter_input(INPUT_GET, 'Program');
    $FundingSrc = filter_input(INPUT_GET, 'FundingSrc');
    $OneTime = filter_input(INPUT_GET, 'OneTime');
    
    $sql_where = "WHERE ".$SqlWhere;
    $sql_reated_by_id = "";
    $sql_resource_type = "";
    $sql_program = "";
    $sql_fund_src = "";
    $sql_fund_src_col = "";
    $sql_one_time = "";
    
    if ($RatedByID !== "0") {
        switch ($RatedByID) {
            case "3":   // Craig Justice (VPI)
                $sql_reated_by_id = "resr.ApprovalID = 3";
                break;
            case "6":   // Davit Khachatryan (VPA)
                $sql_reated_by_id = "resr.ApprovalID = 6";
                break;
            case "4":   // Linda Fontanilla (VPS)
                $sql_reated_by_id = "resr.ApprovalID = 4";
                break;
            case "5":   // Glenn Roquemore (President)
                $sql_reated_by_id = "resr.ApprovalID = 5";
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
    if ($sql_reated_by_id !== "") {   
        $sql_where = $sql_where." AND ".$sql_reated_by_id;
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
                ."prio.DepartMgr, "
                ."prio.VPP, "
                ."appr.ApproverName, "
                ."(SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = '".$sql_fund_src_col."') AS Funding, "
                ."rall.Median AS ALL_Median, "
                ."rall.Mean AS ALL_Mean, "
                .$SqlSelect
                ."resr.NeedBy, "
                ."crtr.CreatorName "
                ."FROM [IVCRESOURCES].[dbo].[ResourceStage] AS rcst LEFT JOIN [IVCRESOURCES].[dbo].[StageLevel] AS stlv ON rcst.StageLevelID = stlv.StageLevelID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Resource] AS resr ON rcst.ResourceID = resr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceStatus] AS rsst ON resr.RSID = rsst.RSID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceTypeItem] AS rtim ON rtim.ResourceID = resr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceType] AS rsty ON rsty.RTID = rtim.RTID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Priority] AS prio ON resr.ResourceID = prio.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Creator] AS crtr ON crtr.CreatorID = resr.CreatorID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[Approver] AS appr ON appr.ApproverID = resr.ApprovalID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceProg] AS rspr ON resr.ResourceID = rspr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceFundSrc] AS rsfs ON rsfs.ResourceID = resr.ResourceID "
                ."LEFT JOIN [IVCRESOURCES].[dbo].[rateALL] AS rall ON rall.ResourceID = resr.ResourceID "
                .$SqlFrom
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
    fputcsv($out, array('ID', 'ProposalTitle', 'CHPLDTFFinal', 'SSAMMOFinal', 'APTCFinal', 'BDRPCFinal', 'IECFinal', 'SPACFinal',
                        'Requested', 'Recommend', 'Balance', 'General', 'ASIVC', 'BasicAid', 'BasicSkillsInitiative', 'BEAP', 'CalWORKs/TANF', 'CapitalOutlay', 'CDC', 'CollegeWorkStudy', 'CommunityEducation',
                        'DSPS', 'EOPS/CARE', 'EWD', 'Foundation', 'Grants', 'Health', 'Lottery', 'Parking', 'Perkins', 'PPIS', 'SSSP', 'StudentEquity', 'StudentMaterial', 'NeedBy', 'Creator', 'ResourceType'));
    // Write all the user records to the spreadsheet
    foreach($data as $row) {
        fputcsv($out, array($row['ResourceID'], $row['ProposalTitle'], $row['CHPLDTF_FinalRating'], $row['SSAMMO_FinalRating'], $row['APTC_FinalRating'], 
                            $row['BDRPC_FinalRating'], $row['IEC_FinalRating'], $row['SPAC_FinalRating'],
                            $row['TotalAmount'], $row['funded_total'], $row['TotalAmount'] - $row['funded_total'],
                            $row['fs_1_amt'], $row['fs_2_amt'], $row['fs_3_amt'], $row['fs_4_amt'], $row['fs_5_amt'], $row['fs_6_amt'], $row['fs_7_amt'], $row['fs_8_amt'], $row['fs_9_amt'], $row['fs_10_amt'],
                            $row['fs_11_amt'], $row['fs_12_amt'], $row['fs_13_amt'], $row['fs_14_amt'], $row['fs_15_amt'], $row['fs_16_amt'], $row['fs_17_amt'], $row['fs_18_amt'], $row['fs_19_amt'], $row['fs_20_amt'],
                            $row['fs_21_amt'], $row['fs_22_amt'], $row['fs_23_amt'],
                            $row['NeedBy'], $row['CreatorName'], $row['ResourceType']));
    }
    
    fclose($out);
    exit;