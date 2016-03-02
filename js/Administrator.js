var m_master = false;
var m_login_email = "";
var m_login_name = "";

var sel_res_id = "";
var sel_res_title = "";
var sel_res_stage = "";
var sel_resource = "";
var sel_approver_id = "";
var sel_approver_email = "";
var sel_t_amount = "";
var sel_submitted_date = "";

var pre_approver_id = "";
var pre_rsid = "";

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
        setHideAllModal();
        setHideAllNavigationButton();
        setAdminOption();

        getAllResourceFiscalYear();
        setAssignToLoginName();
        getFundingSrcTypeList();
        getAdminRFList("Active", "Me", m_login_email, "All Resource", "All Program", 0, "All Request");
        initializeTable();

        var rowCount = $('#admin_rf_list tr').length - 1;
        $('#adm_list_count').html(rowCount);
        var lst_total = setListTotalAmount();
        $('#adm_list_total_amount').html(formatDollar(lst_total));
    }
    else {
        window.open('Login.html', '_self');
    }
};

function initializeTable() {
    $("#admin_rf_list").tablesorter({ 
        headers: { 
            8: {sorter:'currency'}
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
    
    // Logout //////////////////////////////////////////////////////////////////
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
    });
    
    // navigation pdf manual ///////////////////////////////////////////////////
    $('#pdf_user_manual').click(function() {
        window.open('doc/New_Resource_Request_User_Manual_v2.pdf', '_blank');
    });
    
    $('#pdf_mgr_worksheet_manual').click(function() {
        window.open('doc/Resource_Form_Mgr_Worksheet_Manual.pdf', '_blank');
    });
    
    $('#pdf_budget_timeline').click(function() {
        window.open('doc/IVC_Budget_Timeline.pdf', '_blank');
    });
    
    $('#pdf_budget_process').click(function() {
        window.open('doc/IVC_Budget_Process.pdf', '_blank');
    });
    
    // back to draft ///////////////////////////////////////////////////////////
    $('#nav_back_to_draft').click(function(e) {
        e.preventDefault();
        if (sel_res_id === "") {
            return false;
        }
        
        $('#mod_back_to_draft_body_title').html(sel_res_title);
        $('#mod_back_to_draft_status').val("Select...");
        $('#mod_back_to_draft_status').selectpicker('refresh');
        $('#mod_back_to_draft_reason').val("");
        $('#mod_back_to_draft').modal('show');
    });
    
    $('#mod_back_to_draft_yes').click(function() { 
        if (sel_res_id !== "") {
            var err = addReasonValidation();
            if (err !== "") {
                alert(err);
                return false;
            }
            
            var new_status = $('#mod_back_to_draft_status').val();
            var reason = $('#mod_back_to_draft_reason').val();
            var status_change = "";
            var note = "";
            
            if (new_status === "Back to Draft") {
                updateRFStatus(sel_res_id, 1, 0);
                db_deleteResourceStage(sel_res_id);
                
                db_deletePriority(sel_res_id);
                
                // delete mgr level rating
                db_deleterateMgr(sel_res_id);
                db_deleterateVPP(sel_res_id);
                
                // delete committee rating
                db_deleterateAll(sel_res_id);
                db_deleterateAPTC(sel_res_id);
                db_deleterateBDRPC(sel_res_id);
                db_deleterateCHPLDTF(sel_res_id);
                db_deleterateIEC(sel_res_id);
                db_deleterateSPAC(sel_res_id);
                db_deleterateSSAMMO(sel_res_id);
                
                setBackToDraft(sel_res_id);
                db_deleteResourceFSBSI(sel_res_id);
                db_updateResourcePage(sel_res_id, "Page1");
                
                status_change = "sent back to Draft stage";
                note = m_login_name + " sent back to Draft stage";
                note += "\n" + reason;
                db_insertTransactions(sel_res_id, m_login_name, note);
                emailBackToDraft(sel_res_id, m_login_name, status_change, reason);
            }
            else if (new_status === "Closed") {
                var RSID = db_getResourceStatusID(new_status);
                var stage_level_Id = db_getStageLevelID(new_status);
                
                db_updateRFStatus2(sel_res_id, RSID);
                db_updateResourceStage2(sel_res_id, stage_level_Id, RSID);

                note = m_login_name + " change status to Closed";
                note += "\n" + reason;
                db_insertTransactions(sel_res_id, m_login_name, note);
                emailToCreatorCompleted(sel_res_id, m_login_name, new_status, reason);
            }
            else if (new_status === "Partially Funded" || new_status === "Fully Funded") {
                var RSID = db_getResourceStatusID(new_status);
                var stage_level_Id = db_getStageLevelID(new_status);
                
                db_updateRFStatus2(sel_res_id, RSID);
                db_updateResourceStage2(sel_res_id, stage_level_Id, RSID);

                note = m_login_name + " change status to " + new_status;
                note += "\n" + reason;
                db_insertTransactions(sel_res_id, m_login_name, note);
                emailToCreatorCompleted(sel_res_id, m_login_name, new_status, reason);
            }
            else {
                note = m_login_name + " update funding source approved amount: " + str_approved_amt;
                note += "\n" + reason;
                db_insertTransactions(sel_res_id, m_login_name, note);
            }            
            
            reloadRFList();
        }
    });
    
    // table selection /////////////////////////////////////////////////////////
    $('table').on('click', 'tr', function (e) { 
        e.preventDefault();
        if ($(this).parent().index() === 0) {
            return false;
        }
        
        resetAdminInfo();
        sel_res_id = $(this).attr('id').replace("res_tr_", "");
        var res_title = $('#resource_ptitle_full_' + sel_res_id).html();
        sel_res_title = res_title;
        var stage = $('#resource_stage_' + sel_res_id).html();
        sel_res_stage = stage;
        var approver_id = $('#approver_ID_' + sel_res_id).html();
        sel_approver_id = approver_id;
        var approver_email = $('#approver_email_' + sel_res_id).html();
        sel_approver_email = approver_email;
        var t_amount = $('#resource_amount_' + sel_res_id).html();
        sel_t_amount = t_amount;
        
        $("[id^='res_tr_']").css('background-color', '');
        $("#res_tr_" + sel_res_id).css('background-color', '#CCCCFF');
        
        getGeneralInfo(sel_res_id);
    });
    
    // table mouseover popup ///////////////////////////////////////////////////
    $('table').on('mouseover', 'a[id^="resource_ptitle_brief_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("resource_ptitle_brief_", "");
        var ptitle_full = $('#resource_ptitle_full_' + ID).html();
        
        $(this).popover({trigger:"manual", content:ptitle_full, placement:"top"});
        $(this).popover('toggle');
    });
    
    $('table').on('mouseover', '[id^="resource_description_brief_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("resource_description_brief_", "");
        var description_full = $('#resource_description_full_' + ID).html();
        
        $(this).popover({trigger:"manual", content:description_full, placement:"bottom"});
        $(this).popover('toggle');
    });
    
    // table mouseleave popup //////////////////////////////////////////////////
    $('table').on('mouseleave', 'a[id^="resource_ptitle_brief_"]', function() {
        $(this).popover('hide');
    });
    
    $('table').on('mouseleave', '[id^="resource_description_brief_"]', function() {
        $(this).popover('hide');
    });
    
    // table row open resource form click //////////////////////////////////////
    $('table').on('click', 'a[id^="resource_ptitle_brief_"]', function(e) {
        e.preventDefault();
        if (sel_res_id !== "") {
            var currentId = $(this).attr('id');
            var ID = currentId.replace("resource_ptitle_brief_", "");
            sessionStorage.setItem('vrf_resource_id', ID);
            window.open('ViewResourceForm.html?resource_id=' + ID, '_blank');
        }
    });
    
    // add comments event //////////////////////////////////////////////////////////
    $('table').on('click', '[id^="comments_"]', function(e) {
        e.preventDefault();
        var currentId = $(this).attr('id');
        sel_res_id = currentId.replace("comments_", "");
        var stage = $('#resource_stage_' + sel_res_id).html();
        sel_res_stage = stage;
        var approver_id = $('#approver_ID_' + sel_res_id).html();
        sel_approver_id = approver_id;
        var approver_email = $('#approver_email_' + sel_res_id).html();
        sel_approver_email = approver_email;
        var t_amount = $('#resource_amount_' + sel_res_id).html();
        sel_t_amount = t_amount;
        
        var title = $('#resource_ptitle_full_' + sel_res_id).html();
        $('#mod_add_header_title').html(title);
        
        getResourceFundSrc(sel_res_id);
        if (sel_res_id !== "") {
            getSelectedTransactions(sel_res_id);
            
            if (sel_res_stage === "Facilities Review") {                
                $('#fac_section_1').show();
                $('#fac_section_2').show();
                $('#mod_add_btn_rating').hide();
                
                $('#mod_add_move_forward').show();
                $('#mod_add_note_save').hide();
                
                disableResourceFundSrc();
            }
            else if (sel_res_stage === "IT Review") {
                $('#fac_section_1').hide();
                $('#fac_section_2').hide();
                $('#mod_add_btn_rating').hide();
                
                $('#mod_add_move_forward').show();
                $('#mod_add_note_save').hide();
                
                disableResourceFundSrc();
            }
            else if (sel_res_stage === "Dean/Director" || sel_res_stage === "VP" || sel_res_stage === "President") {
                if (sel_res_stage === "Dean/Director") {
                    getMgrComments();
                }
                else {
                    getVPPComments();
                }
                
                $('#fac_section_1').hide();
                $('#fac_section_2').hide();
                $('#mod_add_btn_rating').show();
                
                $('#mod_add_move_forward').show();
                $('#mod_add_note_save').show();
                
                enableResourceFundSrc();
                getAdminPriorityValue(sel_res_id, sel_res_stage);
            }
            else {
                $('#fac_section_1').hide();
                $('#fac_section_2').hide();
                $('#mod_add_btn_rating').hide();
                
                $('#mod_add_move_forward').hide();
                $('#mod_add_note_save').show();
            }

            $('#mod_add_note').modal('show');
        } 
    });
    
    // comments proj amount change /////////////////////////////////////////////
    $('#mod_fac_rev_amount').change(function() {
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var proj_amt = Number($(this).val());
        if (proj_amt < 0.01) {
            $(this).val('');
        }
        else {
            $('#mod_fac_rev_amount').val(formatDollar(proj_amt));
        }
    });
    
    // comments funding source mouse event /////////////////////////////////////
    $(document).on('mouseover', '[id^="lable_fs_"]', function() {
        var currentId = $(this).attr('id');
        currentId = currentId.replace("lable_", "");
        var descrip = getFundSrcDescrip(currentId);
        
        $(this).popover({trigger:'manual', content:descrip, placement:'bottom', container:'body'});
        $(this).popover('toggle');
        $('.popover').css('z-index', 100000000);
    });
    
    $(document).on('mouseleave', '[id^="lable_fs_"]', function() {
        $(this).popover('hide');
    });
    
    // modal comments add comments button event ////////////////////////////////
    $('#mod_add_btn_rating').click(function() {
        var icon = $('#mod_add_icon_rating').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_add_icon_rating').attr('class', 'icon-chevron-down icon-black');
            $('#mod_add_body_rating').show();
        }
        else {
            $('#mod_add_icon_rating').attr('class', 'icon-chevron-right icon-black');
            $('#mod_add_body_rating').hide();
        }
    });
    
    $('#mod_add_btn_comments').click(function() {
        var icon = $('#mod_add_icon_comments').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_add_icon_comments').attr('class', 'icon-chevron-down icon-black');
            $('#mod_add_body_comments').show();
        }
        else {
            $('#mod_add_icon_comments').attr('class', 'icon-chevron-right icon-black');
            $('#mod_add_body_comments').hide();
        }
    });
    
    // modal comments funding src button event /////////////////////////////////
    $('#mod_add_btn_fund_src').click(function() {
        var icon = $('#mod_add_icon_fund_src').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_add_icon_fund_src').attr('class', 'icon-chevron-down icon-black');
            $('#mod_add_body_fund_src').show();
        }
        else {
            $('#mod_add_icon_fund_src').attr('class', 'icon-chevron-right icon-black');
            $('#mod_add_body_fund_src').hide();
        }
    });
    
    // modal comments history button event /////////////////////////////////////
    $('#mod_add_btn_history').click(function() {
        var icon = $('#mod_add_icon_history').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_add_icon_history').attr('class', 'icon-chevron-down icon-black');
            $('#mod_add_body_history').show();
        }
        else {
            $('#mod_add_icon_history').attr('class', 'icon-chevron-right icon-black');
            $('#mod_add_body_history').hide();
        }
    });
    
    // comments move forward button event //////////////////////////////////////
    $('#mod_add_move_forward').click(function() {
        if (sel_res_id !== "") {
            var rating_value = "-1";
            var commt_update = "";
            var sel_approver_title = "";
            var approver_list = new Array(); 
            approver_list = db_getApproverByID(sel_approver_id);
            if (approver_list.length !== 0) {
                sel_approver_title = approver_list[0]['ApproverTitle'];
            }
            else {
                alert("System error: save and move forward");
                return false;
            }
            
            if (sel_res_stage === "Facilities Review") {
                var err = facilitiesReviewValidation();
                if (err !== "") {
                    alert(err);
                    return false;
                }
                
                updateFacilitiesProjFields(sel_res_id);
                if (sel_approver_title.indexOf("Dean") !== -1 || sel_approver_title.indexOf("Director") !== -1) {
                    moveToDeanDirector(sel_res_id, sel_approver_id);
                }
                else if (sel_approver_title.indexOf("Vice Pres") !== -1) {
                    moveToVP(sel_res_id, sel_approver_id);
                }
                else {
                    moveToPresident(sel_res_id, sel_approver_id);
                }
                commt_update += m_login_name + ": Facilities Review completed and move forward";
            }
            else if (sel_res_stage === "IT Review") {
                if (sel_approver_title.indexOf("Dean") !== -1 || sel_approver_title.indexOf("Director") !== -1) {
                    moveToDeanDirector(sel_res_id, sel_approver_id);
                }
                else if (sel_approver_title.indexOf("Vice Pres") !== -1) {
                    moveToVP(sel_res_id, sel_approver_id);
                }
                else {
                    moveToPresident(sel_res_id, sel_approver_id);
                }

                commt_update += m_login_name + ": IT Review completed and move forward";
            }
            else if (sel_res_stage === "Dean/Director") {
                var err_comments = addCommentsValidation();
                var rdo_rating = $('input:radio[name=mod_add_rdo_rating]').is(':checked');
                if (!rdo_rating|| err_comments !== "") {
                    var err = err_comments;
                    if (!rdo_rating) {
                        err += "\n" + "Rating value (0 - 5) is a required";
                    }
                    alert(err);
                    return false;
                }
                else {
                    rating_value = $('input[name="mod_add_rdo_rating"]:checked').val();
                    commt_update += m_login_name + " Saved rating : " + rating_value + "\n";
                }   
                
                var err_fund_src = updateFundSrcValidation();
                if (err_fund_src === "") {
                    var err_fs_comments = updateFundSrcCommentsValidation();
                    if (err_fs_comments !== "") {
                        alert(err_fs_comments);
                        return false;
                    }
                    updateResourceFundSrc(sel_res_id, true);
                    commt_update += m_login_name + ": Funding sources changed\nFrom: " + getUpdateFundSrcNote() + "\n";
                }
                if ($('#mgr_fs_comments').val() !== "") {
                    db_insertResourceFundSrcLog(sel_res_id, m_login_name, textReplaceApostrophe($('#mgr_fs_comments').val()));
                }
                    
                db_updatePriorityMgr(sel_res_id, rating_value);   
                db_updaterateMgrRating(sel_res_id, sel_approver_id, rating_value);
                
                var new_approver_id = searchNewApproverID(sel_approver_email);
                moveToVP(sel_res_id, new_approver_id);
                commt_update += m_login_name + ": Move forward to VP/President";
                
                db_updateCommentsMgr(sel_res_id, sel_approver_id, textReplaceApostrophe($('#mod_add_note_body').val()));
            }
            else {
                var err_comments = addCommentsValidation();
                var rdo_rating = $('input:radio[name=mod_add_rdo_rating]').is(':checked');
                if (!rdo_rating|| err_comments !== "") {
                    var err = err_comments;
                    if (!rdo_rating) {
                        err += "\n" + "Rating value (0 - 5) is a required";
                    }
                    alert(err);
                    return false;
                }
                else {
                    rating_value = $('input[name="mod_add_rdo_rating"]:checked').val();
                    commt_update += m_login_name + " Saved rating : " + rating_value + "\n";
                }
                
                var err_fund_src = updateFundSrcValidation();
                if (err_fund_src === "") {
                    var err_fs_comments = updateFundSrcCommentsValidation();
                    if (err_fs_comments !== "") {
                        alert(err_fs_comments);
                        return false;
                    }
                    updateResourceFundSrc(sel_res_id, true);
                    commt_update += m_login_name + ": Funding sources changed\nFrom: " + getUpdateFundSrcNote() + "\n";
                }
                if ($('#mgr_fs_comments').val() !== "") {
                    db_insertResourceFundSrcLog(sel_res_id, m_login_name, textReplaceApostrophe($('#mgr_fs_comments').val()));
                }
                
                db_updatePriorityVPP(sel_res_id, rating_value);  
                db_updaterateVPPRating(sel_res_id, sel_approver_id, rating_value);
                
                moveToSPAC(sel_res_id, sel_approver_id);
                db_updaterateSPACActive(sel_res_id, true);
                commt_update += m_login_name + ": Move forward to SPAC";
                
                // copy mgr/vpp rating to committee rating
                copyMgrVPPRatingToCommittee(sel_approver_id, rating_value);
                
                db_updateCommentsVPP(sel_res_id, sel_approver_id, textReplaceApostrophe($('#mod_add_note_body').val()));
            }
            
            var note = commt_update;
            var comments = $('#mod_add_note_body').val();
            if (comments !== "") {
                note += "\n" + comments;
            }
            
            db_insertTransactions(sel_res_id, m_login_name, note);
            resetAddNoteFields();
            reloadRFList();
        }
    });
    
    // comments save button event //////////////////////////////////////////////
    $('#mod_add_note_save').click(function() {       
        if (sel_res_id !== "") {
            var rating_value = "-1";
            
            if ($('input:radio[name=mod_add_rdo_rating]').is(':checked')) {
                rating_value = $('input[name="mod_add_rdo_rating"]:checked').val();
            }           
            var err_comments = addCommentsValidation();
            var err_fund_src = updateFundSrcValidation();
            
            // save validation, nothing to save
            if (rating_value === "-1" && err_comments !== "" && err_fund_src !== "") {
                alert("You did not select rating or entered comments or " + err_fund_src);
                return false;
            }
            
            // update mgr worksheet rating and comments
            if (sel_res_stage === "Dean/Director") {
                if (rating_value !== "-1") {
                    db_updatePriorityMgr(sel_res_id, rating_value);
                }
                db_updateCommentsMgr(sel_res_id, sel_approver_id, textReplaceApostrophe($('#mod_add_note_body').val()));
            }
            else if (sel_res_stage === "VP" || sel_res_stage === "President") {
                if (rating_value !== "-1") {
                    db_updatePriorityVPP(sel_res_id, rating_value);
                }
                db_updateCommentsVPP(sel_res_id, sel_approver_id, textReplaceApostrophe($('#mod_add_note_body').val()));
            }

            // funding src change log
            if (err_fund_src === "") {
                updateResourceFundSrc(sel_res_id, false);
                var note = m_login_name + ": Funding sources changed\nFrom: " + getUpdateFundSrcNote();
                db_insertTransactions(sel_res_id, m_login_name, note);
            }
            
            resetAddNoteFields();
            reloadRFList();
        }
    });
    
    // comments close button event /////////////////////////////////////////////
    $('#mod_add_note_x').click(function() {
        resetAddNoteFields();
    });
    
    $('#mod_add_note_close').click(function() {
        resetAddNoteFields();
    });
    
    // fiscal year refresh button click ////////////////////////////////////////
    $('#all_fiscal_yrs').change(function() {
        reloadRFList();
    });
    
    // filter refresh button click /////////////////////////////////////////////
    $('#adm_refresh').click(function() {     
        reloadRFList();
        if (!m_master) {
            if ($('#adm_committee').val() === "Me") {
                $('#nav_back_to_draft').show();
            }
            else {
                $('#nav_back_to_draft').hide();
            }
        }
    });
    
    // export excel button click ///////////////////////////////////////////////
    $('#export_excel').click(function() {        
        var url_html = expoftToExcelURLParameters();        
        location.href = "php/csv_saveAdminRFListToCSV.php?" + url_html;
    });
    
    // change approver /////////////////////////////////////////////////////////
    $('#nav_change_approver').click(function(e) {
        e.preventDefault();
        if (sel_res_id === "") {
            return false;
        }
        
        $('#mod_approver_body_title').html(sel_res_title);
        
        getApproverList();
        getResourceStatusList();
        getStageLevelList();
        
        getSelectedApproverResourceForm(sel_res_id);
        getSelectedApproverStageLevel(sel_res_id);
        
        pre_approver_id = $('#mod_rf_approver_list').val();
        pre_rsid = $('#mod_rf_approver_rs_status').val();
        
        $('#mod_rs_approver_comments').val("");
        $('#mod_approver').modal('show');
    });
    
    $('#mod_approver_yes').click(function() { 
        if (sel_res_id !== "") {
            var rf_approverID = $('#mod_rf_approver_list').val();
            var rf_RSID = $('#mod_rf_approver_rs_status').val();  
            var comments = $('#mod_rs_approver_comments').val(); 
            if (comments === "") {
                alert("Comments is a required field");
                return false;
            }
            
            db_updateRFStatus(sel_res_id, rf_RSID, rf_approverID);
            
            var rs_stage_level_ID = $('#mod_rs_approver_stage_level').val();
            var rs_approver_ID = $('#mod_rs_approver_list').val();
            var rs_resource_status_ID = $('#mod_rs_approver_rs_status').val();
            db_updateResourceStage(sel_res_id, rs_stage_level_ID, rs_approver_ID, rs_resource_status_ID);
            
            var pre_approver_name = getApproverName(pre_approver_id);
            var pre_resource_status = db_getResourceStatusName(pre_rsid);
            var new_approver_name = getApproverName(rf_approverID);
            var new_resource_status = db_getResourceStatusName(rf_RSID); 
            
            var note = m_login_name + " changed approver and status/committee\n";
            note += "Previous Approver: " + pre_approver_name + " to New Approver: " + new_approver_name + "\n";
            note += "Previous Status/Committee: " + pre_resource_status + " to New Status/Committee: " + new_resource_status;
            note += "\n" + comments;
            
            db_insertTransactions(sel_res_id, m_login_name, note);
        }
        
        reloadRFList();
    });
    
    // bootstrap filestyle
    $(":file").filestyle({classButton: "btn btn-primary"});
    
    // popover
    $('#header_mgr').popover({content:"Dean or Director<br>\n\
                                        0=Not needed at this time or in the near future<br>\n\
                                        1=Needs to wait until next year or subsequent years; effect on the program is not clear<br>\n\
                                        2=Can wait until next year or subsequent years; delay will not have an immediate adverse impact on the program<br>\n\
                                        3=Highly desirable this year; doing without may diminish program effectiveness<br>\n\
                                        4=Essential need for a program; doing without for more than a year may do serious harm<br>\n\
                                        5=Absolutely essential; if funding is not provided it this year; the college will be at immediate risk for health/safety/liability reasons or loss of a program's ability to serve enrolled students",
                              placement:"bottom"});
    $('#header_vpp').popover({content:"Vice President or President<br>\n\
                                        0=Not needed at this time or in the near future<br>\n\
                                        1=Needs to wait until next year or subsequent years; effect on the program is not clear<br>\n\
                                        2=Can wait until next year or subsequent years; delay will not have an immediate adverse impact on the program<br>\n\
                                        3=Highly desirable this year; doing without may diminish program effectiveness<br>\n\
                                        4=Essential need for a program; doing without for more than a year may do serious harm<br>\n\
                                        5=Absolutely essential; if funding is not provided it this year; the college will be at immediate risk for health/safety/liability reasons or loss of a program's ability to serve enrolled students",
                              placement:"bottom"});
    
    // auto size
    $('#mod_add_note_body').autosize();
    $('#mod_back_to_draft_reason').autosize();
    $('#mod_fac_rev_description').autosize();
    $('#mod_tec_rev_note').autosize();
    $('#mod_rs_approver_comments').autosize();
    $('#mgr_fs_comments').autosize();
    
    // selectpicker
    $('.selectpicker').selectpicker();
    
    // move popup dialog
    $("#mod_add_note").draggable({
        handle: ".modal-header"
    });
    $("#mod_back_to_draft").draggable({
        handle: ".modal-header"
    });
    $("#mod_approver").draggable({
        handle: ".modal-header"
    });
});

