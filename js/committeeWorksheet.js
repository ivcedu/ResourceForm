var admin = false;
var login_name = "";
var login_email = "";

var fiscal_year = "";
var resource_id = "";

var ar_fund_src = [];
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        fiscal_year = "2015-2016"; //getFiscalYear();
        setFundingSrcList();
        setHideAllModal();
        setAdminOption();
        setAdminCommitteeRating();
        getCommitteeWorksheetList();
        initializeTable();
    }
    else {
        window.open('Login.html', '_self');
    }
};

function initializeTable() {
    $("#rf_list").tablesorter({ 
        headers: { 
            3: {sorter:'currency'}
        },
        widgets: ['stickyHeaders']
    });
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {  
    $('#nav_home').click(function() {
        window.open('home.html', '_self');
    });
    
    $('#nav_committee_rating').click(function() {
        window.open('committeeRating.html', '_self');
    });
    
    $('#nav_fun_src_setting').click(function() {
        window.open('fundSrcTypeSetting.html', '_self');
    });
    
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
    });
    
    // committee rating click event ////////////////////////////////////////////    
    $('#nav_rate_chpldtf').click(function() {
        var result = new Array(); 
        result = db_getmbrCHPLDTF(login_email, false);
        
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu") {
            window.open('rateCHPLDTF.html', '_self');
        }
        else {
            if (result.length === 0) {
                alert("You are not a member of CHPLDTF committee");
                $('#admin_committee_rating').dropdown('toggle');
                return false;
            }
            else {
                window.open('rateCHPLDTF.html', '_self');
            }
        }
    });
    
    $('#nav_rate_ssammo').click(function() {
        var result = new Array(); 
        result = db_getmbrSSAMMO(login_email, false);
        
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu") {
            window.open('rateSSAMMO.html', '_self');
        }
        else {
            if (result.length === 0) {
                alert("You are not a member of SSAMMO committee");
                $('#admin_committee_rating').dropdown('toggle');
                return false;
            }
            else {
                window.open('rateSSAMMO.html', '_self');
            }
        }
    });
    
    $('#nav_rate_aptc').click(function() {
        var result = new Array(); 
        result = db_getmbrAPTC(login_email, false);
        
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu") {
            window.open('rateAPTC.html', '_self');
        }
        else {
            if (result.length === 0) {
                alert("You are not a member of APTC committee");
                $('#admin_committee_rating').dropdown('toggle');
                return false;
            }
            else {
                window.open('rateAPTC.html', '_self');
            }
        }
    });
    
    $('#nav_rate_bdrpc').click(function() {
        var result = new Array(); 
        result = db_getmbrBDRPC(login_email, false);
        
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu") {
            window.open('rateBDRPC.html', '_self');
        }
        else {
            if (result.length === 0) {
                alert("You are not a member of BDRPC committee");
                $('#admin_committee_rating').dropdown('toggle');
                return false;
            }
            else {
                window.open('rateBDRPC.html', '_self');
            }
        }
    });
     
    $('#nav_rate_iec').click(function() {
        var result = new Array(); 
        result = db_getmbrIEC(login_email, false);
        
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu") {
            window.open('rateIEC.html', '_self');
        }
        else {
            if (result.length === 0) {
                alert("You are not a member of IEC committee");
                $('#admin_committee_rating').dropdown('toggle');
                return false;
            }
            else {
                window.open('rateIEC.html', '_self');
            }
        }
    });
    
    $('#nav_rate_spac').click(function() {
        var result = new Array(); 
        result = db_getmbrSPAC(login_email, false);
        
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu") {
            window.open('rateSPAC.html', '_self');
        }
        else {
            if (result.length === 0) {
                alert("You are not a member of SPAC committee");
                $('#admin_committee_rating').dropdown('toggle');
                return false;
            }
            else {
                window.open('rateSPAC.html', '_self');
            }
        }
    });
    
//////////////////////////////////////////////////////////////////////////////// 
    // table mouseover event ///////////////////////////////////////////////////
    $('table').on('mouseover', 'a[id^="resource_title_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("resource_title_", "");
        var title_full = $('#resource_title_full_' + ID).html();
        
        $(this).popover({trigger:"manual", content:title_full, placement:"top"});
        $(this).popover('toggle');
    });
    
    // table mouseleave event //////////////////////////////////////////////////
    $('table').on('mouseleave', 'a[id^="resource_title_"]', function() {
        $(this).popover('hide');
    });
    
    // table row open resource form click //////////////////////////////////////
    $('table').on('click', 'a[id^="resource_title_"]', function(e) {
        e.preventDefault();
        var currentId = $(this).attr('id');
        var ID = currentId.replace("resource_title_", "");
        sessionStorage.setItem('vrf_resource_id', ID);
        window.open('ViewResourceForm.html?resource_id=' + ID, '_blank');
    });
    
