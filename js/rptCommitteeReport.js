var sql_select = "";
var sql_from = "";
var sql_where = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) { 
        getFundingSrcTypeList();   
        setTableHeader();
        getCommitteeRatingList("All", "All", "All Resource", "All Program", 0, "All Request");
        initializeTable();
        setListTotalCountAmount();
    }
    else {
        window.open('Login.html', '_self');
    }
};

function initializeTable() {
    $("#user_rf_list").tablesorter({ 
        headers: { 
            7: {sorter:'currency'}
        },
        widgets: ['stickyHeaders']
    });
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {  
    $('#nav_home').click(function() {
        window.open('home.html', '_self');
    });
    
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
    });
    
    // filter refresh //////////////////////////////////////////////////////////
    $('#adm_refresh').click(function() {
        refreshCommitteeRatingList();
        $('#user_rf_list').trigger("updateAll");
        $('#user_rf_list').trigger("appendCache");
        
        setListTotalCountAmount();
    });
    
    // table mouseover popup ///////////////////////////////////////////////////
    $('table').on('mouseover', 'a[id^="resource_title_brief_"]', function() {
        var res_id = $(this).attr('id').replace("resource_title_brief_", "");
        var title_full = $('#resource_title_full_' + res_id).html();
        
        $(this).popover({trigger:"manual", content:title_full, placement:"top"});
        $(this).popover('toggle');
    });
    
    // table mouseleave popup //////////////////////////////////////////////////
    $('table').on('mouseleave', 'a[id^="resource_title_brief_"]', function() {
        $(this).popover('hide');
    });
    
    // table row open resource form click //////////////////////////////////////
    $('table').on('click', 'a[id^="resource_title_brief_"]', function(e) {
        e.preventDefault();
        var res_id = $(this).attr('id').replace("resource_title_brief_", "");
        sessionStorage.setItem('vrf_resource_id', res_id);
        window.open('ViewResourceForm.html?resource_id=' + res_id, '_blank');
    });
    
    // selectpicker
    $('.selectpicker').selectpicker();
});