////////////////////////////////////////////////////////////////////////////////
function setHideAllModal() {
    $('#mod_add_note').modal('hide');
    $('#mod_back_to_draft').modal('hide');
    $('#mod_approver').modal('hide');
    
    // hide comments body
    $('#mod_add_body_rating').hide();
    $('#mod_add_body_comments').hide();
    $('#mod_add_body_fund_src').hide();
    $('#mod_add_body_history').hide();
}

function setHideAllNavigationButton() {
//    $('#nav_back_to_draft').hide();
    $('#nav_change_approver').hide();
    $('#nav_committee_rating').hide();
}

function setAdminOption() {
    m_login_email = sessionStorage.getItem('m1_loginEmail');
    m_login_name = sessionStorage.getItem('m1_loginName');
    
    if (m_login_email === "ykim160@ivc.edu" || m_login_email === "bhagan@ivc.edu" || m_login_email === "dkhachatryan@ivc.edu" || m_login_email === "jcalderin@ivc.edu") {
//        $('#nav_back_to_draft').show();
        $('#nav_change_approver').show();
        $('#nav_committee_rating').show();
        m_master = true;
    }
}

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

function setAssignToLoginName() {
    var pos = m_login_name.indexOf(' ');
    var first_name = m_login_name.substr(0, pos);
    $('#committee_login_user').html("Me (" + first_name + ")");
    $('#adm_committee').selectpicker('refresh');
}

