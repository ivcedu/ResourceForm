////////////////////////////////////////////////////////////////////////////////
var crtName = "";
var crtEmail = "";
var crtTitle = "";
var crtDivision = "";

var appName = "";
var appEmail = "";
var appTitle = "";
var appDivision = "";

var cur_user_index = 0;
var cur_user_list = new Array();

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {    
    $('#searchBtn').hide();
    $('#mod_popup_search_creator').modal('hide');
    $('#mod_popup_search_user').modal('hide');
    $('#mod_dialog_box').modal('hide');
    
    if (sessionStorage.key(0) !== null) {
        setToday();
        getResourceLinkList();
        
        if (sessionStorage.getItem('m1_pgNum') === null) {
            setCreatorDefault();
        }
        else {
            setCreatorInfo();
            setResourceLinkList();
            getCCList();
        }
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {  
    $('#m1_home').click(function() {
        window.open('home.html', '_self');
    });
    
    $('#logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
    });
    
    // progress bar click event ////////////////////////////////////////////////
    $('#pbar_resource_type').click(function() {
        var err = formValidation2();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        $("#pbar_resource_type").prop("disabled", true);
        saveLocalData();
        var step1_save = btnSaveDraft();
        if (!step1_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Resource Type");
    });
    
    $('#pbar_worksheet').click(function() {
        var err = formValidation2();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        $("#pbar_worksheet").prop("disabled", true);
        saveLocalData();
        var step1_save = btnSaveDraft();
        if (!step1_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Worksheet");
    });
    
    $('#pbar_funding_src').click(function() {
        var err = formValidation2();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        $("#pbar_funding_src").prop("disabled", true);
        saveLocalData();
        var step1_save = btnSaveDraft();
        if (!step1_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Funding Src");
    });
    
    $('#pbar_planning').click(function() {
        var err = formValidation2();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        $("#pbar_planning").prop("disabled", true);
        saveLocalData();
        var step1_save = btnSaveDraft();
        if (!step1_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Planning");
    });
    
    $('#pbar_review').click(function() {
        var err = formValidation2();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        $("#pbar_review").prop("disabled", true);
        saveLocalData();
        var step1_save = btnSaveDraft();
        if (!step1_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Review");
    });
    
    //////////////////////////////////////////////////////////////////////////// 
    $('#m1_other_user').change(function() {
        if($("#m1_other_user").is(':checked')) {
            otherUser (true);
        }
        else {
            otherUser (false);
        }
    });  
    
    // search creator //////////////////////////////////////////////////////////        
    $('#searchBtn').click(function() {
        $("#mod_creator_name").val("");
        $('#mod_creator_list').empty();
        
        $("#mod_creator_selected_name").val("");
        $("#mod_creator_selected_email").html("");
        $("#mod_creator_selected_title").html("");
        $("#mod_creator_selected_division").html("");
        $("#mod_creator_mgr_selected_name").html("");
        $("#mod_creator_mgr_selected_email").html("");
        $("#mod_creator_mgr_selected_title").html("");
        $("#mod_creator_mgr_selected_division").html("");
        
        $('#mod_popup_search_creator_add').prop('disabled', true);
        $('#mod_popup_search_creator').modal('show');
    });
    
    $('#mod_search_creator').click(function() {
        $('#mod_popup_search_creator_add').prop('disabled', true);
        AdSearchCreator();
    });
    
    $(document).on('click', '[id^="mod_selected_creator_info_"]', function() {
        var ID = $(this).attr('id').replace("mod_selected_creator_info_", "");
        var name = $("#mod_selected_creator_name_" + ID).html();
        var email = $("#mod_selected_creator_email_" + ID).html();
        var title = $("#mod_selected_creator_title_" + ID).html();
        var division = $("#mod_selected_creator_division_" + ID).html();
        var mgr_name = $("#mod_selected_creator_mgr_name_" + ID).html();
        var mgr_email = $("#mod_selected_creator_mgr_email_" + ID).html();
        var mgr_title = $("#mod_selected_creator_mgr_title_" + ID).html();
        var mgr_division = $("#mod_selected_creator_mgr_division_" + ID).html();
        
        if (mgr_name === "" || mgr_email === "" || mgr_title === "" || mgr_division === "") {
            alert("Error: Selected user manager is not set in AD");
            return false;
        }
        
        $("#mod_creator_selected_name").val(name);
        $("#mod_creator_selected_email").html(email);
        $("#mod_creator_selected_title").html(title);
        $("#mod_creator_selected_division").html(division);
        $("#mod_creator_mgr_selected_name").html(mgr_name);
        $("#mod_creator_mgr_selected_email").html(mgr_email);
        $("#mod_creator_mgr_selected_title").html(mgr_title);
        $("#mod_creator_mgr_selected_division").html(mgr_division);
        
        $('#mod_popup_search_creator_add').prop('disabled', false);
    });
    
    $('#mod_popup_search_creator_add').click(function() {
        var name = $("#mod_creator_selected_name").val();
        var email = $("#mod_creator_selected_email").html();
        var title = $("#mod_creator_selected_title").html();
        var division = $("#mod_creator_selected_division").html();
        var mgr_name = $("#mod_creator_mgr_selected_name").html();
        var mgr_email = $("#mod_creator_mgr_selected_email").html();
        var mgr_title = $("#mod_creator_mgr_selected_title").html();
        var mgr_division = $("#mod_creator_mgr_selected_division").html();
      
        $('#creatorName').val(name);
        $('#creatorTitle').val(title);
        $('#creatorDiv').val(division);

        crtName = name;
        crtEmail = email;
        crtTitle = title;
        crtDivision = division;

        appName = mgr_name;
        appEmail = mgr_email;
        appTitle = mgr_title;
        appDivision = mgr_division;
    });
    
    // search user /////////////////////////////////////////////////////////////
    $('#cc_search_user').click(function() {
        $("#mod_user_name").val("");
        $('#mod_users_list').empty();
        
        $("#mod_user_selected_name").val("");
        $("#mod_user_selected_email").html("");
        $("#mod_user_selected_title").html("");
        $("#mod_user_selected_division").html("");
        
        $('#mod_popup_search_add').prop('disabled', true);
        $('#mod_popup_search_user').modal('show');
    });
    
    $('#mod_search_user').click(function() {
        var user_search = $('#mod_user_name').val();
        
        if (user_search !== "") {
            $('#mod_popup_search_add').prop('disabled', true);
            AD_SearchUser();
        }
    });
    
    $(document).on('click', '[id^="mod_selected_user_info_"]', function() {
        var ID = $(this).attr('id').replace("mod_selected_user_info_", "");
        var name = $("#mod_selected_user_name_" + ID).html();
        var email = $("#mod_selected_user_email_" + ID).html();
        var title = $("#mod_selected_user_title_" + ID).html();
        var division = $("#mod_selected_user_division_" + ID).html();
        
        $("#mod_user_selected_name").val(name);
        $("#mod_user_selected_email").html(email);
        $("#mod_user_selected_title").html(title);
        $("#mod_user_selected_division").html(division);
        
        $('#mod_popup_search_add').prop('disabled', false);
    });
    
    $('#mod_user_selected_name').on('input', function() {
        if($(this).val() === "") {
            $('#mod_popup_search_add').prop('disabled', true);
        }
        else {
            $('#mod_popup_search_add').prop('disabled', false);
        }
    });
    
    $('#mod_popup_search_add').click(function() {
        var name = $("#mod_user_selected_name").val();
        var email = $("#mod_user_selected_email").html();
        var title = $("#mod_user_selected_title").html();
        var division = $("#mod_user_selected_division").html();
        
        cur_user_index += 1;
        var user_info = new Array();
        user_info.push(name, email, title, division);
        cur_user_list.push(user_info);
        saveSearchUsers(cur_user_index, name);
        
        $("#mod_user_selected_name").val("");
        $('#mod_popup_search_add').prop('disabled', true);
    });
    
    $('#mod_popup_search_save').click(function() {
        var cc_list = "";
        for (var i = 0; i < cur_user_list.length; i++) {
            cc_list += cur_user_list[i][0] + "; ";
        }
        
        cc_list = $.trim(cc_list);
        $('#cc').val(cc_list);
    });
    
    $(document).on('click', 'button[id^="mod_current_user_remove_"]', function() {
        var ID = $(this).attr('id').replace("mod_current_user_remove_", "");       
        var name = $('#mod_current_user_name_' + ID).html();
       
        for (var i = 0; i < cur_user_list.length; i++) {
            if (cur_user_list[i][0] === name) {
                cur_user_list.splice(i, 1);
                break;
            }  
        }
        
        $('#mod_current_user_info_' + ID).remove();
    });
    ////////////////////////////////////////////////////////////////////////////    
    $('#m1_next').click(function() {
        var err = formValidation2();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        $("#m1_next").prop("disabled", true);
        saveLocalData();
        var step1_save = btnSaveDraft();
        if (!step1_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        window.open('RFMain3.html', '_self');
    });
    
    // popover
    $('#m1_new_program').popover({content:"Resource needed to initiate a new program or service. Explain in the \"Description\" section above.", placement:"top"});
    $('#m1_recur_program').popover({content:"This resource is required to maintain or improve an existing program or service. Explanation is required in the Description section above. Include in your description, the tie-in to Program Review.", placement:"top"});
    $('#m1_one_time_tool_tips').popover({content:"This resource is required on a one-time basis to implement a new program or serivce or to support existing program with a one-time purchase (e.g. equipment). Explanation is required in the Description section above. Inculde in your description the tie-in to Program Review.", placement:"top"});
    
    // auto size
    $('#needFor').autosize();
    
    // selectpicker
    $('.selectpicker').selectpicker();
    
    // datepicker
    $('#resource_needed_by').datepicker();
});

////////////////////////////////////////////////////////////////////////////////
//function formValidation() {
//    if ($('#creatorName').val().replace(/\s+/g, '') === "") {
//        $('#m1_next').hide();
//        return;
//    }
//    if ($('#creatorTitle').val().replace(/\s+/g, '') === "") {
//        $('#m1_next').hide();
//        return;
//    }
//    if ($('#creatorDiv').val().replace(/\s+/g, '') === "") {
//        $('#m1_next').hide();
//        return;
//    }
//    if ($('#propTitle').val().replace(/\s+/g, '') === "") {
//        $('#m1_next').hide();
//        return;
//    }
//    if ($('#needFor').val().replace(/\s+/g, '') === "") {
//        $('#m1_next').hide();
//        return;
//    }
//    if (!$('input:radio[name=programType]').is(':checked')) {
//        $('#m1_next').hide();
//        return;
//    }
//    
//    $('#m1_next').show();
//}

function formValidation2() {
    var err = "";
    
    if ($('#creatorName').val().replace(/\s+/g, '') === "") {
        err += "Creator Name is required\n";
    }
    if ($('#creatorTitle').val().replace(/\s+/g, '') === "") {
        err += "Creator Title is required\n";
    }
    if ($('#creatorDiv').val().replace(/\s+/g, '') === "") {
        err += "School/Division is required\n";
    }
    if ($('#propTitle').val().replace(/\s+/g, '') === "") {
        err += "Proposal Title is required\n";
    }
    if ($('#needFor').val().replace(/\s+/g, '') === "") {
        err += "Description is required\n";
    }
    if (!$('input:radio[name=programType]').is(':checked')) {
        err += "Program Information (radio button) is required\n";
    }
    
    return err;
}

////////////////////////////////////////////////////////////////////////////////
function AdSearchCreator() {   
    var searchCreator = $('#mod_creator_name').val();
    var ad_creators = new Array();
    
    ad_creators = ad_SearchCreators(searchCreator);
    if (ad_creators.length > 0) {
        clearSearchCreatorFields();
        
        for (var i = 0; i < ad_creators.length; i++) {
            var name = ((ad_creators[i][0] ===  null) ? "" : ad_creators[i][0]);
            var email = ((ad_creators[i][1] ===  null) ? "" : ad_creators[i][1]);
            var title = ((ad_creators[i][2] ===  null) ? "" : ad_creators[i][2]);
            var division = ((ad_creators[i][3] ===  null) ? "" : ad_creators[i][3]);
            var mgr_name = ((ad_creators[i][4] ===  null) ? "" : ad_creators[i][4]);
            var mgr_email = ((ad_creators[i][5] ===  null) ? "" : ad_creators[i][5]);
            var mgr_title = ((ad_creators[i][6] ===  null) ? "" : ad_creators[i][6]);
            var mgr_division = ((ad_creators[i][7] ===  null) ? "" : ad_creators[i][7]);
            
            var creators_list_HTML = setSearchCreatorListHTML(i, name, email, title, division, mgr_name, mgr_email, mgr_title, mgr_division);
            $('#mod_creator_list').append(creators_list_HTML);
        }
    }
}

function setSearchCreatorListHTML(index, name, email, title, division, mgr_name, mgr_email, mgr_title, mgr_division) {
    var creators_list_HTML = "<div class='row-fluid'>";
    creators_list_HTML += "<a href='#' id='mod_selected_creator_info_" + index + "'><font color='black' size='2'>";
    creators_list_HTML += "<div class='span4' id='mod_selected_creator_name_" + index + "'>" + name + "</div>";
    creators_list_HTML += "<div class='span4' id='mod_selected_creator_email_" + index + "'>" + email + "</div>";
    creators_list_HTML += "<div class='span4' id='mod_selected_creator_title_" + index + "'>" + title + "</div>";
    creators_list_HTML += "<div class='span4' id='mod_selected_creator_division_" + index + "' style='display: none'>" + division + "</div>";
    creators_list_HTML += "<div class='span4' id='mod_selected_creator_mgr_name_" + index + "' style='display: none'>" + mgr_name + "</div>";
    creators_list_HTML += "<div class='span4' id='mod_selected_creator_mgr_email_" + index + "' style='display: none'>" + mgr_email + "</div>";
    creators_list_HTML += "<div class='span4' id='mod_selected_creator_mgr_title_" + index + "' style='display: none'>" + mgr_title + "</div>";
    creators_list_HTML += "<div class='span4' id='mod_selected_creator_mgr_division_" + index + "' style='display: none'>" + mgr_division + "</div>";
    creators_list_HTML += "</font></a></div>";
    
    return creators_list_HTML;
}

function clearSearchCreatorFields() {
    $('#mod_creator_list').empty();
    $("#mod_creator_selected_name").val("");
}

////////////////////////////////////////////////////////////////////////////////
function AD_SearchUser() {
    var searchUser = $('#mod_user_name').val();
    var ad_users = new Array();
    
    ad_users = ad_SearchUsers(searchUser);
    if (ad_users.length > 0) {
        clearSearchUserFields();
        
        for (var i = 0; i < ad_users.length; i++) {
            var name = ((ad_users[i][0] ===  null) ? "" : ad_users[i][0]);
            var email = ((ad_users[i][1] ===  null) ? "" : ad_users[i][1]);
            var title = ((ad_users[i][2] ===  null) ? "" : ad_users[i][2]);
            var division = ((ad_users[i][3] ===  null) ? "" : ad_users[i][3]);
            
            if (email !== "") {
                var users_list_HTML = setSearchUserListHTML(i, name, email, title, division);
                $('#mod_users_list').append(users_list_HTML);
            }
        }
    }
}

function setSearchUserListHTML(index, name, email, title, division) {
    var users_list_HTML = "<div class='row-fluid'>";
    users_list_HTML += "<a href='#' id='mod_selected_user_info_" + index + "'><font color='black' size='2'>";
    users_list_HTML += "<div class='span4' id='mod_selected_user_name_" + index + "'>" + name + "</div>";
    users_list_HTML += "<div class='span4' id='mod_selected_user_email_" + index + "'>" + email + "</div>";
    users_list_HTML += "<div class='span4' id='mod_selected_user_title_" + index + "'>" + title + "</div>";
    users_list_HTML += "<div class='span4' id='mod_selected_user_division_" + index + "' style='display: none'>" + division + "</div>";
    users_list_HTML += "</font></a></div>";
    
    return users_list_HTML;
}

function clearSearchUserFields() {
    $('#mod_users_list').empty();
    $("#mod_user_selected_name").val("");
}

function saveSearchUsers(index, name) {
    var list_HTML = "<div class='row-fluid' id='mod_current_user_info_" + index + "'>";
    list_HTML += "<div class='span4 text-left' style='padding-top: 3px' id='mod_current_user_name_" + index + "'>" + name + "</div>";
    list_HTML += "<div class='span2'><button class='btn btn-mini btn-danger' id='mod_current_user_remove_" + index + "'>Remove</button></div>";
    list_HTML += "</div>";
    
    $('#mod_current_users_list').append(list_HTML);
}

////////////////////////////////////////////////////////////////////////////////
function btnSaveDraft() {    
    var step1_result = updateStep1();
    if (!step1_result) {
        return false;
    }
    
    var update_cc = updateCCList();
    if (!update_cc) {
        return false;
    }
    
    return true;
}

function getCCList() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    cur_user_list = db_getCC(ResourceID);
    var cc_list = "";
    
    if (cur_user_list.length > 0) {
        for (var i = 0; i < cur_user_list.length; i++) {
            var name = cur_user_list[i][0];
            saveSearchUsers(i+1, name);
            cc_list += name + "; ";
        }
    }
    
    $('#cc').val(cc_list); 
    sessionStorage.setItem('m1_cc', cc_list);
}

function updateCCList() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    if (ResourceID === "" || ResourceID === null) {
        return false;
    }
    
    db_deleteCC(ResourceID);
    
    if (cur_user_list.length > 0) {
        for (var i = 0; i < cur_user_list.length; i++) {
            var name = cur_user_list[i][0];
            var email = cur_user_list[i][1];
            var title = cur_user_list[i][2];
            var division = cur_user_list[i][3];
            db_insertCC(ResourceID, name, email, title, division);
        }
    }
    
    return true;
}

////////////////////////////////////////////////////////////////////////////////
function saveLocalData() {
    var currentDate = $('#currentDate').val();
    var fiscal = $('#fiscal').val();
    var cc = $('#cc').val();
    var propTitle = $('#propTitle').val();
    var needFor = $('#needFor').val();
    var ProgType = $('input[name="programType"]:checked').val();
    var one_time = $("#m1_one_time").is(':checked');
    var need_by = $('#resource_needed_by').val();
    
    localData_setPg(crtName, crtEmail, crtTitle, currentDate, fiscal, crtDivision, cc, propTitle, needFor, ProgType, one_time, need_by);
    localData_setPg_Approver(appName, appEmail, appTitle, appDivision);

    getSelectedParentResource();
    if (sessionStorage.getItem('m1_enable_resubmit') === null) {
        sessionStorage.setItem('m1_enable_resubmit', 'No');
    }
}

////////////////////////////////////////////////////////////////////////////////
function otherUser (selected) {
    clearCreatorInfo();
    
    if (selected) {
        showCreator();
    }
    else {
        if (sessionStorage.getItem('m1_pgNum') === null)
            setCreatorDefault();
        else
            setCreatorInfo();
        
        hideCreator();
    }
}

////////////////////////////////////////////////////////////////////////////////
function hideCreator() {
    $('#searchBtn').hide();
}

////////////////////////////////////////////////////////////////////////////////
function showCreator() {
    $('#searchBtn').show();
}

////////////////////////////////////////////////////////////////////////////////
function setToday() {
    var today = new Date();
    var day = today.getDate();
    var mon = today.getMonth()+1;
    var yr = today.getFullYear();
    var curDate = mon + "/" + day + "/" + yr;
    $('#currentDate').val(curDate);
    sessionStorage.setItem('m1_currentDate', curDate);
    
    var fiscal_html = "";
    if (mon > 6) {
        fiscal_html += "<option value='" + (yr + "-" + (yr + 1)) + "'>" + (yr + "-" + (yr + 1)) + "</option>";
        fiscal_html += "<option value='" + ((yr + 1) + "-" + (yr + 2)) + "'>" + ((yr + 1) + "-" + (yr + 2)) + "</option>";
        fiscal_html += "<option value='" + ((yr + 2) + "-" + (yr + 3)) + "'>" + ((yr + 2) + "-" + (yr + 3)) + "</option>";
    }
    else {
        fiscal_html += "<option value='" + ((yr - 1) + "-" + yr) + "'>" + ((yr - 1) + "-" + yr) + "</option>";
        fiscal_html += "<option value='" + (yr + "-" + (yr + 1)) + "'>" + (yr + "-" + (yr + 1)) + "</option>";
        fiscal_html += "<option value='" + ((yr + 1) + "-" + (yr + 2)) + "'>" + ((yr + 1) + "-" + (yr + 2)) + "</option>";
    }
    
    // set fiscal yrs
//    var fiscal_yrs_1 = (yr - 1) + "-" + yr;
//    var fiscal_yrs_2 = yr + "-" + (yr + 1);
//    var fiscal_yrs_3 = (yr + 1) + "-" + (yr + 2);
//    var fiscal_yrs_4 = (yr + 2) + "-" + (yr + 3);
//    
//    var fiscal_html = "<option value='" + fiscal_yrs_1 + "'>" + fiscal_yrs_1 + "</option>";
//    fiscal_html += "<option value='" + fiscal_yrs_2 + "'>" + fiscal_yrs_2 + "</option>";
//    fiscal_html += "<option value='" + fiscal_yrs_3 + "'>" + fiscal_yrs_3 + "</option>";
//    fiscal_html += "<option value='" + fiscal_yrs_4 + "'>" + fiscal_yrs_4 + "</option>";
    
    $("#fiscal").append(fiscal_html);
    
//    if (mon > 6) {
//        $("#fiscal").val(fiscal_yrs_2);
//    }
//    else {
//        $("#fiscal").val(fiscal_yrs_1);
//    }
    
    $('#fiscal').selectpicker('refresh');
}

function setCreatorInfo() {           
    $('#creatorName').val(sessionStorage.getItem('m1_creatorName'));
    $('#creatorTitle').val(sessionStorage.getItem('m1_creatorTitle'));
    $('#currentDate').val(sessionStorage.getItem('m1_currentDate'));
    
    $('#fiscal').val(sessionStorage.getItem('m1_fiscal'));
    $('#fiscal').selectpicker('refresh');
    
    $('#creatorDiv').val(sessionStorage.getItem('m1_creatorDiv'));
    $('#cc').val(sessionStorage.getItem('m1_cc'));
    $('#propTitle').val(sessionStorage.getItem('m1_propTitle'));
    $('#needFor').val(sessionStorage.getItem('m1_needFor')).trigger('autosize.resize');
    var ProgType = sessionStorage.getItem('m1_prog_type');
    $(':radio[value="' + ProgType + '"]').attr('checked', 'checked');
    var onetime = sessionStorage.getItem('m1_one_time');
    if (onetime === "true") {
        $('#m1_one_time').attr('checked', 'checked');
    }

    crtName = sessionStorage.getItem('m1_creatorName');
    crtEmail = sessionStorage.getItem('m1_creatorEmail');
    crtTitle = sessionStorage.getItem('m1_creatorTitle');
    crtDivision = sessionStorage.getItem('m1_creatorDiv');

    appName = sessionStorage.getItem('m1_creatorAppName');
    appEmail = sessionStorage.getItem('m1_creatorAppEmail');
    appTitle = sessionStorage.getItem('m1_creatorAppTitle');
    appDivision = sessionStorage.getItem('m1_creatorAppDiv');
    
    $('#m1_cancel').prop('disabled', false);
}

function setCreatorDefault() {
    $('#creatorName').val(sessionStorage.getItem('m1_loginName'));
    $('#creatorTitle').val(sessionStorage.getItem('m1_loginTitle'));
    $('#creatorDiv').val(sessionStorage.getItem('m1_loginDiv'));

    crtName = sessionStorage.getItem('m1_loginName');
    crtEmail = sessionStorage.getItem('m1_loginEmail');
    crtTitle = sessionStorage.getItem('m1_loginTitle');
    crtDivision = sessionStorage.getItem('m1_loginDiv');
    
    appName = sessionStorage.getItem('m1_appName');
    appEmail = sessionStorage.getItem('m1_appEmail');
    appTitle = sessionStorage.getItem('m1_appTitle');
    appDivision = sessionStorage.getItem('m1_appDiv');
    
    $('#m1_cancel').prop('disabled', true);
}

function clearCreatorInfo() {
    $('#creatorName').val("");
    $('#creatorTitle').val("");
    $('#creatorDiv').val("");
}

function clearSearchResult() {
    $('#creatorName').val("");
    $('#creatorTitle').val("");
    $('#creatorDiv').val("");
}

////////////////////////////////////////////////////////////////////////////////
function getResourceLinkList() {
    var loginEmail = sessionStorage.getItem('m1_loginEmail');  
    var result = new Array(new Array()); 
    result = db_getLoginUserRFLinkList(loginEmail);
    
    $("#previous_resource_request").empty();
    var html_default = "<option value='0'>Select ...</option>";
    $("#previous_resource_request").append(html_default);
    
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {             
            var res_link_html = "<option value='" + result[i][0] + "'>" + result[i][1] + "</option>";
            $("#previous_resource_request").append(res_link_html);
        }
    }
    
    $('#previous_resource_request').selectpicker('refresh');
}

function setResourceLinkList() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    var Resource_Parent_ID = db_getResourceLinkByResourceID(ResourceID);
    
    if (Resource_Parent_ID !== null) {
        $('#previous_resource_request').val(Resource_Parent_ID);
    }
    else {
        $('#previous_resource_request').val('0');
    }
    
    $('#previous_resource_request').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function getSelectedParentResource() {
    var par_res_id = $('#previous_resource_request').val();
    sessionStorage.setItem('m1_Resource_ParentID', par_res_id);
}

////////////////////////////////////////////////////////////////////////////////
function moveSelectedStepPage(step) {
    var dialog_msg = stepPageDialogMsg(step);

    if (dialog_msg !== "") {
        $('#mod_dialog_box_header').html("Error Message");
        $('#mod_dialog_box_body').html(dialog_msg);
        $('#mod_dialog_box').modal('show');
    }
    else {
        navigateStepPage(step);
    }
}