////////////////////////////////////////////////////////////////////////////////
function getFundingSrcTypeList() {
    var result = new Array();
    result = db_getFundSrcTypeAll();
    
    var tbl_html = "<option value='0'>All</option>";
    for(var i = 0; i < result.length; i++) {
        tbl_html += "<option value='" + result[i]['FundSrcTypeID'] + "'>" + result[i]['FundSrcType'] + "</option>";
    }
    
    $("#adm_fund_src").append(tbl_html);
    $("#adm_fund_src").selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function setListTotalCountAmount() {
    var rowCount = $('#user_rf_list tr').length - 1;
    $('#list_count').html(rowCount);
    var lst_total = setListTotalAmount();
    $('#list_total_amount').html(formatDollar(lst_total));
}

function setListTotalAmount() {
    var f_list_total = 0.0;
    var rowCount = $('#user_rf_list tr').length;
    for (var i = 1; i < rowCount; i++) {
        var amount = $('#user_rf_list tr').eq(i).find('td[id^="resource_amount_"]').html();
        if (amount !== "") {
            var f_amount = revertDollar(amount);
            f_list_total += f_amount;
        }
    }
    return f_list_total;
}

////////////////////////////////////////////////////////////////////////////////
function refreshCommitteeRatingList() {
    var committee = $('#adm_committee').val();
    var rated_by = $('#adm_rated_by').val();
    var resource_type = $('#adm_resource_type').val();
    var program = $('#adm_program').val();
    var funding = $('#adm_fund_src').val();
    var one_time = $('#adm_one_time').val();
    
    setTableHeader(committee);
    getCommitteeRatingList(committee, rated_by, resource_type, program, funding, one_time);
    initializeTable();
}

////////////////////////////////////////////////////////////////////////////////
function setSQLScript(sel_committee) {
    sql_select = "";
    sql_from = "";
    sql_where = "";
    
    sql_select += "rchp.Active AS CHPLDTF_Active, rchp.Median AS CHPLDTF_Median, rchp.Mean AS CHPLDTF_Mean, rchp.FinalRating AS CHPLDTF_FinalRating, ";
    sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateCHPLDTF] AS rchp ON rchp.ResourceID = resr.ResourceID ";

    sql_select += "rssa.Active AS SSAMMO_Active, rssa.Median AS SSAMMO_Median, rssa.Mean AS SSAMMO_Mean, rssa.FinalRating AS SSAMMO_FinalRating, ";
    sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS rssa ON rssa.ResourceID = resr.ResourceID ";

    sql_select += "rapt.Active AS APTC_Active, rapt.Median AS APTC_Median, rapt.Mean AS APTC_Mean, rapt.FinalRating AS APTC_FinalRating, ";
    sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateAPTC] AS rapt ON rapt.ResourceID = resr.ResourceID ";

    sql_select += "rbdr.Active AS BDRPC_Active, rbdr.Median AS BDRPC_Median, rbdr.Mean AS BDRPC_Mean, rbdr.FinalRating AS BDRPC_FinalRating, ";
    sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateBDRPC] AS rbdr ON rbdr.ResourceID = resr.ResourceID ";

    sql_select += "riec.Active AS IEC_Active, riec.Median AS IEC_Median, riec.Mean AS IEC_Mean, riec.FinalRating AS IEC_FinalRating, ";
    sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateIEC] AS riec ON riec.ResourceID = resr.ResourceID ";

    sql_select += "rspa.Active AS SPAC_Active, rspa.Median AS SPAC_Median, rspa.Mean AS SPAC_Mean, rspa.FinalRating AS SPAC_FinalRating, rspa.FinalAvg AS SPAC_FinalAvg, ";
    sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSPAC] AS rspa ON rspa.ResourceID = resr.ResourceID ";
    
    switch(sel_committee) {
        case "All":
            sql_where += "(rapt.Active = 1 OR rbdr.Active = 1 OR rchp.Active = 1 OR riec.Active = 1 OR rspa.Active = 1 OR rssa.Active = 1) AND resr.RSID <> 18 AND resr.RSID <> 20 AND resr.RSID <> 21";
            break;
        case "CHPLDTF":
            sql_where += "rchp.Active = 1 AND resr.RSID <> 18 AND resr.RSID <> 20 AND resr.RSID <> 21";
            break;
        case "SSAMMO":
            sql_where += "rssa.Active = 1 AND resr.RSID <> 18 AND resr.RSID <> 20 AND resr.RSID <> 21";
            break;
        case "APTC":
            sql_where += "rapt.Active = 1 AND resr.RSID <> 18 AND resr.RSID <> 20 AND resr.RSID <> 21";
            break;
        case "BDRPC":
            sql_where += "rbdr.Active = 1 AND resr.RSID <> 18 AND resr.RSID <> 20 AND resr.RSID <> 21";
            break;
        case "IEC":
            sql_where += "riec.Active = 1 AND resr.RSID <> 18 AND resr.RSID <> 20 AND resr.RSID <> 21";
            break;
        case "SPAC":
            sql_where += "rspa.Active = 1 AND resr.RSID <> 18 AND resr.RSID <> 20 AND resr.RSID <> 21";
            break;
        default:
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////
function setTableHeader() { 
    $('.container').css('width', '2330px');
    
    $('#head_tr').empty();
    var tbl_html = "<tr>";    
    tbl_html += "<th class='col_50' style='text-align: left;'><a href='#' style='color: white;'>ID</a></th>";
    tbl_html += "<th class='col_250' style='text-align: left;'><a href='#' style='color: white;'>Proposal Title</a></th>";
    tbl_html += "<th class='col_100' style='text-align: left;'><a href='#' style='color: white;'>Need By</a></th>";
    tbl_html += "<th class='col_150' style='text-align: left;'><a href='#' style='color: white;'>Creator</a></th>";
    tbl_html += "<th class='col_100' style='text-align: right;'><a href='#' style='color: white;'>T. Amount</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>Mgr Rating</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>VP/P Rating</a></th>";
    tbl_html += "<th class='col_150' style='text-align: left;'><a href='#' style='color: white;'>VPP Rated By</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='chpldtf_median'><a href='#' style='color: white;'>CHPLDTF Median</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='chpldtf_mean'><a href='#' style='color: white;'>CHPLDTF Mean</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='chpldtf_final'><a href='#' style='color: white;'>CHPLDTF Final</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='ssammo_median'><a href='#' style='color: white;'>SSAMMO Median</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='ssammo_mean'><a href='#' style='color: white;'>SSAMMO Mean</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='ssammo_final'><a href='#' style='color: white;'>SSAMMO Final</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='aptc_median'><a href='#' style='color: white;'>APTC Median</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='aptc_mean'><a href='#' style='color: white;'>APTC Mean</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='aptc_final'><a href='#' style='color: white;'>APTC Final</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='bdrpc_median'><a href='#' style='color: white;'>BDRPC Median</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='bdrpc_mean'><a href='#' style='color: white;'>BDRPC Mean</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='bdrpc_final'><a href='#' style='color: white;'>BDRPC Final</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='iec_median'><a href='#' style='color: white;'>IEC Median</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='iec_mean'><a href='#' style='color: white;'>IEC Mean</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='iec_final'><a href='#' style='color: white;'>IEC Final</a></th>";
//    tbl_html += "<th class='col_50' style='text-align: center;' id='spac_median'><a href='#' style='color: white;'>SPAC Median</a></th>";
//    tbl_html += "<th class='col_50' style='text-align: center;' id='spac_mean'><a href='#' style='color: white;'>SPAC Mean</a></th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='spac_final'><a href='#' style='color: white;'>SPAC Final</a></th>";
//    tbl_html += "<th class='col_50' style='text-align: center;' id='spac_fn_avg'><a href='#' style='color: white;'>SPAC FinalAvg</a></th>";
    tbl_html += "<th class='col_150' style='text-align: left;'><a href='#' style='color: white;'>Resource Type</a></th>";
    tbl_html += "<th class='col_100' style='text-align: left;'><a href='#' style='color: white;'>Committee</a></th>";
    tbl_html += "<th class='col_100' style='text-align: left;'><a href='#' style='color: white;'>Funding Src</a></th>";
    tbl_html += "</tr>";
    $("#head_tr").append(tbl_html);
}

function getCommitteeRatingList(committee, rated_by_id, resource_type, program, fund_src, one_time) {
    setSQLScript(committee);
    
    var result = new Array(); 
    result = db_getCommitteeRatingList(sql_select, sql_from, sql_where, rated_by_id, resource_type, program, fund_src, one_time);
    
    $('#body_tr').empty();
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            var str_totalAmount = formatDollar(Number(result[i]['TotalAmount']));
            setCommitteeRatingListHTML(committee, result[i]['ResourceID'], result[i]['ProposalTitle'], result[i]['NeedBy'], result[i]['CreatorName'],
                                        result[i]['ResourceType'], result[i]['Funding'], str_totalAmount, result[i]['ApproverName']);
            
            setMgrValue(result[i]['ResourceID'], result[i]['DepartMgr']);
            setVPPValue(result[i]['ResourceID'], result[i]['VPP']);
//            setAllValue(result[i]['ResourceID'], result[i]['ALL_Median'], result[i]['ALL_Mean']);
            setCommitteeValue(result[i]['ResourceID'], i, result);
        }
    }
}

