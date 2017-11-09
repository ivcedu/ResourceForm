var admin = false;
var login_name = "";
var login_email = "";

var m_fiscal_year = "";
var resource_id = "";

var ar_fund_src = [];

// new funding source setting parameters
var pre_fs_1 = false;
var pre_fs_2 = false;
var pre_fs_3 = false;
var pre_fs_4 = false;
var pre_fs_5 = false;
var pre_fs_6 = false;
var pre_fs_7 = false;
var pre_fs_8 = false;
var pre_fs_9 = false;
var pre_fs_10 = false;
var pre_fs_11 = false;
var pre_fs_12 = false;
var pre_fs_13 = false;
var pre_fs_14 = false;
var pre_fs_15 = false;
var pre_fs_16 = false;
var pre_fs_17 = false;
var pre_fs_18 = false;
var pre_fs_19 = false;
var pre_fs_20 = false;
var pre_fs_21 = false;
var pre_fs_22 = false;
var pre_fs_23 = false;
var requestor_fs_comments = "";

var new_fs_1 = false;
var new_fs_2 = false;
var new_fs_3 = false;
var new_fs_4 = false;
var new_fs_5 = false;
var new_fs_6 = false;
var new_fs_7 = false;
var new_fs_8 = false;
var new_fs_9 = false;
var new_fs_10 = false;
var new_fs_11 = false;
var new_fs_12 = false;
var new_fs_13 = false;
var new_fs_14 = false;
var new_fs_15 = false;
var new_fs_16 = false;
var new_fs_17 = false;
var new_fs_18 = false;
var new_fs_19 = false;
var new_fs_20 = false;
var new_fs_21 = false;
var new_fs_22 = false;
var new_fs_23 = false;