function getFundingSrcTypeList() {
    var result = new Array();
    result = db_getFundSrcTypeAll();
    
    var tbl_html = "<option value='0'>Multiple</option>";
    for(var i = 0; i < result.length; i++) {
        tbl_html += "<option value='" + result[i]['FundSrcTypeID'] + "'>" + result[i]['FundSrcType'] + "</option>";
    }
    
    $("#adm_fund_src").append(tbl_html);
    $("#adm_fund_src").selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function reloadRFList() {
    refreshAdminRFList();
    $('#admin_rf_list').trigger("update");
    $('#admin_rf_list').trigger("appendCache");

    var rowCount = $('#admin_rf_list tr').length - 1;
    $('#adm_list_count').html(rowCount);
    var lst_total = setListTotalAmount();
    $('#adm_list_total_amount').html(formatDollar(lst_total));
}

function refreshAdminRFList() {
    sel_res_id = "";
    sel_res_title = "";
    sel_res_stage = "";
    sel_resource = "";
    sel_approver_id = "";
    sel_approver_email = "";
    sel_t_amount = "";

    var status = $('#adm_status').val();
    var stage_level = $('#adm_committee').val();
    var stage_app_email = sessionStorage.getItem("m1_loginEmail");
    var resource_type = $('#adm_resource_type').val();
    var program = $('#adm_program').val();
    var funding = $('#adm_fund_src').val();
    var one_time = $('#adm_one_time').val();

    getAdminRFList(status, stage_level, stage_app_email, resource_type, program, funding, one_time);
    initializeTable();
}

////////////////////////////////////////////////////////////////////////////////
function expoftToExcelURLParameters() {
    var fiscal_yrs = $('#all_fiscal_yrs').val();
    var status = $('#adm_status').val();
    var stage_level = $('#adm_committee').val();
    var stage_app_email = sessionStorage.getItem("m1_loginEmail");
    var resource_type = $('#adm_resource_type').val();
    var program = $('#adm_program').val();
    var funding = $('#adm_fund_src').val();
    var one_time = $('#adm_one_time').val();
    
    return "FiscalYear=" + fiscal_yrs + "&Status=" + status + "&StageLevel=" + stage_level + "&StageAppEmail=" + stage_app_email + "&ResourceType=" + resource_type + "&Program=" + program + "&FundingSrc=" + funding + "&OneTime=" + one_time; 
}

////////////////////////////////////////////////////////////////////////////////
function getAdminRFList(Status, StageLevel, StageAppEmail, ResourceType, Program, FundSrc, OneTime) { 
    var admin_rf_list = new Array(); 
    admin_rf_list = db_getAdminRFList($('#all_fiscal_yrs').val(), Status, StageLevel, StageAppEmail, ResourceType, Program, FundSrc, OneTime);
    
    $('#body_tr').empty();
    if (admin_rf_list.length !== 0) {
        for(var i = 0; i < admin_rf_list.length; i++) { 
            var str_totalAmount = "";
            var f_totalAmount = parseFloat(admin_rf_list[i]['TotalAmount']);
            if (f_totalAmount > 0) {
                str_totalAmount = formatDollar(f_totalAmount);
            }
            setResourceFormList(admin_rf_list[i]['ResourceID'], admin_rf_list[i]['ProposalTitle'], admin_rf_list[i]['NeedFor'], admin_rf_list[i]['ResourceLink'], admin_rf_list[i]['StageLevel'], 
                                str_totalAmount, admin_rf_list[i]['ResourceType'], admin_rf_list[i]['ApproverEmail'], admin_rf_list[i]['ApprovalID'],
                                admin_rf_list[i]['CreatorName'], admin_rf_list[i]['Funding'], admin_rf_list[i]['NeedBy']);
            
            setMgrPriorityFields(admin_rf_list[i]['ResourceID'], admin_rf_list[i]['DepartMgr']);
            setVPPPriorityFields(admin_rf_list[i]['ResourceID'], admin_rf_list[i]['VPP']);
        }
    }
}

function setResourceFormList(ResourceID, PTile, description, Link, Stage, TotalAmount, RType, approver_email, approver_ID, creator_name, funding, need_by) {    
    var brief_ptitle = textTruncate(20, PTile);
    //var brief_description = textTruncate(15, description);
        
    var tbl_html = "<tr class='row_tr' id='res_tr_" + ResourceID + "'>";
    tbl_html += "<td class='span1'>" + ResourceID + "</td>";
    tbl_html += "<td class='span3'><a href=# id='resource_ptitle_brief_" + ResourceID +  "'>" + brief_ptitle + "</a></td>";
    tbl_html += "<td class='span1'>" + Link + "</td>";
    tbl_html += "<td class='span2' id='resource_stage_" + ResourceID + "'>" + Stage + "</td>"; 
    tbl_html += "<td class='span2'>" + need_by + "</td>";
    //tbl_html += "<td class='span3' id='resource_description_brief_" + ResourceID +  "'>" + brief_description + "</td>"; 
    tbl_html += "<td class='span3' id='resource_creator_" + ResourceID + "'>" + creator_name + "</td>";
    tbl_html += "<td class='span3' id='resource_type_" + ResourceID + "'>" + RType + "</td>";
    
    if (funding === null) {
        tbl_html += "<td class='span2' id='resource_funding_" + ResourceID + "'>Multiple</td>";
    }
    else {
        tbl_html += "<td class='span2' id='resource_funding_" + ResourceID + "'>" + funding + "</td>";
    }
    
    tbl_html += "<td class='col_100' style='text-align: right;' id='resource_amount_" + ResourceID + "'>" + TotalAmount + "</td>";
    
    if ((m_login_email === approver_email || m_master) && (Stage === "IT Review" || Stage === "Facilities Review" || Stage === "Dean/Director" || Stage === "VP" || Stage === "President")) {
        tbl_html += "<td class='col_30 form-horizontal'><button class='btn btn-mini col_30' id='comments_" + ResourceID + "'><i class='icon-pencil icon-black'></i></button></td>";
    }
    else {
        tbl_html += "<td class='col_30 form-horizontal'></td>";
    }
    
    tbl_html += "<td class='col_50' style='text-align: center;' id='mgr_" + ResourceID + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='vpp_" + ResourceID + "'></td>";
    tbl_html += "<td class='span1' style='display: none;' id='resource_ptitle_full_" + ResourceID + "'>" + PTile + "</td>";
    //tbl_html += "<td class='span1' style='display: none;' id='resource_description_full_" + ResourceID + "'>" + description + "</td>";
    tbl_html += "<td class='span1' style='display: none;' id='approver_email_" + ResourceID + "'>" + approver_email + "</td>";
    tbl_html += "<td class='span1' style='display: none;' id='approver_ID_" + ResourceID + "'>" + approver_ID + "</td>";
    
    $("#body_tr").append(tbl_html);
}

function setMgrPriorityFields(ResourceID, mgr) {
    if (mgr !== "-1") {
        $('#mgr_' + ResourceID).html(mgr);
    }
}

function setVPPPriorityFields(ResourceID, vpp) {
    if (vpp !== "-1") {
        $('#vpp_' + ResourceID).html(vpp);
    }
}

////////////////////////////////////////////////////////////////////////////////
function getGeneralInfo(ResourceID) {   
    var result = new Array(new Array()); 
    $.ajax({
        type:"POST",
        url:"php/db_getResourceNewRType.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    if (result[0].length !== 0) {
        sel_submitted_date = result[0][3];
        sel_resource = result[0][7];
    }
}

////////////////////////////////////////////////////////////////////////////////
function getSelectedTransactions(ResourceID) {
    $('#mod_note_body').html("");
    
    var note_list = new Array(); 
    note_list = db_getTransactions(ResourceID);
    
    var note_html = "";
    if (note_list.length !== 0) {
        for(var i = 0; i < note_list.length; i++) { 
            var db_note = note_list[i][2];
            var html_note = db_note.replace(/\n/g, "</br>");
            note_html += note_list[i][0] + "</br>" + html_note + "</br></br>";
        }
    }
    
    $('#mod_note_body').html(note_html);
}

function insertSelectedTransaction(ResourceID, pre_fs, new_fs) {
    var note = m_login_name + " updated funding source from " + pre_fs + " to " + new_fs;
    db_insertTransactions(ResourceID, m_login_name, note);
}

////////////////////////////////////////////////////////////////////////////////
function resetAdminInfo() {
    sel_res_id = "";
    sel_res_title = "";
    sel_res_stage = "";
    sel_resource = "";
    sel_approver_id = "";
    sel_approver_email = "";
    sel_t_amount = "";
}

function resetAddNoteFields() {    
    $('#mod_fac_rev_amount').val("");
    $('#mod_fac_rev_description').val("").trigger('autosize.resize');
    
    $('#mod_add_note_body').val("").trigger('autosize.resize');
    $('#mgr_fs_comments').val("").trigger('autosize.resize');
    $('#mod_note_body').html("");
    
    $('input[name="mod_add_rdo_rating"]').prop('checked', false);
    
    // hide comments body
    $('#mod_add_body_rating').hide();
    $('#mod_add_body_comments').hide();
    $('#mod_add_body_fund_src').hide();
    $('#mod_add_body_history').hide();
    
    $('#mod_add_icon_rating').attr('class', 'icon-chevron-right icon-black');
    $('#mod_add_icon_comments').attr('class', 'icon-chevron-right icon-black');
    $('#mod_add_icon_fund_src').attr('class', 'icon-chevron-right icon-black');
    $('#mod_add_icon_history').attr('class', 'icon-chevron-right icon-black');
}

////////////////////////////////////////////////////////////////////////////////
function facilitiesReviewValidation() {
    var err = "";
    
    if ($('#mod_fac_rev_amount').val().replace(/\s+/g, '') === "") {
        err += "Proj Amount is required\n";
    }
    if ($('#mod_fac_rev_description').val().replace(/\s+/g, '') === "") {
        err += "Proj Description is required\n";
    }
    if ($('#mod_add_note_body').val().replace(/\s+/g, '') === "") {
        err += "Comments is required\n";
    }
    
    return err;
}

function addCommentsValidation() {
    var err = "";
    
    if ($('#mod_add_note_body').val().replace(/\s+/g, '') === "") {
        err = "Comments is required\n";
    }
    
    return err;
}

function addReasonValidation() {
    var err = "";
    
    if ($('#mod_back_to_draft_reason').val().replace(/\s+/g, '') === "") {
        err = "Reason is required\n";
    }
    
    return err;
}

function updateFundSrcValidation() {
    var bFS_changed = false;
    
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
        bFS_changed = true;
    }
    
    if (bFS_changed) {
        return "";
    }
    else {
        return "funding sources not changes";
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
function updateFacilitiesProjFields(ResourceID) {
    var ProjAmt = revertDollar($('#mod_fac_rev_amount').val());
    var ProjDescrip = $('#mod_fac_rev_description').val();
    
    db_updateProjFacilities(ResourceID, ProjAmt, ProjDescrip);
}

////////////////////////////////////////////////////////////////////////////////
function moveToDeanDirector(ResourceID, ApproverID) {
    var StageLevelID = db_getStageLevelID("Dean/Director");
    var ResourceStatusID = db_getResourceStatusID("Dean/Director");
    
    db_updateRFStatus(ResourceID, ResourceStatusID, ApproverID);
    db_updateResourceStage(ResourceID, StageLevelID, ApproverID, ResourceStatusID);
}

function moveToVP(ResourceID, ApproverID) {
    var StageLevelID = db_getStageLevelID("VP");
    var ResourceStatusID = db_getResourceStatusID("VP");
    
    db_updateRFStatus(ResourceID, ResourceStatusID, ApproverID);
    db_updateResourceStage(ResourceID, StageLevelID, ApproverID, ResourceStatusID);
}

function moveToPresident(ResourceID, ApproverID) {
    var StageLevelID = db_getStageLevelID("President");
    var ResourceStatusID = db_getResourceStatusID("President");
    
    db_updateRFStatus(ResourceID, ResourceStatusID, ApproverID);
    db_updateResourceStage(ResourceID, StageLevelID, ApproverID, ResourceStatusID);
}

function moveToSPAC(ResourceID, ApproverID) {
    var StageLevelID = db_getStageLevelID("SPAC");
    var ResourceStatusID = db_getResourceStatusID("SPAC");
    
    db_updateRFStatus(ResourceID, ResourceStatusID, ApproverID);
    db_updateResourceStage(ResourceID, StageLevelID, ApproverID, ResourceStatusID);
}

function searchNewApproverID(cur_app_email) {
    var result2 = new Array();
    result2 = getUserManagerInfo(cur_app_email);
    var nAppEmail = "";
    
    if (result2.length !== 0) {
        nAppEmail = result2[5];
    }

    var nAppID = db_getApproverID(nAppEmail);
    if (nAppID !== "") {
        return nAppID;
    }
    else {
        return "";
    }
}

function getUserManagerInfo(searchUserEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        datatype:"json",
        url:"php/searchUser.php",
        data:{searchUserEmail:searchUserEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

////////////////////////////////////////////////////////////////////////////////
//function updateStageAllTableRows(cur_resource, new_appid, slid, rsid) {
//    var rowCount = $('#admin_rf_list tr').length;
//    for (var i = 1; i < rowCount; i++) {
//        var stage = $('#admin_rf_list tr').eq(i).find('td[id^="resource_stage_"]').html();
//        if (stage === cur_resource) {
//            var curentId = $('#admin_rf_list tr').eq(i).find('td[id^="resource_stage_"]').attr('id');
//            var ResourceID = curentId.replace("resource_stage_", "");
//        }
//    }
//}

////////////////////////////////////////////////////////////////////////////////
function setListTotalAmount() {
    var f_list_total = 0.0;
    var rowCount = $('#admin_rf_list tr').length;
    for (var i = 1; i < rowCount; i++) {
        var amount = $('#admin_rf_list tr').eq(i).find('td[id^="resource_amount_"]').html();
        if (amount !== "") {
            var f_amount = revertDollar(amount);
            f_list_total += f_amount;
        }
    }
    
    return f_list_total;
}

function setBackToDraft(ResourceID) {
    var back_draft = db_getBacktodraft(ResourceID);
    if (back_draft === null) {
        db_insertBacktodraft(ResourceID, 1);
    }
}

////////////////////////////////////////////////////////////////////////////////
function getApproverList() {
    var approver_list = new Array(); 
    approver_list = db_getApproverList();
    
    $('#mod_rf_approver_list').empty();
    $('#mod_rs_approver_list').empty();
    
    var html = "";
    for(var i = 0; i < approver_list.length; i++) { 
        var ApproverID = approver_list[i][0];
        var ApproverName = approver_list[i][1];
        html += "<option value='" + ApproverID + "'>" + ApproverName + "</option>";
    }
    
    $("#mod_rf_approver_list").append(html);
    $('#mod_rf_approver_list').selectpicker('refresh');
    
    $("#mod_rs_approver_list").append(html);
    $('#mod_rs_approver_list').selectpicker('refresh');
}

function getResourceStatusList() {
    var resource_status_list = new Array(); 
    resource_status_list = db_getResourceStatusList();
    
    $('#mod_rf_approver_rs_status').empty();
    $('#mod_rs_approver_rs_status').empty();
    
    var html = "";
    for(var i = 0; i < resource_status_list.length; i++) { 
        var RSID = resource_status_list[i][0];
        var ResourceStatus = resource_status_list[i][1];
        html += "<option value='" + RSID + "'>" + ResourceStatus + "</option>";
    }
    
    $("#mod_rf_approver_rs_status").append(html);
    $('#mod_rf_approver_rs_status').selectpicker('refresh');
    
    $("#mod_rs_approver_rs_status").append(html);
    $('#mod_rs_approver_rs_status').selectpicker('refresh');
}

function getStageLevelList() {
    var stage_level_list = new Array(); 
    stage_level_list = db_getStageLevelList();
    
    $('#mod_rs_approver_stage_level').empty();
    
    var html = "";
    for(var i = 0; i < stage_level_list.length; i++) { 
        var StageLevelID = stage_level_list[i][0];
        var StageLevel = stage_level_list[i][1];
        html += "<option value='" + StageLevelID + "'>" + StageLevel + "</option>";
    }
    
    $("#mod_rs_approver_stage_level").append(html);
    $('#mod_rs_approver_stage_level').selectpicker('refresh');
}

function getSelectedApproverResourceForm(ResourceID) {
    var selected_RF = new Array(); 
    selected_RF = db_getResourceFormSelected(ResourceID);
    
    var ApproverID = selected_RF[0][12];
    var RSID = selected_RF[0][13];
    
    $('#mod_rf_approver_list').val(ApproverID);
    $('#mod_rf_approver_list').selectpicker('refresh');
    
    $('#mod_rf_approver_rs_status').val(RSID);
    $('#mod_rf_approver_rs_status').selectpicker('refresh');
}

function getSelectedApproverStageLevel(ResourceID) {
    var selected_RS = new Array(); 
    selected_RS = db_getResourceStageSelected(ResourceID);
    
    var StageLevelID = selected_RS[0][2];
    var ApproverID = selected_RS[0][3];
    var ResourceStatusID = selected_RS[0][4];
    
    $('#mod_rs_approver_stage_level').val(StageLevelID);
    $('#mod_rs_approver_stage_level').selectpicker('refresh');
    
    $('#mod_rs_approver_list').val(ApproverID);
    $('#mod_rs_approver_list').selectpicker('refresh');
    
    $('#mod_rs_approver_rs_status').val(ResourceStatusID);
    $('#mod_rs_approver_rs_status').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function htmlAmount(amount) {
    if (amount > 0) {
        return formatDollar(amount);
    }
    else {
        return "";
    }
}

function calculateTotalApprovedAmount() {
    var gen_amt = revertDollar($('#sel_amt_general').val());
    var per_amt = revertDollar($('#sel_amt_perkins').val());
    var bsi_amt = revertDollar($('#sel_amt_bsi').val());
    var fou_amt = revertDollar($('#sel_amt_ivc_foundation').val());
    var asi_amt = revertDollar($('#sel_amt_asivc').val());
    var oth_amt = revertDollar($('#sel_amt_other').val());
    var t_amt = gen_amt + per_amt + bsi_amt + fou_amt + asi_amt + oth_amt;
    $('#sel_amt_approved').html(htmlAmount(t_amt));
}

////////////////////////////////////////////////////////////////////////////////
function getAdminPriorityValue(ResourceID, Stage) {
    var value = "-1";
    
    if (Stage === "Dean/Director") {
        value = $('#mgr_' + ResourceID).html();
    } 
    else {
        value = $('#vpp_' + ResourceID).html();
    }
    
    $('input:radio[name=mod_add_rdo_rating][value="' + value + '"]').prop('checked', true);
}

////////////////////////////////////////////////////////////////////////////////
function disableResourceFundSrc() {
    $("#fs_1").attr('disabled', true);
    $("#fs_2").attr('disabled', true);
    $("#fs_3").attr('disabled', true);
    $("#fs_4").attr('disabled', true);
    $("#fs_5").attr('disabled', true);
    $("#fs_6").attr('disabled', true);
    $("#fs_7").attr('disabled', true);
    $("#fs_8").attr('disabled', true);
    $("#fs_9").attr('disabled', true);
    $("#fs_10").attr('disabled', true);
    $("#fs_11").attr('disabled', true);
    $("#fs_12").attr('disabled', true);
    $("#fs_13").attr('disabled', true);
    $("#fs_14").attr('disabled', true);
    $("#fs_15").attr('disabled', true);
    $("#fs_16").attr('disabled', true);
    $("#fs_17").attr('disabled', true);
    $("#fs_18").attr('disabled', true);
    $("#fs_19").attr('disabled', true);
    $("#fs_20").attr('disabled', true);
    $("#fs_21").attr('disabled', true);
    $("#fs_22").attr('disabled', true);
    $("#fs_23").attr('disabled', true);
}

function enableResourceFundSrc() {
    $("#fs_1").attr('disabled', false);
    $("#fs_2").attr('disabled', false);
    $("#fs_3").attr('disabled', false);
    $("#fs_4").attr('disabled', false);
    $("#fs_5").attr('disabled', false);
    $("#fs_6").attr('disabled', false);
    $("#fs_7").attr('disabled', false);
    $("#fs_8").attr('disabled', false);
    $("#fs_9").attr('disabled', false);
    $("#fs_10").attr('disabled', false);
    $("#fs_11").attr('disabled', false);
    $("#fs_12").attr('disabled', false);
    $("#fs_13").attr('disabled', false);
    $("#fs_14").attr('disabled', false);
    $("#fs_15").attr('disabled', false);
    $("#fs_16").attr('disabled', false);
    $("#fs_17").attr('disabled', false);
    $("#fs_18").attr('disabled', false);
    $("#fs_19").attr('disabled', false);
    $("#fs_20").attr('disabled', false);
    $("#fs_21").attr('disabled', false);
    $("#fs_22").attr('disabled', false);
    $("#fs_23").attr('disabled', false);
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

function getResourceFundSrc(ResourceID) {
    resetPreviousFundSrc();
    resetResourceFundSrc();
    
    var result = new Array(); 
    result = db_getResourceFundSrc(ResourceID);
    
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
        $('#fund_source_comments').html(getResourceFundSrcLog(ResourceID, requestor_fs_comments));
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

function updateResourceFundSrc(ResourceID, moveforward) {
    db_updateResourceFundSrc(ResourceID, new_fs_1, new_fs_2, new_fs_3, new_fs_4, new_fs_5, new_fs_6, new_fs_7, new_fs_8, new_fs_9, new_fs_10,
                            new_fs_11, new_fs_12, new_fs_13, new_fs_14, new_fs_15, new_fs_16, new_fs_17, new_fs_18, new_fs_19, new_fs_20, new_fs_21, new_fs_22, new_fs_23, requestor_fs_comments);
                     
    // send BSI instruction email
    if (new_fs_4 && moveforward) {
        if (db_getResourceFSBSI(sel_res_id) === null) {
            db_insertResourceFSBSI(sel_res_id);
            sendEmailBSIFundingInstructionToCreator();
        }
    }
}

function getFundSrcDescrip(fund_src_col) {
    var result = new Array();
    result = db_getFundSrcType(fund_src_col);
    
    if (result.length === 1) {
        return result[0]['FundSrcDescrip'].toString();
    }
    else {
        return "";
    }
}

function getFundSrcType(fund_src_col) {
    var result = new Array();
    result = db_getFundSrcType(fund_src_col);
    
    return result[0]['FundSrcType'];
}

////////////////////////////////////////////////////////////////////////////////
function getApproverName(ApproverID) {
    var result = new Array();
    result = db_getApproverByID(ApproverID);
    
    if (result.length !== 0) {
        return result[0]['ApproverName'];
    }
    else {
        return "";
    }
}

////////////////////////////////////////////////////////////////////////////////
function getMgrComments() {
    var mgr_comments = db_getCommentsMgr(sel_res_id);
    if (mgr_comments !== null) {
        $('#mod_add_note_body').val(mgr_comments).trigger('autosize.resize');
    }
    else {
        db_insertCommentsMgr(sel_res_id, sel_approver_id, "");
    }
}

function getVPPComments() {
    var vpp_comments = db_getCommentsVPP(sel_res_id);
    if (vpp_comments !== null) {
        $('#mod_add_note_body').val(vpp_comments).trigger('autosize.resize');
    }
    else {
        db_insertCommentsVPP(sel_res_id, sel_approver_id, "");
    }
}

////////////////////////////////////////////////////////////////////////////////
function copyMgrVPPRatingToCommittee(vpp_id, vpp_rating) {
    // manager rating value
    var mgr_email = "";
    var mgr_rating = "";
    var mgr_info = new Array();
    mgr_info = db_getrateMgr(sel_res_id);
    
    if (mgr_info.length === 0) {
        return false;
    }
    else {
        mgr_email = mgr_info[0]['ApproverEmail'];
        mgr_rating = mgr_info[0]['mgr_Rating'];
    }
    
    var vpp_email = "";
    var vpp_info = new Array();
    vpp_info = db_getApproverByID(vpp_id);
    if (vpp_info.length === 0) {
        return false;
    }
    else {
        vpp_email = vpp_info[0]['ApproverEmail'];
    }
    
    getCHPLDTFColumnArray();
    getSSAMMOColumnArray();
    getAPTCColumnArray();
    getBDRPCColumnArray();
    getIECColumnArray();
    getSPACColumnArray();
           
    var col_chp_mgr = db_getmbrCHPLDTFColumnName(mgr_email);
    if (col_chp_mgr !== null) {
        db_updaterateUserCHPLDTFRating(sel_res_id, col_chp_mgr, mgr_rating);
    }
    var col_chp_vpp = db_getmbrCHPLDTFColumnName(vpp_email);
    if (col_chp_vpp !== null) {
        db_updaterateUserCHPLDTFRating(sel_res_id, col_chp_vpp, vpp_rating);
    }
    if (col_chp_mgr !== null || col_chp_vpp !== null) {
        sqlCHPLDTFUpdateMedian();
        sqlCHPLDTFUpdateMean();
    }
           
    var col_ssa_mgr = db_getmbrSSAMMOColumnName(mgr_email);
    if (col_ssa_mgr !== null) {
        db_updaterateUserSSAMMORating(sel_res_id, col_ssa_mgr, mgr_rating);
    }
    var col_ssa_vpp = db_getmbrSSAMMOColumnName(vpp_email);
    if (col_ssa_vpp !== null) {
        db_updaterateUserSSAMMORating(sel_res_id, col_ssa_vpp, vpp_rating);
    }
    if (col_ssa_mgr !== null || col_ssa_vpp !== null) {
        sqlSSAMMOUpdateMedian();
        sqlSSAMMOUpdateMean();
    }
          
    var col_apt_mgr = db_getmbrAPTCColumnName(mgr_email);
    if (col_apt_mgr !== null) {
        db_updaterateUserAPTCRating(sel_res_id, col_apt_mgr, mgr_rating);
    }
    var col_apt_vpp = db_getmbrAPTCColumnName(vpp_email);
    if (col_apt_vpp !== null) {
        db_updaterateUserAPTCRating(sel_res_id, col_apt_vpp, vpp_rating);
    }
    if (col_apt_mgr !== null || col_apt_vpp !== null) {
        sqlAPTCUpdateMedian();
        sqlAPTCUpdateMean();
    }
          
    var col_bdr_mgr = db_getmbrBDRPCColumnName(mgr_email);
    if (col_bdr_mgr !== null) {
        db_updaterateUserBDRPCRating(sel_res_id, col_bdr_mgr, mgr_rating);
    }
    var col_bdr_vpp = db_getmbrBDRPCColumnName(vpp_email);
    if (col_bdr_vpp !== null) {
        db_updaterateUserBDRPCRating(sel_res_id, col_bdr_vpp, vpp_rating);
    }
    if (col_bdr_mgr !== null || col_bdr_vpp !== null) {
        sqlBDRPCUpdateMedian();
        sqlBDRPCUpdateMean();
    }
            
    var col_iec_mgr = db_getmbrIECColumnName(mgr_email);
    if (col_iec_mgr !== null) {
        db_updaterateUserIECRating(sel_res_id, col_iec_mgr, mgr_rating);
    }
    var col_iec_vpp = db_getmbrIECColumnName(vpp_email);
    if (col_iec_vpp !== null) {
        db_updaterateUserIECRating(sel_res_id, col_iec_vpp, vpp_rating);
    }
    if (col_iec_mgr !== null || col_iec_vpp !== null) {
        sqlIECUpdateMedian();
        sqlIECUpdateMean();
    }
          
    var col_spa_mgr = db_getmbrSPACColumnName(mgr_email);
    if (col_spa_mgr !== null) {
        db_updaterateUserSPACRating(sel_res_id, col_spa_mgr, mgr_rating);
    }
    var col_spa_vpp = db_getmbrSPACColumnName(vpp_email);
    if (col_spa_vpp !== null) {
        db_updaterateUserSPACRating(sel_res_id, col_spa_vpp, vpp_rating);
    }
    if (col_spa_mgr !== null || col_spa_vpp !== null) {
        sqlSPACUpdateMedian();
        sqlSPACUpdateMean();
    }
    
    var chpldtf_active = db_getrateCHPLDTFActive(sel_res_id);
    if (chpldtf_active === "1") { 
        getCHPLDTFMedianMean();
    }
    var ssammo_active = db_getrateSSAMMOActive(sel_res_id);
    if (ssammo_active === "1") {
        getSSAMMOMedianMean();
    }
    var aptc_active = db_getrateAPTCActive(sel_res_id);
    if (aptc_active === "1") { 
        getAPTCMedianMean();
    }
    var bdrpc_active = db_getrateBDRPCActive(sel_res_id);
    if (bdrpc_active === "1") { 
        getBDRPCMedianMean();
    }
    var iec_active = db_getrateIECActive(sel_res_id);
    if (iec_active === "1") { 
        getIECMedianMean();
    }
    var spac_active = db_getrateSPACActive(sel_res_id);
    if (spac_active === "1") {
        getSPACMedianMean();
    }
    
    updateAllMedianMean();
}

////////////////////////////////////////////////////////////////////////////////
function emailBackToDraft(ResourceID, login_name, status_change, reason) {
    var prop_title = $('#resource_ptitle_full_' + ResourceID).html();
    var subject = prop_title + " " + status_change;
    var reason_html = reason.replace("\n", "<br/>");
    
    var result = new Array();
    result = db_getResource2(ResourceID);
    
    if (result.length !== 0) {
        var creator = result[0]['CreatorName'];
        var email = result[0]['CreatorEmail'];
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

function emailToCreatorCompleted(ResourceID, login_name, status, reason) {
    var prop_title = $('#resource_ptitle_full_' + ResourceID).html();
    var subject = prop_title + " has been changed to " + status;
    var reason_html = reason.replace("\n", "<br>");
    
    var result = new Array();
    result = db_getResource2(ResourceID);
    
    if (result.length !== 0) {
        var creator = result[0]['CreatorName'];
        var email = result[0]['CreatorEmail'];
        var title = result[0]['CreatorTitle'];
        
        var msg = "Dear " + creator + ",<br/></br/>";
        msg += "Thank you for your resource request titled <strong>" + prop_title + "</strong> submitted on " + sel_submitted_date + " has been <strong>" + status + "</strong>.<br>";
        if (status === "Fully Funded") {
            msg += "The amount approved is <strong>" + sel_t_amount + "</strong><br><br>";
        }
        msg += "Comments : " + reason_html + "<br/><br/>";
        
        msg += "Should you have any questions or comments, please contact the office of Fiscal Services.<br/><br/>";
        msg += "Thank you.<br/><br/>";
        msg += "IVC Fiscal Services<br/>";
        msg += "IVCFiscal@ivc.edu<br/>";
        msg += "x5326";
        
        if (title === "President") {
            proc_sendEmail(email, creator, subject, msg);
        }
        else {
            var username = sessionStorage.getItem('m0_username');
            var password = sessionStorage.getItem('m0_password');
            var result2 = new Array();
            result2 = db_getIVCMgr(username, password, email);
            
            if (result2.length !== 0) {
                var ccName = result2[0];
                var ccEmail = result2[1];
                proc_sendEmailWithCC(email, creator, ccEmail, ccName, subject, msg);
            }
            else {
                proc_sendEmail(email, creator, subject, msg);
            }
        }
    }
}

function sendEmailBSIFundingInstructionToCreator() {
    var res_title = $('#resource_ptitle_full_' + sel_res_id).html();
    
    var result2 = new Array();
    result2 = db_getResource2(sel_res_id);
    var creator = result2[0]['CreatorName'];
    var email = result2[0]['CreatorEmail'];
    
    var result3 = new Array(); 
    result3 = db_getApproverByID(sel_approver_id);
    var approver = result3[0]['ApproverName'];
    
    var result = new Array();
    result = db_getFundSrcType("fs_4");
    var fs_admin_name = result[0]['FundSrcAdmin'];
    var fs_admin_email = result[0]['FundSrcEmail'];
    var fs_type = result[0]['FundSrcType'];
    
    var str_url = location.href;
    str_url = str_url.replace("Administrator.html", "/doc/BSI_Funding_Request_Supplemental_Form.pdf");
    
    var Subject = "BSI Request Form";
    var Message = "Dear " + creator + ",<br/><br/>";
    Message += "Your resource request titled <b>" + res_title + "</b> was selected for  " + fs_type + " as a possible funding source by " + sel_res_stage + ": <b>" + approver + ".</b><br>";
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
function getCHPLDTFColumnArray() {
    var result = new Array(); 
    result = db_getmbrCHPLDTF(m_login_email, true);

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
    result = db_getmbrSSAMMO(m_login_email, true);

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
    result = db_getmbrAPTC(m_login_email, true);

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
    result = db_getmbrBDRPC(m_login_email, true);

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
    result = db_getmbrIEC(m_login_email, true);

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
    result = db_getmbrSPAC(m_login_email, true);

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
function sqlCHPLDTFUpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(ResourceID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT ResourceID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateCHPLDTF] WHERE ResourceID = " + sel_res_id + ") pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
    var sql_variable = "";
    for (var i = 0; i < ar_db_chpldtf_column.length; i++) {
        var num_column = ar_db_chpldtf_column[i][0];
        sql_variable += "chp_mbr_" + num_column + ", ";
    }
    sql_variable = sql_variable.substring(0, sql_variable.length - 2);
    sql_query += sql_variable + ")) AS Result ";
    sql_query += "CREATE TABLE #MEDIAN_RESULT (ResourceID int, column_median numeric(3, 2)) ";
    sql_query += ";WITH Counts AS(SELECT ResourceID, c = COUNT(*) FROM #MEDIAN_TABLE GROUP BY ResourceID) ";
    sql_query += "INSERT INTO #MEDIAN_RESULT SELECT a.ResourceID, Median = AVG(0. + value) FROM Counts a ";
    sql_query += "CROSS APPLY(SELECT TOP (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) b.value, r = ROW_NUMBER() OVER (ORDER BY b.value) FROM #MEDIAN_TABLE b WHERE a.ResourceID = b.ResourceID ORDER BY b.value ) p ";
    sql_query += "WHERE r BETWEEN ((a.c - 1) / 2) + 1 AND (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) GROUP BY a.ResourceID; ";
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateCHPLDTF] SET Median = rst.column_median ";
    sql_query += "FROM #MEDIAN_RESULT AS rst INNER JOIN [IVCRESOURCES].[dbo].[rateCHPLDTF] AS org ON rst.ResourceID = org.ResourceID ";
    sql_query += "DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

function sqlSSAMMOUpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(ResourceID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT ResourceID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateSSAMMO] WHERE ResourceID = " + sel_res_id + ") pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
    var sql_variable = "";
    for (var i = 0; i < ar_db_ssammo_column.length; i++) {
        var num_column = ar_db_ssammo_column[i][0];
        sql_variable += "ssa_mbr_" + num_column + ", ";
    }
    sql_variable = sql_variable.substring(0, sql_variable.length - 2);
    sql_query += sql_variable + ")) AS Result ";
    sql_query += "CREATE TABLE #MEDIAN_RESULT (ResourceID int, column_median numeric(3, 2)) ";
    sql_query += ";WITH Counts AS(SELECT ResourceID, c = COUNT(*) FROM #MEDIAN_TABLE GROUP BY ResourceID) ";
    sql_query += "INSERT INTO #MEDIAN_RESULT SELECT a.ResourceID, Median = AVG(0. + value) FROM Counts a ";
    sql_query += "CROSS APPLY(SELECT TOP (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) b.value, r = ROW_NUMBER() OVER (ORDER BY b.value) FROM #MEDIAN_TABLE b WHERE a.ResourceID = b.ResourceID ORDER BY b.value ) p ";
    sql_query += "WHERE r BETWEEN ((a.c - 1) / 2) + 1 AND (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) GROUP BY a.ResourceID; ";
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateSSAMMO] SET Median = rst.column_median ";
    sql_query += "FROM #MEDIAN_RESULT AS rst INNER JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS org ON rst.ResourceID = org.ResourceID ";
    sql_query += "DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

function sqlAPTCUpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(ResourceID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT ResourceID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateAPTC] WHERE ResourceID = " + sel_res_id + ") pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
    var sql_variable = "";
    for (var i = 0; i < ar_db_aptc_column.length; i++) {
        var num_column = ar_db_aptc_column[i][0];
        sql_variable += "apt_mbr_" + num_column + ", ";
    }
    sql_variable = sql_variable.substring(0, sql_variable.length - 2);
    sql_query += sql_variable + ")) AS Result ";
    sql_query += "CREATE TABLE #MEDIAN_RESULT (ResourceID int, column_median numeric(3, 2)) ";
    sql_query += ";WITH Counts AS(SELECT ResourceID, c = COUNT(*) FROM #MEDIAN_TABLE GROUP BY ResourceID) ";
    sql_query += "INSERT INTO #MEDIAN_RESULT SELECT a.ResourceID, Median = AVG(0. + value) FROM Counts a ";
    sql_query += "CROSS APPLY(SELECT TOP (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) b.value, r = ROW_NUMBER() OVER (ORDER BY b.value) FROM #MEDIAN_TABLE b WHERE a.ResourceID = b.ResourceID ORDER BY b.value ) p ";
    sql_query += "WHERE r BETWEEN ((a.c - 1) / 2) + 1 AND (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) GROUP BY a.ResourceID; ";
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateAPTC] SET Median = rst.column_median ";
    sql_query += "FROM #MEDIAN_RESULT AS rst INNER JOIN [IVCRESOURCES].[dbo].[rateAPTC] AS org ON rst.ResourceID = org.ResourceID ";
    sql_query += "DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

function sqlBDRPCUpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(ResourceID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT ResourceID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateBDRPC] WHERE ResourceID = " + sel_res_id + ") pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
    var sql_variable = "";
    for (var i = 0; i < ar_db_bdrpc_column.length; i++) {
        var num_column = ar_db_bdrpc_column[i][0];
        sql_variable += "bdr_mbr_" + num_column + ", ";
    }
    sql_variable = sql_variable.substring(0, sql_variable.length - 2);
    sql_query += sql_variable + ")) AS Result ";
    sql_query += "CREATE TABLE #MEDIAN_RESULT (ResourceID int, column_median numeric(3, 2)) ";
    sql_query += ";WITH Counts AS(SELECT ResourceID, c = COUNT(*) FROM #MEDIAN_TABLE GROUP BY ResourceID) ";
    sql_query += "INSERT INTO #MEDIAN_RESULT SELECT a.ResourceID, Median = AVG(0. + value) FROM Counts a ";
    sql_query += "CROSS APPLY(SELECT TOP (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) b.value, r = ROW_NUMBER() OVER (ORDER BY b.value) FROM #MEDIAN_TABLE b WHERE a.ResourceID = b.ResourceID ORDER BY b.value ) p ";
    sql_query += "WHERE r BETWEEN ((a.c - 1) / 2) + 1 AND (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) GROUP BY a.ResourceID; ";
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateBDRPC] SET Median = rst.column_median ";
    sql_query += "FROM #MEDIAN_RESULT AS rst INNER JOIN [IVCRESOURCES].[dbo].[rateBDRPC] AS org ON rst.ResourceID = org.ResourceID ";
    sql_query += "DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

function sqlIECUpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(ResourceID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT ResourceID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateIEC] WHERE ResourceID = " + sel_res_id + ") pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
    var sql_variable = "";
    for (var i = 0; i < ar_db_iec_column.length; i++) {
        var num_column = ar_db_iec_column[i][0];
        sql_variable += "iec_mbr_" + num_column + ", ";
    }
    sql_variable = sql_variable.substring(0, sql_variable.length - 2);
    sql_query += sql_variable + ")) AS Result ";
    sql_query += "CREATE TABLE #MEDIAN_RESULT (ResourceID int, column_median numeric(3, 2)) ";
    sql_query += ";WITH Counts AS(SELECT ResourceID, c = COUNT(*) FROM #MEDIAN_TABLE GROUP BY ResourceID) ";
    sql_query += "INSERT INTO #MEDIAN_RESULT SELECT a.ResourceID, Median = AVG(0. + value) FROM Counts a ";
    sql_query += "CROSS APPLY(SELECT TOP (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) b.value, r = ROW_NUMBER() OVER (ORDER BY b.value) FROM #MEDIAN_TABLE b WHERE a.ResourceID = b.ResourceID ORDER BY b.value ) p ";
    sql_query += "WHERE r BETWEEN ((a.c - 1) / 2) + 1 AND (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) GROUP BY a.ResourceID; ";
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateIEC] SET Median = rst.column_median ";
    sql_query += "FROM #MEDIAN_RESULT AS rst INNER JOIN [IVCRESOURCES].[dbo].[rateIEC] AS org ON rst.ResourceID = org.ResourceID ";
    sql_query += "DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

function sqlSPACUpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(ResourceID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT ResourceID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateSPAC] WHERE ResourceID = " + sel_res_id + ") pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
    var sql_variable = "";
    for (var i = 0; i < ar_db_spac_column.length; i++) {
        var num_column = ar_db_spac_column[i][0];
        sql_variable += "spa_mbr_" + num_column + ", ";
    }
    sql_variable = sql_variable.substring(0, sql_variable.length - 2);
    sql_query += sql_variable + ")) AS Result ";
    sql_query += "CREATE TABLE #MEDIAN_RESULT (ResourceID int, column_median numeric(3, 2)) ";
    sql_query += ";WITH Counts AS(SELECT ResourceID, c = COUNT(*) FROM #MEDIAN_TABLE GROUP BY ResourceID) ";
    sql_query += "INSERT INTO #MEDIAN_RESULT SELECT a.ResourceID, Median = AVG(0. + value) FROM Counts a ";
    sql_query += "CROSS APPLY(SELECT TOP (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) b.value, r = ROW_NUMBER() OVER (ORDER BY b.value) FROM #MEDIAN_TABLE b WHERE a.ResourceID = b.ResourceID ORDER BY b.value ) p ";
    sql_query += "WHERE r BETWEEN ((a.c - 1) / 2) + 1 AND (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) GROUP BY a.ResourceID; ";
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateSPAC] SET Median = rst.column_median ";
    sql_query += "FROM #MEDIAN_RESULT AS rst INNER JOIN [IVCRESOURCES].[dbo].[rateSPAC] AS org ON rst.ResourceID = org.ResourceID ";
    sql_query += "DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function sqlCHPLDTFUpdateMean() {
    var sql_query = "";
    var sql_query_1 = "UPDATE [IVCRESOURCES].[dbo].[rateCHPLDTF] SET Mean = CONVERT(numeric(3, 2), ";
    var sql_query_2 = "NULLIF((";
    for (var i = 0; i < ar_db_chpldtf_column.length; i++) {
        var num_column = ar_db_chpldtf_column[i][0];
        if (i > 0) {
            sql_query_1 += "+ ISNULL(CONVERT(numeric(3, 2), chp_mbr_" + num_column + "), 0) ";
            sql_query_2 += "+ CASE WHEN chp_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
        else {
            sql_query_1 += "(ISNULL(CONVERT(numeric(3, 2), chp_mbr_" + num_column + "), 0) ";
            sql_query_2 += "CASE WHEN chp_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
    }
    sql_query_1 = sql_query_1.trim();
    sql_query_2 = sql_query_2.trim();
    sql_query += sql_query_1 + ") / " + sql_query_2 + "), 0)) ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateCHPLDTF] ";
    sql_query += "WHERE ResourceID = " + sel_res_id;
    db_script_update_rate(sql_query);
}

function sqlSSAMMOUpdateMean() {
    var sql_query = "";
    var sql_query_1 = "UPDATE [IVCRESOURCES].[dbo].[rateSSAMMO] SET Mean = CONVERT(numeric(3, 2), ";
    var sql_query_2 = "NULLIF((";
    for (var i = 0; i < ar_db_ssammo_column.length; i++) {
        var num_column = ar_db_ssammo_column[i][0];
        if (i > 0) {
            sql_query_1 += "+ ISNULL(CONVERT(numeric(3, 2), ssa_mbr_" + num_column + "), 0) ";
            sql_query_2 += "+ CASE WHEN ssa_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
        else {
            sql_query_1 += "(ISNULL(CONVERT(numeric(3, 2), ssa_mbr_" + num_column + "), 0) ";
            sql_query_2 += "CASE WHEN ssa_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
    }
    sql_query_1 = sql_query_1.trim();
    sql_query_2 = sql_query_2.trim();
    sql_query += sql_query_1 + ") / " + sql_query_2 + "), 0)) ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateSSAMMO] ";
    sql_query += "WHERE ResourceID = " + sel_res_id;
    db_script_update_rate(sql_query);
}

function sqlAPTCUpdateMean() {
    var sql_query = "";
    var sql_query_1 = "UPDATE [IVCRESOURCES].[dbo].[rateAPTC] SET Mean = CONVERT(numeric(3, 2), ";
    var sql_query_2 = "NULLIF((";
    for (var i = 0; i < ar_db_aptc_column.length; i++) {
        var num_column = ar_db_aptc_column[i][0];
        if (i > 0) {
            sql_query_1 += "+ ISNULL(CONVERT(numeric(3, 2), apt_mbr_" + num_column + "), 0) ";
            sql_query_2 += "+ CASE WHEN apt_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
        else {
            sql_query_1 += "(ISNULL(CONVERT(numeric(3, 2), apt_mbr_" + num_column + "), 0) ";
            sql_query_2 += "CASE WHEN apt_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
    }
    sql_query_1 = sql_query_1.trim();
    sql_query_2 = sql_query_2.trim();
    sql_query += sql_query_1 + ") / " + sql_query_2 + "), 0)) ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateAPTC] ";
    sql_query += "WHERE ResourceID = " + sel_res_id;
    db_script_update_rate(sql_query);
}

function sqlBDRPCUpdateMean() {
    var sql_query = "";
    var sql_query_1 = "UPDATE [IVCRESOURCES].[dbo].[rateBDRPC] SET Mean = CONVERT(numeric(3, 2), ";
    var sql_query_2 = "NULLIF((";
    for (var i = 0; i < ar_db_bdrpc_column.length; i++) {
        var num_column = ar_db_bdrpc_column[i][0];
        if (i > 0) {
            sql_query_1 += "+ ISNULL(CONVERT(numeric(3, 2), bdr_mbr_" + num_column + "), 0) ";
            sql_query_2 += "+ CASE WHEN bdr_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
        else {
            sql_query_1 += "(ISNULL(CONVERT(numeric(3, 2), bdr_mbr_" + num_column + "), 0) ";
            sql_query_2 += "CASE WHEN bdr_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
    }
    sql_query_1 = sql_query_1.trim();
    sql_query_2 = sql_query_2.trim();
    sql_query += sql_query_1 + ") / " + sql_query_2 + "), 0)) ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateBDRPC] ";
    sql_query += "WHERE ResourceID = " + sel_res_id;
    db_script_update_rate(sql_query);
}

function sqlIECUpdateMean() {
    var sql_query = "";
    var sql_query_1 = "UPDATE [IVCRESOURCES].[dbo].[rateIEC] SET Mean = CONVERT(numeric(3, 2), ";
    var sql_query_2 = "NULLIF((";
    for (var i = 0; i < ar_db_iec_column.length; i++) {
        var num_column = ar_db_iec_column[i][0];
        if (i > 0) {
            sql_query_1 += "+ ISNULL(CONVERT(numeric(3, 2), iec_mbr_" + num_column + "), 0) ";
            sql_query_2 += "+ CASE WHEN iec_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
        else {
            sql_query_1 += "(ISNULL(CONVERT(numeric(3, 2), iec_mbr_" + num_column + "), 0) ";
            sql_query_2 += "CASE WHEN iec_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
    }
    sql_query_1 = sql_query_1.trim();
    sql_query_2 = sql_query_2.trim();
    sql_query += sql_query_1 + ") / " + sql_query_2 + "), 0)) ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateIEC] ";
    sql_query += "WHERE ResourceID = " + sel_res_id;
    db_script_update_rate(sql_query);
}

function sqlSPACUpdateMean() {
    var sql_query = "";
    var sql_query_1 = "UPDATE [IVCRESOURCES].[dbo].[rateSPAC] SET Mean = CONVERT(numeric(3, 2), ";
    var sql_query_2 = "NULLIF((";
    for (var i = 0; i < ar_db_spac_column.length; i++) {
        var num_column = ar_db_spac_column[i][0];
        if (i > 0) {
            sql_query_1 += "+ ISNULL(CONVERT(numeric(3, 2), spa_mbr_" + num_column + "), 0) ";
            sql_query_2 += "+ CASE WHEN spa_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
        else {
            sql_query_1 += "(ISNULL(CONVERT(numeric(3, 2), spa_mbr_" + num_column + "), 0) ";
            sql_query_2 += "CASE WHEN spa_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
    }
    sql_query_1 = sql_query_1.trim();
    sql_query_2 = sql_query_2.trim();
    sql_query += sql_query_1 + ") / " + sql_query_2 + "), 0)) ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateSPAC] ";
    sql_query += "WHERE ResourceID = " + sel_res_id;
    db_script_update_rate(sql_query);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getCHPLDTFMedianMean() {
    var result = new Array();
    result = db_getrateCHPLDTFUser(sel_res_id);
    
    if (result[0]['Median'] !== null) {
        ar_all_median.push(Number(result[0]['Median']));
    }
    if (result[0]['Mean'] !== null) {
        ar_all_mean.push(Number(result[0]['Mean']));
    }
}

function getSSAMMOMedianMean() {
    var result = new Array();
    result = db_getrateSSAMMOUser(sel_res_id);
    
    if (result[0]['Median'] !== null) {
        ar_all_median.push(Number(result[0]['Median']));
    }
    if (result[0]['Mean'] !== null) {
        ar_all_mean.push(Number(result[0]['Mean']));
    }
}

function getAPTCMedianMean() {
    var result = new Array();
    result = db_getrateAPTCUser(sel_res_id);
    
    if (result[0]['Median'] !== null) {
        ar_all_median.push(Number(result[0]['Median']));
    }
    if (result[0]['Mean'] !== null) {
        ar_all_mean.push(Number(result[0]['Mean']));
    }
}

function getBDRPCMedianMean() {
    var result = new Array();
    result = db_getrateBDRPCUser(sel_res_id);
    
    if (result[0]['Median'] !== null) {
        ar_all_median.push(Number(result[0]['Median']));
    }
    if (result[0]['Mean'] !== null) {
        ar_all_mean.push(Number(result[0]['Mean']));
    }
}

function getIECMedianMean() {
    var result = new Array();
    result = db_getrateIECUser(sel_res_id);
    
    if (result[0]['Median'] !== null) {
        ar_all_median.push(Number(result[0]['Median']));
    }
    if (result[0]['Mean'] !== null) {
        ar_all_mean.push(Number(result[0]['Mean']));
    }
}

function getSPACMedianMean() {
    var result = new Array();
    result = db_getrateSPACUser(sel_res_id);
    
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