////////////////////////////////////////////////////////////////////////////////   
    // admin option button click ///////////////////////////////////////////////
    $('table').on('click', '[id^="resource_id_"]', function(e) {
        e.preventDefault();
        resource_id = $(this).attr('id').replace("resource_id_", "");
        var title = $('#resource_title_full_' + resource_id).html();
        $('#mod_add_header_title').html(title);
        
        clearModalAdminSetting();
        
        getSelectedCommitteeSetting();
        getFundSrcList();
        
        $('#mod_admin_option').modal('show');
    });
    
    // admin body committee seting button click ////////////////////////////////
    $('#mod_body_btn_committee_setting').click(function() {
        var icon = $('#mod_body_icon_committee_setting').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_body_icon_committee_setting').attr('class', 'icon-chevron-down icon-black');
            $('#mod_body_section_committee_setting').show();
        }
        else {
            $('#mod_body_icon_committee_setting').attr('class', 'icon-chevron-right icon-black');
            $('#mod_body_section_committee_setting').hide();
        }
    });
    
    // admin body status seting button click ///////////////////////////////////
    $('#mod_body_btn_status').click(function() {
        var icon = $('#mod_body_icon_status').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_body_icon_status').attr('class', 'icon-chevron-down icon-black');
            $('#mod_body_section_status').show();
        }
        else {
            $('#mod_body_icon_status').attr('class', 'icon-chevron-right icon-black');
            $('#mod_body_section_status').hide();
        }
    });
    
    // admin body fund amt seting button click /////////////////////////////////
    $('#mod_body_btn_fund_src').click(function() {
        var icon = $('#mod_body_icon_fund_src').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_body_icon_fund_src').attr('class', 'icon-chevron-down icon-black');
            $('#mod_body_section_fund_src').show();
        }
        else {
            $('#mod_body_icon_fund_src').attr('class', 'icon-chevron-right icon-black');
            $('#mod_body_section_fund_src').hide();
        }
    });
    
////////////////////////////////////////////////////////////////////////////////
    // modal funded amount change event ////////////////////////////////////////
    $(document).on('change', 'input[id^="mod_body_funded_amt_"]', function() {
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var amount = Number($(this).val());
         
        if (amount > 0) {
            $(this).val(formatDollar(amount));
        }
        else {
            $(this).val(formatDollar(0.00));
        }
    });

    // admin body committee update button click ////////////////////////////////
    $('#mod_body_btn_committee_setting_update').click(function() {
        if (updateSelectedCommitteeSetting()) {
            alert("Committee setting has been updated successfully");
            getCommitteeWorksheetList();
        }
        else {
            alert("Please contact Rich Kim at 5596 or ykim160@ivc.edu");
        }
    });
    
    // admin body status update button click ///////////////////////////////////
    $('#mod_body_btn_update_status').click(function() {
        var new_status = $('#mod_body_new_status').val();
        if (new_status === "Select...") {
            alert("Please select new status");
            return false;
        }
        else {
            var err = statuChangeValidation();
            if (err !== "") {
                alert(err);
                return false;
            }
            updateResourceStatus(new_status);
            alert("Status has been updated successfully");
        }
        
        getCommitteeWorksheetList();
        $('#rf_list').trigger("updateAll");
        $('#rf_list').trigger("appendCache");
        $('#mod_admin_option').modal('hide');
    });
    
    // admin body funding source add button click //////////////////////////////
    $(document).on('click', '[id="mod_body_btn_new_fund_src"]', function() {
        var fund_src_column = $('#mod_body_new_fund_src').val();
        var fund_src_name = $("#mod_body_new_fund_src option:selected").text();
        if (fund_src_column === "Select...") {
            alert("Please select funding src to add");
        }
        else {
            db_updateResourceFundSrcColumn(resource_id, fund_src_column, true);
            var note = login_name + " added funding source: " + fund_src_name;
            db_insertTransactions(resource_id, login_name, note);
            getFundSrcList();
        }
    });
    
    // admin body funding source delete button click ///////////////////////////
    $(document).on('click', '[id^="mod_body_btn_delete_column_"]', function() {
        var result = new Array();
        result = db_getResourceFundAmt(resource_id);
        if (result.length === 0) {
            db_insertResourceFundAmt(resource_id);
        }
        
        var fund_src_column = $(this).attr('id').replace("mod_body_btn_delete_column_", "");
        var fund_src_name = $('#mod_body_delete_fund_src_name_' + fund_src_column).html();
        var fund_amt = revertDollar($('#mod_body_funded_amt_' + fund_src_column).val());
        db_updateResourceFundSrcColumn(resource_id, fund_src_column, false);
        deleteResourceFundAmt(fund_src_column, fund_amt);
        
        var note = login_name + " removed funding source: " + fund_src_name;
        db_insertTransactions(resource_id, login_name, note);
        getFundSrcList();
    });
    
    // admin body funding source setting update button click ///////////////////
    $('#mod_body_btn_update_fund_src').click(function() {
        var result = new Array();
        result = db_getResourceFundAmt(resource_id);
        
        var funded_amt = 0.0;
        if (result.length === 0) {
            db_insertResourceFundAmt(resource_id);
            funded_amt = updateResourceFundAmt();
        }
        else {
            funded_amt = updateResourceFundAmt();
        }
        
        var note = login_name + " updated funding source(s) funded amount: " + formatDollar(funded_amt);
        db_insertTransactions(resource_id, login_name, note);
        alert("All funding source(s) funded amount has been updated successfully");
    });
    
    $('#mod_admin_option_x').click(function() {
        clearModalAdminSetting();
    });
    
    $('#mod_admin_btn_close').click(function() {
        clearModalAdminSetting();
    });
    
