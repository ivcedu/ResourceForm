var login_name = "";
var login_email = "";
var master_admin = false;

var chpldtf_admin = false;
var ssammo_admin = false;
var aptc_admin = false;
var bdrpc_admin = false;
var iec_admin = false;
var spac_admin = false;

var column_chpldtf = "";
var column_ssammo = "";
var column_aptc = "";
var column_bdrpc = "";
var column_iec = "";
var column_spac = "";

var sql_select = "";
var sql_from = "";
var sql_where = "";

var fiscal_year = "";
var resource_id = "";
var ar_all_median = [];
var ar_all_mean = [];
var ar_db_chpldtf_column = [];
var ar_db_ssammo_column = [];
var ar_db_aptc_column = [];
var ar_db_bdrpc_column = [];
var ar_db_iec_column = [];
var ar_db_spac_column = [];

var dt_current_date;
var dt_chpldtf_start;
var dt_chpldtf_end;
var dt_ssammo_start;
var dt_ssammo_end;
var dt_aptc_start;
var dt_aptc_end;
var dt_bdrpc_start;
var dt_bdrpc_end;
var dt_iec_start;
var dt_iec_end;
var dt_spac_start;
var dt_spac_end;

var cur_committee = "All";

var ar_fund_src = [];

var target;
var spinner;

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

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) { 
        target = $('#spinner')[0];
        spinner = new Spinner();
        
        getAllResourceFiscalYear();
        getAllReviewPeriodList();
        setHideAllModal();
        setSPACFundingSrcList();
        
        getFundingSrcTypeList();
        getCommitteeMemberColumn();
        getEnableCommitteeRating();
        setAdminOption();
        
        setTableHeader("All");
        getCommitteeRatingList("All", "All Resource", "All Program", 0, "fund_included", "All Request");
        initializeTable();
        setListTotalCountAmount();
    }
    else {
        window.open('Login.html', '_self');
    }
};

function initializeTable() {
    $("#user_rf_list").tablesorter({ 
        widgets: ['stickyHeaders']
    });
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {  
    $('#nav_home').click(function() {
        window.open('home.html', '_self');
    });

////////////////////////////////////////////////////////////////////////////////
    // chpldtf member setting click ////////////////////////////////////////////
    $('#nav_mbr_chpldtf').click(function() {
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "dkhachatryan@ivc.edu" || login_email === "jcalderin@ivc.edu" || login_email === "mfeoktistova@ivc.edu") {
            getCHPLDTFMemberList();
        }
        else {
            var result = new Array(); 
            result = db_getmbrCHPLDTF(login_email, false);
            if (result.length === 0) {
                alert("You are not a administrator of CHPLDTF committee");
                $('#nav_committee_mbr_setting').dropdown('toggle');
                return false;
            }
            else {
                getCHPLDTFMemberList();
            }
        }
        
        $('#mod_mbr_chpldtf').modal('show');
    });
    
    // modal chpldtf section new click event ///////////////////////////////////  
    $('#mod_mbr_chpldtf_btn_section_new').click(function() {
        var icon = $('#mod_mbr_chpldtf_add_icon_new').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_mbr_chpldtf_add_icon_new').attr('class', 'icon-chevron-down icon-black');
            $('#mod_mbr_chpldtf_add_body_new').show();
        }
        else {
            $('#mod_mbr_chpldtf_add_icon_new').attr('class', 'icon-chevron-right icon-black');
            $('#mod_mbr_chpldtf_add_body_new').hide();
        }
    });
    
    // modal chpldtf add new member click event ////////////////////////////////
    $('#mod_mbr_chpldtf_btn_add').click(function() {
        var err = newCHPLDTFValidation();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        insertCHPLDTFMember();
        clearCHPLDTFMemberInput();
        getCHPLDTFMemberList();
        alert("CHPLDTF member has been added successfully");
    });
    
    // modal chpldtf table update click event //////////////////////////////////
    $('#mod_mbr_chpldtf_list').on('click', '[id^="mbr_chpldtf_user_btn_update_"]', function() {
        var selected_id = $(this).attr('id').replace("mbr_chpldtf_user_btn_update_", "");
        
        updateCHPLDTFMember(selected_id);
        getCHPLDTFMemberList();
        alert("select member has been updated successfully");
    });
    
    // modal chpldtf table delete click event //////////////////////////////////
    $('#mod_mbr_chpldtf_list').on('click', '[id^="mbr_chpldtf_user_btn_delete_"]', function() {
        var selected_id = $(this).attr('id').replace("mbr_chpldtf_user_btn_delete_", "");
        var column_name = $('#mbr_chpldtf_column_name_' + selected_id).html();
        
        deleteCHPLDTFMember(selected_id, column_name);
        getCHPLDTFColumnArray();
        
        sql_all_raw_CHPLDTFUpdateMedian();
        sql_all_raw_CHPLDTFUpdateMean();
        sql_overall_UpdateMedian();
        sql_overall_UpdateMean();
        
        alert("Selected committee member has been deleted and recalculated all median and mean value");
        getCHPLDTFMemberList();
    });
    
////////////////////////////////////////////////////////////////////////////////
    // ssammo member setting click /////////////////////////////////////////////
    $('#nav_mbr_ssammo').click(function() {
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "dkhachatryan@ivc.edu" || login_email === "jcalderin@ivc.edu" || login_email === "mfeoktistova@ivc.edu") {
            getSSAMMOMemberList();
        }
        else {
            var result = new Array(); 
            result = db_getmbrSSAMMO(login_email, false);
            if (result.length === 0) {
                alert("You are not a administrator of SSAMMO committee");
                $('#nav_committee_mbr_setting').dropdown('toggle');
                return false;
            }
            else {
                getSSAMMOMemberList();
            }
        }
        
        $('#mod_mbr_ssammo').modal('show');
    });
    
    // modal ssammo section new click event ////////////////////////////////////  
    $('#mod_mbr_ssammo_btn_section_new').click(function() {
        var icon = $('#mod_mbr_ssammo_add_icon_new').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_mbr_ssammo_add_icon_new').attr('class', 'icon-chevron-down icon-black');
            $('#mod_mbr_ssammo_add_body_new').show();
        }
        else {
            $('#mod_mbr_ssammo_add_icon_new').attr('class', 'icon-chevron-right icon-black');
            $('#mod_mbr_ssammo_add_body_new').hide();
        }
    });
    
    // modal ssammo add new member click event /////////////////////////////////
    $('#mod_mbr_ssammo_btn_add').click(function() {
        var err = newSSAMMOValidation();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        insertSSAMMOMember();
        clearSSAMMOMemberInput();
        getSSAMMOMemberList();
        alert("SSAMMO member has been added successfully");
    });
    
    // modal ssammo table update click event ///////////////////////////////////
    $('#mod_mbr_ssammo_list').on('click', '[id^="mbr_ssammo_user_btn_update_"]', function() {
        var selected_id = $(this).attr('id').replace("mbr_ssammo_user_btn_update_", "");
        
        updateSSAMMOMember(selected_id);
        getSSAMMOMemberList();
        alert("select member has been updated successfully");
    });
    
    // modal ssammo table delete click event ///////////////////////////////////
    $('#mod_mbr_ssammo_list').on('click', '[id^="mbr_ssammo_user_btn_delete_"]', function() {
        var selected_id = $(this).attr('id').replace("mbr_ssammo_user_btn_delete_", "");
        var column_name = $('#mbr_ssammo_column_name_' + selected_id).html();
        
        deleteSSAMMOMember(selected_id, column_name);
        getSSAMMOColumnArray();
        
        sql_all_raw_SSAMMOUpdateMedian();
        sql_all_raw_SSAMMOUpdateMean();
        sql_overall_UpdateMedian();
        sql_overall_UpdateMean();
        
        alert("Selected committee member has been deleted and recalculated all median and mean value");
        getSSAMMOMemberList();
    });
    
////////////////////////////////////////////////////////////////////////////////
    // aptc member setting click ///////////////////////////////////////////////
    $('#nav_mbr_aptc').click(function() {
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "dkhachatryan@ivc.edu" || login_email === "jcalderin@ivc.edu" || login_email === "mfeoktistova@ivc.edu") {
            getAPTCMemberList();
        }
        else {
            var result = new Array(); 
            result = db_getmbrAPTC(login_email, false);
            if (result.length === 0) {
                alert("You are not a administrator of APTC committee");
                $('#nav_committee_mbr_setting').dropdown('toggle');
                return false;
            }
            else {
                getAPTCMemberList();
            }
        }
        
        $('#mod_mbr_aptc').modal('show');
    });
    
    // modal aptc section new click event //////////////////////////////////////  
    $('#mod_mbr_aptc_btn_section_new').click(function() {
        var icon = $('#mod_mbr_aptc_add_icon_new').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_mbr_aptc_add_icon_new').attr('class', 'icon-chevron-down icon-black');
            $('#mod_mbr_aptc_add_body_new').show();
        }
        else {
            $('#mod_mbr_aptc_add_icon_new').attr('class', 'icon-chevron-right icon-black');
            $('#mod_mbr_aptc_add_body_new').hide();
        }
    });
    
    // modal aptc add new member click event ///////////////////////////////////
    $('#mod_mbr_aptc_btn_add').click(function() {
        var err = newAPTCValidation();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        insertAPTCMember();
        clearAPTCMemberInput();
        getAPTCMemberList();
        alert("APTC member has been added successfully");
    });
    
    // modal aptc table update click event /////////////////////////////////////
    $('#mod_mbr_aptc_list').on('click', '[id^="mbr_aptc_user_btn_update_"]', function() {
        var selected_id = $(this).attr('id').replace("mbr_aptc_user_btn_update_", "");
        
        updateAPTCMember(selected_id);
        getAPTCMemberList();
        alert("select member has been updated successfully");
    });
    
    // modal aptc table delete click event /////////////////////////////////////
    $('#mod_mbr_aptc_list').on('click', '[id^="mbr_aptc_user_btn_delete_"]', function() {
        var selected_id = $(this).attr('id').replace("mbr_aptc_user_btn_delete_", "");
        var column_name = $('#mbr_aptc_column_name_' + selected_id).html();
        
        deleteAPTCMember(selected_id, column_name);
        getAPTCColumnArray();
        
        sql_all_raw_APTCUpdateMedian();
        sql_all_raw_APTCUpdateMean();
        sql_overall_UpdateMedian();
        sql_overall_UpdateMean();
        
        alert("Selected committee member has been deleted and recalculated all median and mean value");
        getAPTCMemberList();
    });
    
////////////////////////////////////////////////////////////////////////////////
    // bdrpc member setting click //////////////////////////////////////////////
    $('#nav_mbr_bdrpc').click(function() {
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "dkhachatryan@ivc.edu" || login_email === "jcalderin@ivc.edu" || login_email === "mfeoktistova@ivc.edu") {
            getBDRPCMemberList();
        }
        else {
            var result = new Array(); 
            result = db_getmbrBDRPC(login_email, false);
            if (result.length === 0) {
                alert("You are not a administrator of BDRPC committee");
                $('#nav_committee_mbr_setting').dropdown('toggle');
                return false;
            }
            else {
                getBDRPCMemberList();
            }
        }
        
        $('#mod_mbr_bdrpc').modal('show');
    });
    
    // modal bdrpc section new click event /////////////////////////////////////  
    $('#mod_mbr_bdrpc_btn_section_new').click(function() {
        var icon = $('#mod_mbr_bdrpc_add_icon_new').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_mbr_bdrpc_add_icon_new').attr('class', 'icon-chevron-down icon-black');
            $('#mod_mbr_bdrpc_add_body_new').show();
        }
        else {
            $('#mod_mbr_bdrpc_add_icon_new').attr('class', 'icon-chevron-right icon-black');
            $('#mod_mbr_bdrpc_add_body_new').hide();
        }
    });
    
    // modal bdrpc add new member click event //////////////////////////////////
    $('#mod_mbr_bdrpc_btn_add').click(function() {
        var err = newBDRPCValidation();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        insertBDRPCMember();
        clearBDRPCMemberInput();
        getBDRPCMemberList();
        alert("BDRPC member has been added successfully");
    });
    
    // modal bdrpc table update click event ////////////////////////////////////
    $('#mod_mbr_bdrpc_list').on('click', '[id^="mbr_bdrpc_user_btn_update_"]', function() {
        var selected_id = $(this).attr('id').replace("mbr_bdrpc_user_btn_update_", "");
        
        updateBDRPCMember(selected_id);
        getBDRPCMemberList();
        alert("select member has been updated successfully");
    });
    
    // modal bdrpc table delete click event ////////////////////////////////////
    $('#mod_mbr_bdrpc_list').on('click', '[id^="mbr_bdrpc_user_btn_delete_"]', function() {
        var selected_id = $(this).attr('id').replace("mbr_bdrpc_user_btn_delete_", "");
        var column_name = $('#mbr_bdrpc_column_name_' + selected_id).html();
        
        deleteBDRPCMember(selected_id, column_name);
        getBDRPCColumnArray();
        
        sql_all_raw_BDRPCUpdateMedian();
        sql_all_raw_BDRPCUpdateMean();
        sql_overall_UpdateMedian();
        sql_overall_UpdateMean();
        
        alert("Selected committee member has been deleted and recalculated all median and mean value");
        getBDRPCMemberList();
    });
    
////////////////////////////////////////////////////////////////////////////////
    // iec member setting click ////////////////////////////////////////////////
    $('#nav_mbr_iec').click(function() {
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "dkhachatryan@ivc.edu" || login_email === "jcalderin@ivc.edu" || login_email === "mfeoktistova@ivc.edu") {
            getIECMemberList();
        }
        else {
            var result = new Array(); 
            result = db_getmbrIEC(login_email, false);
            if (result.length === 0) {
                alert("You are not a administrator of IEC committee");
                $('#nav_committee_mbr_setting').dropdown('toggle');
                return false;
            }
            else {
                getIECMemberList();
            }
        }
        
        $('#mod_mbr_iec').modal('show');
    });
    
    // modal iec section new click event ///////////////////////////////////////  
    $('#mod_mbr_iec_btn_section_new').click(function() {
        var icon = $('#mod_mbr_iec_add_icon_new').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_mbr_iec_add_icon_new').attr('class', 'icon-chevron-down icon-black');
            $('#mod_mbr_iec_add_body_new').show();
        }
        else {
            $('#mod_mbr_iec_add_icon_new').attr('class', 'icon-chevron-right icon-black');
            $('#mod_mbr_iec_add_body_new').hide();
        }
    });
    
    // modal iec add new member click event ////////////////////////////////////
    $('#mod_mbr_iec_btn_add').click(function() {
        var err = newIECValidation();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        insertIECMember();
        clearIECMemberInput();
        getIECMemberList();
        alert("IEC member has been added successfully");
    });
    
    // modal iec table update click event //////////////////////////////////////
    $('#mod_mbr_iec_list').on('click', '[id^="mbr_iec_user_btn_update_"]', function() {
        var selected_id = $(this).attr('id').replace("mbr_iec_user_btn_update_", "");
        
        updateIECMember(selected_id);
        getIECMemberList();
        alert("select member has been updated successfully");
    });
    
    // modal iec table delete click event //////////////////////////////////////
    $('#mod_mbr_iec_list').on('click', '[id^="mbr_iec_user_btn_delete_"]', function() {
        var selected_id = $(this).attr('id').replace("mbr_iec_user_btn_delete_", "");
        var column_name = $('#mbr_iec_column_name_' + selected_id).html();
        
        deleteIECMember(selected_id, column_name);
        getIECColumnArray();
        
        sql_all_raw_IECUpdateMedian();
        sql_all_raw_IECUpdateMean();
        sql_overall_UpdateMedian();
        sql_overall_UpdateMean();
        
        alert("Selected committee member has been deleted and recalculated all median and mean value");
        getIECMemberList();
    });
    
////////////////////////////////////////////////////////////////////////////////
    // spac member setting click ///////////////////////////////////////////////
    $('#nav_mbr_spac').click(function() {
        if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "dkhachatryan@ivc.edu" || login_email === "jcalderin@ivc.edu" || login_email === "mfeoktistova@ivc.edu") {
            getSPACMemberList();
        }
        else {
            var result = new Array(); 
            result = db_getmbrSPAC(login_email, false);
            if (result.length === 0) {
                alert("You are not a administrator of SPAC committee");
                $('#nav_committee_mbr_setting').dropdown('toggle');
                return false;
            }
            else {
                getSPACMemberList();
            }
        }
        
        $('#mod_mbr_spac').modal('show');
    });
    
    // modal spac section new click event //////////////////////////////////////  
    $('#mod_mbr_spac_btn_section_new').click(function() {
        var icon = $('#mod_mbr_spac_add_icon_new').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_mbr_spac_add_icon_new').attr('class', 'icon-chevron-down icon-black');
            $('#mod_mbr_spac_add_body_new').show();
        }
        else {
            $('#mod_mbr_spac_add_icon_new').attr('class', 'icon-chevron-right icon-black');
            $('#mod_mbr_spac_add_body_new').hide();
        }
    });
    
    // modal spac add new member click event ///////////////////////////////////
    $('#mod_mbr_spac_btn_add').click(function() {
        var err = newSPACValidation();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        insertSPACMember();
        clearSPACMemberInput();
        getSPACMemberList();
        alert("SPAC member has been added successfully");
    });
    
    // modal spac table update click event /////////////////////////////////////
    $('#mod_mbr_spac_list').on('click', '[id^="mbr_spac_user_btn_update_"]', function() {
        var selected_id = $(this).attr('id').replace("mbr_spac_user_btn_update_", "");
        
        updateSPACMember(selected_id);
        getSPACMemberList();
        alert("select member has been updated successfully");
    });
    
    // modal spac table delete click event /////////////////////////////////////
    $('#mod_mbr_spac_list').on('click', '[id^="mbr_spac_user_btn_delete_"]', function() {
        var selected_id = $(this).attr('id').replace("mbr_spac_user_btn_delete_", "");
        var column_name = $('#mbr_spac_column_name_' + selected_id).html();
        
        deleteSPACMember(selected_id, column_name);
        getSPACColumnArray();
        
        sql_all_raw_SPACUpdateMedian();
        sql_all_raw_SPACUpdateMean();
        sql_overall_UpdateMedian();
        sql_overall_UpdateMean();
        
        alert("Selected committee member has been deleted and recalculated all median and mean value");
        getSPACMemberList();
    });
    
////////////////////////////////////////////////////////////////////////////////
    $('#nav_committee_admin').click(function() {
        window.open('committeeWorksheet.html', '_self');
    });
    
    $('#nav_help').click(function() {
        window.open('doc/Committee_Ratings_Manual.pdf', '_blank');
    });
    
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
    });
    
    // committee dropdown event ////////////////////////////////////////////////
    $("#adm_committee").on('focus', function () {
        cur_committee = $(this).val();
    });
    
    $('#adm_committee').change(function() {
        var committee = $(this).val();
        if (!master_admin) {
            switch(committee) {
                case "CHPLDTF":
                    if (column_chpldtf === "") {
                        alert("You are not a member of CHPLDTF committee");
                        $(this).val(cur_committee);
                    }
                    break;
                case "SSAMMO":
                    if (column_ssammo === "") {
                        alert("You are not a member of SSAMMO committee");
                        $(this).val(cur_committee);
                    }
                    break;
                case "APTC":
                    if (column_aptc === "") {
                        alert("You are not a member of APTC committee");
                        $(this).val(cur_committee);
                    }
                    break;
                case "BDRPC":
                    if (column_bdrpc === "") {
                        alert("You are not a member of BDRPC committee");
                        $(this).val(cur_committee);
                    }
                    break;
                case "IEC":
                    if (column_iec === "") {
                        alert("You are not a member of IEC committee");
                        $(this).val(cur_committee);
                    }
                    break;
                case "SPAC":
                    if (column_spac === "") {
                        alert("You are not a member of SPAC committee");
                        $(this).val(cur_committee);
                    }
                    break;
                default:
                    break;
            }
        }
    });

    // fiscal year refresh button click ////////////////////////////////////////
    $('#all_fiscal_yrs').change(function() {
        refreshCommitteeRatingList();
        setListTotalCountAmount();
    });
    
    // funding option click event //////////////////////////////////////////////
    $('#adm_fund_src').change(function() {
        if ($('#adm_fund_src').val() === "0") {
            $('#adm_fund_option').val("fund_included");
            $("#adm_fund_option").selectpicker('refresh');
        }
    });
    
    // filter refresh button click /////////////////////////////////////////////
    $('#adm_refresh').click(function() {
        refreshCommitteeRatingList();        
        setListTotalCountAmount();
    });
    
    // export to excel button click ////////////////////////////////////////////
    $('#adm_export_excel').click(function() {
        var url_html = exportExcelCommitteeRatingList();        
        location.href = "php/csv_saveCommitteeRatingList.php?" + url_html;
    });
    
