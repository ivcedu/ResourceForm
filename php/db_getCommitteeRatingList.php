<?php
    require("config.php");
    
    $SqlSelect = filter_input(INPUT_POST, 'SqlSelect');
    $SqlFrom = filter_input(INPUT_POST, 'SqlFrom');
    $SqlWhere = filter_input(INPUT_POST, 'SqlWhere');
    
    $RatedByID = filter_input(INPUT_POST, 'RatedByID');
    $ResourceType = filter_input(INPUT_POST, 'ResourceType');
    $Program = filter_input(INPUT_POST, 'Program');
    $FundingSrc = filter_input(INPUT_POST, 'FundingSrc');
    $FundOption = filter_input(INPUT_POST, 'FundOption');
    $OneTime = filter_input(INPUT_POST, 'OneTime');
    
    $sql_where = "WHERE ".$SqlWhere;
    $sql_reated_by_id = "";
    $sql_resource_type = "";
    $sql_program = "";
    $sql_fund_src = "";
    $sql_fund_src_col = "";
    $str_funding_option = "";
    $sql_one_time = "";
    
    if ($RatedByID !== "0") {
        switch ($RatedByID) {
            case "65":   // Christopher McDonald (VPI)
                $sql_reated_by_id = "resr.ApprovalID = 65";
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
            break;
        case "1":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 1 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_1";
            break;
        case "2":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 1 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_2";
            break;
        case "3":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 1 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_3";
            break;
        case "4":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 1 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_4";
            break;
        case "5":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 1 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_5";
            break;
        case "6":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 1 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_6";
            break;
        case "7":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 1 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_7";
            break;
        case "8":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 1 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_8";
            break;
        case "9":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 1 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_9";
            break;
        case "10":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 1 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_10";
            break;
        case "11":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 1 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_11";
            break;
        case "12":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 1 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_12";
            break;
        case "13":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 1 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_13";
            break;
        case "14":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 1 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_14";
            break;
        case "15":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 1 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_15";
            break;
        case "16":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 1 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_16";
            break;
        case "17":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 1 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_17";
            break;
        case "18":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 1 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_18";
            break;
        case "19":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 1 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_19";
            break;
        case "20":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 1 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_20";
            break;
        case "21":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 1 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_21";
            break;
        case "22":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 1 AND rsfs.fs_23 = 0";
            }
            $sql_fund_src_col = "fs_22";
            break;
        case "23":
            if ($FundOption === "fund_only") {
                $str_funding_option = "rsfs.fs_1 = 0 AND rsfs.fs_2 = 0 AND rsfs.fs_3 = 0 AND rsfs.fs_4 = 0 AND rsfs.fs_5 = 0 AND rsfs.fs_6 = 0 AND rsfs.fs_7 = 0 AND rsfs.fs_8 = 0 AND rsfs.fs_9 = 0 AND rsfs.fs_10 = 0 "
                        . "AND rsfs.fs_11 = 0 AND rsfs.fs_12 = 0 AND rsfs.fs_13 = 0 AND rsfs.fs_14 = 0 AND rsfs.fs_15 = 0 AND rsfs.fs_16 = 0 AND rsfs.fs_17 = 0 AND rsfs.fs_18 = 0 AND rsfs.fs_19 = 0 AND rsfs.fs_20 = 0 "
                        . "AND rsfs.fs_21 = 0 AND rsfs.fs_22 = 0 AND rsfs.fs_23 = 1";
            }
            $sql_fund_src_col = "fs_23";
            break;
        default:
            break;
    }
    
    if ($FundingSrc !== "0") {
        if ($FundOption === "fund_only") {
            $sql_fund_src = $str_funding_option;
        }
        else {
            $sql_fund_src = "rsfs.".$sql_fund_src_col." = '1'";
        }
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
                . "resr.FiscalYear, "
                . "resr.ProposalTitle, "
                . "CASE WHEN rsty.RTID = 1 OR rsty.RTID = 2 OR rsty.RTID = 3 "
                . "THEN (SELECT TOP(1) AnnualTotal FROM [IVCRESOURCES].[dbo].[Personnel] WHERE ResourceID = resr.ResourceID ORDER BY PersonnelID DESC) "
                . "WHEN rsty.RTID = 9 "
                . "THEN (SELECT TOP(1) Total FROM [IVCRESOURCES].[dbo].[Instructional] WHERE ResourceID = resr.ResourceID ORDER BY InstructionalID DESC) "
                . "WHEN rsty.RTID = 4 "
                . "THEN (SELECT TOP(1) CASE WHEN ProjAmt = 0.0 THEN EstAmt ELSE ProjAmt END FROM [IVCRESOURCES].[dbo].[Facilities] WHERE ResourceID = resr.ResourceID ORDER BY FacilitiesID DESC) "
                . "WHEN rsty.RTID = 5 "
                . "THEN (SELECT TOP(1) GrandTotal FROM [IVCRESOURCES].[dbo].[Technology] WHERE ResourceID = resr.ResourceID ORDER BY TechnologyID DESC) "
                . "WHEN rsty.RTID = 7 "
                . "THEN (SELECT TOP(1) TotalAmount FROM [IVCRESOURCES].[dbo].[Other2] WHERE ResourceID = resr.ResourceID ORDER BY Other2ID DESC) "
                . "ELSE 0.0 END TotalAmount, "
                . "rsty.ResourceType, "
                . "prio.DepartMgr, "
                . "prio.VPP, "
                . "appr.ApproverName, "
                . "(SELECT FundSrcType FROM [IVCRESOURCES].[dbo].[FundSrcType] WHERE FundSrcCol = '".$sql_fund_src_col."') AS Funding, "
                . "rall.Median AS ALL_Median, "
                . "rall.Mean AS ALL_Mean, "
                . $SqlSelect
                . "resr.NeedBy, "
                . "crtr.CreatorName "
                . "FROM [IVCRESOURCES].[dbo].[ResourceStage] AS rcst LEFT JOIN [IVCRESOURCES].[dbo].[StageLevel] AS stlv ON rcst.StageLevelID = stlv.StageLevelID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[Resource] AS resr ON rcst.ResourceID = resr.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[ResourceStatus] AS rsst ON resr.RSID = rsst.RSID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[ResourceTypeItem] AS rtim ON rtim.ResourceID = resr.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[ResourceType] AS rsty ON rsty.RTID = rtim.RTID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[Priority] AS prio ON resr.ResourceID = prio.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[Creator] AS crtr ON crtr.CreatorID = resr.CreatorID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[Approver] AS appr ON appr.ApproverID = resr.ApprovalID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[ResourceProg] AS rspr ON resr.ResourceID = rspr.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[ResourceFundSrc] AS rsfs ON rsfs.ResourceID = resr.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[rateALL] AS rall ON rall.ResourceID = resr.ResourceID "
                . "LEFT JOIN [IVCRESOURCES].[dbo].[ResourceRP] AS rsrp ON rsrp.ResourceID = resr.ResourceID "
                . $SqlFrom
                . $sql_where;

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    echo json_encode($data);