//////////////////////////////////////////////////////////////////////////////// 
    // committee rating date click event ///////////////////////////////////////
    $('#nav_committee_setting').click(function() {
        getCommitteeSettingList();
        $('#mod_comm_rate_date').modal('show');
    }); 
    
    $('table').on('click', '[id^="mod_table_update_"]', function(e) {
        var ec_rating_id = $(this).attr('id').replace("mod_table_update_", "");
        var start_date = $('#mod_table_startdate_id_' + ec_rating_id).val();
        var end_date = $('#mod_table_enddate_id_' + ec_rating_id).val();
        
        if (db_updateEnableCommitteeRating(ec_rating_id, start_date, end_date)) {
            getCommitteeSettingList();
            alert("Start and End date updated successfully");
        }
        else {
            alert("Please contact Rich Kim at 949.451.5595 or ykim160@ivc.edu");
        }
    });
    
////////////////////////////////////////////////////////////////////////////////
    // selectpicker
    $('.selectpicker').selectpicker();
    
    // auto size
    $('#mod_body_status_comments').autosize();
});

function statuChangeValidation() {
    var err = "";
    if ($('#mod_body_status_comments').val().replace(/\s+/g, '') === "") {
        err = "Comments is a required\n";
    }
    return err;
}

////////////////////////////////////////////////////////////////////////////////
function setFundingSrcList() {
    var result = new Array();
    result = db_getFundSrcTypeAll();
    
    var tbl_html = "<option value='Select...' 'selected'>Select...</option>";
    for(var i = 0; i < result.length; i++) {
        tbl_html += "<option value='" + result[i]['FundSrcCol'] + "'>" + result[i]['FundSrcType'] + "</option>";
    }
    
    $("#mod_body_new_fund_src").append(tbl_html);
    $("#mod_body_new_fund_src").selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function setHideAllModal() {
    // hide nav option
    $('#nav_committee_setting').hide();
    $('#admin_committee_rating').hide();
    
    $('#mod_admin_option').modal('hide');
//    $('#mod_body_section_committee_setting').hide();
    $('#mod_body_section_status').hide();
    $('#mod_body_section_fund_src').hide();
    
    $('#mod_comm_rate_date').modal('hide');
}

////////////////////////////////////////////////////////////////////////////////
function setAdminOption() {
    login_name = sessionStorage.getItem('m1_loginName');
    login_email = sessionStorage.getItem('m1_loginEmail');
    
    if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "dkhachatryan@ivc.edu") {
        admin = true;
        $('.container').css('width', '1200px');
        
        $('#nav_committee_setting').show();
        $('#header_edit_raw').show();
    }
    else {
        $('#header_edit_raw').hide();
    }
}

function setAdminCommitteeRating() {
    if (login_email === "ykim160@ivc.edu") { // || login_email === "bhagan@ivc.edu" || login_email === "dkhachatryan@ivc.edu") {
        $('#admin_committee_rating').show();
    }
}