////////////////////////////////////////////////////////////////////////////////
    // table mouseover popup ///////////////////////////////////////////////////
    $('#user_rf_list').on('mouseover', 'a[id^="resource_title_brief_"]', function() {
        var res_id = $(this).attr('id').replace("resource_title_brief_", "");
        var title_full = $('#resource_title_full_' + res_id).html();
        
        $(this).popover({trigger:"manual", content:title_full, placement:"top"});
        $(this).popover('toggle');
    });
    
    // table mouseleave popup //////////////////////////////////////////////////
    $('#user_rf_list').on('mouseleave', 'a[id^="resource_title_brief_"]', function() {
        $(this).popover('hide');
    });
    
    // table selection /////////////////////////////////////////////////////////
    $('#user_rf_list').on('click', 'tr', function (e) { 
        e.preventDefault();
        var str_tr_id = $(this).attr('id');
        if (str_tr_id === "tbl_header") {
            return false;
        }
        
        resource_id = str_tr_id.replace("res_tr_", "");
        if ($('#adm_committee').val() === "SPAC") {
            fiscal_year = $('#resource_fiscal_year_' + resource_id).html().replace("resource_fiscal_year_", "");
        }
        
        $("[id^='res_tr_']").css('background-color', '');
        $("#res_tr_" + resource_id).css('background-color', '#CCCCFF');
    });
    
    // table row open resource form click //////////////////////////////////////
    $('#user_rf_list').on('click', 'a[id^="resource_title_brief_"]', function(e) {
        e.preventDefault();
        var res_id = $(this).attr('id').replace("resource_title_brief_", "");
        sessionStorage.setItem('vrf_resource_id', res_id);
        window.open('ViewResourceForm.html?resource_id=' + res_id, '_blank');
    });
    
    // table row fund src amount change event //////////////////////////////////
    $('#user_rf_list tbody').on('change', 'input[id^="fs_"]', function(e) {
        e.preventDefault();
        // input validation and update table cell
        var str_fund_amt = $(this).val().replace(/[^0-9\.]/g, '');
        if (str_fund_amt === "") {
            return false;
        }
        var fund_amt = Number(str_fund_amt).toFixed(2);
        $(this).val(formatDollar(Number(fund_amt)).replace(/,/g, ''));
        var table = $(this).closest("table");
        var cellElement = $(this).closest("td")[0];
        table.trigger("updateCell", [cellElement, false]);
        
        var str_id = $(this).attr('id');
        resource_id =getSelectedID_ResourceID(str_id);
        var fs_col_amt = getSelectedID_FundSrcColumn(str_id);

        // if not exist, insert resource fund amt table
        var result = new Array();
        result = db_getResourceFundAmt(resource_id);
        if (result.length === 0) {
            db_insertResourceFundAmt(resource_id);
        }

        updateResourceFundAmt(fs_col_amt, fund_amt);
    });
    
    $('#user_rf_list tbody').on('blur', 'input[id^="fs_"]', function(e) {
        e.preventDefault();
        // input validation and update table cell
        var str_fund_amt = $(this).val().replace(/[^0-9\.]/g, '');
        if (str_fund_amt === "") {
            return false;
        }
        var fund_amt = Number(str_fund_amt).toFixed(2);
        $(this).val(formatDollar(Number(fund_amt)).replace(/,/g, ''));
        var table = $(this).closest("table");
        var cellElement = $(this).closest("td")[0];
        table.trigger("updateCell", [cellElement, false]);
    });
    
    $('#user_rf_list tbody').on('keypress', 'input[id^="fs_"]', function(e) {
        if(e.which === 13) {
            var str_fund_amt = $(this).val().replace(/[^0-9\.]/g, '');  
            if (str_fund_amt === "") {
                return false;
            }
            var fund_amt = Number(str_fund_amt).toFixed(2);
            $(this).val(formatDollar(Number(fund_amt)).replace(/,/g, ''));
            
            var table = $(this).closest("table");
            var cellElement = $(this).closest("td")[0];
            table.trigger("updateCell", [cellElement, false]);
        }
    }); 
    
    // resource request rating button click ////////////////////////////////////
    $('#user_rf_list').on('click', '[id^="new_rating_"]', function(e) {
        e.preventDefault();
        resource_id = $(this).attr('id').replace("new_rating_", "");
        var title = $('#resource_title_full_' + resource_id).html();
        
        if (master_admin) {
            getMasterCommitteeMemberList();
            $('#mod_master_header_title').html(title);
            getSelectedTransactions(resource_id, "mod_master_body_transaction");
            
            $('#mod_master').modal('show');
        }
        else {
            $('#mod_rating_header_title').html(title);
            var usr_rating = $('#usr_rating_' + resource_id).html();
            if (usr_rating !== "") {
                $('input:radio[name=mod_rdo_rating][value="' + usr_rating + '"]').prop('checked', true);
            }
            else {
                $('input[name="mod_rdo_rating"]').prop('checked', false);
            }
            getSelectedTransactions(resource_id, "mod_body_transaction");
            
            $('#mod_rating').modal('show');
        }
    });
    
////////////////////////////////////////////////////////////////////////////////
    // modal add rating button click ///////////////////////////////////////////
    $('#mod_btn_rating').click(function() {
        var icon = $('#mod_icon_rating').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_icon_rating').attr('class', 'icon-chevron-down icon-black');
            $('#mod_body_rating').show();
        }
        else {
            $('#mod_icon_rating').attr('class', 'icon-chevron-right icon-black');
            $('#mod_body_rating').hide();
        }
    });
    
    // modal rating history button click ///////////////////////////////////////
    $('#mod_btn_history').click(function() {
        var icon = $('#mod_icon_history').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_icon_history').attr('class', 'icon-chevron-down icon-black');
            $('#mod_body_history').show();
        }
        else {
            $('#mod_icon_history').attr('class', 'icon-chevron-right icon-black');
            $('#mod_body_history').hide();
        }
    });
    
    // modal rating save button click //////////////////////////////////////////
    $('#mod_btn_rating_save').click(function() {
        if ($('input:radio[name=mod_rdo_rating]').is(':checked')) {
            var new_rating = $('input[name="mod_rdo_rating"]:checked').val();
            updateUserRatingValue(new_rating);
            $('#usr_rating_' + resource_id).html(new_rating);
        }
    });
    
    // modal rating close button click /////////////////////////////////////////
    $('#mod_btn_rating_close').click(function() {
        $('#mod_rating_header_title').html("");
        $('input[name="mod_rdo_rating"]').prop('checked', false);
    });
    
    // modal rating close button click /////////////////////////////////////////
    $('#mod_rating_x').click(function() {
        $('#mod_rating_header_title').html("");
        $('input[name="mod_rdo_rating"]').prop('checked', false);
    });
    
////////////////////////////////////////////////////////////////////////////////
    // modal master add rating button click ////////////////////////////////////
    $('#mod_master_committee_list').change(function() {
        $('#mod_master_member_rating').html("");
        var column_name = $(this).val();
        if (column_name !== "") {
            var rating = getMasterMemberRating(column_name);
            if (rating !== null) {
                $('#mod_master_member_rating').html(rating);
            }
        }
    });
    
    // modal master rating button click ////////////////////////////////////////
    $('#mod_master_btn_rating').click(function() {
        var icon = $('#mod_master_icon_rating').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_master_icon_rating').attr('class', 'icon-chevron-down icon-black');
            $('#mod_master_body_rating').show();
        }
        else {
            $('#mod_master_icon_rating').attr('class', 'icon-chevron-right icon-black');
            $('#mod_master_body_rating').hide();
        }
    });
    
    // modal master history button click ///////////////////////////////////////
    $('#mod_master_btn_history').click(function() {
        var icon = $('#mod_master_icon_history').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_master_icon_history').attr('class', 'icon-chevron-down icon-black');
            $('#mod_master_body_history').show();
        }
        else {
            $('#mod_master_icon_history').attr('class', 'icon-chevron-right icon-black');
            $('#mod_master_body_history').hide();
        }
    });
    
    // modal rating save button click //////////////////////////////////////////
    $('#mod_master_btn_rating_save').click(function() {
        if ($('input:radio[name=mod_master_rdo_rating]').is(':checked')) {
            var new_rating = $('input[name="mod_master_rdo_rating"]:checked').val();
            var column = $('#mod_master_committee_list').val();
            var mbr_email = getMasterCommitteeMemberEmail(column);
            
            updateMasterRatingValue(new_rating, mbr_email);
            $('#usr_rating_' + resource_id).html(new_rating);
        }   
    });
    
    // modal rating close button click /////////////////////////////////////////
    $('#mod_master_btn_rating_close').click(function() {
        $('#mod_master_header_title').html("");
        $('input[name="mod_master_rdo_rating"]').prop('checked', false);
    });
    
    // modal rating close button click /////////////////////////////////////////
    $('#mod_master_x').click(function() {
        $('#mod_master_header_title').html("");
        $('input[name="mod_master_rdo_rating"]').prop('checked', false);
    });
    
////////////////////////////////////////////////////////////////////////////////
    // resource request final button click /////////////////////////////////////
    $('#user_rf_list').on('click', '[id^="final_btn_"]', function(e) {
        e.preventDefault();
        var str_resource_id = $(this).attr('id').replace("final_btn_", "");
        str_resource_id = str_resource_id.replace("chp_", "");
        str_resource_id = str_resource_id.replace("ssa_", "");
        str_resource_id = str_resource_id.replace("apt_", "");
        str_resource_id = str_resource_id.replace("bdr_", "");
        str_resource_id = str_resource_id.replace("iec_", "");
        str_resource_id = str_resource_id.replace("spa_", "");
        resource_id = str_resource_id;
        if ($('#adm_committee').val() === "SPAC") {
            fiscal_year = $('#resource_fiscal_year_' + resource_id).html().replace("resource_fiscal_year_", "");
        }

        resetModalFinalDialog();
        var title = $('#resource_title_full_' + resource_id).html();
        $('#mod_final_header_title').html(title);
        
        var committee = $('#adm_committee').val();
        var str_final_rating = "";
        switch(committee) {
            case "CHPLDTF":
                str_final_rating = "final_rating_chp_";
                $('#mod_final_one_time_section').hide();
                $('#mod_final_funding_section').hide();
                break;
            case "SSAMMO":
                str_final_rating = "final_rating_ssa_";
                $('#mod_final_one_time_section').hide();
                $('#mod_final_funding_section').hide();
                break;
            case "APTC":
                str_final_rating = "final_rating_apt_";
                $('#mod_final_one_time_section').hide();
                $('#mod_final_funding_section').hide();
                break;
            case "BDRPC":
                str_final_rating = "final_rating_bdr_";
                $('#mod_final_one_time_section').hide();
                $('#mod_final_funding_section').hide();
                break;
            case "IEC":
                str_final_rating = "final_rating_iec_";
                $('#mod_final_one_time_section').hide();
                $('#mod_final_funding_section').hide();
                break;
            case "SPAC":
                str_final_rating = "final_rating_spa_";
                getSPACOneTimeRequest();
                getSPACFundSrcList2();
                //getSPACFundSrcList();
                $('#mod_final_one_time_section').show();
                $('#mod_final_funding_section').show();
                break;
            default:
                break;
        }
    
        if (str_final_rating !== "") {
            var final_rating = $('#' + str_final_rating + resource_id).html();
            $('#mod_final_rating_value').val(final_rating);
        }
        getSelectedTransactions(resource_id, "mod_final_body_transaction");
        
        $('#mod_final').modal('show');
    });
    
    // modal final add comments button click ///////////////////////////////////
    $('#mod_final_btn_add_comments').click(function() {
        var icon = $('#mod_final_icon_add_comments').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_final_icon_add_comments').attr('class', 'icon-chevron-down icon-black');
            $('#mod_final_body_comments').show();
        }
        else {
            $('#mod_final_icon_add_comments').attr('class', 'icon-chevron-right icon-black');
            $('#mod_final_body_comments').hide();
        }
    });
    
    // modal final one time button click ///////////////////////////////////////
    $('#mod_final_btn_one_time').click(function() {
        var icon = $('#mod_final_icon_one_time').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_final_icon_one_time').attr('class', 'icon-chevron-down icon-black');
            $('#mod_final_body_one_time').show();
        }
        else {
            $('#mod_final_icon_one_time').attr('class', 'icon-chevron-right icon-black');
            $('#mod_final_body_one_time').hide();
        }
    });
    
    // modal final funding src button click ////////////////////////////////////
    $('#mod_final_btn_fund_src').click(function() {
        var icon = $('#mod_final_icon_fund_src').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_final_icon_fund_src').attr('class', 'icon-chevron-down icon-black');
            $('#mod_final_body_fund_src').show();
        }
        else {
            $('#mod_final_icon_fund_src').attr('class', 'icon-chevron-right icon-black');
            $('#mod_final_body_fund_src').hide();
        }
    });
    
    // modal final history button click ////////////////////////////////////////
    $('#mod_final_btn_history').click(function() {
        var icon = $('#mod_final_icon_history').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_final_icon_history').attr('class', 'icon-chevron-down icon-black');
            $('#mod_final_body_history').show();
        }
        else {
            $('#mod_final_icon_history').attr('class', 'icon-chevron-right icon-black');
            $('#mod_final_body_history').hide();
        }
    });
    
    // modal final rating change event /////////////////////////////////////////
    $('#mod_final_rating_value').change(function() {
        var str_final_rating = $(this).val().replace(/[^0-9\.]/g, '');
        if (str_final_rating === "") {
            alert("Please enter final rating value");
            $(this).val("");
            return false;
        }
        else {
            var final_rating = Number(str_final_rating).toFixed(2);
            if (final_rating <= 0) {
                $(this).val("0.00");
            }
            else if (final_rating >= 5) {
                $(this).val("5.00");
            }
            else {
                $(this).val(final_rating);
            }
        }
    });
    
    // modal final rating update button click //////////////////////////////////
    $('#mod_final_body_btn_rating_update').click(function() {
        var final_rating = $('#mod_final_rating_value').val();
        if (final_rating !== "") {
            updateFinalRatingValue(final_rating);
            updateSPACFinalAvgValue();
            
            var note = login_name + " add/update " + $('#adm_committee').val() + " Final Rating: " + final_rating;
            db_insertTransactions(resource_id, login_name, note);
            alert("Your final rating has been updated");
        }
    });
    
    // modal final comments add button click ///////////////////////////////////
    $('#mod_final_body_btn_add_comments').click(function() {
        var comments = $('#mod_final_body_add_comments').val();
        if (comments === "") {
            alert("Please enter comments");
            return false;
        }
        
        var note = login_name + " added comments: " + comments;
        db_insertTransactions(resource_id, login_name, note);
        
        alert("Your comments has been added");
    });
    
    // modal final one time update button click ////////////////////////////////
    $('#mod_final_body_btn_update_one_time').click(function() {
        var one_time = $("#mod_final_body_selected_one_time").is(':checked');
        db_updateResourceOneTime(resource_id, one_time);
        
        var note = "";
        if (one_time) {
            note = "One Time Funding Request has been updated to Yes";
        }
        else {
            note = "One Time Funding Request has been updated to No";
        }
        db_insertTransactions(resource_id, login_name, note);
        
        alert("One Time Funding Request has been updated");
    });
    
    // modal final funding src update button click /////////////////////////////
    $('#mod_final_body_btn_update_funds_src').click(function() {
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
                    updateResourceFundSrc(resource_id);
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
        getSPACFundSrcList2();
    });
    
    // modal rating close button click /////////////////////////////////////////
    $('#mod_final_btn_rating_close').click(function() {
        startSpin();        
        setTimeout(function() {      
            refreshCommitteeRatingList();
            $('#mod_final').modal('hide');
            stopSpin();
        }, 1000);
    });
    
    // modal rating close button click /////////////////////////////////////////
    $('#mod_final_x').click(function() {
        startSpin();        
        setTimeout(function() {      
            refreshCommitteeRatingList();
            $('#mod_final').modal('hide');
            stopSpin();
        }, 1000);
    });
    
////////////////////////////////////////////////////////////////////////////////
    // auto size
    $('#mod_final_body_add_comments').autosize();
    $('#mgr_fs_comments').autosize();

    // selectpicker
    $('.selectpicker').selectpicker();
    
    // move popup dialog
    $("#mod_rating").draggable({ handle: ".modal-header" });
});

////////////////////////////////////////////////////////////////////////////////
function startSpin() {
    spinner.spin(target);
}

function stopSpin() {
    spinner.stop();
}