function setCommitteeRatingListHTML(committee, resource_id, proposal_title, need_by, creator, resource_type, fund_src, total_amount, approver_name) {
    var brief_ptitle = textTruncate(25, proposal_title);
    
    var tbl_html = "<tr>";
    tbl_html += "<td class='col_50'>" + resource_id + "</td>";
    tbl_html += "<td class='col_250'><a href=# id='resource_title_brief_" + resource_id +  "'>" + brief_ptitle + "</a></td>";
    tbl_html += "<td class='col_100'>" + need_by + "</td>";
    tbl_html += "<td class='col_150'>" + creator + "</td>";
    tbl_html += "<td class='col_100' style='text-align: right;' id='resource_amount_" + resource_id + "'>" + total_amount + "</td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='mgr_rating_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='vpp_rating_" + resource_id + "'></td>";
    tbl_html += "<td class='col_150'>" + approver_name + "</td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='chp_median_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='chp_mean_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='chp_final_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='ssa_median_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='ssa_mean_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='ssa_final_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='apt_median_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='apt_mean_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='apt_final_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='bdr_median_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='bdr_mean_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='bdr_final_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='iec_median_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='iec_mean_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='iec_final_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='spa_median_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='spa_mean_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='spa_final_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='spa_fn_avg_" + resource_id + "'></td>";
    tbl_html += "<td class='col_150'>" + resource_type + "</td>";
    tbl_html += "<td class='col_100'>" + committee + "</td>";
    if (fund_src === null) {
        tbl_html += "<td class='col_100'>All</td>";
    }
    else {
        tbl_html += "<td class='col_100'>" + fund_src + "</td>";
    }
    tbl_html += "<td class='span1' style='display: none;' id='resource_title_full_" + resource_id + "'>" + proposal_title + "</td>";
    tbl_html += "</tr>";
    $("#body_tr").append(tbl_html);
}