////////////////////////////////////////////////////////////////////////////////
function updateResourceStatus(status) {
    var note = "";
    var comments = $('#mod_body_status_comments').val();
    
    switch (status) {
        case "Back to Draft":
            db_updateRFStatus(resource_id, 1, 0);
            
            db_deleteResourceStage(resource_id);
            db_deletePriority(resource_id);

            // delete mgr level rating
            db_deleterateMgr(resource_id);
            db_deleterateVPP(resource_id);
//            db_deleterateUser(resource_id);

            // delete committee rating
            db_deleterateAll(resource_id);
            db_deleterateAPTC(resource_id);
            db_deleterateBDRPC(resource_id);
            db_deleterateCHPLDTF(resource_id);
            db_deleterateIEC(resource_id);
            db_deleterateSPAC(resource_id);
            db_deleterateSSAMMO(resource_id);
            
            deleteAllResourceFundAmt();

            db_insertBacktodraft(resource_id, 1);
            db_updateResourcePage(resource_id, "Page1");
            
            emailBackToDraft(resource_id, login_email, status, comments);
            note = login_email + " send back to Draft stage\n";
            break;
        case "Closed":
            var RSID = db_getResourceStatusID(status);
            var stage_level_Id = db_getStageLevelID(status);
            
            db_updateRFStatus2(resource_id, RSID);
            db_updateResourceStage2(resource_id, stage_level_Id, RSID);
            
            // update committee rating to complete
            db_updaterateAllComplete(resource_id, true);
            db_updaterateAPTCComplete(resource_id, true);
            db_updaterateBDRPCComplete(resource_id, true);
            db_updaterateCHPLDTFComplete(resource_id, true);
            db_updaterateIECComplete(resource_id, true);
            db_updaterateSPACComplete(resource_id, true);
            db_updaterateSSAMMOComplete(resource_id, true);
            
            emailToCreatorCompleted(resource_id, status, comments);
            note = login_name + " change status to Closed\n";
            break;
        case "Partially Funded":
        case "Fully Funded":
            var RSID = db_getResourceStatusID(status);
            var stage_level_Id = db_getStageLevelID(status);

            db_updateRFStatus2(resource_id, RSID);
            db_updateResourceStage2(resource_id, stage_level_Id, RSID);
            
            // update committee rating to complete
            db_updaterateAllComplete(resource_id, true);
            db_updaterateAPTCComplete(resource_id, true);
            db_updaterateBDRPCComplete(resource_id, true);
            db_updaterateCHPLDTFComplete(resource_id, true);
            db_updaterateIECComplete(resource_id, true);
            db_updaterateSPACComplete(resource_id, true);
            db_updaterateSSAMMOComplete(resource_id, true);
            
            emailToCreatorCompleted(resource_id, status, comments);
            note = login_name + " change status to " + status + "\n";
            break;
        default:
            break;
    }
    
    db_insertTransactions(resource_id, login_name, note);
}

////////////////////////////////////////////////////////////////////////////////
function getCommitteeWorksheetList() {
    var result = new Array(); 
    result = db_getCommitteeWorksheetList();
    
    $('#body_tr').empty();
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            var str_totalAmount = formatDollar(Number(result[i]['TotalAmount']));
            var committee = setCommitteeValue(result[i]['APTC_Active'], result[i]['BDRPC_Active'], result[i]['CHPLDTF_Active'], result[i]['IEC_Active'], result[i]['SPAC_Active'], result[i]['SSAMMO_Active']);
            setCommitteeWorksheetHTML(result[i]['ResourceID'], result[i]['ProposalTitle'], str_totalAmount, result[i]['ResourceType'], result[i]['CreatorName'], committee);
            
            setAllValue(result[i]['ResourceID'], result[i]['ALL_Median'], result[i]['ALL_Mean']);
//            setMgrValue(result[i]['ResourceID'], result[i]['DepartMgr']);
//            setVPPValue(result[i]['ResourceID'], result[i]['VPP']);
//            setCHPLDTFValue(result[i]['ResourceID'], result[i]['CHPLDTF_Median'], result[i]['CHPLDTF_Mean']);
//            setSSAMMOValue(result[i]['ResourceID'], result[i]['SSAMMO_Median'], result[i]['SSAMMO_Mean']);
//            setAPTCValue(result[i]['ResourceID'], result[i]['APTC_Median'], result[i]['APTC_Mean']);
//            setBDRPCValue(result[i]['ResourceID'], result[i]['BDRPC_Median'], result[i]['BDRPC_Mean']);
//            setSPACValue(result[i]['ResourceID'], result[i]['SPAC_Median'], result[i]['SPAC_Mean']);
//            setIECValue(result[i]['ResourceID'], result[i]['IEC_Median'], result[i]['IEC_Mean']);
        }
    }
}