////////////////////////////////////////////////////////////////////////////////
function getAllResourceFiscalYear() {
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
function setHideAllModal() {
    // navigation option
    $('#nav_committee_admin').hide();
    
    // modal rating
    $('#mod_rating').modal('hide');
    $('#mod_body_history').hide();
    
    // modal master
    $('#mod_master').modal('hide');
    $('#mod_master_body_rating').hide();
    $('#mod_master_body_history').hide();   
    
    // modal final
    $('#mod_final').modal('hide');
    $('#mod_final_body_comments').hide();
    $('#mod_final_body_one_time').hide();
    $('#mod_final_body_fund_src').hide();
    $('#mod_final_body_history').hide(); 
    
    // modal chpldtf member setting
    $('#mod_mbr_chpldtf').modal('hide');
    $('#mod_mbr_chpldtf_add_body_new').hide();
    
    // modal chpldtf member setting
    $('#mod_mbr_ssammo').modal('hide');
    $('#mod_mbr_ssammo_add_body_new').hide();
    
    // modal aptc member setting
    $('#mod_mbr_aptc').modal('hide');
    $('#mod_mbr_aptc_add_body_new').hide();
    
    // modal bdrpc member setting
    $('#mod_mbr_bdrpc').modal('hide');
    $('#mod_mbr_bdrpc_add_body_new').hide();
    
    // modal iec member setting
    $('#mod_mbr_iec').modal('hide');
    $('#mod_mbr_iec_add_body_new').hide();
    
    // modal spac member setting
    $('#mod_mbr_spac').modal('hide');
    $('#mod_mbr_spac_add_body_new').hide();
}

function resetModalFinalDialog() {
    $('#mod_final_header_title').html("");
    $('#mod_final_body_add_comments').val("");
    $('#mod_final_body_selected_one_time').prop('checked', false);
    $('#mod_final_body_new_fund_src_list').val("Select...");
    $("#mod_final_body_new_fund_src_list").selectpicker('refresh');

    $('#mod_final_icon_add_comments').attr('class', 'icon-chevron-right icon-black');
    $('#mod_final_body_comments').hide();
    $('#mod_final_icon_one_time').attr('class', 'icon-chevron-right icon-black');
    $('#mod_final_body_one_time').hide();
    $('#mod_final_icon_fund_src').attr('class', 'icon-chevron-right icon-black');
    $('#mod_final_body_fund_src').hide();
    $('#mod_final_icon_history').attr('class', 'icon-chevron-right icon-black');
    $('#mod_final_body_history').hide();
}

function getFundingSrcTypeList() {
    var result = new Array();
    result = db_getFundSrcTypeAll();
    
    var tbl_html = "<option value='0' selected>All</option>";
    for(var i = 0; i < result.length; i++) {
        tbl_html += "<option value='" + result[i]['FundSrcTypeID'] + "'>" + result[i]['FundSrcType'] + "</option>";
    }
    
    $("#adm_fund_src").append(tbl_html);
    $("#adm_fund_src").selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function setAdminOption() {    
    if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "dkhachatryan@ivc.edu" || login_email === "jcalderin@ivc.edu" || login_email === "mfeoktistova@ivc.edu") {
        $('#nav_committee_admin').show();
    }
    if (login_email === "ykim160@ivc.edu" || login_email === "jcalderin@ivc.edu" || login_email === "mfeoktistova@ivc.edu") {
        master_admin = true;
    }
}

////////////////////////////////////////////////////////////////////////////////
function setListTotalCountAmount() {
    var committee = $('#adm_committee').val();
    var rowCount = "";
    if (committee === "SPAC") {
        rowCount = $('#user_rf_list tr').length - 4;
    }
    else {
        rowCount = $('#user_rf_list tr').length - 1;
    }
    
    $('#list_count').html(rowCount);
    var lst_total = setListTotalAmount();
    $('#list_total_amount').html(formatDollar(lst_total));
}

function setListTotalAmount() {
    var committee = $('#adm_committee').val();
    var loop = 1;
    if (committee === "SPAC") {
        loop = 4;
    }
    
    var f_list_total = 0.0;
    var rowCount = $('#user_rf_list tr').length;
    for (var i = loop; i < rowCount; i++) {
        var amount = $('#user_rf_list tr').eq(i).find('td[id^="resource_amount_"]').html();
        if (amount !== "") {
            var f_amount = revertDollar(amount);
            f_list_total += f_amount;
        }
    }
    return f_list_total;
}

////////////////////////////////////////////////////////////////////////////////
function getSelectedTransactions(ResourceID, mod_history_tag) {
    $('#' + mod_history_tag).html("");
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
    $('#' + mod_history_tag).html(note_html);
}

////////////////////////////////////////////////////////////////////////////////
function refreshCommitteeRatingList() {
    var committee = $('#adm_committee').val();
    var resource_type = $('#adm_resource_type').val();
    var program = $('#adm_program').val();
    var funding = $('#adm_fund_src').val();
    var fund_option = $('#adm_fund_option').val();
    var one_time = $('#adm_one_time').val();

    setTableHeader(committee);
    getCommitteeRatingList(committee, resource_type, program, funding, fund_option, one_time);
    $('#user_rf_list').trigger("updateAll");
}

function exportExcelCommitteeRatingList() {
    var committee = $('#adm_committee').val();
    var resource_type = $('#adm_resource_type').val();
    var program = $('#adm_program').val();
    var funding = $('#adm_fund_src').val();
    var fund_option = $('#adm_fund_option').val();
    var one_time = $('#adm_one_time').val();
    
    if (master_admin) {
        setMasterSQLScript(committee);
    }
    else {
        setSQLScript(committee);
    }

    var str_html = "SqlSelect=" + sql_select + "&SqlFrom=" + sql_from + "&SqlWhere=" + sql_where;
    str_html += "&Committee=" + committee + "&ResourceType=" + resource_type + "&Program=" + program + "&FundingSrc=" + funding + "&FundOption=" + fund_option + "&OneTime=" + one_time;;
    return str_html;
}

////////////////////////////////////////////////////////////////////////////////
function getCommitteeMemberColumn() {
    login_name = sessionStorage.getItem('m1_loginName');
    login_email = sessionStorage.getItem('m1_loginEmail');
    
    var result_1 = new Array(); 
    result_1 = db_getmbrCHPLDTF(login_email, false);
    if (result_1.length === 1) {
        column_chpldtf = result_1[0]['chpColumnName'];
        if (result_1[0]['chpUserAdmin'] === "1") {
            chpldtf_admin = true;
        }
    }
    var result_2 = new Array(); 
    result_2 = db_getmbrSSAMMO(login_email, false);
    if (result_2.length === 1) {
        column_ssammo = result_2[0]['ssaColumnName'];
        if (result_2[0]['ssaUserAdmin'] === "1") {
            ssammo_admin = true;
        }
    }
    var result_3 = new Array(); 
    result_3 = db_getmbrAPTC(login_email, false);
    if (result_3.length === 1) {
        column_aptc = result_3[0]['aptColumnName'];
        if (result_3[0]['aptUserAdmin'] === "1") {
            aptc_admin = true;
        }
    }
    var result_4 = new Array(); 
    result_4 = db_getmbrBDRPC(login_email, false);
    if (result_4.length === 1) {
        column_bdrpc = result_4[0]['bdrColumnName'];
        if (result_4[0]['bdrUserAdmin'] === "1") {
            bdrpc_admin = true;
        }
    }
    var result_5 = new Array(); 
    result_5 = db_getmbrIEC(login_email, false);
    if (result_5.length === 1) {
        column_iec = result_5[0]['iecColumnName'];
        if (result_5[0]['iecUserAdmin'] === "1") {
            iec_admin = true;
        }
    }
    var result_6 = new Array(); 
    result_6 = db_getmbrSPAC(login_email, false);
    if (result_6.length === 1) {
        column_spac = result_6[0]['spaColumnName'];
        if (result_6[0]['spaUserAdmin'] === "1") {
            spac_admin = true;
        }
    }
}

function setFundingSrcColumn() {
    var fund_src = $('#adm_fund_src option:selected').text();
    var header_html = "";
    header_html += "<th class='col_100' style='text-align: right; background-color: #CCCCFF;'><a href='#' style='color: black;'>Recommend</a></th>";
    header_html += "<th class='col_100' style='text-align: right; background-color: #CCCCFF;'><a href='#' style='color: black;'>Balance</a></th>";
    
    if (fund_src === "All") {
        var result = new Array();
        result = db_getFundSrcTypeAll();

        for(var i = 0; i < result.length; i++) {
            header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF;'><a href='#' style='color: black;'>" + result[i]['FundSrcType'] + "</a></th>";
        }
    }
    else {
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF;'><a href='#' style='color: black;'>" + fund_src + "</a></th>";
    }
    
    return header_html;
}

function setSPACFinalColumn() {
    var fund_src = $('#adm_fund_src option:selected').text();
    var css_add = 0;
    var header_html = "";
    
    header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>CHPLDTF Final</a></th>";
    header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>SSAMMO Final</a></th>";
    header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>APTC Final</a></th>";
    header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>BDRPC Final</a></th>";
    header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>IEC Final</a></th>";
    header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>SPAC Final</a></th>";
    
    if (spac_admin || master_admin) {
        header_html += "<th class='col_30'></th>";
        if (fund_src === "All") {
            css_add += 4190;
        }
        else {
            css_add += 1570;
        }
    }
    else {
        if (fund_src === "All") {
            css_add += 4160;
        }
        else {
            css_add += 1540;
        }
    }
    
    // need to update css width
    var width = (css_add) + 'px';
    $('.container').css('width', width);
    
    return header_html;
}

function setSPACHeaderRow() {
    var fund_src = $('#adm_fund_src option:selected').text();
    var header_html = "";
    
    if (fund_src === "All") {
        var result = new Array();
        result = db_getFundSrcBudgetList($('#all_fiscal_yrs').val());
        
        header_html += "<tr id='tbl_header'>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_250' style='color: white;'>Budget</th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        if (spac_admin || master_admin) {
            header_html += "<th class='col_50'></th>";
        }
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        // hard code for funding src /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var fs_budget_1 = "";
        var fs_budget_2 = "";
        var fs_budget_3 = "";
        var fs_budget_4 = "";
        var fs_budget_5 = "";
        var fs_budget_6 = "";
        var fs_budget_7 = "";
        var fs_budget_8 = "";
        var fs_budget_9 = "";
        var fs_budget_10 = "";
        var fs_budget_11 = "";
        var fs_budget_12 = "";
        var fs_budget_13 = "";
        var fs_budget_14 = "";
        var fs_budget_15 = "";
        var fs_budget_16 = "";
        var fs_budget_17 = "";
        var fs_budget_18 = "";
        var fs_budget_19 = "";
        var fs_budget_20 = "";
        var fs_budget_21 = "";
        var fs_budget_22 = "";
        var fs_budget_23 = "";
        
        var fs_balance_1 = "";
        var fs_balance_2 = "";
        var fs_balance_3 = "";
        var fs_balance_4 = "";
        var fs_balance_5 = "";
        var fs_balance_6 = "";
        var fs_balance_7 = "";
        var fs_balance_8 = "";
        var fs_balance_9 = "";
        var fs_balance_10 = "";
        var fs_balance_11 = "";
        var fs_balance_12 = "";
        var fs_balance_13 = "";
        var fs_balance_14 = "";
        var fs_balance_15 = "";
        var fs_balance_16 = "";
        var fs_balance_17 = "";
        var fs_balance_18 = "";
        var fs_balance_19 = "";
        var fs_balance_20 = "";
        var fs_balance_21 = "";
        var fs_balance_22 = "";
        var fs_balance_23 = "";
        
        for(var i = 0; i < result.length; i++) {
            switch(result[i]['FundSrcCol']) {
                case "fs_1":
                    fs_budget_1 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_1 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_2":
                    fs_budget_2 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_2 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_3":
                    fs_budget_3 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_3 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_4":
                    fs_budget_4 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_4 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_5":
                    fs_budget_5 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_5 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_6":
                    fs_budget_6 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_6 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_7":
                    fs_budget_7 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_7 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_8":
                    fs_budget_8 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_8 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_9":
                    fs_budget_9 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_9 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_10":
                    fs_budget_10 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_10 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_11":
                    fs_budget_11 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_11 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_12":
                    fs_budget_12 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_12 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_13":
                    fs_budget_13 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_13 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_14":
                    fs_budget_14 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_14 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_15":
                    fs_budget_15 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_15 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_16":
                    fs_budget_16 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_16 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_17":
                    fs_budget_17 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_17 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_18":
                    fs_budget_18 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_18 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_19":
                    fs_budget_19 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_19 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_20":
                    fs_budget_20 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_20 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_21":
                    fs_budget_21 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_21 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_22":
                    fs_budget_22 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_22 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                case "fs_23":
                    fs_budget_23 = formatDollar(Number(result[i]['BudgetAmt']));
                    fs_balance_23 = formatDollar(Number(result[i]['BalanceAmt']));
                    break;
                default:
                    break;
            }
        }
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_1'>" + fs_budget_1 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_2'>" + fs_budget_2 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_3'>" + fs_budget_3 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_4'>" + fs_budget_4 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_5'>" + fs_budget_5 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_6'>" + fs_budget_6 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_7'>" + fs_budget_7 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_8'>" + fs_budget_8 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_9'>" + fs_budget_9 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_10'>" + fs_budget_10 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_11'>" + fs_budget_11 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_12'>" + fs_budget_12 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_13'>" + fs_budget_13 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_14'>" + fs_budget_14 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_15'>" + fs_budget_15 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_16'>" + fs_budget_16 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_17'>" + fs_budget_17 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_18'>" + fs_budget_18 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_19'>" + fs_budget_19 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_20'>" + fs_budget_20 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_21'>" + fs_budget_21 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_22'>" + fs_budget_22 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_23'>" + fs_budget_23 + "</th>";
        
        header_html += "<th class='col_100'></th>";
        header_html += "<th class='col_150'></th>";
        header_html += "<th class='col_150'></th>";
        header_html += "</tr>";
        
        header_html += "<tr id='tbl_header'>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_250' style='color: white;'>Balance</th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        if (spac_admin || master_admin) {
            header_html += "<th class='col_50'></th>";
        }
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_1'>" + fs_balance_1 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_2'>" + fs_balance_2 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_3'>" + fs_balance_3 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_4'>" + fs_balance_4 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_5'>" + fs_balance_5 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_6'>" + fs_balance_6 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_7'>" + fs_balance_7 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_8'>" + fs_balance_8 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_9'>" + fs_balance_9 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_10'>" + fs_balance_10 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_11'>" + fs_balance_11 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_12'>" + fs_balance_12 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_13'>" + fs_balance_13 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_14'>" + fs_balance_14 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_15'>" + fs_balance_15 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_16'>" + fs_balance_16 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_17'>" + fs_balance_17 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_18'>" + fs_balance_18 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_19'>" + fs_balance_19 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_20'>" + fs_balance_20 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_21'>" + fs_balance_21 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_22'>" + fs_balance_22 + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_23'>" + fs_balance_23 + "</th>";
        
        header_html += "<th class='col_100'></th>";
        header_html += "<th class='col_150'></th>";
        header_html += "<th class='col_150'></th>";
        header_html += "</tr>";
        
        header_html += "<tr id='tbl_header'>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_250' style='color: white;'>Funded</th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        if (spac_admin || master_admin) {
            header_html += "<th class='col_50'></th>";
        }
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        
        var result2 = new Array();
        result2 = db_getResourceFundAmtTotalList($('#all_fiscal_yrs').val());               
        
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_1'>" + formatDollar(Number(result2[0]['fs_1_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_2'>" + formatDollar(Number(result2[0]['fs_2_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_3'>" + formatDollar(Number(result2[0]['fs_3_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_4'>" + formatDollar(Number(result2[0]['fs_4_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_5'>" + formatDollar(Number(result2[0]['fs_5_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_6'>" + formatDollar(Number(result2[0]['fs_6_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_7'>" + formatDollar(Number(result2[0]['fs_7_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_8'>" + formatDollar(Number(result2[0]['fs_8_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_9'>" + formatDollar(Number(result2[0]['fs_9_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_10'>" + formatDollar(Number(result2[0]['fs_10_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_11'>" + formatDollar(Number(result2[0]['fs_11_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_12'>" + formatDollar(Number(result2[0]['fs_12_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_13'>" + formatDollar(Number(result2[0]['fs_13_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_14'>" + formatDollar(Number(result2[0]['fs_14_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_15'>" + formatDollar(Number(result2[0]['fs_15_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_16'>" + formatDollar(Number(result2[0]['fs_16_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_17'>" + formatDollar(Number(result2[0]['fs_17_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_18'>" + formatDollar(Number(result2[0]['fs_18_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_19'>" + formatDollar(Number(result2[0]['fs_19_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_20'>" + formatDollar(Number(result2[0]['fs_20_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_21'>" + formatDollar(Number(result2[0]['fs_21_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_22'>" + formatDollar(Number(result2[0]['fs_22_amt_total'])) + "</th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_23'>" + formatDollar(Number(result2[0]['fs_23_amt_total'])) + "</th>";
            
        header_html += "<th class='col_100'></th>";
        header_html += "<th class='col_150'></th>";
        header_html += "<th class='col_150'></th>";
        header_html += "</tr>";
    }
    else {
        var fund_src_col = getFundSrcColumn(fund_src);
        var fund_src_num = fund_src_col.replace("fs_", "");
        var result = new Array();
        result = db_getFundSrcBudget($('#all_fiscal_yrs').val(), fund_src_col);
        
        header_html += "<tr id='tbl_header'>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_250' style='color: white;'>Budget</th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        if (spac_admin || master_admin) {
            header_html += "<th class='col_50'></th>";
        }
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_budget_" + fund_src_num + "'>" + formatDollar(Number(result[0]['BudgetAmt'])) + "</th>";
        header_html += "<th class='col_100'></th>";
        header_html += "<th class='col_150'></th>";
        header_html += "<th class='col_150'></th>";
        header_html += "</tr>";
        
        header_html += "<tr id='tbl_header'>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_250' style='color: white;'>Balance</th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        if (spac_admin || master_admin) {
            header_html += "<th class='col_50'></th>";
        }
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_balance_" + fund_src_num  + "'>" + formatDollar(Number(result[0]['BalanceAmt'])) + "</th>";
        header_html += "<th class='col_100'></th>";
        header_html += "<th class='col_150'></th>";
        header_html += "<th class='col_150'></th>";
        header_html += "</tr>";
        
        header_html += "<tr id='tbl_header'>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_250' style='color: white;'>Funded</th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        header_html += "<th class='col_50'></th>";
        if (spac_admin || master_admin) {
            header_html += "<th class='col_50'></th>";
        }
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        header_html += "<th class='col_100' style='background-color: #CCCCFF;'></th>";
        
        var column = fund_src_col + "_amt_total";
        var fund_src_sum = db_getResourceFundAmtTotalSrc(fund_src_col + "_amt", $('#all_fiscal_yrs').val());
        header_html += "<th class='col_100 sorter-inputs' style='text-align: right; background-color: #CCCCFF; color: black;' id='fs_funded_" + fund_src_num + "'>" + formatDollar(Number(fund_src_sum)) + "</th>";
        
        header_html += "<th class='col_100'></th>";
        header_html += "<th class='col_150'></th>";
        header_html += "<th class='col_150'></th>";
        header_html += "</tr>";
    }

    return header_html;
}

function setCommitteeFinalColumn(sel_committee) {
    var css_add = 0;
    var header_html = "";
    
    switch(sel_committee) {
        case "CHPLDTF":
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>CHPLDTF Median</a></th>";
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>CHPLDTF Mean</a></th>";
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>CHPLDTF Final</a></th>";
            if (chpldtf_admin || master_admin) {
                header_html += "<th class='col_30'></th>";
                css_add += 180;
            }
            else {
                css_add += 150;
            }
            break;
        case "SSAMMO":
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>SSAMMO Median</a></th>";
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>SSAMMO Mean</a></th>";
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>SSAMMO Final</a></th>";
            if (ssammo_admin || master_admin) {
                header_html += "<th class='col_30'></th>";
                css_add += 180;
            }
            else {
                css_add += 150;
            }
            break;
        case "APTC":
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>APTC Median</a></th>";
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>APTC Mean</a></th>";
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>APTC Final</a></th>";
            if (aptc_admin || master_admin) {
                header_html += "<th class='col_30'></th>";
                css_add += 180;
            }
            else {
                css_add += 150;
            }
            break;
        case "BDRPC":
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>BDRPC Median</a></th>";
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>BDRPC Mean</a></th>";
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>BDRPC Final</a></th>";
            if (bdrpc_admin || master_admin) {
                header_html += "<th class='col_30'></th>";
                css_add += 180;
            }
            else {
                css_add += 150;
            }
            break;
        case "IEC":
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>IEC Median</a></th>";
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>IEC Mean</a></th>";
            header_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>IEC Final</a></th>";
            if (iec_admin || master_admin) {
                header_html += "<th class='col_30'></th>";
                css_add += 180;
            }
            else {
                css_add += 150;
            }
            break;
        default:
            break;
    }
    
    var width = (1450 + css_add) + 'px';
    $('.container').css('width', width);
    
    return header_html;
}