function setMgrValue(resource_id, mgr) {
    if (mgr !== "-1") {
        $('#mgr_rating_' + resource_id).html(mgr);
    }
}

function setVPPValue(resource_id, vpp) {
    if (vpp !== "-1") {
        $('#vpp_rating_' + resource_id).html(vpp);
    }
}

function setAllValue(resource_id, median, mean) {
    if (median !== null) {
        $('#all_median_' + resource_id).html(median);
    }
    if (mean !== null) {
        $('#all_mean_' + resource_id).html(mean);
    }
}

function setCommitteeValue(resource_id, i, result) {
    var chp_active = result[i]['CHPLDTF_Active'];
    var chp_median = result[i]['CHPLDTF_Median'];
    var chp_mean = result[i]['CHPLDTF_Mean'];
    var chp_final = result[i]['CHPLDTF_FinalRating'];
    if (chp_active === "1") {
        if (chp_median !== null) {
            $('#chp_median_' + resource_id).html(chp_median);
        }
        if (chp_mean !== null) {
            $('#chp_mean_' + resource_id).html(chp_mean);
        }
        if (chp_final !== null) {
            $('#chp_final_' + resource_id).html(chp_final);
        }
    }
    
    var ssa_active = result[i]['SSAMMO_Active'];
    var ssa_median = result[i]['SSAMMO_Median'];
    var ssa_mean = result[i]['SSAMMO_Mean'];
    var ssa_final = result[i]['SSAMMO_FinalRating'];
    if (ssa_active === "1") {
        if (ssa_median !== null) {
            $('#ssa_median_' + resource_id).html(ssa_median);
        }
        if (ssa_mean !== null) {
            $('#ssa_mean_' + resource_id).html(ssa_mean);
        }
        if (ssa_final !== null) {
            $('#ssa_final_' + resource_id).html(ssa_final);
        }
    }
    
    var apt_active = result[i]['APTC_Active'];
    var apt_median = result[i]['APTC_Median'];
    var apt_mean = result[i]['APTC_Mean'];
    var apt_final = result[i]['APTC_FinalRating'];
    if (apt_active === "1") {
        if (apt_median !== null) {
            $('#apt_median_' + resource_id).html(apt_median);
        }
        if (apt_mean !== null) {
            $('#apt_mean_' + resource_id).html(apt_mean);
        }
        if (apt_final !== null) {
            $('#apt_final_' + resource_id).html(apt_final);
        }
    }
    
    var bdr_active = result[i]['BDRPC_Active'];
    var bdr_median = result[i]['BDRPC_Median'];
    var bdr_mean = result[i]['BDRPC_Mean'];
    var bdr_final = result[i]['BDRPC_FinalRating'];
    if (bdr_active === "1") {
        if (bdr_median !== null) {
            $('#bdr_median_' + resource_id).html(bdr_median);
        }
        if (bdr_mean !== null) {
            $('#bdr_mean_' + resource_id).html(bdr_mean);
        }
        if (bdr_final !== null) {
            $('#bdr_final_' + resource_id).html(bdr_final);
        }
    }
    
    var iec_active = result[i]['IEC_Active'];
    var iec_median = result[i]['IEC_Median'];
    var iec_mean = result[i]['IEC_Mean'];
    var iec_final = result[i]['IEC_FinalRating'];
    if (iec_active === "1") {
        if (iec_median !== null) {
            $('#iec_median_' + resource_id).html(iec_median);
        }
        if (iec_mean !== null) {
            $('#iec_mean_' + resource_id).html(iec_mean);
        }
        if (iec_final !== null) {
            $('#iec_final_' + resource_id).html(iec_final);
        }
    }
    
    var spa_active = result[i]['SPAC_Active'];
//    var spa_median = result[i]['SPAC_Median'];
//    var spa_mean = result[i]['SPAC_Mean'];
    var spa_final = result[i]['SPAC_FinalRating'];
//    var spa_fn_avg = result[i]['SPAC_FinalAvg'];
    if (spa_active === "1") {
//        if (spa_median !== null) {
//            $('#spa_median_' + resource_id).html(spa_median);
//        }
//        if (spa_mean !== null) {
//            $('#spa_mean_' + resource_id).html(spa_mean);
//        }
        if (spa_final !== null) {
            $('#spa_final_' + resource_id).html(spa_final);
        }
//        if (spa_fn_avg !== null) {
//            $('#spa_fn_avg_' + resource_id).html(spa_fn_avg);
//        }
    }
}