function setCommitteeWorksheetHTML(resource_id, title, amount, type, creator, committee) {
    var brief_title = textTruncate(25, title);
    
    var tbl_html = "<tr class='row_tr' id='res_tr_" + resource_id + "'>";
    tbl_html += "<td class='col_50'>" + resource_id + "</td>";
    if (admin) {
        tbl_html += "<td class='form-horizontal'><button class='btn btn-mini col_30' id='resource_id_" + resource_id + "'><i class='icon-pencil icon-black'></i></button></td>";
    }
    tbl_html += "<td class='col_200'><a href=# id='resource_title_" + resource_id +  "'>" + brief_title + "</a></td>";
    tbl_html += "<td class='col_100' style='text-align: right;' id='resource_amount_" + resource_id + "'>" + amount + "</td>";
    tbl_html += "<td class='col_150' id='resource_type_" + resource_id + "'>" + type + "</td>";
    tbl_html += "<td class='col_150' id='resource_creator_" + resource_id + "'>" + creator + "</td>";
    tbl_html += "<td class='col_100' id='resource_stage_" + resource_id + "'>" + committee + "</td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='all_median_" + resource_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='all_mean_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='mgr_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='vpp_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='chpldtf_median_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='chpldtf_mean_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='ssammo_median_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='ssammo_mean_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='aptc_median_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='aptc_mean_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='bdrpc_median_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='bdrpc_mean_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='iec_median_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='iec_mean_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='spac_median_" + resource_id + "'></td>";
//    tbl_html += "<td class='col_50' style='text-align: center;' id='spac_mean_" + resource_id + "'></td>";
    
    // hide html
    tbl_html += "<td class='span1' style='display: none;' id='resource_title_full_" + resource_id + "'>" + title + "</td>";
    tbl_html += "</tr>";
    
    $("#body_tr").append(tbl_html);
}

function setCommitteeValue(aptc_active, bdrpc_active, chpldtf_active, iec_active, spac_active, ssammo_active) {
    var count = 0;
    if (aptc_active === "1") {
        count++;
    }
    if (bdrpc_active === "1") {
        count++;
    }
    if (chpldtf_active === "1") {
        count++;
    }
    if (iec_active === "1") {
        count++;
    }
    if (spac_active === "1") {
        count++;
    }
    if (ssammo_active === "1") {
        count++;
    }
    
    if (count > 1) {
        return "Multiple";
    }
    else {
        if (aptc_active === "1") {
            return "APTC";
        }
        if (bdrpc_active === "1") {
            return "BDRPC";
        }
        if (chpldtf_active === "1") {
            return "CHPLDTF";
        }
        if (iec_active === "1") {
            return "IEC";
        }
        if (spac_active === "1") {
            return "SPAC";
        }
        if (ssammo_active === "1") {
            return "SSAMMO";
        }
    }
}

function setMgrValue(resource_id, mgr) {
    if (mgr !== "-1") {
        $('#mgr_' + resource_id).html(mgr);
    }
}