var ar_all_median = [];
var ar_all_mean = [];
var ar_db_chpldtf_column = [];
var ar_db_ssammo_column = [];
var ar_db_aptc_column = [];
var ar_db_bdrpc_column = [];
var ar_db_iec_column = [];
var ar_db_spac_column = [];
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {        
        getAllResourceFiscalYear();
        getAllReviewPeriodList();
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
    
    // fiscal year event ///////////////////////////////////////////////////////
    $('#all_fiscal_yrs').change(function() {
        getCommitteeWorksheetList();
        $('#rf_list').trigger("updateAll");
    });
    
    // review period event /////////////////////////////////////////////////////
    $('#all_review_period').change(function() {
        getCommitteeWorksheetList();
        $('#rf_list').trigger("updateAll");
    });
    
    // committee rating click event ////////////////////////////////////////////    
    $('#nav_rate_chpldtf').click(function() {
        var result = new Array(); 
        result = db_getmbrCHPLDTF(login_email, false);
        
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "aturner@ivc.edu") {
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
        
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "aturner@ivc.edu") {
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
        
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "aturner@ivc.edu") {
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
        
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "aturner@ivc.edu") {
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
        
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "aturner@ivc.edu") {
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
        
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "aturner@ivc.edu") {
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
        m_fiscal_year = $('#resource_fiscal_year_' + resource_id).html().replace("resource_fiscal_year_", "");
        var title = $('#resource_title_full_' + resource_id).html();
        $('#mod_add_header_title').html(title);
        
        clearModalAdminSetting();
        
        getSelectedCommitteeSetting();
        getResourceFundSrc();
        getFundSrcList();
        // review period
        getSelectResourceRP();
        getNewReviewPeriodList();
        
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
    
    // admin body fund src seting button click /////////////////////////////////
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
    
    // admin body fund amt seting button click /////////////////////////////////
    $('#mod_body_btn_fund_amt').click(function() {
        var icon = $('#mod_body_icon_fund_amt').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_body_icon_fund_amt').attr('class', 'icon-chevron-down icon-black');
            $('#mod_body_section_fund_amt').show();
        }
        else {
            $('#mod_body_icon_fund_amt').attr('class', 'icon-chevron-right icon-black');
            $('#mod_body_section_fund_amt').hide();
        }
    });
    
    // admin body review period seting button click ////////////////////////////
    $('#mod_body_btn_rp_setting').click(function() {
        var icon = $('#mod_body_icon_rp_setting').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_body_icon_rp_setting').attr('class', 'icon-chevron-down icon-black');
            $('#mod_body_rp_setting').show();
        }
        else {
            $('#mod_body_icon_rp_setting').attr('class', 'icon-chevron-right icon-black');
            $('#mod_body_rp_setting').hide();
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
    
    // admin body review period setting update button click ////////////////////
    $('#mod_body_btn_rp_setting_update').click(function() {
        if (resource_id !== "") {
            var rp_id = $('#mod_new_rp_name').val();
            var rp_name = $('#mod_new_rp_name option:selected').text();
                
            var result = new Array();
            result = db_getResourceRP(resource_id);
            if(result.length === 0) {
                db_insertResourceRP(resource_id, rp_id);
            }
            else {
                db_updateResourceRPByResourceID(resource_id, rp_id);
            }
            
            var note = m_login_name + " changed review period to " + rp_name;
            db_insertTransactions(sel_res_id, m_login_name, note);
            alert("Review Period has been updated successfully");
            getCommitteeWorksheetList();
        }
    });
    
    // admin body update review period event ///////////////////////////////////
    $('#mod_new_rp_name').change(function() {
        var rp_id = $(this).val();
        udpateModalNewReviewPeriod(rp_id);
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
    
    // admin body funding source funded amount update button click /////////////
    $(document).on('click', '[id^="mod_body_btn_update_fs_amount_"]', function() {
        var result = new Array();
        result = db_getResourceFundAmt(resource_id);
        if (result.length === 0) {
            db_insertResourceFundAmt(resource_id);
        }
        
        var fund_src_column = $(this).attr('id').replace("mod_body_btn_update_fs_amount_", "");
        var fund_src_name = $('#mod_body_update_fund_src_name_' + fund_src_column).html();
        var fund_amt = revertDollar($('#mod_body_funded_amt_' + fund_src_column).val());
        
        updateResourceFundAmtByFS(fund_src_column, fund_amt);
        var note = login_name + " updated " + fund_src_name + " funded amount: " + formatDollar(fund_amt);
        db_insertTransactions(resource_id, login_name, note);
        
        alert("Funded amount has been updated successfully");
        getResourceFundSrc();
        getFundSrcList();
    });
    
    // admin body funding source setting update button click ///////////////////
    $('#mod_body_btn_update_fund_src').click(function() {
        var note = "";
        var bFS_changed = updateFundSrcValidation();
        
        if (!bFS_changed && $('#mgr_fs_comments').val().replace(/\s+/g, '') === "") {
            alert("No funding source has been changed or No funding source comments has been entered");
            return false;
        }
        else {
            if (bFS_changed) {
                var err_fs_comments = updateFundSrcCommentsValidation();
                if (err_fs_comments !== "") {
                    alert(err_fs_comments);
                    return false;
                }
                else {
                    updateResourceFundSrc();
                    note += login_name + ": Funding sources changed\nFrom: " + getUpdateFundSrcNote();
                }
            }
            if ($('#mgr_fs_comments').val().replace(/\s+/g, '') !== "") {
                db_insertResourceFundSrcLog(resource_id, login_name, textReplaceApostrophe($('#mgr_fs_comments').val()));
            }
        }
        
        // if not exist, insert resource fund amt table
        var result = new Array();
        result = db_getResourceFundAmt(resource_id);
        if (result.length === 0) {
            db_insertResourceFundAmt(resource_id);
        }
        
        deleteResourceFundAmtList();
        
        if (note !== "") {
            db_insertTransactions(resource_id, login_name, note);
        }
        
        alert("Funding source has been updated successfully");
        getResourceFundSrc();
        getFundSrcList();
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
    
    $('#mod_comm_rate_date_list').on('click', '[id^="mod_table_update_"]', function() {
        var ec_rating_id = $(this).attr('id').replace("mod_table_update_", "");
        var start_date = $('#mod_table_startdate_id_' + ec_rating_id).val();
        var end_date = $('#mod_table_enddate_id_' + ec_rating_id).val();
        
        if (db_updateEnableCommitteeRating(ec_rating_id, start_date, end_date)) {
            getCommitteeSettingList();
            alert("Start and End date updated successfully");
        }
        else {
            alert("Committee start and end date update failed");
        }
    });
    
    // due/start date click event //////////////////////////////////////////////
    $('#nav_due_start_date').click(function() {
        getSystemDueStartDateList();
        $('#mod_due_start_date').modal('show');
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // review period click event ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#nav_review_period').click(function() {
        getReviewPeriodList();
        $('#mod_review_period').modal('show');
    });
    
    // mod review period new button click //////////////////////////////////////
    $('#mod_review_period_btn_new').click(function() {
        db_insertReviewPeriod(1, "", "", "");
        getReviewPeriodList();
    });
    
    // mod review period update button click ///////////////////////////////////
    $('#mod_review_period_btn_update').click(function() {
        $('#mod_review_period_body_tr').children().each(function () {
            var rp_id = $(this).attr('id').replace("mod_tr_review_period_id_", "");
            var review_period = $('#mod_review_period_id_' + rp_id).val();
            var rp_start_date = $('#mod_rp_start_id_' + rp_id).val();
            var rp_end_date = $('#mod_rp_end_id_' + rp_id).val();
            db_updateReviewPeriod(rp_id, 1, review_period, rp_start_date, rp_end_date);
        });
        
        alert("Review Period has been updated successfully");
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // enable submit date update button click //////////////////////////////////
    $('#mod_due_start_date_list').on('click', '[id^="mod_table_update_enable_submit"]', function() {
        var db_enable_submit_date = convertStringDateToDBDateFormat($('#mod_table_enable_submit').val());
        if (db_updateEnableSubmitBtn(db_enable_submit_date)) {
            alert("Resource Request submission due date has been updated successfully");
        }
        else {
            alert("Resource Request submission due date updated failed");
        }
    });
    
    // mgr worksheet start date update button click ////////////////////////////
    $('#mod_due_start_date_list').on('click', '[id^="mod_table_update_mgr_start"]', function() {
        var db_mgr_start_date = convertStringDateToDBDateFormat($('#mod_table_mgr_start').val());
        if (db_updateEnableMgrWorksheet(db_mgr_start_date)) {
            alert("Resource Request submission due date has been updated successfully");
        }
        else {
            alert("Resource Request submission due date updated failed");
        }
    });
    
    // committee worksheet start date update button click //////////////////////
    $('#mod_due_start_date_list').on('click', '[id^="mod_table_update_committee_start"]', function() {
        var db_committee_start_date = convertStringDateToDBDateFormat($('#mod_table_committee_start').val());
        if (db_updateEnableCommitteeWorksheet(db_committee_start_date)) {
            alert("Resource Request submission due date has been updated successfully");
        }
        else {
            alert("Resource Request submission due date updated failed");
        }
    });
////////////////////////////////////////////////////////////////////////////////
    // selectpicker
    $('.selectpicker').selectpicker();
    
    // auto size
    $('#mod_body_status_comments').autosize();
    $('#mgr_fs_comments').autosize();
});

////////////////////////////////////////////////////////////////////////////////
function statuChangeValidation() {
    var err = "";
    if ($('#mod_body_status_comments').val().replace(/\s+/g, '') === "") {
        err = "Comments is a required\n";
    }
    return err;
}

////////////////////////////////////////////////////////////////////////////////
function getAllResourceFiscalYear() {
    $('#all_fiscal_yrs').html("");
    
    var result = new Array();
    result = db_getAllResourceFiscalYear();
    var html = "";
    for(var i = 0; i < result.length; i++) { 
        html += "<option value='" + result[i]['FiscalYear'] + "'>" + result[i]['FiscalYear'] + "</option>";
    }
    
    $('#all_fiscal_yrs').append(html);
    $('#all_fiscal_yrs').val(getFiscalYear());
    $('#all_fiscal_yrs').selectpicker('refresh');
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
    $('#mod_due_start_date').modal('hide');
    $('#mod_review_period').modal('hide');
}

////////////////////////////////////////////////////////////////////////////////
function setAdminOption() {
    login_name = sessionStorage.getItem('m1_loginName');
    login_email = sessionStorage.getItem('m1_loginEmail');
    
    if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "dkhachatryan@ivc.edu" || login_email === "aturner@ivc.edu") {
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
    if (login_email === "ykim160@ivc.edu" || login_email === "aturner@ivc.edu") {
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
            // delete mgr/vpp lrating
            db_deleterateMgr(resource_id);
            db_deleterateVPP(resource_id);
            // delete mgr/vpp comments
            db_deleteCommentsMgr(resource_id);
            db_deleteCommentsVPP(resource_id);
            // delete committee rating
            db_deleterateAll(resource_id);
            db_deleterateAPTC(resource_id);
            db_deleterateBDRPC(resource_id);
            db_deleterateCHPLDTF(resource_id);
            db_deleterateIEC(resource_id);
            db_deleterateSPAC(resource_id);
            db_deleterateSSAMMO(resource_id);
            
            deleteAllResourceFundAmt();
            db_deleteResourceFSBSI(resource_id);
            db_updateResourcePage(resource_id, "Page1");
            setBackToDraft(resource_id);
            // delete resource review period
            db_deleteResourceRP(resource_id);
            
//            emailBackToDraft(resource_id, login_email, "sent " + status, comments);
            note = login_name + " sent back to Draft stage\n" + comments;
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
            
//            emailToCreatorCompleted(resource_id, status, comments);
            note = login_name + " change status to Closed\n" + comments;
            break;
        case "Partially Funded":
        case "Fully Funded":
        case "Unfunded":
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
            
//            emailToCreatorCompleted(resource_id, status, comments);
            note = login_name + " change status to " + status + "\n" + comments;
            break;
        default:
            break;
    }
    
    db_insertTransactions(resource_id, login_name, note);
}

////////////////////////////////////////////////////////////////////////////////
function getCommitteeWorksheetList() {
    var result = new Array(); 
    result = db_getCommitteeWorksheetList($('#all_fiscal_yrs').val(), $('#all_review_period').val());
    
    $('#body_tr').empty();
    var html = "";
    for(var i = 0; i < result.length; i++) { 
        var str_totalAmount = formatDollar(Number(result[i]['TotalAmount']));
        var committee = setCommitteeValue(result[i]['APTC_Active'], result[i]['BDRPC_Active'], result[i]['CHPLDTF_Active'], result[i]['IEC_Active'], result[i]['SPAC_Active'], result[i]['SSAMMO_Active']);
        html += setCommitteeWorksheetHTML(result[i]['ResourceID'], result[i]['ProposalTitle'], str_totalAmount, result[i]['ResourceType'], result[i]['CreatorName'], 
                                            result[i]['ALL_Median'], result[i]['ALL_Mean'], committee, result[i]['FiscalYear']);
    }

    $("#body_tr").append(html);
}

function setCommitteeWorksheetHTML(resource_id, title, amount, type, creator, median, mean, committee, fiscal_year) {
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
    tbl_html += "<td class='col_50' style='text-align: center;' id='all_median_" + resource_id + "'>" + (median === null ? "" : median) + "</td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='all_mean_" + resource_id + "'>" + (mean === null ? "" : mean) + "</td>";    
    // hide html
    tbl_html += "<td class='span1' style='display: none;' id='resource_title_full_" + resource_id + "'>" + title + "</td>";
    tbl_html += "<td class='span1' style='display: none;' id='resource_fiscal_year_" + resource_id + "'>" + fiscal_year + "</td>";
    tbl_html += "</tr>";
    
    return tbl_html;
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
    $('#mod_body_section_committee_setting').hide();
    $('#mod_body_icon_committee_setting').attr('class', 'icon-chevron-right icon-black');
    $('#mod_body_section_status').hide();
    $('#mod_body_icon_status').attr('class', 'icon-chevron-right icon-black');
    $('#mod_body_section_fund_src').hide();
    $('#mod_body_icon_fund_src').attr('class', 'icon-chevron-right icon-black');
    $('#mod_body_section_fund_amt').hide();
    $('#mod_body_icon_fund_amt').attr('class', 'icon-chevron-right icon-black');
    $('#mod_body_rp_setting').hide();
    $('#mod_body_icon_rp_setting').attr('class', 'icon-chevron-right icon-black');
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
    
//    updateCommitteeMedianMean();
    
    return true;
}

////////////////////////////////////////////////////////////////////////////////
function getResourceFundSrc() {
    resetPreviousFundSrc();
    resetResourceFundSrc();
    $('#mgr_fs_comments').val("");
    $('#fund_source_comments').html("");
    
    var result = new Array(); 
    result = db_getResourceFundSrc(resource_id);
    
    if (result.length === 1) {
        if (result[0]['fs_1'] === "1") {
            pre_fs_1 = true;
            $("#fs_1").prop('checked', true);
        }
        if (result[0]['fs_2'] === "1") {
            pre_fs_2 = true;
            $("#fs_2").prop('checked', true);
        }
        if (result[0]['fs_3'] === "1") {
            pre_fs_3 = true;
            $("#fs_3").prop('checked', true);
        }
        if (result[0]['fs_4'] === "1") {
            pre_fs_4 = true;
            $("#fs_4").prop('checked', true);
        }
        if (result[0]['fs_5'] === "1") {
            pre_fs_5 = true;
            $("#fs_5").prop('checked', true);
        }
        if (result[0]['fs_6'] === "1") {
            pre_fs_6 = true;
            $("#fs_6").prop('checked', true);
        }
        if (result[0]['fs_7'] === "1") {
            pre_fs_1 = true;
            $("#fs_7").prop('checked', true);
        }
        if (result[0]['fs_8'] === "1") {
            pre_fs_8 = true;
            $("#fs_8").prop('checked', true);
        }
        if (result[0]['fs_9'] === "1") {
            pre_fs_9 = true;
            $("#fs_9").prop('checked', true);
        }
        if (result[0]['fs_10'] === "1") {
            pre_fs_10 = true;
            $("#fs_10").prop('checked', true);
        }
        if (result[0]['fs_11'] === "1") {
            pre_fs_11 = true;
            $("#fs_11").prop('checked', true);
        }
        if (result[0]['fs_12'] === "1") {
            pre_fs_12 = true;
            $("#fs_12").prop('checked', true);
        }
        if (result[0]['fs_13'] === "1") {
            pre_fs_13 = true;
            $("#fs_13").prop('checked', true);
        }
        if (result[0]['fs_14'] === "1") {
            pre_fs_14 = true;
            $("#fs_14").prop('checked', true);
        }
        if (result[0]['fs_15'] === "1") {
            pre_fs_15 = true;
            $("#fs_15").prop('checked', true);
        }
        if (result[0]['fs_16'] === "1") {
            pre_fs_16 = true;
            $("#fs_16").prop('checked', true);
        }
        if (result[0]['fs_17'] === "1") {
            pre_fs_17 = true;
            $("#fs_17").prop('checked', true);
        }
        if (result[0]['fs_18'] === "1") {
            pre_fs_18 = true;
            $("#fs_18").prop('checked', true);
        }
        if (result[0]['fs_19'] === "1") {
            pre_fs_19 = true;
            $("#fs_19").prop('checked', true);
        }
        if (result[0]['fs_20'] === "1") {
            pre_fs_20 = true;
            $("#fs_20").prop('checked', true);
        }
        if (result[0]['fs_21'] === "1") {
            pre_fs_21 = true;
            $("#fs_21").prop('checked', true);
        }
        if (result[0]['fs_22'] === "1") {
            pre_fs_22 = true;
            $("#fs_22").prop('checked', true);
        }
        if (result[0]['fs_23'] === "1") {
            pre_fs_23 = true;
            $("#fs_23").prop('checked', true);
        }
        requestor_fs_comments = result[0]['fs_comments'];
        $('#fund_source_comments').html(getResourceFundSrcLog(resource_id, requestor_fs_comments));
    }
}

function getResourceFundSrcLog(ResourceID, req_fs_comments) {
    var result = new Array(); 
    result = db_getResourceFundSrcLog(ResourceID);
    
    var fs_comments = "";
    for(var i = 0; i < result.length; i++) { 
        fs_comments += result[i]['DTStamp'] + ": " + result[i]['LoginName'] + "<br>" + result[i]['Note'].replace(/\n/g, "<br>") + "<br><br>";
    }
    
    return fs_comments + req_fs_comments;
}

function updateResourceFundSrc() {
    db_updateResourceFundSrc(resource_id, new_fs_1, new_fs_2, new_fs_3, new_fs_4, new_fs_5, new_fs_6, new_fs_7, new_fs_8, new_fs_9, new_fs_10,
                            new_fs_11, new_fs_12, new_fs_13, new_fs_14, new_fs_15, new_fs_16, new_fs_17, new_fs_18, new_fs_19, new_fs_20, new_fs_21, new_fs_22, new_fs_23, requestor_fs_comments);
                            
    // send BSI instruction email
    if (new_fs_4) {
        if (db_getResourceFSBSI(resource_id) === null) {
            db_insertResourceFSBSI(resource_id);
            sendEmailBSIFundingInstructionToCreator();
        }
    }
}

function deleteResourceFundAmtList() {
    if (pre_fs_1 !== new_fs_1 && !new_fs_1) {
        deleteResourceFundAmtByFS("fs_1");
    }
    if (pre_fs_2 !== new_fs_2 && !new_fs_2) {
        deleteResourceFundAmtByFS("fs_2");
    }
    if (pre_fs_3 !== new_fs_3 && !new_fs_3) {
        deleteResourceFundAmtByFS("fs_3");
    }
    if (pre_fs_4 !== new_fs_4 && !new_fs_4) {
        deleteResourceFundAmtByFS("fs_4");
    }
    if (pre_fs_5 !== new_fs_5 && !new_fs_5) {
        deleteResourceFundAmtByFS("fs_5");
    }
    if (pre_fs_6 !== new_fs_6 && !new_fs_6) {
        deleteResourceFundAmtByFS("fs_6");
    }
    if (pre_fs_7 !== new_fs_7 && !new_fs_7) {
        deleteResourceFundAmtByFS("fs_7");
    }
    if (pre_fs_8 !== new_fs_8 && !new_fs_8) {
        deleteResourceFundAmtByFS("fs_8");
    }
    if (pre_fs_9 !== new_fs_9 && !new_fs_9) {
        deleteResourceFundAmtByFS("fs_9");
    }
    if (pre_fs_10 !== new_fs_10 && !new_fs_10) {
        deleteResourceFundAmtByFS("fs_10");
    }
    if (pre_fs_11 !== new_fs_11 && !new_fs_11) {
        deleteResourceFundAmtByFS("fs_11");
    }
    if (pre_fs_12 !== new_fs_12 && !new_fs_12) {
        deleteResourceFundAmtByFS("fs_12");
    }
    if (pre_fs_13 !== new_fs_13 && !new_fs_13) {
        deleteResourceFundAmtByFS("fs_13");
    }
    if (pre_fs_14 !== new_fs_14 && !new_fs_14) {
        deleteResourceFundAmtByFS("fs_14");
    }
    if (pre_fs_15 !== new_fs_15 && !new_fs_15) {
        deleteResourceFundAmtByFS("fs_15");
    }
    if (pre_fs_16 !== new_fs_16 && !new_fs_16) {
        deleteResourceFundAmtByFS("fs_16");
    }
    if (pre_fs_17 !== new_fs_17 && !new_fs_17) {
        deleteResourceFundAmtByFS("fs_17");
    }
    if (pre_fs_18 !== new_fs_18 && !new_fs_18) {
        deleteResourceFundAmtByFS("fs_18");
    }
    if (pre_fs_19 !== new_fs_19 && !new_fs_19) {
        deleteResourceFundAmtByFS("fs_19");
    }
    if (pre_fs_20 !== new_fs_20 && !new_fs_20) {
        deleteResourceFundAmtByFS("fs_20");
    }
    if (pre_fs_21 !== new_fs_21 && !new_fs_21) {
        deleteResourceFundAmtByFS("fs_21");
    }
    if (pre_fs_22 !== new_fs_22 && !new_fs_22) {
        deleteResourceFundAmtByFS("fs_22");
    }
    if (pre_fs_23 !== new_fs_23 && !new_fs_23) {
        deleteResourceFundAmtByFS("fs_23");
    }
}

function getFundSrcType(fund_src_col) {
    var result = new Array();
    result = db_getFundSrcType(fund_src_col);
    
    return result[0]['FundSrcType'];
}

function resetPreviousFundSrc() {
    pre_fs_1 = false;
    pre_fs_2 = false;
    pre_fs_3 = false;
    pre_fs_4 = false;
    pre_fs_5 = false;
    pre_fs_6 = false;
    pre_fs_7 = false;
    pre_fs_8 = false;
    pre_fs_9 = false;
    pre_fs_10 = false;
    pre_fs_11 = false;
    pre_fs_12 = false;
    pre_fs_13 = false;
    pre_fs_14 = false;
    pre_fs_15 = false;
    pre_fs_16 = false;
    pre_fs_17 = false;
    pre_fs_18 = false;
    pre_fs_19 = false;
    pre_fs_20 = false;
    pre_fs_21 = false;
    pre_fs_22 = false;
    pre_fs_23 = false;
}

function resetResourceFundSrc() {
    $("#fs_1").prop('checked', false);
    $("#fs_2").prop('checked', false);
    $("#fs_3").prop('checked', false);
    $("#fs_4").prop('checked', false);
    $("#fs_5").prop('checked', false);
    $("#fs_6").prop('checked', false);
    $("#fs_7").prop('checked', false);
    $("#fs_8").prop('checked', false);
    $("#fs_9").prop('checked', false);
    $("#fs_10").prop('checked', false);
    $("#fs_11").prop('checked', false);
    $("#fs_12").prop('checked', false);
    $("#fs_13").prop('checked', false);
    $("#fs_14").prop('checked', false);
    $("#fs_15").prop('checked', false);
    $("#fs_16").prop('checked', false);
    $("#fs_17").prop('checked', false);
    $("#fs_18").prop('checked', false);
    $("#fs_19").prop('checked', false);
    $("#fs_20").prop('checked', false);
    $("#fs_21").prop('checked', false);
    $("#fs_22").prop('checked', false);
    $("#fs_23").prop('checked', false);
}

function updateFundSrcValidation() {    
    new_fs_1 = $('#fs_1').is(':checked');
    new_fs_2 = $('#fs_2').is(':checked');
    new_fs_3 = $('#fs_3').is(':checked');
    new_fs_4 = $('#fs_4').is(':checked');
    new_fs_5 = $('#fs_5').is(':checked');
    new_fs_6 = $('#fs_6').is(':checked');
    new_fs_7 = $('#fs_7').is(':checked');
    new_fs_8 = $('#fs_8').is(':checked');
    new_fs_9 = $('#fs_9').is(':checked');
    new_fs_10 = $('#fs_10').is(':checked');
    new_fs_11 = $('#fs_11').is(':checked');
    new_fs_12 = $('#fs_12').is(':checked');
    new_fs_13 = $('#fs_13').is(':checked');
    new_fs_14 = $('#fs_14').is(':checked');
    new_fs_15 = $('#fs_15').is(':checked');
    new_fs_16 = $('#fs_16').is(':checked');
    new_fs_17 = $('#fs_17').is(':checked');
    new_fs_18 = $('#fs_18').is(':checked');
    new_fs_19 = $('#fs_19').is(':checked');
    new_fs_20 = $('#fs_20').is(':checked');
    new_fs_21 = $('#fs_21').is(':checked');
    new_fs_22 = $('#fs_22').is(':checked');
    new_fs_23 = $('#fs_23').is(':checked');
    
    if (pre_fs_1 !== new_fs_1 || pre_fs_2 !== new_fs_2 || pre_fs_3 !== new_fs_3 || pre_fs_4 !== new_fs_4 || pre_fs_5 !== new_fs_5
        || pre_fs_6 !== new_fs_6 || pre_fs_7 !== new_fs_7 || pre_fs_8 !== new_fs_8 || pre_fs_9 !== new_fs_9 || pre_fs_10 !== new_fs_10
        || pre_fs_11 !== new_fs_11 || pre_fs_12 !== new_fs_12 || pre_fs_13 !== new_fs_13 || pre_fs_14 !== new_fs_14 || pre_fs_15 !== new_fs_15
        || pre_fs_16 !== new_fs_16 || pre_fs_17 !== new_fs_17 || pre_fs_18 !== new_fs_18 || pre_fs_19 !== new_fs_19 || pre_fs_20 !== new_fs_20
        || pre_fs_21 !== new_fs_21 || pre_fs_22 !== new_fs_22 || pre_fs_23 !== new_fs_23) {
        return true;
    }
    else {
        return false;
    }
}

function updateFundSrcCommentsValidation() {
    var err = "";
    
    if (new_fs_2 || new_fs_3 || new_fs_4 || new_fs_5 || new_fs_6 || new_fs_7 || new_fs_8 || new_fs_9 || new_fs_10
        || new_fs_11 || new_fs_12 || new_fs_13 || new_fs_14 || new_fs_15 || new_fs_16 || new_fs_17 || new_fs_18 || new_fs_19 || new_fs_20
        || new_fs_21 || new_fs_22 || new_fs_23) {
        if ($('#mgr_fs_comments').val().replace(/\s+/g, '') === "") {
            err += "Briefly explain the rationale behind selecting the funding sources is a required\n";
        }
    }
    
    return err;
}

function getUpdateFundSrcNote() {
    var fs_note = "";
    
    if (pre_fs_1) {
        fs_note += getFundSrcType("fs_1") + ", ";
    }
    if (pre_fs_2) {
        fs_note += getFundSrcType("fs_2") + ", ";
    }
    if (pre_fs_3) {
        fs_note += getFundSrcType("fs_3") + ", ";
    }
    if (pre_fs_4) {
        fs_note += getFundSrcType("fs_4") + ", ";
    }
    if (pre_fs_5) {
        fs_note += getFundSrcType("fs_5") + ", ";
    }
    if (pre_fs_6) {
        fs_note += getFundSrcType("fs_6") + ", ";
    }
    if (pre_fs_7) {
        fs_note += getFundSrcType("fs_7") + ", ";
    }
    if (pre_fs_8) {
        fs_note += getFundSrcType("fs_8") + ", ";
    }
    if (pre_fs_9) {
        fs_note += getFundSrcType("fs_9") + ", ";
    }
    if (pre_fs_10) {
        fs_note += getFundSrcType("fs_10") + ", ";
    }
    if (pre_fs_11) {
        fs_note += getFundSrcType("fs_11") + ", ";
    }
    if (pre_fs_12) {
        fs_note += getFundSrcType("fs_12") + ", ";
    }
    if (pre_fs_13) {
        fs_note += getFundSrcType("fs_13") + ", ";
    }
    if (pre_fs_14) {
        fs_note += getFundSrcType("fs_14") + ", ";
    }
    if (pre_fs_15) {
        fs_note += getFundSrcType("fs_15") + ", ";
    }
    if (pre_fs_16) {
        fs_note += getFundSrcType("fs_16") + ", ";
    }
    if (pre_fs_17) {
        fs_note += getFundSrcType("fs_17") + ", ";
    }
    if (pre_fs_18) {
        fs_note += getFundSrcType("fs_18") + ", ";
    }
    if (pre_fs_19) {
        fs_note += getFundSrcType("fs_19") + ", ";
    }
    if (pre_fs_20) {
        fs_note += getFundSrcType("fs_20") + ", ";
    }
    if (pre_fs_21) {
        fs_note += getFundSrcType("fs_21") + ", ";
    }
    if (pre_fs_22) {
        fs_note += getFundSrcType("fs_22") + ", ";
    }
    if (pre_fs_23) {
        fs_note += getFundSrcType("fs_23") + ", ";
    }
    
    if (fs_note !== "") {
        fs_note = fs_note.slice(0,-2) + "\nTo: ";
    }
    
    if (new_fs_1) {
        fs_note += getFundSrcType("fs_1") + ", ";
    }
    if (new_fs_2) {
        fs_note += getFundSrcType("fs_2") + ", ";
    }
    if (new_fs_3) {
        fs_note += getFundSrcType("fs_3") + ", ";
    }
    if (new_fs_4) {
        fs_note += getFundSrcType("fs_4") + ", ";
    }
    if (new_fs_5) {
        fs_note += getFundSrcType("fs_5") + ", ";
    }
    if (new_fs_6) {
        fs_note += getFundSrcType("fs_6") + ", ";
    }
    if (new_fs_7) {
        fs_note += getFundSrcType("fs_7") + ", ";
    }
    if (new_fs_8) {
        fs_note += getFundSrcType("fs_8") + ", ";
    }
    if (new_fs_9) {
        fs_note += getFundSrcType("fs_9") + ", ";
    }
    if (new_fs_10) {
        fs_note += getFundSrcType("fs_10") + ", ";
    }
    if (new_fs_11) {
        fs_note += getFundSrcType("fs_11") + ", ";
    }
    if (new_fs_12) {
        fs_note += getFundSrcType("fs_12") + ", ";
    }
    if (new_fs_13) {
        fs_note += getFundSrcType("fs_13") + ", ";
    }
    if (new_fs_14) {
        fs_note += getFundSrcType("fs_14") + ", ";
    }
    if (new_fs_15) {
        fs_note += getFundSrcType("fs_15") + ", ";
    }
    if (new_fs_16) {
        fs_note += getFundSrcType("fs_16") + ", ";
    }
    if (new_fs_17) {
        fs_note += getFundSrcType("fs_17") + ", ";
    }
    if (new_fs_18) {
        fs_note += getFundSrcType("fs_18") + ", ";
    }
    if (new_fs_19) {
        fs_note += getFundSrcType("fs_19") + ", ";
    }
    if (new_fs_20) {
        fs_note += getFundSrcType("fs_20") + ", ";
    }
    if (new_fs_21) {
        fs_note += getFundSrcType("fs_21") + ", ";
    }
    if (new_fs_22) {
        fs_note += getFundSrcType("fs_22") + ", ";
    }
    if (new_fs_23) {
        fs_note += getFundSrcType("fs_23") + ", ";
    }
    
    if (fs_note !== "") {
        fs_note = fs_note.slice(0,-2);
    }
    
    return fs_note;
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
        result = db_getResourceFundSrcBudget(m_fiscal_year, fund_sr_col);
        if (result.length === 1) {
            tbl_html = "<div class='row-fluid'>";
            tbl_html += "<div class='span5' style='padding-top: 5px;' id='mod_body_update_fund_src_name_" + result[0]['FundSrcCol'] + "'>" + result[0]['FundSrcType'] + "</div>";
            if (Number(result[0]['BalanceAmt']) >= 0) {
                tbl_html += "<div class='span3' style='padding-top: 5px; color: blue;'>" + formatDollar(Number(result[0]['BalanceAmt'])) + "</div>";
            }
            else {
                tbl_html += "<div class='span3' style='padding-top: 5px; color: red;'>" + formatDollar(Number(result[0]['BalanceAmt'])) + "</div>";
            }            
            tbl_html += "<div class='span3'><input type='text' class='span12' id='mod_body_funded_amt_" + result[0]['FundSrcCol'] + "'></div>";
            tbl_html += "<div class='span1 form-horizontal'>";
            tbl_html += "<button class='btn btn-mini btn-primary span12' id='mod_body_btn_update_fs_amount_" + result[0]['FundSrcCol'] + "'><i class='icon-circle-arrow-up icon-white'></i></button></div>";
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
function updateResourceFundAmtByFS(fund_src_col, fund_amt) {
    var fund_amt_col = fund_src_col + "_amt";
    
    var result = new Array();
    result = db_getResourceFundAmt(resource_id);
    
    var total_amount = Number(result[0]['TotalAmount']);
    var new_total_amount = 0.00;
    
    var pre_fund_amt = Number(result[0][fund_amt_col]);
    var new_fund_amt = Number(fund_amt);
    var diff_fund_amt = new_fund_amt - pre_fund_amt;
    
    db_updateResourceFundAmtColumn(resource_id, fund_amt_col, new_fund_amt);
    new_total_amount = total_amount + diff_fund_amt;
    db_updateResourceFundAmtColumn(resource_id, "TotalAmount", new_total_amount);
    
    var result2 = new Array();
    result2 = db_getFundSrcBudget(m_fiscal_year, fund_src_col);
    if (result2.length === 1) {
        var budget_amt = Number(result2[0]['BudgetAmt']);
        var balance_amt = Number(result2[0]['BalanceAmt']);

        var new_balance_amt = balance_amt - diff_fund_amt;
        db_updateFundSrcBudget(m_fiscal_year, fund_src_col, budget_amt, new_balance_amt);
    }
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
    result2 = db_getFundSrcBudget(m_fiscal_year, fund_src_col);
    if (result2.length === 1) {
        var budget_amt = Number(result2[0]['BudgetAmt']);
        var balance_amt = Number(result2[0]['BalanceAmt']);

        var new_balance_amt = balance_amt + fund_amt;
        db_updateFundSrcBudget(m_fiscal_year, fund_src_col, budget_amt, new_balance_amt);
    }
}

function deleteResourceFundAmtByFS(fund_src_col) {
    var fund_amt_col = fund_src_col + "_amt";
    
    var result = new Array();
    result = db_getResourceFundAmt(resource_id);
    
    var total_amount = Number(result[0]['TotalAmount']);
    var pre_fund_amt = Number(result[0][fund_amt_col]);
    db_updateResourceFundAmtColumn(resource_id, fund_amt_col, 0.00);
    db_updateResourceFundAmtColumn(resource_id, "TotalAmount", total_amount - pre_fund_amt);
    
    var result2 = new Array();
    result2 = db_getFundSrcBudget(m_fiscal_year, fund_src_col);
    if (result2.length === 1) {
        var budget_amt = Number(result2[0]['BudgetAmt']);
        var balance_amt = Number(result2[0]['BalanceAmt']);

        var new_balance_amt = balance_amt + pre_fund_amt;
        db_updateFundSrcBudget(m_fiscal_year, fund_src_col, budget_amt, new_balance_amt);
    }
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

function getSystemDueStartDateList() {
    var enable_submit_date = convertDBDateToStringFormat(db_getEnableSubmitBtn());
    var mgr_start_date = convertDBDateToStringFormat(db_getEnableMgrWorksheet());
    var committee_start_date = convertDBDateToStringFormat(db_getEnableCommitteeWorksheet());
    
    $('#mod_body2_tr').empty();
    var tbl_html = "<tr>";
    tbl_html += "<td class='span7' style='padding-top: 10px;'>Submission Due Date</td>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mod_table_enable_submit' value='" + enable_submit_date + "'></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mod_table_update_enable_submit'><i class='icon-circle-arrow-up icon-black'></i></button></td>";
    tbl_html += "</tr>";
    
    tbl_html += "<tr>";
    tbl_html += "<td class='span7' style='padding-top: 10px;'>Mgr Worksheet Start Date</td>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mod_table_mgr_start' value='" + mgr_start_date + "'></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mod_table_update_mgr_start'><i class='icon-circle-arrow-up icon-black'></i></button></td>";
    tbl_html += "</tr>";
    
    tbl_html += "<tr>";
    tbl_html += "<td class='span7' style='padding-top: 10px;'>Committee Worksheet Start Date</td>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mod_table_committee_start' value='" + committee_start_date + "'></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mod_table_update_committee_start'><i class='icon-circle-arrow-up icon-black'></i></button></td>";
    tbl_html += "</tr>";
    
    $("#mod_body2_tr").append(tbl_html);
    
    $('#mod_table_enable_submit').datepicker();
    $('#mod_table_mgr_start').datepicker();
    $('#mod_table_committee_start').datepicker();
}

////////////////////////////////////////////////////////////////////////////////
function getReviewPeriodList() {
    var result = new Array(); 
    result = db_getReviewPeriodList();
    
    $('#mod_review_period_body_tr').empty();
    for(var i = 0; i < result.length; i++) {
        var tbl_html = "<tr id='mod_tr_review_period_id_" + result[i]['ReviewPeriodID'] + "'>";       
        tbl_html += "<td class='span4'><input type='text' class='span12' id='mod_review_period_id_" + result[i]['ReviewPeriodID'] + "' value='" + result[i]['ReviewPeriod'] + "'></td>";
        tbl_html += "<td class='span4'><input type='text' class='span12' id='mod_rp_start_id_" + result[i]['ReviewPeriodID']  + "' value ='" + result[i]['RPStartDate'] + "'></td>";
        tbl_html += "<td class='span4'><input type='text' class='span12' id='mod_rp_end_id_" + result[i]['ReviewPeriodID']  + "' value ='" + result[i]['RPEndDate'] + "'></td>";
        tbl_html += "</tr>";

        $("#mod_review_period_body_tr").append(tbl_html);
        $('#mod_rp_start_id_' + result[i]['ReviewPeriodID']).datepicker();
        $('#mod_rp_end_id_' + result[i]['ReviewPeriodID']).datepicker();
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
                result_amt = db_getFundSrcBudget(m_fiscal_year, "fs_" + i);
                var budget_amt = Number(result_amt[0]['BudgetAmt']);
                var balance_amt = Number(result_amt[0]['BalanceAmt']);
                db_updateFundSrcBudget(m_fiscal_year, "fs_" + i, budget_amt, balance_amt + fund_amt);
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
        msg += "<strong>" + prop_title + "</strong> resource request " + status_change + " by " + login_name + ".<br/><br/>";
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

function sendEmailBSIFundingInstructionToCreator() {
    var res_title = $('#resource_title_full_' + resource_id).html();
    
    var result2 = new Array();
    result2 = db_getResource2(resource_id);
    var creator = result2[0]['CreatorName'];
    var email = result2[0]['CreatorEmail'];
    
    var result = new Array();
    result = db_getFundSrcType("fs_4");
    var fs_admin_name = result[0]['FundSrcAdmin'];
    var fs_admin_email = result[0]['FundSrcEmail'];
    var fs_type = result[0]['FundSrcType'];
    
    var str_url = location.href;
    str_url = str_url.replace("committeeWorksheet.html", "/doc/BSI_Funding_Request_Supplemental_Form.pdf");
    
    var Subject = "BSI Request Form";
    var Message = "Dear " + creator + ",<br/><br/>";
    Message += "Your resource request titled <b>" + res_title + "</b> was selected for " + fs_type + " as a possible funding source by committee: <b>" + login_name + "</b>.<br>";
    Message += "Please complete the PDF form <a href='" + str_url + "'>BSI Funding Request Form Fall 2015</a> send back to " + fs_admin_name + " at " + fs_admin_email + ".<br>";
    Message += "If you have any questions about completing the form, the funding source can help to answer your question.<br><br>";
    
    Message += "Thank you.<br><br>";
    Message += "IVC Fiscal Services<br>";
    Message += "IVCFiscal@ivc.edu<br>";
    Message += "x5326";
    
    proc_sendEmailWithCC(email, creator, fs_admin_email, fs_admin_name, Subject, Message);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateCommitteeMedianMean() {
    getCHPLDTFColumnArray();
    getSSAMMOColumnArray();
    getAPTCColumnArray();
    getBDRPCColumnArray();
    getIECColumnArray();
    getSPACColumnArray();
    
    getCHPLDTFMedianMean();
    getSSAMMOMedianMean();
    getAPTCMedianMean();
    getBDRPCMedianMean();
    getIECMedianMean();
    getSPACMedianMean();

    updateAllMedianMean();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getCHPLDTFColumnArray() {
    var result = new Array(); 
    result = db_getmbrCHPLDTF(login_email, true);

    ar_db_chpldtf_column.length = 0;              
    for(var i = 0; i < result.length; i++) {
        var num_column = result[i]['chpColumnName'];        
        num_column = num_column.replace("chp_mbr_", "");
        var ar_column = new Array();
        ar_column.push(num_column);
        ar_db_chpldtf_column.push(ar_column);
    }
}

function getSSAMMOColumnArray() {
    var result = new Array(); 
    result = db_getmbrSSAMMO(login_email, true);

    ar_db_ssammo_column.length = 0;             
    for(var i = 0; i < result.length; i++) {
        var num_column = result[i]['ssaColumnName'];        
        num_column = num_column.replace("ssa_mbr_", "");
        var ar_column = new Array();
        ar_column.push(num_column);
        ar_db_ssammo_column.push(ar_column);
    }
}

function getAPTCColumnArray() {
    var result = new Array(); 
    result = db_getmbrAPTC(login_email, true);

    ar_db_aptc_column.length = 0;           
    for(var i = 0; i < result.length; i++) {
        var num_column = result[i]['aptColumnName'];        
        num_column = num_column.replace("apt_mbr_", "");
        var ar_column = new Array();
        ar_column.push(num_column);
        ar_db_aptc_column.push(ar_column);
    }
}

function getBDRPCColumnArray() {
    var result = new Array(); 
    result = db_getmbrBDRPC(login_email, true);

    ar_db_bdrpc_column.length = 0;           
    for(var i = 0; i < result.length; i++) {
        var num_column = result[i]['bdrColumnName'];        
        num_column = num_column.replace("bdr_mbr_", "");
        var ar_column = new Array();
        ar_column.push(num_column);
        ar_db_bdrpc_column.push(ar_column);
    }
}

function getIECColumnArray() {
    var result = new Array(); 
    result = db_getmbrIEC(login_email, true);

    ar_db_iec_column.length = 0;           
    for(var i = 0; i < result.length; i++) {
        var num_column = result[i]['iecColumnName'];        
        num_column = num_column.replace("iec_mbr_", "");
        var ar_column = new Array();
        ar_column.push(num_column);
        ar_db_iec_column.push(ar_column);
    }
}

function getSPACColumnArray() {
    var result = new Array(); 
    result = db_getmbrSPAC(login_email, true);

    ar_db_spac_column.length = 0;           
    for(var i = 0; i < result.length; i++) {
        var num_column = result[i]['spaColumnName'];        
        num_column = num_column.replace("spa_mbr_", "");
        var ar_column = new Array();
        ar_column.push(num_column);
        ar_db_spac_column.push(ar_column);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getCHPLDTFMedianMean() {
    var result = new Array();
    result = db_getrateCHPLDTFUser(resource_id);
    
    if (result[0]['Median'] !== null) {
        ar_all_median.push(Number(result[0]['Median']));
    }
    if (result[0]['Mean'] !== null) {
        ar_all_mean.push(Number(result[0]['Mean']));
    }
}

function getSSAMMOMedianMean() {
    var result = new Array();
    result = db_getrateSSAMMOUser(resource_id);
    
    if (result[0]['Median'] !== null) {
        ar_all_median.push(Number(result[0]['Median']));
    }
    if (result[0]['Mean'] !== null) {
        ar_all_mean.push(Number(result[0]['Mean']));
    }
}

function getAPTCMedianMean() {
    var result = new Array();
    result = db_getrateAPTCUser(resource_id);
    
    if (result[0]['Median'] !== null) {
        ar_all_median.push(Number(result[0]['Median']));
    }
    if (result[0]['Mean'] !== null) {
        ar_all_mean.push(Number(result[0]['Mean']));
    }
}

function getBDRPCMedianMean() {
    var result = new Array();
    result = db_getrateBDRPCUser(resource_id);
    
    if (result[0]['Median'] !== null) {
        ar_all_median.push(Number(result[0]['Median']));
    }
    if (result[0]['Mean'] !== null) {
        ar_all_mean.push(Number(result[0]['Mean']));
    }
}

function getIECMedianMean() {
    var result = new Array();
    result = db_getrateIECUser(resource_id);
    
    if (result[0]['Median'] !== null) {
        ar_all_median.push(Number(result[0]['Median']));
    }
    if (result[0]['Mean'] !== null) {
        ar_all_mean.push(Number(result[0]['Mean']));
    }
}

function getSPACMedianMean() {
    var result = new Array();
    result = db_getrateSPACUser(resource_id);
    
    if (result[0]['Median'] !== null) {
        ar_all_median.push(Number(result[0]['Median']));
    }
    if (result[0]['Mean'] !== null) {
        ar_all_mean.push(Number(result[0]['Mean']));
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateAllMedianMean() {
    var all_median = calculateMedian(ar_all_median);
    var all_mean = calculateMean(ar_all_mean);
    
    db_updaterateAllMedianMean(resource_id, all_median, all_mean);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAllReviewPeriodList() {
    var result = new Array(); 
    result = db_getReviewPeriodList();
    
    $('#all_review_period').empty();
    var str_option = "<option value='0'>All</option>>";
    for(var i = 0; i < result.length; i++) {
       str_option += "<option value='" + result[i]['ReviewPeriodID'] + "'>" + result[i]['ReviewPeriod'] + "</option>";
    }
    str_option += "<option value='-1'>Blank</option>>";
    $("#all_review_period").append(str_option);
    
    var cur_rp_id = getCurrentDateReviewPeriod();
    if (cur_rp_id !== "") {
        $('#all_review_period').val(result[0]['ReviewPeriodID']);
        $('#all_review_period').selectpicker('refresh');
    }
}

function udpateModalNewReviewPeriod(review_period_id) {
    var result = new Array();
    result = db_getReviewPeriodByID(review_period_id);
    $('#mod_new_rp_start').html(result[0]['RPStartDate']);
    $('#mod_new_rp_end').html(result[0]['RPEndDate']);
}

function getSelectResourceRP() {
    var result = new Array();
    result = db_getResourceRP(resource_id);
    
    if (result.length === 1) {
        var result2 = new Array();
        result2 = db_getReviewPeriodByID(result[0]['ReviewPeriodID']);
        
        $('#mod_cur_rp_name').html(result2[0]['ReviewPeriod']);
        $('#mod_cur_rp_start').html(result2[0]['RPStartDate']);
        $('#mod_cur_rp_end').html(result2[0]['RPEndDate']);
    }
    else {
        $('#mod_cur_rp_name').html("");
        $('#mod_cur_rp_start').html("");
        $('#mod_cur_rp_end').html("");
    }
}

function getNewReviewPeriodList() {
    var result = new Array(); 
    result = db_getReviewPeriodList();
    
    $('#mod_new_rp_name').empty();
    var str_option = "";
    for(var i = 0; i < result.length; i++) {
       str_option += "<option value='" + result[i]['ReviewPeriodID'] + "'>" + result[i]['ReviewPeriod'] + "</option>";
    }
    $("#mod_new_rp_name").append(str_option);
    
    $('#mod_new_rp_name').val(result[0]['ReviewPeriodID']);
    $('#mod_new_rp_name').selectpicker('refresh');
    udpateModalNewReviewPeriod(result[0]['ReviewPeriodID']);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setBackToDraft(ResourceID) {
    var back_draft = db_getBacktodraft(ResourceID);
    if (back_draft === null) {
        db_insertBacktodraft(ResourceID, 1);
    }
}