function setFundAmtHTML(resource_id, i, result) {
    var fund_src = $('#adm_fund_src').val();
    var body_html = "<td class='col_100' style='text-align: right;' id='funded_total_" + resource_id + "'></td>";
    body_html += "<td class='col_100' style='text-align: right;' id='funded_balance_" + resource_id + "'></td>";
    
    switch(fund_src) {
        case "0":
            if (result[i]['fs_1'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_1_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_1_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_2'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_2_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_2_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_3'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_3_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_3_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_4'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_4_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_4_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_5'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_5_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_5_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_6'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_6_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_6_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_7'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_7_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_7_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_8'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_8_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_8_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_9'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_9_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_9_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_10'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_10_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_10_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_11'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_11_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_11_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_12'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_12_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_12_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_13'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_13_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_13_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_14'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_14_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_14_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_15'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_15_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_15_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_16'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_16_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_16_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_17'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_17_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_17_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_18'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_18_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_18_amt_" + resource_id + "'></td>";
            }  
            if (result[i]['fs_19'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_19_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_19_amt_" + resource_id + "'></td>";
            }  
            if (result[i]['fs_20'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_20_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_20_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_21'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_21_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_21_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_22'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_22_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_22_amt_" + resource_id + "'></td>";
            }
            if (result[i]['fs_23'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_23_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_23_amt_" + resource_id + "'></td>";
            }
            break;
        case "1":
            if (result[i]['fs_1'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_1_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_1_amt_" + resource_id + "'></td>";
            }
            break;
        case "2":
            if (result[i]['fs_2'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_2_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_2_amt_" + resource_id + "'></td>";
            }
            break;
        case "3":
            if (result[i]['fs_3'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_3_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_3_amt_" + resource_id + "'></td>";
            }
            break;
        case "4":
            if (result[i]['fs_4'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_4_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_4_amt_" + resource_id + "'></td>";
            }
            break;
        case "5":
            if (result[i]['fs_5'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_5_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_5_amt_" + resource_id + "'></td>";
            }
            break;
        case "6":
            if (result[i]['fs_6'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_6_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_6_amt_" + resource_id + "'></td>";
            }
            break;
        case "7":
            if (result[i]['fs_7'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_7_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_7_amt_" + resource_id + "'></td>";
            }
            break;
        case "8":
            if (result[i]['fs_8'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_8_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_8_amt_" + resource_id + "'></td>";
            }
            break;
        case "9":
            if (result[i]['fs_9'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_9_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_9_amt_" + resource_id + "'></td>";
            }
            break;
        case "10":
            if (result[i]['fs_10'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_10_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_10_amt_" + resource_id + "'></td>";
            }
            break;
        case "11":
            if (result[i]['fs_11'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_11_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_11_amt_" + resource_id + "'></td>";
            }
            break;
        case "12":
            if (result[i]['fs_12'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_12_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_12_amt_" + resource_id + "'></td>";
            }
            break;
        case "13":
            if (result[i]['fs_13'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_13_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_13_amt_" + resource_id + "'></td>";
            }
            break;
        case "14":
            if (result[i]['fs_14'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_14_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_14_amt_" + resource_id + "'></td>";
            }
            break;
        case "15":
            if (result[i]['fs_15'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_15_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_15_amt_" + resource_id + "'></td>";
            }
            break;
        case "16":
            if (result[i]['fs_16'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_16_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_16_amt_" + resource_id + "'></td>";
            }
            break;
        case "17":
            if (result[i]['fs_17'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_17_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_17_amt_" + resource_id + "'></td>";
            }
            break;
        case "18":
            if (result[i]['fs_18'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_18_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_18_amt_" + resource_id + "'></td>";
            }  
            break;
        case "19":
            if (result[i]['fs_19'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_19_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_19_amt_" + resource_id + "'></td>";
            }
            break;
        case "20":
            if (result[i]['fs_20'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_20_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_20_amt_" + resource_id + "'></td>";
            }
            break;
        case "21":
            if (result[i]['fs_21'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_21_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_21_amt_" + resource_id + "'></td>";
            }
            break;
        case "22":
            if (result[i]['fs_22'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_22_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_22_amt_" + resource_id + "'></td>";
            }
            break;
        case "23":
            if (result[i]['fs_23'] === "1" && (spac_admin || master_admin)) {
                body_html += "<td class='col_100'><input type='text' class='col_100' style='height:15px; margin: -5px; text-align: right;' id='fs_23_amt_" + resource_id + "'></td>";
            }
            else {
                body_html += "<td class='col_100' style='text-align: right;' id='fs_23_amt_" + resource_id + "'></td>";
            }
            break;
        default:
            break;
    }
    
    return body_html;
}

function setFinalHTML(committee, resource_id) {
    var body_html = "";
    
    switch(committee) {
        case "CHPLDTF":
            body_html += "<td class='col_50' style='text-align: center;' id='final_rating_chp_" + resource_id + "'></td>";
            if (chpldtf_admin || master_admin) {
                body_html += "<td class='col_30' style='text-align: center;'><button class='btn btn-mini form-horizontal' id='final_btn_chp_" + resource_id + "'><i class='icon-pencil icon-black'></i></button></td>";
            }
            break;
        case "SSAMMO":
            body_html += "<td class='col_50' style='text-align: center;' id='final_rating_ssa_" + resource_id + "'></td>";
            if (ssammo_admin || master_admin) {
                body_html += "<td class='col_30' style='text-align: center;'><button class='btn btn-mini form-horizontal' id='final_btn_ssa_" + resource_id + "'><i class='icon-pencil icon-black'></i></button></td>";
            }
            break;
        case "APTC":
            body_html += "<td class='col_50' style='text-align: center;' id='final_rating_apt_" + resource_id + "'></td>";
            if (aptc_admin || master_admin) { 
                body_html += "<td class='col_30' style='text-align: center;'><button class='btn btn-mini form-horizontal' id='final_btn_apt_" + resource_id + "'><i class='icon-pencil icon-black'></i></button></td>";
            }
            break;
        case "BDRPC":
            body_html += "<td class='col_50' style='text-align: center;' id='final_rating_bdr_" + resource_id + "'></td>";
            if (bdrpc_admin || master_admin) {
                body_html += "<td class='col_30' style='text-align: center;'><button class='btn btn-mini form-horizontal' id='final_btn_bdr_" + resource_id + "'><i class='icon-pencil icon-black'></i></button></td>";
            }
            break;
        case "IEC":
            body_html += "<td class='col_50' style='text-align: center;' id='final_rating_iec_" + resource_id + "'></td>";
            if (iec_admin || master_admin) {
                body_html += "<td class='col_30' style='text-align: center;'><button class='btn btn-mini form-horizontal' id='final_btn_iec_" + resource_id + "'><i class='icon-pencil icon-black'></i></button></td>";
            }
            break;
        case "SPAC":
//            body_html += "<td class='col_50' style='text-align: center;' id='final_avg_spa_" + resource_id + "'></td>";
            body_html += "<td class='col_50' style='text-align: center;' id='final_rating_chp_" + resource_id + "'></td>";
            body_html += "<td class='col_50' style='text-align: center;' id='final_rating_ssa_" + resource_id + "'></td>";
            body_html += "<td class='col_50' style='text-align: center;' id='final_rating_apt_" + resource_id + "'></td>";
            body_html += "<td class='col_50' style='text-align: center;' id='final_rating_bdr_" + resource_id + "'></td>";
            body_html += "<td class='col_50' style='text-align: center;' id='final_rating_iec_" + resource_id + "'></td>";
            body_html += "<td class='col_50' style='text-align: center;' id='final_rating_spa_" + resource_id + "'></td>";
            if (spac_admin || master_admin) {
                body_html += "<td class='col_30' style='text-align: center;'><button class='btn btn-mini form-horizontal' id='final_btn_spa_" + resource_id + "'><i class='icon-pencil icon-black'></i></button></td>";
            }
            break;
        default:
            break;
    }
    
    return body_html;
}

function setCommitteeHTML(committee, resource_id) {
    var body_html = "";
    
    switch(committee) {
        case "CHPLDTF":
            body_html += "<td class='col_50' style='text-align: center;' id='chp_median_" + resource_id + "'></td>";
            body_html += "<td class='col_50' style='text-align: center;' id='chp_mean_" + resource_id + "'></td>";
            break;
        case "SSAMMO":
            body_html += "<td class='col_50' style='text-align: center;' id='ssa_median_" + resource_id + "'></td>";
            body_html += "<td class='col_50' style='text-align: center;' id='ssa_mean_" + resource_id + "'></td>";
            break;
        case "APTC":
            body_html += "<td class='col_50' style='text-align: center;' id='apt_median_" + resource_id + "'></td>";
            body_html += "<td class='col_50' style='text-align: center;' id='apt_mean_" + resource_id + "'></td>";
            break;
        case "BDRPC":
            body_html += "<td class='col_50' style='text-align: center;' id='bdr_median_" + resource_id + "'></td>";
            body_html += "<td class='col_50' style='text-align: center;' id='bdr_mean_" + resource_id + "'></td>";
            break;
        case "IEC":
            body_html += "<td class='col_50' style='text-align: center;' id='iec_median_" + resource_id + "'></td>";
            body_html += "<td class='col_50' style='text-align: center;' id='iec_mean_" + resource_id + "'></td>";
            break;
        default:
            break;
    }
    
    return body_html;
}

function setMasterSQLScript(sel_committee) {
    sql_select = "";
    sql_from = "";
    sql_where = "";
    
    switch(sel_committee) {
        case "All":
            sql_select += "rchp.Active AS CHPLDTF_Active, rchp.Median AS CHPLDTF_Median, rchp.Mean AS CHPLDTF_Mean, ";
            sql_select += "rssa.Active AS SSAMMO_Active, rssa.Median AS SSAMMO_Median, rssa.Mean AS SSAMMO_Mean, ";
            sql_select += "rapt.Active AS APTC_Active, rapt.Median AS APTC_Median, rapt.Mean AS APTC_Mean, ";
            sql_select += "rbdr.Active AS BDRPC_Active, rbdr.Median AS BDRPC_Median, rbdr.Mean AS BDRPC_Mean, ";
            sql_select += "riec.Active AS IEC_Active, riec.Median AS IEC_Median, riec.Mean AS IEC_Mean, ";
            sql_select += "rspa.Active AS SPAC_Active, rspa.Median AS SPAC_Median, rspa.Mean AS SPAC_Mean, ";
            
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateCHPLDTF] AS rchp ON rchp.ResourceID = resr.ResourceID ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS rssa ON rssa.ResourceID = resr.ResourceID ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateAPTC] AS rapt ON rapt.ResourceID = resr.ResourceID ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateBDRPC] AS rbdr ON rbdr.ResourceID = resr.ResourceID ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateIEC] AS riec ON riec.ResourceID = resr.ResourceID ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSPAC] AS rspa ON rspa.ResourceID = resr.ResourceID ";
            
            sql_where += "rchp.Active = 1 OR rssa.Active = 1 OR rapt.Active = 1 OR rbdr.Active = 1 OR riec.Active = 1 OR rspa.Active = 1 ";
            break;
        case "CHPLDTF":
            sql_select += "rchp.Active AS CHPLDTF_Active, rchp.Median AS CHPLDTF_Median, rchp.Mean AS CHPLDTF_Mean, rchp.FinalRating AS CHPLDTF_FinalRating, ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateCHPLDTF] AS rchp ON rchp.ResourceID = resr.ResourceID ";
            sql_where += "rchp.Active = 1 ";
            break;
        case "SSAMMO":
            sql_select += "rssa.Active AS SSAMMO_Active, rssa.Median AS SSAMMO_Median, rssa.Mean AS SSAMMO_Mean, rssa.FinalRating AS SSAMMO_FinalRating, ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS rssa ON rssa.ResourceID = resr.ResourceID ";
            sql_where += "rssa.Active = 1 ";
            break;
        case "APTC":
            sql_select += "rapt.Active AS APTC_Active, rapt.Median AS APTC_Median, rapt.Mean AS APTC_Mean, rapt.FinalRating AS APTC_FinalRating, ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateAPTC] AS rapt ON rapt.ResourceID = resr.ResourceID ";
            sql_where += "rapt.Active = 1 ";
            break;
        case "BDRPC":
            sql_select += "rbdr.Active AS BDRPC_Active, rbdr.Median AS BDRPC_Median, rbdr.Mean AS BDRPC_Mean, rbdr.FinalRating AS BDRPC_FinalRating, ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateBDRPC] AS rbdr ON rbdr.ResourceID = resr.ResourceID ";
            sql_where += "rbdr.Active = 1 ";
            break;
        case "IEC":
            sql_select += "riec.Active AS IEC_Active, riec.Median AS IEC_Median, riec.Mean AS IEC_Mean, riec.FinalRating AS IEC_FinalRating, ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateIEC] AS riec ON riec.ResourceID = resr.ResourceID ";
            sql_where += "riec.Active = 1 ";
            break;
        case "SPAC":
            sql_select += "rsfs.fs_1, rsfs.fs_2, rsfs.fs_3, rsfs.fs_4, rsfs.fs_5, rsfs.fs_6, rsfs.fs_7, rsfs.fs_8, rsfs.fs_9, rsfs.fs_10, ";
            sql_select += "rsfs.fs_11, rsfs.fs_12, rsfs.fs_13, rsfs.fs_14, rsfs.fs_15, rsfs.fs_16, rsfs.fs_17, rsfs.fs_18, rsfs.fs_19, rsfs.fs_20, rsfs.fs_21, rsfs.fs_22, rsfs.fs_23, ";
            sql_select += "rsfa.TotalAmount AS funded_total, rsfa.fs_1_amt, rsfa.fs_2_amt, rsfa.fs_3_amt, rsfa.fs_4_amt, rsfa.fs_5_amt, rsfa.fs_6_amt, rsfa.fs_7_amt, rsfa.fs_8_amt, rsfa.fs_9_amt, rsfa.fs_10_amt, ";
            sql_select += "rsfa.fs_11_amt, rsfa.fs_12_amt, rsfa.fs_13_amt, rsfa.fs_14_amt, rsfa.fs_15_amt, rsfa.fs_16_amt, rsfa.fs_17_amt, rsfa.fs_18_amt, rsfa.fs_19_amt, rsfa.fs_20_amt, ";
            sql_select += "rsfa.fs_21_amt, rsfa.fs_22_amt, rsfa.fs_23_amt, ";
            sql_select += "rchp.FinalRating AS CHPLDTF_FinalRating, ";
            sql_select += "rssa.FinalRating AS SSAMMO_FinalRating, ";
            sql_select += "rapt.FinalRating AS APTC_FinalRating, ";
            sql_select += "rbdr.FinalRating AS BDRPC_FinalRating, ";
            sql_select += "riec.FinalRating AS IEC_FinalRating, ";
            sql_select += "rspa.FinalRating AS SPAC_FinalRating, ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateCHPLDTF] AS rchp ON rchp.ResourceID = resr.ResourceID ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS rssa ON rssa.ResourceID = resr.ResourceID ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateAPTC] AS rapt ON rapt.ResourceID = resr.ResourceID ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateBDRPC] AS rbdr ON rbdr.ResourceID = resr.ResourceID ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateIEC] AS riec ON riec.ResourceID = resr.ResourceID ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSPAC] AS rspa ON rspa.ResourceID = resr.ResourceID ";
            sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[ResourceFundAmt] AS rsfa ON resr.ResourceID = rsfa.ResourceID ";
            sql_where += "rspa.Active = 1 ";
            break;
        default:
            break;
    }

    sql_where = sql_where.substring(0, sql_where.length-1);
    sql_where = "(" + sql_where + ") AND resr.RSID <> 18 AND resr.RSID <> 20 AND resr.RSID <> 21 AND resr.RSID <> 22 ";
    sql_where += "AND resr.RSID <> 7 AND resr.RSID <> 8 AND resr.RSID <> 9 AND resr.RSID <> 10 AND resr.RSID <> 11 ";
    sql_where += "AND resr.FiscalYear = '" + $('#all_fiscal_yrs').val() + "'" + sql_strReviewPeriod();
}

function setSQLScript(sel_committee) {
    sql_select = "";
    sql_from = "";
    sql_where = "";
    
    switch(sel_committee) {
        case "All":
            if (column_chpldtf !== "") {
                sql_select += "rchp.Active AS CHPLDTF_Active, rchp.Median AS CHPLDTF_Median, rchp.Mean AS CHPLDTF_Mean, rchp." + column_chpldtf + " AS CHPLDTF_Rating, ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateCHPLDTF] AS rchp ON rchp.ResourceID = resr.ResourceID ";
                sql_where += "rchp.Active = 1 ";
            }
            if (column_ssammo !== "") {
                sql_select += "rssa.Active AS SSAMMO_Active, rssa.Median AS SSAMMO_Median, rssa.Mean AS SSAMMO_Mean, rssa." + column_ssammo + " AS SSAMMO_Rating, ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS rssa ON rssa.ResourceID = resr.ResourceID ";
                sql_where += "OR rssa.Active = 1 ";
            }
            if (column_aptc !== "") {
                sql_select += "rapt.Active AS APTC_Active, rapt.Median AS APTC_Median, rapt.Mean AS APTC_Mean, rapt." + column_aptc + " AS APTC_Rating, ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateAPTC] AS rapt ON rapt.ResourceID = resr.ResourceID ";
                sql_where += "OR rapt.Active = 1 ";
            }
            if (column_bdrpc !== "") {
                sql_select += "rbdr.Active AS BDRPC_Active, rbdr.Median AS BDRPC_Median, rbdr.Mean AS BDRPC_Mean, rbdr." + column_bdrpc + " AS BDRPC_Rating, ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateBDRPC] AS rbdr ON rbdr.ResourceID = resr.ResourceID ";
                sql_where += "OR rbdr.Active = 1 ";
            }
            if (column_iec !== "") {
                sql_select += "riec.Active AS IEC_Active, riec.Median AS IEC_Median, riec.Mean AS IEC_Mean, riec." + column_iec + " AS IEC_Rating, ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateIEC] AS riec ON riec.ResourceID = resr.ResourceID ";
                sql_where += "OR riec.Active = 1 ";
            }
            if (column_spac !== "") {
                sql_select += "rspa.Active AS SPAC_Active, rspa.Median AS SPAC_Median, rspa.Mean AS SPAC_Mean, rspa." + column_spac + " AS SPAC_Rating, ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSPAC] AS rspa ON rspa.ResourceID = resr.ResourceID ";
                sql_where += "OR rspa.Active = 1 ";
            }
            break;
        case "CHPLDTF":
            if (column_chpldtf !== "") {
                sql_select += "rchp.Active AS CHPLDTF_Active, rchp.Median AS CHPLDTF_Median, rchp.Mean AS CHPLDTF_Mean, rchp." + column_chpldtf + " AS CHPLDTF_Rating, rchp.FinalRating AS CHPLDTF_FinalRating, ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateCHPLDTF] AS rchp ON rchp.ResourceID = resr.ResourceID ";
                sql_where += "rchp.Active = 1 ";
            }
            break;
        case "SSAMMO":
            if (column_ssammo !== "") {
                sql_select += "rssa.Active AS SSAMMO_Active, rssa.Median AS SSAMMO_Median, rssa.Mean AS SSAMMO_Mean, rssa." + column_ssammo + " AS SSAMMO_Rating, rssa.FinalRating AS SSAMMO_FinalRating, ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS rssa ON rssa.ResourceID = resr.ResourceID ";
                sql_where += "rssa.Active = 1 ";
            }
            break;
        case "APTC":
            if (column_aptc !== "") {
                sql_select += "rapt.Active AS APTC_Active, rapt.Median AS APTC_Median, rapt.Mean AS APTC_Mean, rapt." + column_aptc + " AS APTC_Rating, rapt.FinalRating AS APTC_FinalRating, ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateAPTC] AS rapt ON rapt.ResourceID = resr.ResourceID ";
                sql_where += "rapt.Active = 1 ";
            }
            break;
        case "BDRPC":
            if (column_bdrpc !== "") {
                sql_select += "rbdr.Active AS BDRPC_Active, rbdr.Median AS BDRPC_Median, rbdr.Mean AS BDRPC_Mean, rbdr." + column_bdrpc + " AS BDRPC_Rating, rbdr.FinalRating AS BDRPC_FinalRating, ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateBDRPC] AS rbdr ON rbdr.ResourceID = resr.ResourceID ";
                sql_where += "rbdr.Active = 1 ";
            }
            break;
        case "IEC":
            if (column_iec !== "") {
                sql_select += "riec.Active AS IEC_Active, riec.Median AS IEC_Median, riec.Mean AS IEC_Mean, riec." + column_iec + " AS IEC_Rating, riec.FinalRating AS IEC_FinalRating, ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateIEC] AS riec ON riec.ResourceID = resr.ResourceID ";
                sql_where += "riec.Active = 1 ";
            }
            break;
        case "SPAC":
            if (column_spac !== "") {
                sql_select += "rsfs.fs_1, rsfs.fs_2, rsfs.fs_3, rsfs.fs_4, rsfs.fs_5, rsfs.fs_6, rsfs.fs_7, rsfs.fs_8, rsfs.fs_9, rsfs.fs_10, ";
                sql_select += "rsfs.fs_11, rsfs.fs_12, rsfs.fs_13, rsfs.fs_14, rsfs.fs_15, rsfs.fs_16, rsfs.fs_17, rsfs.fs_18, rsfs.fs_19, rsfs.fs_20, rsfs.fs_21, rsfs.fs_22, rsfs.fs_23, ";
                sql_select += "rsfa.TotalAmount AS funded_total, rsfa.fs_1_amt, rsfa.fs_2_amt, rsfa.fs_3_amt, rsfa.fs_4_amt, rsfa.fs_5_amt, rsfa.fs_6_amt, rsfa.fs_7_amt, rsfa.fs_8_amt, rsfa.fs_9_amt, rsfa.fs_10_amt, ";
                sql_select += "rsfa.fs_11_amt, rsfa.fs_12_amt, rsfa.fs_13_amt, rsfa.fs_14_amt, rsfa.fs_15_amt, rsfa.fs_16_amt, rsfa.fs_17_amt, rsfa.fs_18_amt, rsfa.fs_19_amt, rsfa.fs_20_amt, ";
                sql_select += "rsfa.fs_21_amt, rsfa.fs_22_amt, rsfa.fs_23_amt, ";
                sql_select += "rchp.FinalRating AS CHPLDTF_FinalRating, ";
                sql_select += "rssa.FinalRating AS SSAMMO_FinalRating, ";
                sql_select += "rapt.FinalRating AS APTC_FinalRating, ";
                sql_select += "rbdr.FinalRating AS BDRPC_FinalRating, ";
                sql_select += "riec.FinalRating AS IEC_FinalRating, ";
                if (spac_admin || master_admin) {
                    sql_select += "rspa." + column_spac + " AS SPAC_Rating, rspa.FinalRating AS SPAC_FinalRating, ";
                }
                else {
                    sql_select += "rspa.FinalRating AS SPAC_FinalRating, ";
                }
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateCHPLDTF] AS rchp ON rchp.ResourceID = resr.ResourceID ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS rssa ON rssa.ResourceID = resr.ResourceID ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateAPTC] AS rapt ON rapt.ResourceID = resr.ResourceID ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateBDRPC] AS rbdr ON rbdr.ResourceID = resr.ResourceID ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateIEC] AS riec ON riec.ResourceID = resr.ResourceID ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSPAC] AS rspa ON rspa.ResourceID = resr.ResourceID ";
                sql_from += "LEFT JOIN [IVCRESOURCES].[dbo].[ResourceFundAmt] AS rsfa ON resr.ResourceID = rsfa.ResourceID ";
                sql_where += "rspa.Active = 1 ";
            }
            break;
        default:
            break;
    }
    
    var left_trim = sql_where.substring(0, 3);
    if (left_trim === "OR ") {
        sql_where = sql_where.substring(3, sql_where.length);
    }
    sql_where = sql_where.substring(0, sql_where.length-1);
    sql_where = "(" + sql_where + ") AND resr.RSID <> 18 AND resr.RSID <> 20 AND resr.RSID <> 21 AND resr.RSID <> 22 ";
    sql_where += "AND resr.RSID <> 7 AND resr.RSID <> 8 AND resr.RSID <> 9 AND resr.RSID <> 10 AND resr.RSID <> 11 ";
    sql_where += "AND resr.FiscalYear = '" + $('#all_fiscal_yrs').val() + "'" + sql_strReviewPeriod();
}

////////////////////////////////////////////////////////////////////////////////
function setTableHeader(committee) {
    // fixed container width
    $('.container').css('width', '1450px');

    $('#head_tr').empty();
    var tbl_html = "";    
    if (committee === "SPAC") {
        tbl_html += "<tr id='tbl_header'>";
        tbl_html += "<th class='col_50' style='text-align: left;'><a href='#' style='color: white;'>ID</a></th>";
        tbl_html += "<th class='col_250' style='text-align: left;'><a href='#' style='color: white;'>Proposal Title</a></th>";
        tbl_html += setSPACFinalColumn();
        tbl_html += "<th class='col_100' style='text-align: right; background-color: #CCCCFF'><a href='#' style='color: black;'>Requested</a></th>";
        tbl_html += setFundingSrcColumn();
        tbl_html += "<th class='col_100' style='text-align: left;'><a href='#' style='color: white;'>Need By</a></th>";
        tbl_html += "<th class='col_150' style='text-align: left;'><a href='#' style='color: white;'>Creator</a></th>";
        tbl_html += "<th class='col_150' style='text-align: left;'><a href='#' style='color: white;'>Resource Type</a></th>";
        tbl_html += "</tr>";
        tbl_html += setSPACHeaderRow();
    }
    else {
        tbl_html += "<tr id='tbl_header'>";
        tbl_html += "<th class='col_50' style='text-align: left;'><a href='#' style='color: white;'>ID</a></th>";
        tbl_html += "<th class='col_250' style='text-align: left;'><a href='#' style='color: white;'>Proposal Title</a></th>";
        tbl_html += "<th class='col_100' style='text-align: left;'><a href='#' style='color: white;'>Need By</a></th>";
        tbl_html += "<th class='col_150' style='text-align: left;'><a href='#' style='color: white;'>Creator</a></th>";
        tbl_html += "<th class='col_100' style='text-align: right;'><a href='#' style='color: white;'>Req. Amount</a></th>";
        tbl_html += "<th class='col_30'></th>";
        tbl_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>Your Rating</a></th>";
        tbl_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>Mgr Rating</a></th>";
        tbl_html += "<th class='col_50' style='text-align: center;'><a href='#' style='color: white;'>VP/P Rating</a></th>";
        tbl_html += setCommitteeFinalColumn(committee);
        tbl_html += "<th class='col_150' style='text-align: left;'><a href='#' style='color: white;'>Resource Type</a></th>";
        tbl_html += "<th class='col_100' style='text-align: left;'><a href='#' style='color: white;'>Committee</a></th>";
        tbl_html += "<th class='col_100' style='text-align: left;'><a href='#' style='color: white;'>Funding Src</a></th>";
        tbl_html += "</tr>";
    }
    
    $("#head_tr").append(tbl_html);
}

function getCommitteeRatingList(committee, resource_type, program, fund_src, fund_option, one_time) {    
    if (master_admin) {
        setMasterSQLScript(committee);
    }
    else {
        setSQLScript(committee);
    }
    
    var result = new Array(); 
    result = db_getCommitteeRatingList(sql_select, sql_from, sql_where, "0", resource_type, program, fund_src, fund_option, one_time);
    
    $('#body_tr').empty();
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            var str_totalAmount = formatDollar(Number(result[i]['TotalAmount']));
            setCommitteeRatingListHTML(committee, result[i]['ResourceID'], result[i]['ProposalTitle'], result[i]['NeedBy'], result[i]['CreatorName'], 
                                        result[i]['ResourceType'], result[i]['Funding'], str_totalAmount, i, result, result[i]['FiscalYear']);
            
            if (!master_admin) {
                setRatingEnable(result[i]['ResourceID'], i, result);
            }
            else {
                if (committee === "All") {
                    $('#new_rating_' + result[i]['ResourceID']).hide();
                }
            }
            setFundAmtValue(committee, result[i]['ResourceID'], i, result, result[i]['TotalAmount']);
            setUsrValue(committee, result[i]['ResourceID'], i, result);
            setMgrValue(result[i]['ResourceID'], result[i]['DepartMgr']);
            setVPPValue(result[i]['ResourceID'], result[i]['VPP']);
            setCommitteeValue(committee, result[i]['ResourceID'], i, result);
            setCommitteeFinalValue (committee, result[i]['ResourceID'], i, result);
        }
    }
}

function setCommitteeRatingListHTML(committee, resource_id, proposal_title, need_by, creator, resource_type, fund_src, total_amount, i, result, fiscal_year) {
    var brief_ptitle = textTruncate(25, proposal_title);
    
    var tbl_html = "";
    if (committee === "SPAC") {
        tbl_html += "<tr class='row_tr' id='res_tr_" + resource_id + "'>";
        tbl_html += "<td class='col_50'>" + resource_id + "</td>";
        tbl_html += "<td class='col_250'><a href=# id='resource_title_brief_" + resource_id +  "'>" + brief_ptitle + "</a></td>";
        tbl_html += setFinalHTML(committee, resource_id);
        tbl_html += "<td class='col_100' style='text-align: right;' id='resource_amount_" + resource_id + "'>" + total_amount + "</td>";
        tbl_html += setFundAmtHTML(resource_id, i, result);
        tbl_html += "<td class='col_100'>" + need_by + "</td>";
        tbl_html += "<td class='col_150'>" + creator + "</td>";
        tbl_html += "<td class='col_150'>" + resource_type + "</td>";
        tbl_html += "<td class='col_50' style='display: none;' id='resource_fiscal_year_" + resource_id + "'>" + fiscal_year + "</td>";
    }
    else {
        tbl_html += "<tr class='row_tr' id='res_tr_" + resource_id + "'>";
        tbl_html += "<td class='col_50'>" + resource_id + "</td>";
        tbl_html += "<td class='col_250'><a href=# id='resource_title_brief_" + resource_id +  "'>" + brief_ptitle + "</a></td>";
        tbl_html += "<td class='col_100'>" + need_by + "</td>";
        tbl_html += "<td class='col_150'>" + creator + "</td>";
        tbl_html += "<td class='col_100' style='text-align: right;' id='resource_amount_" + resource_id + "'>" + total_amount + "</td>";
        tbl_html += "<td class='col_30' style='text-align: center;'><button class='btn btn-mini form-horizontal' id='new_rating_" + resource_id + "'><i class='icon-pencil icon-black'></i></button></td>";    
        tbl_html += "<td class='col_50' style='text-align: center;' id='usr_rating_" + resource_id + "'></td>";
        tbl_html += "<td class='col_50' style='text-align: center;' id='mgr_rating_" + resource_id + "'></td>";
        tbl_html += "<td class='col_50' style='text-align: center;' id='vpp_rating_" + resource_id + "'></td>";
        tbl_html += setCommitteeHTML(committee, resource_id);
        tbl_html += setFinalHTML(committee, resource_id);
        tbl_html += "<td class='col_150'>" + resource_type + "</td>";
        tbl_html += "<td class='col_100'>" + committee + "</td>";
        if (fund_src === null) {
            tbl_html += "<td class='col_100'>All</td>";
        }
        else {
            tbl_html += "<td class='col_100'>" + fund_src + "</td>";
        }
    }

    tbl_html += "<td class='span1' style='display: none;' id='resource_title_full_" + resource_id + "'>" + proposal_title + "</td>";
    tbl_html += "</tr>";
    $("#body_tr").append(tbl_html);
}

function setRatingEnable(resource_id, i, result) {
    $('#new_rating_' + resource_id).hide();
    
    if (column_chpldtf !== "") {
        if (dt_chpldtf_start < dt_current_date && dt_chpldtf_end > dt_current_date && result[i]['CHPLDTF_Active'] === "1") {
            $('#new_rating_' + resource_id).show();
            return;
        }
    }
    if (column_ssammo !== "") {
        if (dt_ssammo_start < dt_current_date && dt_ssammo_end > dt_current_date && result[i]['SSAMMO_Active'] === "1") {
            $('#new_rating_' + resource_id).show();
            return;
        }
    }
    if (column_aptc !== "") {
        if (dt_aptc_start < dt_current_date && dt_aptc_end > dt_current_date && result[i]['APTC_Active'] === "1") {
            $('#new_rating_' + resource_id).show();
            return;
        }
    }
    if (column_bdrpc !== "") {
        if (dt_bdrpc_start < dt_current_date && dt_bdrpc_end > dt_current_date && result[i]['BDRPC_Active'] === "1") {
            $('#new_rating_' + resource_id).show();
            return;
        }
    }
    if (column_iec !== "") {
        if (dt_iec_start < dt_current_date && dt_iec_end > dt_current_date && result[i]['IEC_Active'] === "1") {
            $('#new_rating_' + resource_id).show();
            return;
        }
    }
    if (column_spac !== "") {
        if (dt_spac_start < dt_current_date && dt_spac_end > dt_current_date && result[i]['SPAC_Active'] === "1") {
            $('#new_rating_' + resource_id).show();
            return;
        }
    }
}

function setFundAmtValue(committee, resource_id, i, result, total_amount) {
    if (committee === "SPAC") {
        var fund_src = $('#adm_fund_src').val();
        var funded_total = result[i]['funded_total'];
        if (funded_total !== null) {
            var num_funded_total = Number(funded_total);
            var num_total_amount = Number(total_amount);
            var num_balance = num_total_amount - num_funded_total;
            $('#funded_total_' + resource_id).html(formatDollar(num_funded_total));
            $('#funded_balance_' + resource_id).html(formatDollar(num_balance));
        }
        
        switch (fund_src) {
            case "0":
                if(result[i]['fs_1'] === "1") {
                    var f_amt = result[i]['fs_1_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_1_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_1_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_2'] === "1") {
                    var f_amt = result[i]['fs_2_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_2_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_2_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_3'] === "1") {
                    var f_amt = result[i]['fs_3_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_3_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_3_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_4'] === "1") {
                    var f_amt = result[i]['fs_4_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_4_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_4_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_5'] === "1") {
                    var f_amt = result[i]['fs_5_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_5_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_5_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_6'] === "1") {
                    var f_amt = result[i]['fs_6_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_6_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_6_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_7'] === "1") {
                    var f_amt = result[i]['fs_7_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_7_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_7_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_8'] === "1") {
                    var f_amt = result[i]['fs_8_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_8_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_8_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_9'] === "1") {
                    var f_amt = result[i]['fs_9_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_9_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_9_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_10'] === "1") {
                    var f_amt = result[i]['fs_10_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_10_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_10_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_11'] === "1") {
                    var f_amt = result[i]['fs_11_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_11_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_11_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_12'] === "1") {
                    var f_amt = result[i]['fs_12_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_12_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_12_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_13'] === "1") {
                    var f_amt = result[i]['fs_13_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_13_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_13_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_14'] === "1") {
                    var f_amt = result[i]['fs_14_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_14_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_14_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_15'] === "1") {
                    var f_amt = result[i]['fs_15_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_15_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_15_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_16'] === "1") {
                    var f_amt = result[i]['fs_16_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_16_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_16_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_17'] === "1") {
                    var f_amt = result[i]['fs_17_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_17_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_17_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_18'] === "1") {
                    var f_amt = result[i]['fs_18_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_18_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_18_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_19'] === "1") {
                    var f_amt = result[i]['fs_19_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_19_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_19_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_20'] === "1") {
                    var f_amt = result[i]['fs_20_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_20_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_20_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_21'] === "1") {
                    var f_amt = result[i]['fs_21_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_21_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_21_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_22'] === "1") {
                    var f_amt = result[i]['fs_22_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_22_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_22_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                if(result[i]['fs_23'] === "1") {
                    var f_amt = result[i]['fs_23_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_23_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_23_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "1":
                if(result[i]['fs_1'] === "1") {
                    var f_amt = result[i]['fs_1_amt'];               
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_1_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }   
                        else {
                            $('#fs_1_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "2":
                if(result[i]['fs_2'] === "1") {
                    var f_amt = result[i]['fs_2_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_2_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_2_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "3":
                if(result[i]['fs_3'] === "1") {
                    var f_amt = result[i]['fs_3_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_3_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_3_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "4":
                if(result[i]['fs_4'] === "1") {
                    var f_amt = result[i]['fs_4_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_4_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_4_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "5":
                if(result[i]['fs_5'] === "1") {
                    var f_amt = result[i]['fs_5_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_5_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_5_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "6":
                if(result[i]['fs_6'] === "1") {
                    var f_amt = result[i]['fs_6_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_6_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_6_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "7":
                if(result[i]['fs_7'] === "1") {
                    var f_amt = result[i]['fs_7_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_7_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_7_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "8":
                if(result[i]['fs_8'] === "1") {
                    var f_amt = result[i]['fs_8_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_8_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_8_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "9":
                if(result[i]['fs_9'] === "1") {
                    var f_amt = result[i]['fs_9_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_9_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_9_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "10":
                if(result[i]['fs_10'] === "1") {
                    var f_amt = result[i]['fs_10_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_10_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_10_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "11":
                if(result[i]['fs_11'] === "1") {
                    var f_amt = result[i]['fs_11_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_11_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_11_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "12":
                if(result[i]['fs_12'] === "1") {
                    var f_amt = result[i]['fs_12_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_12_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_12_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "13":
                if(result[i]['fs_13'] === "1") {
                    var f_amt = result[i]['fs_13_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_13_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_13_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "14":
                if(result[i]['fs_14'] === "1") {
                    var f_amt = result[i]['fs_14_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_14_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_14_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "15":
                if(result[i]['fs_15'] === "1") {
                    var f_amt = result[i]['fs_15_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_15_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_15_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "16":
                if(result[i]['fs_16'] === "1") {
                    var f_amt = result[i]['fs_16_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_16_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_16_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "17":
                if(result[i]['fs_17'] === "1") {
                    var f_amt = result[i]['fs_17_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_17_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_17_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "18":
                if(result[i]['fs_18'] === "1") {
                    var f_amt = result[i]['fs_18_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_18_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_18_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "19":
                if(result[i]['fs_19'] === "1") {
                    var f_amt = result[i]['fs_19_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_19_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_19_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "20":
                if(result[i]['fs_20'] === "1") {
                    var f_amt = result[i]['fs_20_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_20_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_20_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "21":
                if(result[i]['fs_21'] === "1") {
                    var f_amt = result[i]['fs_21_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_21_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_21_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "22":
                if(result[i]['fs_22'] === "1") {
                    var f_amt = result[i]['fs_22_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_22_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_22_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            case "23":
                if(result[i]['fs_23'] === "1") {
                    var f_amt = result[i]['fs_23_amt'];
                    if (f_amt !== null) {
                        if (spac_admin || master_admin) {
                            $('#fs_23_amt_' + resource_id).val(formatDollar(Number(f_amt)));
                        }
                        else {
                            $('#fs_23_amt_' + resource_id).html(formatDollar(Number(f_amt)));
                        }
                    }
                }
                break;
            default:
                break;
        }
    }
}

function setUsrValue(committee, resource_id, i, result) {
    switch(committee) {
        case "All":
            if (column_chpldtf !== "") {
                var rating = result[i]['CHPLDTF_Rating'];
                if (rating !== null) {
                    $('#usr_rating_' + resource_id).html(rating);
                    break;
                }
            }
            if (column_ssammo !== "") {
                var rating = result[i]['SSAMMO_Rating'];
                if (rating !== null) {
                    $('#usr_rating_' + resource_id).html(rating);
                    break;
                }
            }
            if (column_aptc !== "") {
                var rating = result[i]['APTC_Rating'];
                if (rating !== null) {
                    $('#usr_rating_' + resource_id).html(rating);
                    break;
                }
            }
            if (column_bdrpc !== "") {
                var rating = result[i]['BDRPC_Rating'];
                if (rating !== null) {
                    $('#usr_rating_' + resource_id).html(rating);
                    break;
                }
            }
            if (column_iec !== "") {
                var rating = result[i]['IEC_Rating'];
                if (rating !== null) {
                    $('#usr_rating_' + resource_id).html(rating);
                    break;
                }
            }
            if (column_spac !== "") {
                var rating = result[i]['SPAC_Rating'];
                if (rating !== null) {
                    $('#usr_rating_' + resource_id).html(rating);
                    break;
                }
            }
            break;
        case "CHPLDTF":
            if (column_chpldtf !== "") {
                var rating = result[i]['CHPLDTF_Rating'];
                if (rating !== null) {
                    $('#usr_rating_' + resource_id).html(rating);
                }
            }
            break;
        case "SSAMMO":
            if (column_ssammo !== "") {
                var rating = result[i]['SSAMMO_Rating'];
                if (rating !== null) {
                    $('#usr_rating_' + resource_id).html(rating);
                }
            }
            break;
        case "APTC":
            if (column_aptc !== "") {
                var rating = result[i]['APTC_Rating'];
                if (rating !== null) {
                    $('#usr_rating_' + resource_id).html(rating);
                }
            }
            break;
        case "BDRPC":
            if (column_bdrpc !== "") {
                var rating = result[i]['BDRPC_Rating'];
                if (rating !== null) {
                    $('#usr_rating_' + resource_id).html(rating);
                }
            }
            break;
        case "IEC":
            if (column_iec !== "") {
                var rating = result[i]['IEC_Rating'];
                if (rating !== null) {
                    $('#usr_rating_' + resource_id).html(rating);
                }
            }
            break;
        case "SPAC":
            if (column_spac !== "") {
                var rating = result[i]['SPAC_Rating'];
                if (rating !== null) {
                    $('#usr_rating_' + resource_id).html(rating);
                }
            }
            break;
        default:
            break;
    }
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

function setCommitteeFinalValue (committee, resource_id, i, result) {
    switch(committee) {
        case "CHPLDTF":
            var final_rating = result[i]['CHPLDTF_FinalRating'];
            if (final_rating !== null) {
                $('#final_rating_chp_' + resource_id).html(final_rating);
            }
        break;
        case "SSAMMO":
            var final_rating = result[i]['SSAMMO_FinalRating'];
            if (final_rating !== null) {
                $('#final_rating_ssa_' + resource_id).html(final_rating);
            }
        break;
        case "APTC":
            var final_rating = result[i]['APTC_FinalRating'];
            if (final_rating !== null) {
                $('#final_rating_apt_' + resource_id).html(final_rating);
            }
            break;
        case "BDRPC":
            var final_rating = result[i]['BDRPC_FinalRating'];
            if (final_rating !== null) {
                $('#final_rating_bdr_' + resource_id).html(final_rating);
            }
            break;
        case "IEC":
            var final_rating = result[i]['IEC_FinalRating'];
            if (final_rating !== null) {
                $('#final_rating_iec_' + resource_id).html(final_rating);
            }
            break;
        case "SPAC":
            var final_rating = result[i]['CHPLDTF_FinalRating'];
            if (final_rating !== null) {
                $('#final_rating_chp_' + resource_id).html(final_rating);
            }
            var final_rating = result[i]['SSAMMO_FinalRating'];
            if (final_rating !== null) {
                $('#final_rating_ssa_' + resource_id).html(final_rating);
            }
            var final_rating = result[i]['APTC_FinalRating'];
            if (final_rating !== null) {
                $('#final_rating_apt_' + resource_id).html(final_rating);
            }
            var final_rating = result[i]['BDRPC_FinalRating'];
            if (final_rating !== null) {
                $('#final_rating_bdr_' + resource_id).html(final_rating);
            }
            var final_rating = result[i]['IEC_FinalRating'];
            if (final_rating !== null) {
                $('#final_rating_iec_' + resource_id).html(final_rating);
            }
            var final_rating = result[i]['SPAC_FinalRating'];
            if (final_rating !== null) {
                $('#final_rating_spa_' + resource_id).html(final_rating);
            }
            break;
        default:
            break;
    }
}

function setCommitteeValue(committee, resource_id, i, result) {
    switch(committee) {
        case "CHPLDTF":
            var median = result[i]['CHPLDTF_Median'];
            var mean = result[i]['CHPLDTF_Mean'];
            if (median !== null) {
                $('#chp_median_' + resource_id).html(median);
            }
            if (mean !== null) {
                $('#chp_mean_' + resource_id).html(mean);
            }
            break;
        case "SSAMMO":
            var median = result[i]['SSAMMO_Median'];
            var mean = result[i]['SSAMMO_Mean'];
            if (median !== null) {
                $('#ssa_median_' + resource_id).html(median);
            }
            if (mean !== null) {
                $('#ssa_mean_' + resource_id).html(mean);
            }
            break;
        case "APTC":
            var median = result[i]['APTC_Median'];
            var mean = result[i]['APTC_Mean'];
            if (median !== null) {
                $('#apt_median_' + resource_id).html(median);
            }
            if (mean !== null) {
                $('#apt_mean_' + resource_id).html(mean);
            }
            break;
        case "BDRPC":
            var median = result[i]['BDRPC_Median'];
            var mean = result[i]['BDRPC_Mean'];
            if (median !== null) {
                $('#bdr_median_' + resource_id).html(median);
            }
            if (mean !== null) {
                $('#bdr_mean_' + resource_id).html(mean);
            }
            break;
        case "IEC":
            var median = result[i]['IEC_Median'];
            var mean = result[i]['IEC_Mean'];
            if (median !== null) {
                $('#iec_median_' + resource_id).html(median);
            }
            if (mean !== null) {
                $('#iec_mean_' + resource_id).html(mean);
            }
            break;
        default:
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////
function updateMasterRatingValue(new_rating, mbr_email) {
    var master_chpldtf = db_getmbrCHPLDTFColumnName(mbr_email);
    var master_ssammo = db_getmbrSSAMMOColumnName(mbr_email);
    var master_aptc = db_getmbrAPTCColumnName(mbr_email);
    var master_bdrpc = db_getmbrBDRPCColumnName(mbr_email);
    var master_iec = db_getmbrIECColumnName(mbr_email);
    var master_spac = db_getmbrSPACColumnName(mbr_email);
    
    getCHPLDTFColumnArray();
    getSSAMMOColumnArray();
    getAPTCColumnArray();
    getBDRPCColumnArray();
    getIECColumnArray();
    getSPACColumnArray();
    
    if (master_chpldtf !== null) {
        db_updaterateUserCHPLDTFRating(resource_id, master_chpldtf, new_rating);
        sqlCHPLDTFUpdateMedian();
        sqlCHPLDTFUpdateMean();
        getUserCHPLDTFMedianMean();
    }
    if (master_ssammo !== null) {
        db_updaterateUserSSAMMORating(resource_id, master_ssammo, new_rating);
        sqlSSAMMOUpdateMedian();
        sqlSSAMMOUpdateMean();
        getUserSSAMMOMedianMean();
    }
    if (master_aptc !== null) {
        db_updaterateUserAPTCRating(resource_id, master_aptc, new_rating);
        sqlAPTCUpdateMedian();
        sqlAPTCUpdateMean();
        getUserAPTCMedianMean();
    }
    if (master_bdrpc !== null) {
        db_updaterateUserBDRPCRating(resource_id, master_bdrpc, new_rating);
        sqlBDRPCUpdateMedian();
        sqlBDRPCUpdateMean();
        getUserBDRPCMedianMean();
    }
    if (master_iec !== null) {
        db_updaterateUserIECRating(resource_id, master_iec, new_rating);
        sqlIECUpdateMedian();
        sqlIECUpdateMean();
        getUserIECMedianMean();
    }
    if (master_spac !== null) {
        db_updaterateUserSPACRating(resource_id, master_spac, new_rating);
        sqlSPACUpdateMedian();
        sqlSPACUpdateMean();
        getUserSPACMedianMean();
    }

    getCHPLDTFMedianMean();
    getSSAMMOMedianMean();
    getAPTCMedianMean();
    getBDRPCMedianMean();
    getIECMedianMean();
    getSPACMedianMean();
    
    updateAllMedianMean();
}

function updateUserRatingValue(new_rating) {
    getCHPLDTFColumnArray();
    getSSAMMOColumnArray();
    getAPTCColumnArray();
    getBDRPCColumnArray();
    getIECColumnArray();
    getSPACColumnArray();
    
    if (column_chpldtf !== "") {
        db_updaterateUserCHPLDTFRating(resource_id, column_chpldtf, new_rating);
        sqlCHPLDTFUpdateMedian();
        sqlCHPLDTFUpdateMean();
        getUserCHPLDTFMedianMean();
    }
    if (column_ssammo !== "") {
        db_updaterateUserSSAMMORating(resource_id, column_ssammo, new_rating);
        sqlSSAMMOUpdateMedian();
        sqlSSAMMOUpdateMean();
        getUserSSAMMOMedianMean();
    }
    if (column_aptc !== "") {
        db_updaterateUserAPTCRating(resource_id, column_aptc, new_rating);
        sqlAPTCUpdateMedian();
        sqlAPTCUpdateMean();
        getUserAPTCMedianMean();
    }
    if (column_bdrpc !== "") {
        db_updaterateUserBDRPCRating(resource_id, column_bdrpc, new_rating);
        sqlBDRPCUpdateMedian();
        sqlBDRPCUpdateMean();
        getUserBDRPCMedianMean();
    }
    if (column_iec !== "") {
        db_updaterateUserIECRating(resource_id, column_iec, new_rating);
        sqlIECUpdateMedian();
        sqlIECUpdateMean();
        getUserIECMedianMean();
    }
    if (column_spac !== "") {
        db_updaterateUserSPACRating(resource_id, column_spac, new_rating);
        sqlSPACUpdateMedian();
        sqlSPACUpdateMean();
        getUserSPACMedianMean();
    }
    
    getCHPLDTFMedianMean();
    getSSAMMOMedianMean();
    getAPTCMedianMean();
    getBDRPCMedianMean();
    getIECMedianMean();
    getSPACMedianMean();

    updateAllMedianMean();
}

////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////
function sqlCHPLDTFUpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(ResourceID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT ResourceID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateCHPLDTF] WHERE ResourceID = " + resource_id + ") pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
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
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateSSAMMO] WHERE ResourceID = " + resource_id + ") pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
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
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateAPTC] WHERE ResourceID = " + resource_id + ") pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
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
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateBDRPC] WHERE ResourceID = " + resource_id + ") pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
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
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateIEC] WHERE ResourceID = " + resource_id + ") pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
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
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateSPAC] WHERE ResourceID = " + resource_id + ") pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
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

////////////////////////////////////////////////////////////////////////////////
function sql_all_raw_CHPLDTFUpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(ResourceID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT ResourceID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateCHPLDTF]) pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
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
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateCHPLDTF] SET Median = NULL ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateCHPLDTF] AS org LEFT JOIN #MEDIAN_RESULT AS rst ON org.ResourceID = rst.ResourceID ";
    sql_query += "WHERE rst.ResourceID IS NULL ";
    sql_query += "DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

function sql_all_raw_SSAMMOUpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(ResourceID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT ResourceID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateSSAMMO]) pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
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
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateSSAMMO] SET Median = NULL ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateSSAMMO] AS org LEFT JOIN #MEDIAN_RESULT AS rst ON org.ResourceID = rst.ResourceID ";
    sql_query += "WHERE rst.ResourceID IS NULL ";
    sql_query += "DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

function sql_all_raw_APTCUpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(ResourceID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT ResourceID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateAPTC]) pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
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
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateAPTC] SET Median = NULL ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateAPTC] AS org LEFT JOIN #MEDIAN_RESULT AS rst ON org.ResourceID = rst.ResourceID ";
    sql_query += "WHERE rst.ResourceID IS NULL ";
    sql_query += "DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

function sql_all_raw_BDRPCUpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(ResourceID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT ResourceID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateBDRPC]) pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
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
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateBDRPC] SET Median = NULL ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateBDRPC] AS org LEFT JOIN #MEDIAN_RESULT AS rst ON org.ResourceID = rst.ResourceID ";
    sql_query += "WHERE rst.ResourceID IS NULL ";
    sql_query += "DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

function sql_all_raw_IECUpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(ResourceID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT ResourceID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateIEC]) pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
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
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateIEC] SET Median = NULL ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateIEC] AS org LEFT JOIN #MEDIAN_RESULT AS rst ON org.ResourceID = rst.ResourceID ";
    sql_query += "WHERE rst.ResourceID IS NULL ";
    sql_query += "DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

function sql_all_raw_SPACUpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(ResourceID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT ResourceID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateSPAC]) pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
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
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateSPAC] SET Median = NULL ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateSPAC] AS org LEFT JOIN #MEDIAN_RESULT AS rst ON org.ResourceID = rst.ResourceID ";
    sql_query += "WHERE rst.ResourceID IS NULL ";
    sql_query += "DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

////////////////////////////////////////////////////////////////////////////////
function sql_overall_UpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_COMMITTEE_TABLE(ResourceID int, chpldtf numeric(3, 2), ssammo numeric(3, 2), aptc numeric(3, 2), bdrpc numeric(3, 2), iec numeric(3, 2), spac numeric(3, 2)) ";
    sql_query += "INSERT INTO #MEDIAN_COMMITTEE_TABLE SELECT rate_all.ResourceID, chpldtf.Median, ssammo.Median, aptc.Median, bdrpc.Median, iec.Median, spac.Median ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateAll] AS rate_all LEFT JOIN [IVCRESOURCES].[dbo].[rateCHPLDTF] AS chpldtf ON chpldtf.ResourceID = rate_all.ResourceID ";
    sql_query += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS ssammo ON ssammo.ResourceID = rate_all.ResourceID ";
    sql_query += "LEFT JOIN [IVCRESOURCES].[dbo].[rateAPTC] AS aptc ON aptc.ResourceID = rate_all.ResourceID ";
    sql_query += "LEFT JOIN [IVCRESOURCES].[dbo].[rateBDRPC] AS bdrpc ON bdrpc.ResourceID = rate_all.ResourceID ";
    sql_query += "LEFT JOIN [IVCRESOURCES].[dbo].[rateIEC] AS iec ON iec.ResourceID = rate_all.ResourceID ";
    sql_query += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSPAC] AS spac ON spac.ResourceID = rate_all.ResourceID ";
    sql_query += "CREATE TABLE #MEDIAN_TABLE(ResourceID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT ResourceID, Value ";
    sql_query += "FROM (SELECT * FROM #MEDIAN_COMMITTEE_TABLE) pivotedDate UNPIVOT (Value FOR AgeRAnge IN (chpldtf, ssammo, aptc, bdrpc, iec, spac)) AS Result ";
    sql_query += "CREATE TABLE #MEDIAN_RESULT (ResourceID int, column_median numeric(3, 2)) ";
    sql_query += ";WITH Counts AS(SELECT ResourceID, c = COUNT(*) FROM #MEDIAN_TABLE GROUP BY ResourceID) ";
    sql_query += "INSERT INTO #MEDIAN_RESULT SELECT a.ResourceID, Median = AVG(0. + value) FROM Counts a ";
    sql_query += "CROSS APPLY(SELECT TOP (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) b.value, r = ROW_NUMBER() OVER (ORDER BY b.value) FROM #MEDIAN_TABLE b WHERE a.ResourceID = b.ResourceID ORDER BY b.value ) p ";
    sql_query += "WHERE r BETWEEN ((a.c - 1) / 2) + 1 AND (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) GROUP BY a.ResourceID; ";
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateAll] SET Median = rst.column_median ";
    sql_query += "FROM #MEDIAN_RESULT AS rst INNER JOIN [IVCRESOURCES].[dbo].[rateAll] AS org ON rst.ResourceID = org.ResourceID ";
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateAll] SET Median = NULL ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateAll] AS org LEFT JOIN #MEDIAN_RESULT AS rst ON org.ResourceID = rst.ResourceID ";
    sql_query += "WHERE rst.ResourceID IS NULL ";
    sql_query += "DROP TABLE #MEDIAN_COMMITTEE_TABLE DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

////////////////////////////////////////////////////////////////////////////////
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
    sql_query += "WHERE ResourceID = " + resource_id;
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
    sql_query += "WHERE ResourceID = " + resource_id;
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
    sql_query += "WHERE ResourceID = " + resource_id;
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
    sql_query += "WHERE ResourceID = " + resource_id;
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
    sql_query += "WHERE ResourceID = " + resource_id;
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
    sql_query += "WHERE ResourceID = " + resource_id;
    db_script_update_rate(sql_query);
}

////////////////////////////////////////////////////////////////////////////////
function sql_all_raw_CHPLDTFUpdateMean() {
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
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateCHPLDTF]";
    db_script_update_rate(sql_query);
}

function sql_all_raw_SSAMMOUpdateMean() {
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
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateSSAMMO]";
    db_script_update_rate(sql_query);
}

function sql_all_raw_APTCUpdateMean() {
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
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateAPTC]";
    db_script_update_rate(sql_query);
}

function sql_all_raw_BDRPCUpdateMean() {
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
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateBDRPC]";
    db_script_update_rate(sql_query);
}

function sql_all_raw_IECUpdateMean() {
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
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateIEC]";
    db_script_update_rate(sql_query);
}

function sql_all_raw_SPACUpdateMean() {
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
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateSPAC]";
    db_script_update_rate(sql_query);
}

////////////////////////////////////////////////////////////////////////////////
function sql_overall_UpdateMean() {
    var sql_query = "UPDATE [IVCRESOURCES].[dbo].[rateAll] SET Mean = CONVERT(numeric(3, 2), (";
    sql_query += "ISNULL(CONVERT(numeric(3, 2), chpldtf.Mean), 0) ";
    sql_query += "+ ISNULL(CONVERT(numeric(3, 2), ssammo.Mean), 0) ";
    sql_query += "+ ISNULL(CONVERT(numeric(3, 2), aptc.Mean), 0) ";
    sql_query += "+ ISNULL(CONVERT(numeric(3, 2), bdrpc.Mean), 0) ";
    sql_query += "+ ISNULL(CONVERT(numeric(3, 2), iec.Mean), 0) ";
    sql_query += "+ ISNULL(CONVERT(numeric(3, 2), spac.Mean), 0)) ";
    sql_query += "/ NULLIF((CASE WHEN chpldtf.Mean IS NULL THEN 0 ELSE 1 END ";
    sql_query += "+ CASE WHEN ssammo.Mean IS NULL THEN 0 ELSE 1 END ";
    sql_query += "+ CASE WHEN aptc.Mean IS NULL THEN 0 ELSE 1 END ";
    sql_query += "+ CASE WHEN bdrpc.Mean IS NULL THEN 0 ELSE 1 END ";
    sql_query += "+ CASE WHEN iec.Mean IS NULL THEN 0 ELSE 1 END ";
    sql_query += "+ CASE WHEN spac.Mean IS NULL THEN 0 ELSE 1 END), 0)) ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateAll] AS rate_all LEFT JOIN [IVCRESOURCES].[dbo].[rateCHPLDTF] AS chpldtf ON chpldtf.ResourceID = rate_all.ResourceID ";
    sql_query += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS ssammo ON ssammo.ResourceID = rate_all.ResourceID ";
    sql_query += "LEFT JOIN [IVCRESOURCES].[dbo].[rateAPTC] AS aptc ON aptc.ResourceID = rate_all.ResourceID ";
    sql_query += "LEFT JOIN [IVCRESOURCES].[dbo].[rateBDRPC] AS bdrpc ON bdrpc.ResourceID = rate_all.ResourceID ";
    sql_query += "LEFT JOIN [IVCRESOURCES].[dbo].[rateIEC] AS iec ON iec.ResourceID = rate_all.ResourceID ";
    sql_query += "LEFT JOIN [IVCRESOURCES].[dbo].[rateSPAC] AS spac ON spac.ResourceID = rate_all.ResourceID";
    db_script_update_rate(sql_query);
}

////////////////////////////////////////////////////////////////////////////////
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

function getUserCHPLDTFMedianMean() {
    var result = new Array();
    result = db_getrateCHPLDTFUser(resource_id);
    
    if (result[0]['Median'] !== null) {
        $('#chp_median_' + resource_id).html(result[0]['Median']);
    }
    if (result[0]['Mean'] !== null) {
        $('#chp_mean_' + resource_id).html(result[0]['Mean']);
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

function getUserSSAMMOMedianMean() {
    var result = new Array();
    result = db_getrateSSAMMOUser(resource_id);
    
    if (result[0]['Median'] !== null) {
        $('#ssa_median_' + resource_id).html(result[0]['Median']);
    }
    if (result[0]['Mean'] !== null) {
        $('#ssa_mean_' + resource_id).html(result[0]['Mean']);
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

function getUserAPTCMedianMean() {
    var result = new Array();
    result = db_getrateAPTCUser(resource_id);
    
    if (result[0]['Median'] !== null) {
        $('#apt_median_' + resource_id).html(result[0]['Median']);
    }
    if (result[0]['Mean'] !== null) {
        $('#apt_mean_' + resource_id).html(result[0]['Mean']);
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

function getUserBDRPCMedianMean() {
    var result = new Array();
    result = db_getrateBDRPCUser(resource_id);
    
    if (result[0]['Median'] !== null) {
        $('#bdr_median_' + resource_id).html(result[0]['Median']);
    }
    if (result[0]['Mean'] !== null) {
        $('#bdr_mean_' + resource_id).html(result[0]['Mean']);
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

function getUserIECMedianMean() {
    var result = new Array();
    result = db_getrateIECUser(resource_id);
    
    if (result[0]['Median'] !== null) {
        $('#iec_median_' + resource_id).html(result[0]['Median']);
    }
    if (result[0]['Mean'] !== null) {
        $('#iec_mean_' + resource_id).html(result[0]['Mean']);
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

function getUserSPACMedianMean() {
    var result = new Array();
    result = db_getrateSPACUser(resource_id);
    
    if (result[0]['Median'] !== null) {
        $('#spa_median_' + resource_id).html(result[0]['Median']);
    }
    if (result[0]['Mean'] !== null) {
        $('#spa_mean_' + resource_id).html(result[0]['Mean']);
    }
}

////////////////////////////////////////////////////////////////////////////////
function updateAllMedianMean() {
    var all_median = calculateMedian(ar_all_median);
    var all_mean = calculateMean(ar_all_mean);
    
    db_updaterateAllMedianMean(resource_id, all_median, all_mean);
    $('#all_median_' + resource_id).html(all_median);
    $('#all_mean_' + resource_id).html(all_mean);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getCHPLDTFMemberList() {
    var result = new Array(); 
    result = db_getmbrCHPLDTF(login_email, true);
    
    $('#mod_mbr_chpldtf_body').empty();
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            setCHPLDTFMemberListHTML(result[i]['mbrCHPLDTF_ID'], result[i]['chpColumnName']);
            setCHPLDTFMemberName(result[i]['mbrCHPLDTF_ID'], result[i]['chpUserName']);
            setCHPLDTFMemberEmail(result[i]['mbrCHPLDTF_ID'], result[i]['chpUserEmail']);
            setCHPLDTFMemberActive(result[i]['mbrCHPLDTF_ID'], result[i]['chpUserActive']);
            setCHPLDTFMemberAdmin(result[i]['mbrCHPLDTF_ID'], result[i]['chpUserAdmin']);
        }
    }
}

function getSSAMMOMemberList() {
    var result = new Array(); 
    result = db_getmbrSSAMMO(login_email, true);
    
    $('#mod_mbr_ssammo_body').empty();
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            setSSAMMOMemberListHTML(result[i]['mbrSSAMMO_ID'], result[i]['ssaColumnName']);
            setSSAMMOMemberName(result[i]['mbrSSAMMO_ID'], result[i]['ssaUserName']);
            setSSAMMOMemberEmail(result[i]['mbrSSAMMO_ID'], result[i]['ssaUserEmail']);
            setSSAMMOMemberActive(result[i]['mbrSSAMMO_ID'], result[i]['ssaUserActive']);
            setSSAMMOMemberAdmin(result[i]['mbrSSAMMO_ID'], result[i]['ssaUserAdmin']);
        }
    }
}

function getAPTCMemberList() {
    var result = new Array(); 
    result = db_getmbrAPTC(login_email, true);
    
    $('#mod_mbr_aptc_body').empty();
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            setAPTCMemberListHTML(result[i]['mbrAPTC_ID'], result[i]['aptColumnName']);
            setAPTCMemberName(result[i]['mbrAPTC_ID'], result[i]['aptUserName']);
            setAPTCMemberEmail(result[i]['mbrAPTC_ID'], result[i]['aptUserEmail']);
            setAPTCMemberActive(result[i]['mbrAPTC_ID'], result[i]['aptUserActive']);
            setAPTCMemberAdmin(result[i]['mbrAPTC_ID'], result[i]['aptUserAdmin']);
        }
    }
}

function getBDRPCMemberList() {
    var result = new Array(); 
    result = db_getmbrBDRPC(login_email, true);
    
    $('#mod_mbr_bdrpc_body').empty();
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            setBDRPCMemberListHTML(result[i]['mbrBDRPC_ID'], result[i]['bdrColumnName']);
            setBDRPCMemberName(result[i]['mbrBDRPC_ID'], result[i]['bdrUserName']);
            setBDRPCMemberEmail(result[i]['mbrBDRPC_ID'], result[i]['bdrUserEmail']);
            setBDRPCMemberActive(result[i]['mbrBDRPC_ID'], result[i]['bdrUserActive']);
            setBDRPCMemberAdmin(result[i]['mbrBDRPC_ID'], result[i]['bdrUserAdmin']);
        }
    }
}

function getIECMemberList() {
    var result = new Array(); 
    result = db_getmbrIEC(login_email, true);
    
    $('#mod_mbr_iec_body').empty();
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            setIECMemberListHTML(result[i]['mbrIEC_ID'], result[i]['iecColumnName']);
            setIECMemberName(result[i]['mbrIEC_ID'], result[i]['iecUserName']);
            setIECMemberEmail(result[i]['mbrIEC_ID'], result[i]['iecUserEmail']);
            setIECMemberActive(result[i]['mbrIEC_ID'], result[i]['iecUserActive']);
            setIECMemberAdmin(result[i]['mbrIEC_ID'], result[i]['iecUserAdmin']);
        }
    }
}

function getSPACMemberList() {
    var result = new Array(); 
    result = db_getmbrSPAC(login_email, true);
    
    $('#mod_mbr_spac_body').empty();
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            setSPACMemberListHTML(result[i]['mbrSPAC_ID'], result[i]['spaColumnName']);
            setSPACMemberName(result[i]['mbrSPAC_ID'], result[i]['spaUserName']);
            setSPACMemberEmail(result[i]['mbrSPAC_ID'], result[i]['spaUserEmail']);
            setSPACMemberActive(result[i]['mbrSPAC_ID'], result[i]['spaUserActive']);
            setSPACMemberAdmin(result[i]['mbrSPAC_ID'], result[i]['spaUserAdmin']);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
function setCHPLDTFMemberListHTML(mbr_chpldtf_id, chp_column_name) {
    var tbl_html = "<tr class='row_tr' id='mbr_chpldtf_id_" + mbr_chpldtf_id + "'>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mbr_chpldtf_user_name_" + mbr_chpldtf_id + "'></td>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mbr_chpldtf_user_email_" + mbr_chpldtf_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal' style='text-align: center;'><input type='checkbox' disabled id='mbr_chpldtf_user_active_" + mbr_chpldtf_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal' style='text-align: center;'><input type='checkbox' id='mbr_chpldtf_user_admin_" + mbr_chpldtf_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mbr_chpldtf_user_btn_update_" + mbr_chpldtf_id + "'><i class='icon-circle-arrow-up icon-black'></i></button></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mbr_chpldtf_user_btn_delete_" + mbr_chpldtf_id + "'><i class='icon-trash icon-black'></i></button></td>";
    tbl_html += "<td class='span1' style='display: none;' id='mbr_chpldtf_column_name_" + mbr_chpldtf_id + "'>" + chp_column_name + "</td>";
    tbl_html += "</tr>";
    
    $("#mod_mbr_chpldtf_body").append(tbl_html);
}

function setSSAMMOMemberListHTML(mbr_ssammo_id, ssa_column_name) {
    var tbl_html = "<tr class='row_tr' id='mbr_ssammo_id_" + mbr_ssammo_id + "'>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mbr_ssammo_user_name_" + mbr_ssammo_id + "'></td>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mbr_ssammo_user_email_" + mbr_ssammo_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal' style='text-align: center;'><input type='checkbox' disabled id='mbr_ssammo_user_active_" + mbr_ssammo_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal' style='text-align: center;'><input type='checkbox' id='mbr_ssammo_user_admin_" + mbr_ssammo_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mbr_ssammo_user_btn_update_" + mbr_ssammo_id + "'><i class='icon-circle-arrow-up icon-black'></i></button></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mbr_ssammo_user_btn_delete_" + mbr_ssammo_id + "'><i class='icon-trash icon-black'></i></button></td>";
    tbl_html += "<td class='span1' style='display: none;' id='mbr_ssammo_column_name_" + mbr_ssammo_id + "'>" + ssa_column_name + "</td>";
    tbl_html += "</tr>";
    
    $("#mod_mbr_ssammo_body").append(tbl_html);
}

function setAPTCMemberListHTML(mbr_aptc_id, apt_column_name) {
    var tbl_html = "<tr class='row_tr' id='mbr_aptc_id_" + mbr_aptc_id + "'>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mbr_aptc_user_name_" + mbr_aptc_id + "'></td>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mbr_aptc_user_email_" + mbr_aptc_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal' style='text-align: center;'><input type='checkbox' disabled id='mbr_aptc_user_active_" + mbr_aptc_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal' style='text-align: center;'><input type='checkbox' id='mbr_aptc_user_admin_" + mbr_aptc_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mbr_aptc_user_btn_update_" + mbr_aptc_id + "'><i class='icon-circle-arrow-up icon-black'></i></button></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mbr_aptc_user_btn_delete_" + mbr_aptc_id + "'><i class='icon-trash icon-black'></i></button></td>";
    tbl_html += "<td class='span1' style='display: none;' id='mbr_aptc_column_name_" + mbr_aptc_id + "'>" + apt_column_name + "</td>";
    tbl_html += "</tr>";
    
    $("#mod_mbr_aptc_body").append(tbl_html);
}

function setBDRPCMemberListHTML(mbr_bdrpc_id, bdr_column_name) {
    var tbl_html = "<tr class='row_tr' id='mbr_bdrpc_id_" + mbr_bdrpc_id + "'>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mbr_bdrpc_user_name_" + mbr_bdrpc_id + "'></td>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mbr_bdrpc_user_email_" + mbr_bdrpc_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal' style='text-align: center;'><input type='checkbox' disabled id='mbr_bdrpc_user_active_" + mbr_bdrpc_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal' style='text-align: center;'><input type='checkbox' id='mbr_bdrpc_user_admin_" + mbr_bdrpc_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mbr_bdrpc_user_btn_update_" + mbr_bdrpc_id + "'><i class='icon-circle-arrow-up icon-black'></i></button></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mbr_bdrpc_user_btn_delete_" + mbr_bdrpc_id + "'><i class='icon-trash icon-black'></i></button></td>";
    tbl_html += "<td class='span1' style='display: none;' id='mbr_bdrpc_column_name_" + mbr_bdrpc_id + "'>" + bdr_column_name + "</td>";
    tbl_html += "</tr>";
    
    $("#mod_mbr_bdrpc_body").append(tbl_html);
}

function setIECMemberListHTML(mbr_iec_id, iec_column_name) {
    var tbl_html = "<tr class='row_tr' id='mbr_iec_id_" + mbr_iec_id + "'>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mbr_iec_user_name_" + mbr_iec_id + "'></td>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mbr_iec_user_email_" + mbr_iec_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal' style='text-align: center;'><input type='checkbox' disabled id='mbr_iec_user_active_" + mbr_iec_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal' style='text-align: center;'><input type='checkbox' id='mbr_iec_user_admin_" + mbr_iec_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mbr_iec_user_btn_update_" + mbr_iec_id + "'><i class='icon-circle-arrow-up icon-black'></i></button></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mbr_iec_user_btn_delete_" + mbr_iec_id + "'><i class='icon-trash icon-black'></i></button></td>";
    tbl_html += "<td class='span1' style='display: none;' id='mbr_iec_column_name_" + mbr_iec_id + "'>" + iec_column_name + "</td>";
    tbl_html += "</tr>";
    
    $("#mod_mbr_iec_body").append(tbl_html);
}

function setSPACMemberListHTML(mbr_spac_id, spa_column_name) {
    var tbl_html = "<tr class='row_tr' id='mbr_spac_id_" + mbr_spac_id + "'>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mbr_spac_user_name_" + mbr_spac_id + "'></td>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mbr_spac_user_email_" + mbr_spac_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal' style='text-align: center;'><input type='checkbox' disabled id='mbr_spac_user_active_" + mbr_spac_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal' style='text-align: center;'><input type='checkbox' id='mbr_spac_user_admin_" + mbr_spac_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mbr_spac_user_btn_update_" + mbr_spac_id + "'><i class='icon-circle-arrow-up icon-black'></i></button></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mbr_spac_user_btn_delete_" + mbr_spac_id + "'><i class='icon-trash icon-black'></i></button></td>";
    tbl_html += "<td class='span1' style='display: none;' id='mbr_spac_column_name_" + mbr_spac_id + "'>" + spa_column_name + "</td>";
    tbl_html += "</tr>";
    
    $("#mod_mbr_spac_body").append(tbl_html);
}

////////////////////////////////////////////////////////////////////////////////
function setCHPLDTFMemberName(mbr_chpldtf_id, user_name) {
    $('#mbr_chpldtf_user_name_' + mbr_chpldtf_id).val(user_name);
}

function setSSAMMOMemberName(mbr_ssammo_id, user_name) {
    $('#mbr_ssammo_user_name_' + mbr_ssammo_id).val(user_name);
}

function setAPTCMemberName(mbr_aptc_id, user_name) {
    $('#mbr_aptc_user_name_' + mbr_aptc_id).val(user_name);
}

function setBDRPCMemberName(mbr_bdrpc_id, user_name) {
    $('#mbr_bdrpc_user_name_' + mbr_bdrpc_id).val(user_name);
}

function setIECMemberName(mbr_iec_id, user_name) {
    $('#mbr_iec_user_name_' + mbr_iec_id).val(user_name);
}

function setSPACMemberName(mbr_spac_id, user_name) {
    $('#mbr_spac_user_name_' + mbr_spac_id).val(user_name);
}

////////////////////////////////////////////////////////////////////////////////
function setCHPLDTFMemberEmail(mbr_chpldtf_id, user_email) {
    $('#mbr_chpldtf_user_email_' + mbr_chpldtf_id).val(user_email);
}

function setSSAMMOMemberEmail(mbr_ssammo_id, user_email) {
    $('#mbr_ssammo_user_email_' + mbr_ssammo_id).val(user_email);
}

function setAPTCMemberEmail(mbr_aptc_id, user_email) {
    $('#mbr_aptc_user_email_' + mbr_aptc_id).val(user_email);
}

function setBDRPCMemberEmail(mbr_bdrpc_id, user_email) {
    $('#mbr_bdrpc_user_email_' + mbr_bdrpc_id).val(user_email);
}

function setIECMemberEmail(mbr_iec_id, user_email) {
    $('#mbr_iec_user_email_' + mbr_iec_id).val(user_email);
}

function setSPACMemberEmail(mbr_spac_id, user_email) {
    $('#mbr_spac_user_email_' + mbr_spac_id).val(user_email);
}

////////////////////////////////////////////////////////////////////////////////
function setCHPLDTFMemberActive(mbr_chpldtf_id, user_active) {
    var ckb_value = (user_active === "1" ? true : false);
    $('#mbr_chpldtf_user_active_' + mbr_chpldtf_id).prop('checked', ckb_value);
}

function setSSAMMOMemberActive(mbr_ssammo_id, user_active) {
    var ckb_value = (user_active === "1" ? true : false);
    $('#mbr_ssammo_user_active_' + mbr_ssammo_id).prop('checked', ckb_value);
}

function setAPTCMemberActive(mbr_aptc_id, user_active) {
    var ckb_value = (user_active === "1" ? true : false);
    $('#mbr_aptc_user_active_' + mbr_aptc_id).prop('checked', ckb_value);
}

function setBDRPCMemberActive(mbr_bdrpc_id, user_active) {
    var ckb_value = (user_active === "1" ? true : false);
    $('#mbr_bdrpc_user_active_' + mbr_bdrpc_id).prop('checked', ckb_value);
}

function setIECMemberActive(mbr_iec_id, user_active) {
    var ckb_value = (user_active === "1" ? true : false);
    $('#mbr_iec_user_active_' + mbr_iec_id).prop('checked', ckb_value);
}

function setSPACMemberActive(mbr_spac_id, user_active) {
    var ckb_value = (user_active === "1" ? true : false);
    $('#mbr_spac_user_active_' + mbr_spac_id).prop('checked', ckb_value);
}

////////////////////////////////////////////////////////////////////////////////
function setCHPLDTFMemberAdmin(mbr_chpldtf_id, user_admin) {
    var ckb_value = (user_admin === "1" ? true : false);
    $('#mbr_chpldtf_user_admin_' + mbr_chpldtf_id).prop('checked', ckb_value);
}

function setSSAMMOMemberAdmin(mbr_ssammo_id, user_admin) {
    var ckb_value = (user_admin === "1" ? true : false);
    $('#mbr_ssammo_user_admin_' + mbr_ssammo_id).prop('checked', ckb_value);
}

function setAPTCMemberAdmin(mbr_aptc_id, user_admin) {
    var ckb_value = (user_admin === "1" ? true : false);
    $('#mbr_aptc_user_admin_' + mbr_aptc_id).prop('checked', ckb_value);
}

function setBDRPCMemberAdmin(mbr_bdrpc_id, user_admin) {
    var ckb_value = (user_admin === "1" ? true : false);
    $('#mbr_bdrpc_user_admin_' + mbr_bdrpc_id).prop('checked', ckb_value);
}

function setIECMemberAdmin(mbr_iec_id, user_admin) {
    var ckb_value = (user_admin === "1" ? true : false);
    $('#mbr_iec_user_admin_' + mbr_iec_id).prop('checked', ckb_value);
}

function setSPACMemberAdmin(mbr_spac_id, user_admin) {
    var ckb_value = (user_admin === "1" ? true : false);
    $('#mbr_spac_user_admin_' + mbr_spac_id).prop('checked', ckb_value);
}

////////////////////////////////////////////////////////////////////////////////
function newCHPLDTFValidation() {
    var err = "";
    if ($('#mod_mbr_chpldtf_add_name_new').val().replace(/\s+/g, '') === "") {
        err += "Member name is a required\n";
    }
    if ($('#mod_mbr_chpldtf_add_email_new').val().replace(/\s+/g, '') === "") {
        err += "Member email is a required\n";
    }
    return err;
}

function newSSAMMOValidation() {
    var err = "";
    if ($('#mod_mbr_ssammo_add_name_new').val().replace(/\s+/g, '') === "") {
        err += "Member name is a required\n";
    }
    if ($('#mod_mbr_ssammo_add_email_new').val().replace(/\s+/g, '') === "") {
        err += "Member email is a required\n";
    }
    return err;
}

function newAPTCValidation() {
    var err = "";
    if ($('#mod_mbr_aptc_add_name_new').val().replace(/\s+/g, '') === "") {
        err += "Member name is a required\n";
    }
    if ($('#mod_mbr_aptc_add_email_new').val().replace(/\s+/g, '') === "") {
        err += "Member email is a required\n";
    }
    return err;
}

function newBDRPCValidation() {
    var err = "";
    if ($('#mod_mbr_bdrpc_add_name_new').val().replace(/\s+/g, '') === "") {
        err += "Member name is a required\n";
    }
    if ($('#mod_mbr_bdrpc_add_email_new').val().replace(/\s+/g, '') === "") {
        err += "Member email is a required\n";
    }
    return err;
}

function newIECValidation() {
    var err = "";
    if ($('#mod_mbr_iec_add_name_new').val().replace(/\s+/g, '') === "") {
        err += "Member name is a required\n";
    }
    if ($('#mod_mbr_iec_add_email_new').val().replace(/\s+/g, '') === "") {
        err += "Member email is a required\n";
    }
    return err;
}

function newSPACValidation() {
    var err = "";
    if ($('#mod_mbr_spac_add_name_new').val().replace(/\s+/g, '') === "") {
        err += "Member name is a required\n";
    }
    if ($('#mod_mbr_spac_add_email_new').val().replace(/\s+/g, '') === "") {
        err += "Member email is a required\n";
    }
    return err;
}

////////////////////////////////////////////////////////////////////////////////
function clearCHPLDTFMemberInput() {
    $('#mod_mbr_chpldtf_add_name_new').val("");
    $('#mod_mbr_chpldtf_add_email_new').val("");
    $('#mod_mbr_chpldtf_add_admin_new').prop('checked', false);
}

function clearSSAMMOMemberInput() {
    $('#mod_mbr_ssammo_add_name_new').val("");
    $('#mod_mbr_ssammo_add_email_new').val("");
    $('#mod_mbr_ssammo_add_admin_new').prop('checked', false);
}

function clearAPTCMemberInput() {
    $('#mod_mbr_aptc_add_name_new').val("");
    $('#mod_mbr_aptc_add_email_new').val("");
    $('#mod_mbr_aptc_add_admin_new').prop('checked', false);
}

function clearBDRPCMemberInput() {
    $('#mod_mbr_bdrpc_add_name_new').val("");
    $('#mod_mbr_bdrpc_add_email_new').val("");
    $('#mod_mbr_bdrpc_add_admin_new').prop('checked', false);
}

function clearIECMemberInput() {
    $('#mod_mbr_iec_add_name_new').val("");
    $('#mod_mbr_iec_add_email_new').val("");
    $('#mod_mbr_iec_add_admin_new').prop('checked', false);
}

function clearSPACMemberInput() {
    $('#mod_mbr_spac_add_name_new').val("");
    $('#mod_mbr_spac_add_email_new').val("");
    $('#mod_mbr_spac_add_admin_new').prop('checked', false);
}

////////////////////////////////////////////////////////////////////////////////
function insertCHPLDTFMember() { 
    var name = $('#mod_mbr_chpldtf_add_name_new').val();
    var email = $('#mod_mbr_chpldtf_add_email_new').val();
    var admin = ($('#mod_mbr_chpldtf_add_admin_new').is(':checked') ? true : false);
    
    var mbr_chpldtf_id = db_insertmbrCHPLDTF(textReplaceApostrophe(name), textReplaceApostrophe(email), admin);
    var column = "chp_mbr_" + mbr_chpldtf_id;
    db_updatembrCHPLDTFColumn(mbr_chpldtf_id, column);
    db_addColumn_rateCHPLDTF(column);
}

function insertSSAMMOMember() { 
    var name = $('#mod_mbr_ssammo_add_name_new').val();
    var email = $('#mod_mbr_ssammo_add_email_new').val();
    var admin = ($('#mod_mbr_ssammo_add_admin_new').is(':checked') ? true : false);
    
    var mbr_ssammo_id = db_insertmbrSSAMMO(textReplaceApostrophe(name), textReplaceApostrophe(email), admin);
    var column = "ssa_mbr_" + mbr_ssammo_id;
    db_updatembrSSAMMOColumn(mbr_ssammo_id, column);
    db_addColumn_rateSSAMMO(column);
}

function insertAPTCMember() { 
    var name = $('#mod_mbr_aptc_add_name_new').val();
    var email = $('#mod_mbr_aptc_add_email_new').val();
    var admin = ($('#mod_mbr_aptc_add_admin_new').is(':checked') ? true : false);
    
    var mbr_aptc_id = db_insertmbrAPTC(textReplaceApostrophe(name), textReplaceApostrophe(email), admin);
    var column = "apt_mbr_" + mbr_aptc_id;
    db_updatembrAPTCColumn(mbr_aptc_id, column);
    db_addColumn_rateAPTC(column);
}

function insertBDRPCMember() { 
    var name = $('#mod_mbr_bdrpc_add_name_new').val();
    var email = $('#mod_mbr_bdrpc_add_email_new').val();
    var admin = ($('#mod_mbr_bdrpc_add_admin_new').is(':checked') ? true : false);
    
    var mbr_bdrpc_id = db_insertmbrBDRPC(textReplaceApostrophe(name), textReplaceApostrophe(email), admin);
    var column = "bdr_mbr_" + mbr_bdrpc_id;
    db_updatembrBDRPCColumn(mbr_bdrpc_id, column);
    db_addColumn_rateBDRPC(column);
}

function insertIECMember() { 
    var name = $('#mod_mbr_iec_add_name_new').val();
    var email = $('#mod_mbr_iec_add_email_new').val();
    var admin = ($('#mod_mbr_iec_add_admin_new').is(':checked') ? true : false);
    
    var mbr_iec_id = db_insertmbrIEC(textReplaceApostrophe(name), textReplaceApostrophe(email), admin);
    var column = "iec_mbr_" + mbr_iec_id;
    db_updatembrIECColumn(mbr_iec_id, column);
    db_addColumn_rateIEC(column);
}

function insertSPACMember() { 
    var name = $('#mod_mbr_spac_add_name_new').val();
    var email = $('#mod_mbr_spac_add_email_new').val();
    var admin = ($('#mod_mbr_spac_add_admin_new').is(':checked') ? true : false);
    
    var mbr_spac_id = db_insertmbrSPAC(textReplaceApostrophe(name), textReplaceApostrophe(email), admin);
    var column = "spa_mbr_" + mbr_spac_id;
    db_updatembrSPACColumn(mbr_spac_id, column);
    db_addColumn_rateSPAC(column);
}

////////////////////////////////////////////////////////////////////////////////
function updateCHPLDTFMember(mbr_chpldtf_id) {
    var name = $('#mbr_chpldtf_user_name_' + mbr_chpldtf_id).val();
    var email = $('#mbr_chpldtf_user_email_' + mbr_chpldtf_id).val();
    var active = ($('#mbr_chpldtf_user_active_' + mbr_chpldtf_id).is(':checked') ? true : false);
    var admin = ($('#mbr_chpldtf_user_admin_' + mbr_chpldtf_id).is(':checked') ? true : false);
    
    db_updatembrCHPLDTF(mbr_chpldtf_id, textReplaceApostrophe(name), textReplaceApostrophe(email), active, admin);
}

function updateSSAMMOMember(mbr_ssammo_id) {
    var name = $('#mbr_ssammo_user_name_' + mbr_ssammo_id).val();
    var email = $('#mbr_ssammo_user_email_' + mbr_ssammo_id).val();
    var active = ($('#mbr_ssammo_user_active_' + mbr_ssammo_id).is(':checked') ? true : false);
    var admin = ($('#mbr_ssammo_user_admin_' + mbr_ssammo_id).is(':checked') ? true : false);
    
    db_updatembrSSAMMO(mbr_ssammo_id, textReplaceApostrophe(name), textReplaceApostrophe(email), active, admin);
}

function updateAPTCMember(mbr_aptc_id) {
    var name = $('#mbr_aptc_user_name_' + mbr_aptc_id).val();
    var email = $('#mbr_aptc_user_email_' + mbr_aptc_id).val();
    var active = ($('#mbr_aptc_user_active_' + mbr_aptc_id).is(':checked') ? true : false);
    var admin = ($('#mbr_aptc_user_admin_' + mbr_aptc_id).is(':checked') ? true : false);
    
    db_updatembrAPTC(mbr_aptc_id, textReplaceApostrophe(name), textReplaceApostrophe(email), active, admin);
}

function updateBDRPCMember(mbr_bdrpc_id) {
    var name = $('#mbr_bdrpc_user_name_' + mbr_bdrpc_id).val();
    var email = $('#mbr_bdrpc_user_email_' + mbr_bdrpc_id).val();
    var active = ($('#mbr_bdrpc_user_active_' + mbr_bdrpc_id).is(':checked') ? true : false);
    var admin = ($('#mbr_bdrpc_user_admin_' + mbr_bdrpc_id).is(':checked') ? true : false);
    
    db_updatembrBDRPC(mbr_bdrpc_id, textReplaceApostrophe(name), textReplaceApostrophe(email), active, admin);
}

function updateIECMember(mbr_iec_id) {
    var name = $('#mbr_iec_user_name_' + mbr_iec_id).val();
    var email = $('#mbr_iec_user_email_' + mbr_iec_id).val();
    var active = ($('#mbr_iec_user_active_' + mbr_iec_id).is(':checked') ? true : false);
    var admin = ($('#mbr_iec_user_admin_' + mbr_iec_id).is(':checked') ? true : false);
    
    db_updatembrIEC(mbr_iec_id, textReplaceApostrophe(name), textReplaceApostrophe(email), active, admin);
}

function updateSPACMember(mbr_spac_id) {
    var name = $('#mbr_spac_user_name_' + mbr_spac_id).val();
    var email = $('#mbr_spac_user_email_' + mbr_spac_id).val();
    var active = ($('#mbr_spac_user_active_' + mbr_spac_id).is(':checked') ? true : false);
    var admin = ($('#mbr_spac_user_admin_' + mbr_spac_id).is(':checked') ? true : false);
    
    db_updatembrSPAC(mbr_spac_id, textReplaceApostrophe(name), textReplaceApostrophe(email), active, admin);
}

////////////////////////////////////////////////////////////////////////////////
function deleteCHPLDTFMember(mbr_chpldtf_id, column) {
    db_deletembrCHPLDTF(mbr_chpldtf_id);
    db_deleteColumn_rateCHPLDTF(column);
}

function deleteSSAMMOMember(mbr_ssammo_id, column) {
    db_deletembrSSAMMO(mbr_ssammo_id);
    db_deleteColumn_rateSSAMMO(column);
}

function deleteAPTCMember(mbr_aptc_id, column) {
    db_deletembrAPTC(mbr_aptc_id);
    db_deleteColumn_rateAPTC(column);
}

function deleteBDRPCMember(mbr_bdrpc_id, column) {
    db_deletembrBDRPC(mbr_bdrpc_id);
    db_deleteColumn_rateBDRPC(column);
}

function deleteIECMember(mbr_iec_id, column) {
    db_deletembrIEC(mbr_iec_id);
    db_deleteColumn_rateIEC(column);
}

function deleteSPACMember(mbr_spac_id, column) {
    db_deletembrSPAC(mbr_spac_id);
    db_deleteColumn_rateSPAC(column);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
function getEnableCommitteeRating() {
    var result = new Array(); 
    result = db_getEnableCommitteeRating();
    dt_current_date = new Date();
    
    for(var i = 0; i < result.length; i++) {
        var committee = result[i]['Committee'];
        switch (committee) {
            case "CHPLDTF":
                dt_chpldtf_start = convertDBDateToDateTimeFormat(result[i]['StartDate']);
                dt_chpldtf_end = convertDBDateToDateTimeFormat(result[i]['EndDate']);
                break;
            case "SSAMMO":
                dt_ssammo_start = convertDBDateToDateTimeFormat(result[i]['StartDate']);
                dt_ssammo_end = convertDBDateToDateTimeFormat(result[i]['EndDate']);
                break;
            case "APTC":
                dt_aptc_start = convertDBDateToDateTimeFormat(result[i]['StartDate']);
                dt_aptc_end = convertDBDateToDateTimeFormat(result[i]['EndDate']);
                break;
            case "BDRPC":
                dt_bdrpc_start = convertDBDateToDateTimeFormat(result[i]['StartDate']);
                dt_bdrpc_end = convertDBDateToDateTimeFormat(result[i]['EndDate']);
                break;
            case "IEC":
                dt_iec_start = convertDBDateToDateTimeFormat(result[i]['StartDate']);
                dt_iec_end = convertDBDateToDateTimeFormat(result[i]['EndDate']);
                break;
            case "SPAC":
                dt_spac_start = convertDBDateToDateTimeFormat(result[i]['StartDate']);
                dt_spac_end = convertDBDateToDateTimeFormat(result[i]['EndDate']);
                break;
            default:
                break;
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMasterCommitteeMemberList() {
    var committee = $('#adm_committee').val();
    switch(committee) {
        case "CHPLDTF":
            $('#mod_master_committee_name').html("CHPLDTF:");
            getMasterCHPLDTFMemberList();
            break;
        case "SSAMMO":
            $('#mod_master_committee_name').html("SSAMMO:");
            getMasterSSAMMOMemberList();
            break;
        case "APTC":
            $('#mod_master_committee_name').html("APTC:");
            getMasterAPTCMemberList();
            break;
        case "BDRPC":
            $('#mod_master_committee_name').html("BDRPC:");
            getMasterBDRPCMemberList();
            break;
        case "IEC":
            $('#mod_master_committee_name').html("IEC:");
            getMasterIECMemberList();
            break;
        case "SPAC":
            $('#mod_master_committee_name').html("SPAC:");
            getMasterSPACMemberList();
            break;
        default:
            break;
    }
}

function getMasterCHPLDTFMemberList() {
    var result = new Array(); 
    result = db_getmbrCHPLDTF(login_email, true);
    
    $('#mod_master_committee_list').empty();
    var html = "<option value=''>Select...</option>";
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            html += "<option value='" + result[i]['chpColumnName'] + "'>" + result[i]['chpUserName'] + "</option>";
        }
    }
    $("#mod_master_committee_list").append(html);
    $("#mod_master_committee_list").selectpicker('refresh');
}

function getMasterSSAMMOMemberList() {
    var result = new Array(); 
    result = db_getmbrSSAMMO(login_email, true);
    
    $('#mod_master_committee_list').empty();
    var html = "<option value=''>Select...</option>";
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            html += "<option value='" + result[i]['ssaColumnName'] + "'>" + result[i]['ssaUserName'] + "</option>";
        }
    }
    $("#mod_master_committee_list").append(html);
    $("#mod_master_committee_list").selectpicker('refresh');
}

function getMasterAPTCMemberList() {
    var result = new Array(); 
    result = db_getmbrAPTC(login_email, true);
    
    $('#mod_master_committee_list').empty();
    var html = "<option value=''>Select...</option>";
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            html += "<option value='" + result[i]['aptColumnName'] + "'>" + result[i]['aptUserName'] + "</option>";
        }
    }
    $("#mod_master_committee_list").append(html);
    $("#mod_master_committee_list").selectpicker('refresh');
}

function getMasterBDRPCMemberList() {
    var result = new Array(); 
    result = db_getmbrBDRPC(login_email, true);
    
    $('#mod_master_committee_list').empty();
    var html = "<option value=''>Select...</option>";
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            html += "<option value='" + result[i]['bdrColumnName'] + "'>" + result[i]['bdrUserName'] + "</option>";
        }
    }
    $("#mod_master_committee_list").append(html);
    $("#mod_master_committee_list").selectpicker('refresh');
}

function getMasterIECMemberList() {
    var result = new Array(); 
    result = db_getmbrIEC(login_email, true);
    
    $('#mod_master_committee_list').empty();
    var html = "<option value=''>Select...</option>";
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            html += "<option value='" + result[i]['iecColumnName'] + "'>" + result[i]['iecUserName'] + "</option>";
        }
    }
    $("#mod_master_committee_list").append(html);
    $("#mod_master_committee_list").selectpicker('refresh');
}

function getMasterSPACMemberList() {
    var result = new Array(); 
    result = db_getmbrSPAC(login_email, true);
    
    $('#mod_master_committee_list').empty();
    var html = "<option value=''>Select...</option>";
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            html += "<option value='" + result[i]['spaColumnName'] + "'>" + result[i]['spaUserName'] + "</option>";
        }
    }
    $("#mod_master_committee_list").append(html);
    $("#mod_master_committee_list").selectpicker('refresh');
}

function getMasterMemberRating(column) {
    var rating = "";
    var committee = $('#adm_committee').val();
    switch(committee) {
        case "SSAMMO":
            rating = db_getrateSSAMMOColumnRating(resource_id, column);
            break;
        case "APTC":
            rating = db_getrateAPTCColumnRating(resource_id, column);
            break;
        case "BDRPC":
            rating = db_getrateBDRPCColumnRating(resource_id, column);
            break;
        case "IEC":
            rating = db_getrateIECColumnRating(resource_id, column);
            break;
        case "SPAC":
            rating = db_getrateSPACColumnRating(resource_id, column);
            break;
        default:
            break;
    }
    
    return rating;
}

function getMasterCommitteeMemberEmail(column) {
    var result = "";
    var committee = $('#adm_committee').val();
    switch(committee) {
        case "CHPLDTF":
            var result_6 = new Array(); 
            result_6 = db_getmbrCHPLDTF(login_email, true);
            for(var i = 0; i < result_6.length; i++) {
                if (result_6[i]['chpColumnName'] === column) {
                    result = result_6[i]['chpUserEmail'];
                    break;
                }
            }
            break;
        case "SSAMMO":
            var result_1 = new Array(); 
            result_1 = db_getmbrSSAMMO(login_email, true);
            for(var i = 0; i < result_1.length; i++) {
                if (result_1[i]['ssaColumnName'] === column) {
                    result = result_1[i]['ssaUserEmail'];
                    break;
                }
            }
            break;
        case "APTC":
            var result_2 = new Array(); 
            result_2 = db_getmbrAPTC(login_email, true);
            for(var i = 0; i < result_2.length; i++) {
                if (result_2[i]['aptColumnName'] === column) {
                    result = result_2[i]['aptUserEmail'];
                    break;
                }
            }
            break;
        case "BDRPC":
            var result_3 = new Array(); 
            result_3 = db_getmbrBDRPC(login_email, true);
            for(var i = 0; i < result_3.length; i++) {
                if (result_3[i]['bdrColumnName'] === column) {
                    result = result_3[i]['bdrUserEmail'];
                    break;
                }
            }
            break;
        case "IEC":
            var result_4 = new Array(); 
            result_4 = db_getmbrIEC(login_email, true);
            for(var i = 0; i < result_4.length; i++) {
                if (result_4[i]['iecColumnName'] === column) {
                    result = result_4[i]['iecUserEmail'];
                    break;
                }
            }
            break;
        case "SPAC":
            var result_5 = new Array(); 
            result_5 = db_getmbrSPAC(login_email, true);
            for(var i = 0; i < result_5.length; i++) {
                if (result_5[i]['spaColumnName'] === column) {
                    result = result_5[i]['spaUserEmail'];
                    break;
                }
            }
            break;
        default:
            break;
    }
    
    return result;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateFinalRatingValue(final_rating) {
    var committee = $('#adm_committee').val();
    switch(committee) {
        case "CHPLDTF":
            db_updaterateCHPLDTFFinalRating(resource_id, final_rating);
            $('#final_rating_ssa_' + resource_id).html(final_rating);
            break;
        case "SSAMMO":
            db_updaterateSSAMMOFinalRating(resource_id, final_rating);
            $('#final_rating_ssa_' + resource_id).html(final_rating);
            break;
        case "APTC":
            db_updaterateAPTCFinalRating(resource_id, final_rating);
            $('#final_rating_apt_' + resource_id).html(final_rating);
            break;
        case "BDRPC":
            db_updaterateBDRPCFinalRating(resource_id, final_rating);
            $('#final_rating_bdr_' + resource_id).html(final_rating);
            break;
        case "IEC":
            db_updaterateIECFinalRating(resource_id, final_rating);
            $('#final_rating_iec_' + resource_id).html(final_rating);
            break;
        case "SPAC":
            db_updaterateSPACFinalRating(resource_id, final_rating);
            $('#final_rating_spa_' + resource_id).html(final_rating);
            break;
        default:
            break;
    }
}

function updateSPACFinalAvgValue() {
    var sql_query = "UPDATE [IVCRESOURCES].[dbo].[rateSPAC] SET FinalAvg = CONVERT(numeric(3, 2), (";
    sql_query += "ISNULL(CONVERT(numeric(3, 2), ssammo.FinalRating), 0) ";
    sql_query += "+ ISNULL(CONVERT(numeric(3, 2), chpldtf.FinalRating), 0) ";
    sql_query += "+ ISNULL(CONVERT(numeric(3, 2), aptc.FinalRating), 0) ";
    sql_query += "+ ISNULL(CONVERT(numeric(3, 2), bdrpc.FinalRating), 0) ";
    sql_query += "+ ISNULL(CONVERT(numeric(3, 2), iec.FinalRating), 0) ";
    sql_query += "+ ISNULL(CONVERT(numeric(3, 2), spac.FinalRating), 0)) ";
    sql_query += "/ NULLIF((CASE WHEN ssammo.FinalRating IS NULL THEN 0 ELSE 1 END ";
    sql_query += "+ CASE WHEN aptc.FinalRating IS NULL THEN 0 ELSE 1 END ";
    sql_query += "+ CASE WHEN bdrpc.FinalRating IS NULL THEN 0 ELSE 1 END ";
    sql_query += "+ CASE WHEN iec.FinalRating IS NULL THEN 0 ELSE 1 END ";
    sql_query += "+ CASE WHEN spac.FinalRating IS NULL THEN 0 ELSE 1 END), 0)) ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateSPAC] AS spac LEFT JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS ssammo ON ssammo.ResourceID = spac.ResourceID ";
    sql_query += "LEFT JOIN [IVCRESOURCES].[dbo].[rateCHPLDTF] AS chpldtf ON chpldtf.ResourceID = spac.ResourceID ";
    sql_query += "LEFT JOIN [IVCRESOURCES].[dbo].[rateAPTC] AS aptc ON aptc.ResourceID = spac.ResourceID ";
    sql_query += "LEFT JOIN [IVCRESOURCES].[dbo].[rateBDRPC] AS bdrpc ON bdrpc.ResourceID = spac.ResourceID ";
    sql_query += "LEFT JOIN [IVCRESOURCES].[dbo].[rateIEC] AS iec ON iec.ResourceID = spac.ResourceID ";
    sql_query += "WHERE spac.ResourceID = " + resource_id;
    db_script_update_rate(sql_query);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getFundSrcColumn(fs_type) {
    var fs_col = "";
    
    switch(fs_type) {
        case "General":
            fs_col = "fs_1";
            break;
        case "ASIVC":
            fs_col = "fs_2";
            break;
        case "Basic Aid":
            fs_col = "fs_3";
            break;
        case "Basic Skills Initiative":
            fs_col = "fs_4";
            break;
        case "BFAP":
            fs_col = "fs_5";
            break;
        case "CalWORKs/TANF":
            fs_col = "fs_6";
            break;
        case "Capital Outlay":
            fs_col = "fs_7";
            break;
        case "CDC":
            fs_col = "fs_8";
            break;
        case "College Work Study":
            fs_col = "fs_9";
            break;
        case "Community Education":
            fs_col = "fs_10";
            break;
        case "DSPS":
            fs_col = "fs_11";
            break;
        case "EOPS/CARE":
            fs_col = "fs_12";
            break;
        case "EWD":
            fs_col = "fs_13";
            break;
        case "Foundation":
            fs_col = "fs_14";
            break;
        case "Grants":
            fs_col = "fs_15";
            break;
        case "Health":
            fs_col = "fs_16";
            break;
        case "Lottery":
            fs_col = "fs_17";
            break;
        case "Parking":
            fs_col = "fs_18";
            break;
        case "Perkins":
            fs_col = "fs_19";
            break;
        case "PPIS":
            fs_col = "fs_20";
            break;
        case "SSSP":
            fs_col = "fs_21";
            break;
        case "Student Equity":
            fs_col = "fs_22";
            break;
        case "Student Material Fees":
            fs_col = "fs_23";
            break;
        default:
            break;
    }
    
    return fs_col;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setSPACFundingSrcList() {
    var result = new Array();
    result = db_getFundSrcTypeAll();
    
    var tbl_html = "<option value='Select...' selected>Select...</option>";
    for(var i = 0; i < result.length; i++) {
        tbl_html += "<option value='" + result[i]['FundSrcCol'] + "'>" + result[i]['FundSrcType'] + "</option>";
    }
    
    $("#mod_final_body_new_fund_src_list").append(tbl_html);
    $("#mod_final_body_new_fund_src_list").selectpicker('refresh');
}

function getSPACOneTimeRequest() {
    var result = new Array();
    result = db_getResourceFormSelected(resource_id);
    
    if (result.length === 1) {
        if (result[0]['OneTime'] === "1") {
            $('#mod_final_body_selected_one_time').prop('checked', true);
        }
    }
}

// New selected resource request funding source list ///////////////////////////
function getSPACFundSrcList2() {
    getResourceFundSrc(resource_id);
}

function getResourceFundSrc(ResourceID) {
    resetPreviousFundSrc();
    resetResourceFundSrc();
    $('#mgr_fs_comments').val("");
    $('#fund_source_comments').html("");
    
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

function updateResourceFundSrc(ResourceID) {
    db_updateResourceFundSrc(ResourceID, new_fs_1, new_fs_2, new_fs_3, new_fs_4, new_fs_5, new_fs_6, new_fs_7, new_fs_8, new_fs_9, new_fs_10,
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
function updateResourceFundAmt(fs_col_amt, value) {
    var fs_col = fs_col_amt.replace("_amt", "");
    
    db_updateResourceFundAmtColumn(resource_id, fs_col_amt, value);
    var total_amt = db_getResourceFundAmtSum(resource_id);
    db_updateResourceFundAmtColumn(resource_id, "TotalAmount", total_amt);
    
    // update resource request rec amount and balance 
    var res_amt = revertDollar($('#resource_amount_' + resource_id).html());
    var res_balance = res_amt - Number(total_amt);
    $('#funded_total_' + resource_id).html(formatDollar(Number(total_amt)));
    $('#funded_balance_' + resource_id).html(formatDollar(res_balance));

    // update fund src budget, balance and funded total
    var result = new Array();
    result = db_getFundSrcBudget($('#all_fiscal_yrs').val(), fs_col);
    if (result.length === 1) {
        var budget_amt = Number(result[0]['BudgetAmt']);
        var fund_src_sum = db_getResourceFundAmtTotalSrc(fs_col_amt, $('#all_fiscal_yrs').val());
        var new_balance_amt = budget_amt - Number(fund_src_sum);

        db_updateFundSrcBudget($('#all_fiscal_yrs').val(), fs_col, budget_amt, new_balance_amt);
        var fund_src_index = fs_col.replace("fs_", "");

        $('#fs_balance_' + fund_src_index).html(formatDollar(new_balance_amt));
        $('#fs_funded_' + fund_src_index).html(formatDollar(Number(fund_src_sum)));
    }
}

function deleteResourceFundAmt(fund_src_col) {
    var fund_amt_col = fund_src_col + "_amt";
    
    var result = new Array();
    result = db_getResourceFundAmt(resource_id);
    var total_amount = Number(result[0]['TotalAmount']);
    var fund_amount = Number(result[0][fund_amt_col]);
    
    db_updateResourceFundAmtColumn(resource_id, fund_amt_col, 0.00);
    var new_total_amount = total_amount - fund_amount;
    db_updateResourceFundAmtColumn(resource_id, "TotalAmount", new_total_amount);
    
    var result2 = new Array();
    result2 = db_getFundSrcBudget($('#all_fiscal_yrs').val(), fund_src_col);
    if (result2.length === 1) {
        var budget_amt = Number(result2[0]['BudgetAmt']);
        var balance_amt = Number(result2[0]['BalanceAmt']);

        var new_balance_amt = balance_amt + fund_amount;
        db_updateFundSrcBudget($('#all_fiscal_yrs').val(), fund_src_col, budget_amt, new_balance_amt);
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
    result2 = db_getFundSrcBudget($('#all_fiscal_yrs').val(), fund_src_col);
    if (result2.length === 1) {
        var budget_amt = Number(result2[0]['BudgetAmt']);
        var balance_amt = Number(result2[0]['BalanceAmt']);

        var new_balance_amt = balance_amt + pre_fund_amt;
        db_updateFundSrcBudget($('#all_fiscal_yrs').val(), fund_src_col, budget_amt, new_balance_amt);
    }
}

function getSelectedID_FundSrcColumn(selected_id) {
    var pos = selected_id.indexOf("_amt");
    return selected_id.substring(0, pos + 4);
}

function getSelectedID_ResourceID(selected_id) {
    var pos = selected_id.indexOf("amt_");
    return selected_id.substring(pos + 4);
}

////////////////////////////////////////////////////////////////////////////////
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
    str_url = str_url.replace("committeeRating.html", "/doc/BSI_Funding_Request_Supplemental_Form.pdf");
    
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

function sql_strReviewPeriod() {
    if ($('#all_review_period').val() === "-1") {
        return " AND rsrp.ReviewPeriodID IS NULL";
    }
    else if ($('#all_review_period').val() !== "0") {
        return " AND rsrp.ReviewPeriodID = '" + $('#all_review_period').val() + "'";
    }
    else {
        return "";
    }
}