function setVPPValue(resource_id, vpp) {
    if (vpp !== "-1") {
        $('#vpp_' + resource_id).html(vpp);
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

function setCHPLDTFValue(resource_id, median, mean) {
    if (median !== null) {
        $('#chpldtf_median_' + resource_id).html(median);
    }
    if (mean !== null) {
        $('#chpldtf_mean_' + resource_id).html(mean);
    }
}

function setSSAMMOValue(resource_id, median, mean) {
    if (median !== null) {
        $('#ssammo_median_' + resource_id).html(median);
    }
    if (mean !== null) {
        $('#ssammo_mean_' + resource_id).html(mean);
    }
}

function setAPTCValue(resource_id, median, mean) {
    if (median !== null) {
        $('#aptc_median_' + resource_id).html(median);
    }
    if (mean !== null) {
        $('#aptc_mean_' + resource_id).html(mean);
    }
}

function setBDRPCValue(resource_id, median, mean) {
    if (median !== null) {
        $('#bdrpc_median_' + resource_id).html(median);
    }
    if (mean !== null) {
        $('#bdrpc_mean_' + resource_id).html(mean);
    }
}

function setSPACValue(resource_id, median, mean) {
    if (median !== null) {
        $('#spac_median_' + resource_id).html(median);
    }
    if (mean !== null) {
        $('#spac_mean_' + resource_id).html(mean);
    }
}

function setIECValue(resource_id, median, mean) {
    if (median !== null) {
        $('#iec_median_' + resource_id).html(median);
    }
    if (mean !== null) {
        $('#iec_mean_' + resource_id).html(mean);
    }
}

////////////////////////////////////////////////////////////////////////////////
function clearModalAdminSetting() {
    // clear committee setting
    $("#rsid_12").prop('checked', false);
    $("#rsid_19").prop('checked', false);
    $("#rsid_14").prop('checked', false);
    $("#rsid_15").prop('checked', false);
    $("#rsid_17").prop('checked', false);
    $("#rsid_16").prop('checked', false);
    
    // clear status setting
    $('#mod_body_new_status').val("Select...");
    $("#mod_body_new_status").selectpicker('refresh');
    
    $('#mod_body_status_comments').val("");
    
    $('#mod_body_new_fund_src').val("Select...");
    $("#mod_body_new_fund_src").selectpicker('refresh');
    
    // hide section body
    $('#mod_body_section_status').hide();
    $('#mod_body_icon_status').attr('class', 'icon-chevron-right icon-black');
    $('#mod_body_section_fund_src').hide();
    $('#mod_body_icon_fund_src').attr('class', 'icon-chevron-right icon-black');
}

////////////////////////////////////////////////////////////////////////////////
function getSelectedCommitteeSetting() {
    var chpldtf_active = db_getrateCHPLDTFActive(resource_id);
    if (chpldtf_active === "1") {
        $("#rsid_12").prop('checked', true);
    }
    
    var ssammo_active = db_getrateSSAMMOActive(resource_id);
    if (ssammo_active === "1") {
        $("#rsid_19").prop('checked', true);
    }
    
    var aptc_active = db_getrateAPTCActive(resource_id);
    if (aptc_active === "1") {
        $("#rsid_14").prop('checked', true);
    }
    
    var bdrpc_active = db_getrateBDRPCActive(resource_id);
    if (bdrpc_active === "1") {
        $("#rsid_15").prop('checked', true);
    }
    
    var iec_active = db_getrateIECActive(resource_id);
    if (iec_active === "1") {
        $("#rsid_17").prop('checked', true);
    }
    
    var spac_active = db_getrateSPACActive(resource_id);
    if (spac_active === "1") {
        $("#rsid_16").prop('checked', true);
    }
}

function updateSelectedCommitteeSetting() {
    var chpldtf_active = ($('#rsid_12').is(':checked') ? true : false);
    var ssammo_active = ($('#rsid_19').is(':checked') ? true : false);
    var aptc_active = ($('#rsid_14').is(':checked') ? true : false);
    var bdrpc_active = ($('#rsid_15').is(':checked') ? true : false);
    var iec_active = ($('#rsid_17').is(':checked') ? true : false);
    var spac_active = ($('#rsid_16').is(':checked') ? true : false);
    
    if (!db_updaterateCHPLDTFActive(resource_id, chpldtf_active)) {
        alert("Admin Committee Setting Error: Active CHPLDTF");
        return false;
    }
    if (!db_updaterateSSAMMOActive(resource_id, ssammo_active)) {
        alert("Admin Committee Setting Error: Active SSAMMO");
        return false;
    }
    if (!db_updaterateAPTCActive(resource_id, aptc_active)) {
        alert("Admin Committee Setting Error: Active APTC");
        return false;
    }
    if (!db_updaterateBDRPCActive(resource_id, bdrpc_active)) {
        alert("Admin Committee Setting Error: Active BDRPC");
        return false;
    }
    if (!db_updaterateIECActive(resource_id, iec_active)) {
        alert("Admin Committee Setting Error: Active IEC");
        return false;
    }
    if (!db_updaterateSPACActive(resource_id, spac_active)) {
        alert("Admin Committee Setting Error: Active SPAC");
        return false;
    }
    
    var note = login_name + " changed committee setting\nNew committee assigned to: ";
    note += (chpldtf_active === true ? "CHPLDTF " : "");
    note += (ssammo_active === true ? "SSAMMO " : "");
    note += (aptc_active === true ? "APTC " : "");
    note += (bdrpc_active === true ? "BDRPC " : "");
    note += (iec_active === true ? "IEC " : "");
    note += (spac_active === true ? "SPAC " : "");
    db_insertTransactions(resource_id, login_name, note);
    
    return true;
}

////////////////////////////////////////////////////////////////////////////////
function getFundSrcList() {
    var result = new Array();
    result = db_getResourceFundSrc(resource_id);
    
    setArrayFundSrcList(result);
    setFundSrcListHTML();
}

function setFundSrcListHTML() {
    var tbl_html = "";
    $('#mod_body_fund_src_list').empty();
    
    for (var i = 0; i < ar_fund_src.length; i++) {
        var fund_sr_col = ar_fund_src[i];
        var result = new Array();
        result = db_getResourceFundSrcBudget(fiscal_year, fund_sr_col);
        if (result.length === 1) {
            tbl_html = "<div class='row-fluid'>";
            tbl_html += "<div class='span5' style='padding-top: 5px;' id='mod_body_delete_fund_src_name_" + result[0]['FundSrcCol'] + "'>" + result[0]['FundSrcType'] + "</div>";
            if (Number(result[0]['BalanceAmt']) >= 0) {
                tbl_html += "<div class='span3' style='padding-top: 5px; color: blue;'>" + formatDollar(Number(result[0]['BalanceAmt'])) + "</div>";
            }
            else {
                tbl_html += "<div class='span3' style='padding-top: 5px; color: red;'>" + formatDollar(Number(result[0]['BalanceAmt'])) + "</div>";
            }            
            tbl_html += "<div class='span3'><input type='text' class='span12' id='mod_body_funded_amt_" + result[0]['FundSrcCol'] + "'></div>";
            tbl_html += "<div class='span1 form-horizontal'><button class='btn btn-mini span12' id='mod_body_btn_delete_column_" + result[0]['FundSrcCol'] + "'><i class='icon-trash icon-black'></i></button></div>";
            tbl_html += "</div>";
            $("#mod_body_fund_src_list").append(tbl_html);
            
            var result2 = new Array();
            result2 = db_getResourceFundAmt(resource_id);
            if (result2.length === 1) {
                var fund_amt_col = fund_sr_col + "_amt";
                var fund_amt = formatDollar(Number(result2[0][fund_amt_col]));
                $('#mod_body_funded_amt_' + fund_sr_col).val(fund_amt);
            }
        }
    }
}

function setArrayFundSrcList(result) {
    ar_fund_src.length = 0;
    
    if (result[0]['fs_1'] === "1") {
        ar_fund_src.push('fs_1');
    }
    if (result[0]['fs_2'] === "1") {
        ar_fund_src.push('fs_2');
    }
    if (result[0]['fs_3'] === "1") {
        ar_fund_src.push('fs_3');
    }
    if (result[0]['fs_4'] === "1") {
        ar_fund_src.push('fs_4');
    }
    if (result[0]['fs_5'] === "1") {
        ar_fund_src.push('fs_5');
    }
    if (result[0]['fs_6'] === "1") {
        ar_fund_src.push('fs_6');
    }
    if (result[0]['fs_7'] === "1") {
        ar_fund_src.push('fs_7');
    }
    if (result[0]['fs_8'] === "1") {
        ar_fund_src.push('fs_8');
    }
    if (result[0]['fs_9'] === "1") {
        ar_fund_src.push('fs_9');
    }
    if (result[0]['fs_10'] === "1") {
        ar_fund_src.push('fs_10');
    }
    if (result[0]['fs_11'] === "1") {
        ar_fund_src.push('fs_11');
    }
    if (result[0]['fs_12'] === "1") {
        ar_fund_src.push('fs_12');
    }
    if (result[0]['fs_13'] === "1") {
        ar_fund_src.push('fs_13');
    }
    if (result[0]['fs_14'] === "1") {
        ar_fund_src.push('fs_14');
    }
    if (result[0]['fs_15'] === "1") {
        ar_fund_src.push('fs_15');
    }
    if (result[0]['fs_16'] === "1") {
        ar_fund_src.push('fs_16');
    }
    if (result[0]['fs_17'] === "1") {
        ar_fund_src.push('fs_17');
    }
    if (result[0]['fs_18'] === "1") {
        ar_fund_src.push('fs_18');
    }
    if (result[0]['fs_19'] === "1") {
        ar_fund_src.push('fs_19');
    }
    if (result[0]['fs_20'] === "1") {
        ar_fund_src.push('fs_20');
    }
    if (result[0]['fs_21'] === "1") {
        ar_fund_src.push('fs_21');
    }
    if (result[0]['fs_22'] === "1") {
        ar_fund_src.push('fs_22');
    }
    if (result[0]['fs_23'] === "1") {
        ar_fund_src.push('fs_23');
    }
}

////////////////////////////////////////////////////////////////////////////////
function updateResourceFundAmt() {
    var total_amt = 0.00;
    
    for (var i = 0; i < ar_fund_src.length; i++) {
        var fund_src_col = ar_fund_src[i];
        var fund_amt_col = fund_src_col + "_amt";
        var funded_amt = revertDollar($('#mod_body_funded_amt_' + fund_src_col).val());
        db_updateResourceFundAmtColumn(resource_id, fund_amt_col, funded_amt);
        total_amt += funded_amt;
        
        var result = new Array();
        result = db_getFundSrcBudget(fiscal_year, fund_src_col);
        var budget_amt = Number(result[0]['BudgetAmt']);
        var new_balance_amt = budget_amt - funded_amt;
        db_updateFundSrcBudget(fiscal_year, fund_src_col, budget_amt, new_balance_amt);
    }
    
    db_updateResourceFundAmtColumn(resource_id, "TotalAmount", total_amt);
    
    return total_amt;
}

function deleteResourceFundAmt(fund_src_col, fund_amt) {
    var result = new Array();
    result = db_getResourceFundAmt(resource_id);
    var total_amount = Number(result[0]['TotalAmount']);
    
    var fund_amt_col = fund_src_col + "_amt";
    db_updateResourceFundAmtColumn(resource_id, fund_amt_col, 0.00);
    var new_total_amount = total_amount - fund_amt;
    db_updateResourceFundAmtColumn(resource_id, "TotalAmount", new_total_amount);
    
    var result2 = new Array();
    result2 = db_getFundSrcBudget(fiscal_year, fund_src_col);
    var budget_amt = Number(result2[0]['BudgetAmt']);
    var balance_amt = Number(result2[0]['BalanceAmt']);
    
    var new_balance_amt = balance_amt + fund_amt;
    db_updateFundSrcBudget(fiscal_year, fund_src_col, budget_amt, new_balance_amt);
}

////////////////////////////////////////////////////////////////////////////////
function getCommitteeSettingList() {
    var result = new Array(); 
    result = db_getEnableCommitteeRating();
    
    $('#mod_body_tr').empty();
    for(var i = 0; i < result.length; i++) { 
        var tbl_html = "<tr>";
        tbl_html += "<td class='span3' style='padding-top: 10px;'>" + result[i]['Committee'] + "</td>";
        tbl_html += "<td class='span4'><input type='text' class='span12' id='mod_table_startdate_id_" + result[i]['ECRatingID'] + "'></td>";
        tbl_html += "<td class='span4'><input type='text' class='span12' id='mod_table_enddate_id_" + result[i]['ECRatingID'] + "'></td>";
        tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mod_table_update_" + result[i]['ECRatingID'] + "'><i class='icon-circle-arrow-up icon-black'></i></button></td>";
        tbl_html += "</tr>";
        $("#mod_body_tr").append(tbl_html);
        
        $('#mod_table_startdate_id_' + result[i]['ECRatingID']).datepicker();
        $('#mod_table_enddate_id_' + result[i]['ECRatingID']).datepicker();
        $('#mod_table_startdate_id_' + result[i]['ECRatingID']).val(convertDBDateToStringFormat(result[i]['StartDate']));
        $('#mod_table_enddate_id_' + result[i]['ECRatingID']).val(convertDBDateToStringFormat(result[i]['EndDate']));
    }
}

////////////////////////////////////////////////////////////////////////////////
function deleteAllResourceFundAmt() {
    var result = new Array();
    result = db_getResourceFundAmt(resource_id);
    
    if (result.length === 1) {
        for (var i = 1; i <= 23; i++) {
            if (Number(result[0]['fs_' + i + '_amt']) > 0) {
                var fund_amt = Number(result[0]['fs_' + i + '_amt']);
                var result_amt = new Array();
                result_amt = db_getFundSrcBudget(fiscal_year, "fs_" + i);
                var budget_amt = Number(result_amt[0]['BudgetAmt']);
                var balance_amt = Number(result_amt[0]['BalanceAmt']);
                db_updateFundSrcBudget(fiscal_year, "fs_" + i, budget_amt, balance_amt + fund_amt);
            }
        }
    }
    
    db_deleteResourceFundAmt(resource_id);
}

////////////////////////////////////////////////////////////////////////////////
function emailBackToDraft(ResourceID, login_name, status_change, reason) {
    var prop_title = $('#resource_title_full_' + ResourceID).html();
    var subject = prop_title + " " + status_change;
    var reason_html = reason.replace("\n", "<br/>");
    
    var result = new Array(new Array());
    result = db_getResource2(ResourceID);
    
    if (result.length !== 0) {
        var creator = result[0][0];
        var email = result[0][1];
        var msg = "Dear " + creator + ",<br/></br/>";
        msg += "<strong>" + prop_title + "</strong> resource request " + status_change + " from " + login_name + ".<br/><br/>";
        msg += "Reason:<br/>";
        msg += reason_html + "<br/><br/>";
        msg += "Please use the link below to review the status of your submission at any time.<br/><br/>";
        msg += "<a href='https://services.ivc.edu/ResourceForm/ViewResourceForm.html?resource_id=" + ResourceID + "'>" + prop_title + "</a><br/><br/>";
        msg += "Should you have any questions or comments, please contact the office of Fiscal Services.<br/><br/>";
        msg += "Thank you.<br/><br/>";
        msg += "IVC Fiscal Services<br/>";
        msg += "IVCFiscal@ivc.edu<br/>";
        msg += "x5326";
        
        proc_sendEmail(email, creator, subject, msg);
    }
}

function emailToCreatorCompleted(ResourceID, status, reason) {
    var prop_title = $('#resource_title_full_' + ResourceID).html();
    var subject = prop_title + " has been changed to " + status;
    var reason_html = reason.replace("\n", "<br>");
    
    var result = new Array(new Array());
    result = db_getResource2(ResourceID);
    
    if (result.length !== 0) {
        var creator = result[0]['CreatorName'];
        var email = result[0]['CreatorEmail'];
        
        var msg = "Dear " + creator + ",<br/></br/>";
        msg += "Your resource request titled <strong>" + prop_title + "</strong> has been <strong>" + status + "</strong>.<br>";
        msg += "Comments : " + reason_html + "<br/><br/>";
        
        msg += "Should you have any questions or comments, please contact the office of Fiscal Services.<br/><br/>";
        msg += "Thank you.<br/><br/>";
        msg += "IVC Fiscal Services<br/>";
        msg += "IVCFiscal@ivc.edu<br/>";
        msg += "x5326";
        
        proc_sendEmail(email, creator, subject, msg);
    }
}