////////////////////////////////////////////////////////////////////////////////
var rtp_salary = 0.0;
var file_index = 0;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('#mod_dialog_box').modal('hide');
        $('#m4_add_file').prop('disabled', true);
        $('#m4_new_title_block').hide();
        
        if (sessionStorage.getItem('m4_pgNum') === null) {
            db_getClassifiedBargaining();
            selectedClassified();
            $('#m4_CB_questionnaire').show();
            
            var ResourceID = sessionStorage.getItem('m1_ResourceID');
            var CBQuest = new Array();
            CBQuest = db_getCBQuestionnaire(ResourceID);
            if (CBQuest.length > 0) {
                var field1 = CBQuest[0][0];
                var field2 = CBQuest[0][1];
                var field3 = CBQuest[0][2];
                var field4 = CBQuest[0][3];
                var field5 = CBQuest[0][4];
                var field6 = CBQuest[0][5];
                var field7 = CBQuest[0][6];
                var field8 = CBQuest[0][7];
                var field9 = CBQuest[0][8];
                var field10 = CBQuest[0][9];
                var field11 = CBQuest[0][10];
                var field12 = CBQuest[0][11];
                var field13 = CBQuest[0][12];
                var field14 = CBQuest[0][13];
                
                localData_setPg4_rtp_CB_quest_fields(field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11, field12, field13, field14);
                getCBQuestionnaire();
            }
        }
        else {
            var curPgs = sessionStorage.getItem('m4_pgNum');
            if (curPgs === "Page4") {
                getLocalData();
            }
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
    
    // progress bar click event ////////////////////////////////////////////////
    $('#pbar_general_info').click(function() {
        $("#pbar_general_info").prop("disabled", true);
        saveLocalData();
        saveLocalDataPrevRType();
        var step3_save = btnSaveDraft();
        if (!step3_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("General Info");
    });
    
    $('#pbar_resource_type').click(function() {
        $("#pbar_resource_type").prop("disabled", true);
        saveLocalData();
        saveLocalDataPrevRType();
        var step3_save = btnSaveDraft();
        if (!step3_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Resource Type");
    });
    
    $('#pbar_funding_src').click(function() {
        var err = formValidation2();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        $("#pbar_funding_src").prop("disabled", true);
        saveLocalData();
        saveLocalDataPrevRType();
        var step3_save = btnSaveDraft();
        if (!step3_save) {
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
        saveLocalDataPrevRType();
        var step3_save = btnSaveDraft();
        if (!step3_save) {
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
        saveLocalDataPrevRType();
        var step3_save = btnSaveDraft();
        if (!step3_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Review");
    });

    ////////////////////////////////////////////////////////////////////////////
    $('#m4_personnel_type').change(function() {
        clearFields();
        var ptype = $(this).val();
        switch (ptype) {
            case "Classified Bargaining":
                db_getClassifiedBargaining();
                selectedClassified();
                $('#m4_CB_questionnaire').show();
                $('#m4_ch_process').show();
                $('#m4_ch_questionnaire').show();
                break;
            case "Classified Management":
                db_getClassifiedManagement();
                selectedClassified();
                $('#m4_CB_questionnaire').hide();
                $('#m4_ch_process').hide();
                $('#m4_ch_questionnaire').hide();
                break;
            case "Short-Term Hourly":
                db_getSalaryRange();
                selectedShortTerm();
                $('#m4_CB_questionnaire').hide();
                $('#m4_ch_process').hide();
                $('#m4_ch_questionnaire').hide();
                break;
            default:
                break;
        }
        
        $('#m4_personnel_type').selectpicker('refresh');
    });

    $('#m4_Personnel_Title').change(function() {
        var ptype = $("#m4_personnel_type").val();
        switch (ptype) {
            case "Classified Bargaining":
                selectedCB();
                break;
            case "Classified Management":
                selectedCM();
                break;
            default:
                break;
        }
        
        $('#m4_Personnel_Title').selectpicker('refresh');
    });

    $('#m4_Salary_Range').change(function() {
        selectedST();
        $('#m4_Salary_Range').selectpicker('refresh');
    });
    
    $('#m4_hr_rate').change(function() {
        var short_term = false;
        var ptype = $("#m4_personnel_type").val();
        if (ptype === "Short-Term Hourly") {
            short_term = true;
        }
        
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var hr_rate = Number($(this).val());
        if (hr_rate < 0.01) {
            $(this).val('');
        }
        else {
            rtp_salary = hr_rate;
            calculateCost(short_term);
        }
    });

    $('#m4_Month').on('change', function() {  
        var short_term = false;
        var ptype = $("#m4_personnel_type").val();
        if (ptype === "Short-Term Hourly") {
            short_term = true;
        }
        
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var n_month = Math.round(Number($(this).val()));
        if (n_month < 1 || n_month > 12) {
            $(this).val('12');
        }
        else {
            $(this).val(n_month);
        }

        calculateCost(short_term);
    });

    $('#m4_hrs').on('change', function() {
        var short_term = false;
        var ptype = $("#m4_personnel_type").val();
        if (ptype === "Short-Term Hourly") {
            short_term = true;
        }
        
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var n_hrs = Math.round(Number($(this).val()));
        if (n_hrs < 1 || n_hrs > 40) {
            $(this).val('40');
        }
        else {
            $(this).val(n_hrs);
        }

        calculateCost(short_term);
    });

    // questionnaire ///////////////////////////////////////////////////////////
    $("#m4_CB_quest_link").click(function() {
        $('#mod_questionnaire').modal('show');
    });

    $("#mod_quest_save").click(function() {
        var cb_quest_result = cb_QuestionnaireFields();
        setCBQuestionnaireResult(cb_quest_result);

        var ResourceID = sessionStorage.getItem('m1_ResourceID');
        var cb_quest = new Array();
        cb_quest = db_getCBQuestionnaire(ResourceID);

        if (cb_quest.length > 0) {
            step3_Personnel_CB_Questionnaire(ResourceID, false);
        }
        else {
            step3_Personnel_CB_Questionnaire(ResourceID, true);
        }
    });

    $('#mod_quest_field1').autosize();
    $('#mod_quest_field2').autosize();
    $('#mod_quest_field3').autosize();
    $('#mod_quest_field4').autosize();
    $('#mod_quest_field5').autosize();
    $('#mod_quest_field6').autosize();
    $('#mod_quest_field7').autosize();
    $('#mod_quest_field8').autosize();
    $('#mod_quest_field9').autosize();
    $('#mod_quest_field10').autosize();
    $('#mod_quest_field11').autosize();
    $('#mod_quest_field12').autosize();
    $('#mod_quest_field13').autosize();
    $('#mod_quest_field14').autosize();
    ////////////////////////////////////////////////////////////////////////////

    // file //////////////////////////////////////////////////////////////////// 
    $(document).on('change', 'input[id="m4_file"]', function() {
        var file = $('#m4_file').get(0).files[0];
        if (file !== null) {
            $('#m4_add_file').prop('disabled', false);
        }
        else {
            $('#m4_add_file').prop('disabled', true);
        }
    });

    $('#m4_add_file').click(function() {
        var file = $('#m4_file').get(0).files[0];
        var f_extension = getFileExtension(file.name);
        if (f_extension !== "pdf") {
            $('#mod_body').html('Only pdf form can be attached and upload for now');
            $('#mod_popup').modal('show');
            $("#m4_file").filestyle('clear');
            $('#m4_add_file').prop('disabled', true);
            return;
        }

        var f_name = file.name.replace(/#/g, "");
        var file_data = new FormData();
        file_index += 1;
        var ResourceID = sessionStorage.getItem('m1_ResourceID');
        var RType = sessionStorage.getItem('m3_radioRType');
        var fn_header = "RID:" + ResourceID + "_RTYPE:" + RType + "_fileName:_";
        var file_link_name = ResourceID + "_" + file_index + "_" + f_name;
        var php_flname = fn_header + file_index + "_" + f_name;

        file_data.append("files[]", file, php_flname);
        uploadAttachFile(file_data);
        var newfile = setAttachFileHTML(file_index, file_link_name, f_name);

        $("#m4_file_list").append(newfile);
        $("#m4_file").filestyle('clear');
        $('#m4_add_file').prop('disabled', true);
    });

    $(document).on('click', 'button[id^="m4_file_remove_btn_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("m4_file_remove_btn_", "");
        var file_name = $("#m4_file_view_" + ID).html();

        var ResourceID = sessionStorage.getItem('m1_ResourceID');
        var RType = sessionStorage.getItem('m3_radioRType');
        var file_link_name = ResourceID + "_" + ID + "_" + file_name;
        deleteAttachFile(RType, file_link_name);

        var fileID = "m4_file_" + ID;
        $("#" + fileID).remove();
        $("#m4_file").filestyle('clear');
    });
    
    ////////////////////////////////////////////////////////////////////////////
    $('#m4_back').click(function() {
        $("#m4_back").prop("disabled", true);
        saveLocalData();
        saveLocalDataPrevRType();

        var step3_save = btnSaveDraft();
        if (!step3_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }

        window.open('RFMain3.html', '_self');
    });

    $('#m4_next').click(function() {
        var err = formValidation2();
        if (err !== "") {
            alert(err);
            return false;
        }

        $("#m4_next").prop("disabled", true);
        saveLocalData();
        saveLocalDataPrevRType();

        var step3_save = btnSaveDraft();
        if (!step3_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }

        //window.open('RFMain5.html', '_self');
        window.open('fundingSrc.html', '_self');
    });
    
    // selectpicker
    $('.selectpicker').selectpicker();

    // bootstrap filestyle
    $(":file").filestyle({classButton: "btn btn-primary"});

    //$('#m4_hiring_timeline').popover({content: "New timeline coming soon", placement: "bottom"});
    $('#m4_describe').autosize();
});

////////////////////////////////////////////////////////////////////////////////
function formValidation2() {
    var err = "";

    var ptype = $("#m4_personnel_type").val();
    if (ptype === "Short-Term Hourly") {
        if ($('#m4_New_Position').val().replace(/\s+/g, '') === "") {
            err += "Title of Position is required\n";
        }
        if ($('#m4_st_range option:selected').text() === "...") {
            err += "Range is required\n";
        }
    }
    else if (ptype === "Classified Bargaining") {
        var cb_quest_result = $('#m4_CB_quest_result').html();
        if (cb_quest_result === "Incomplete") {
            err += "Complete the Questionnaire is required\n";
        }
    }
    else {
        if ($('#m4_Personnel_Title option:selected').text() === "Select ...") {
            err += "Title of Position is required\n";
        }
        if ($('#m4_hr_rate').val().replace(/\s+/g, '') === "") {
            err += "Hr Rate is required\n";
        }
    }

    if ($('#m4_Month').val().replace(/\s+/g, '') === "") {
        err += "Month is required\n";
    }
    if ($('#m4_hrs').val().replace(/\s+/g, '') === "") {
        err += "Hrs/Wk is required\n";
    }

    return err;
}

////////////////////////////////////////////////////////////////////////////////
function cb_QuestionnaireFields() {
    var field1 = "";
    var field2 = "";
    var field3 = "";
    var field4 = "";
    var field5 = "";
    var field6 = "";
    var field7 = "";
    var field8 = "";
    var field9 = "";
    var field10 = "";
    var field11 = "";
    var field12 = "";
    var field13 = "";
    var field14 = "";

    if ($('#mod_quest_field1').val().replace(/\s+/g, '') !== "") {
        field1 = $('#mod_quest_field1').val();
    }
    if ($('#mod_quest_field2').val().replace(/\s+/g, '') !== "") {
        field2 = $('#mod_quest_field2').val();
    }
    if ($('#mod_quest_field3').val().replace(/\s+/g, '') !== "") {
        field3 = $('#mod_quest_field3').val();
    }
    if ($('#mod_quest_field4').val().replace(/\s+/g, '') !== "") {
        field4 = $('#mod_quest_field4').val();
    }
    if ($('#mod_quest_field5').val().replace(/\s+/g, '') !== "") {
        field5 = $('#mod_quest_field5').val();
    }
    if ($('#mod_quest_field6').val().replace(/\s+/g, '') !== "") {
        field6 = $('#mod_quest_field6').val();
    }
    if ($('#mod_quest_field7').val().replace(/\s+/g, '') !== "") {
        field7 = $('#mod_quest_field7').val();
    }
    if ($('#mod_quest_field8').val().replace(/\s+/g, '') !== "") {
        field8 = $('#mod_quest_field8').val();
    }
    if ($('#mod_quest_field9').val().replace(/\s+/g, '') !== "") {
        field9 = $('#mod_quest_field9').val();
    }
    if ($('#mod_quest_field10').val().replace(/\s+/g, '') !== "") {
        field10 = $('#mod_quest_field10').val();
    }
    if ($('#mod_quest_field11').val().replace(/\s+/g, '') !== "") {
        field11 = $('#mod_quest_field11').val();
    }
    if ($('#mod_quest_field12').val().replace(/\s+/g, '') !== "") {
        field12 = $('#mod_quest_field12').val();
    }
    if ($('#mod_quest_field13').val().replace(/\s+/g, '') !== "") {
        field13 = $('#mod_quest_field13').val();
    }
    if ($('#mod_quest_field14').val().replace(/\s+/g, '') !== "") {
        field14 = $('#mod_quest_field14').val();
    }

    saveCBQuestionnaire(field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11, field12, field13, field14);

    if (field1 !== "" && field2 !== "" && field3 !== "" && field4 !== "" && field5 !== ""
            && field6 !== "" && field7 !== "" && field8 !== "" && field9 !== "" && field10 !== ""
            && field11 !== "" && field12 !== "" && field13 !== "" && field14 !== "") {
        return "Complete";
    }
    else {
        return "Incomplete";
    }
}

function saveCBQuestionnaire(field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11, field12, field13, field14) {
    localData_setPg4_rtp_CB_quest_fields(field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11, field12, field13, field14);
}

function setCBQuestionnaireResult(cb_quest_result) {
    if (cb_quest_result === "Complete") {
        $('#m4_CB_quest_result').html(cb_quest_result);
        $('#m4_CB_quest_result').css('color', 'blue');
    }
    else {
        $('#m4_CB_quest_result').html(cb_quest_result);
        $('#m4_CB_quest_result').css('color', 'red');
    }
}

////////////////////////////////////////////////////////////////////////////////
function btnSaveDraft() {
    var step1_result = updateStep1();
    if (!step1_result) {
        return false;
    }

    var step2_result = updateStep2();
    if (!step2_result) {
        return false;
    }

    var step3_pe_result = updateStep3_Personnel();
    if (!step3_pe_result) {
        return false;
    }

    return true;
}

function btnSaveHome() {
    var step1_result = updateStep1();
    if (!step1_result) {
        return false;
    }

    var step2_result = updateStep2();
    if (!step2_result) {
        return false;
    }

    return true;
}

////////////////////////////////////////////////////////////////////////////////
function getLocalData() {
    var ptype = sessionStorage.getItem('m3_radioPType');
    switch (ptype) {
        case "Classified Bargaining":
            getFromCB();
            getCBQuestionnaire();
            var cb_quest_result = cb_QuestionnaireFields();
            setCBQuestionnaireResult(cb_quest_result);
            $('#m4_CB_questionnaire').show();
            break;
        case "Classified Management":
            getFromCM();
            $('#m4_CB_questionnaire').hide();
            break;
        case "Short-Term Hourly":
            getFromST();
            $('#m4_CB_questionnaire').hide();
            break;
        default:
            db_getClassifiedBargaining();
            selectedClassified();
            $('#m4_CB_questionnaire').show();
            break;
    }

    setAttachFile();
}

function getFromCB() {
    db_getClassifiedBargaining();
    selectedClassified();
    
    var new_pos = sessionStorage.getItem('m4_rtp_CB_new_pos');
    if (new_pos !== "") {
        showNewPosition();
        getCBSalaryRange();
        $('#m4_Personnel_Title').val('0');
        $('#m4_new_title_input').val(new_pos);
        
        var salary = db_getCBSalary(sessionStorage.getItem('m4_rtp_CB_range'));
        $('#m4_Salary_Range').val(salary);
        $('#m4_Salary_Range').selectpicker('refresh');
    }
    else {
        $('#m4_Personnel_Title').val(sessionStorage.getItem('m4_rtp_CB_title'));
        $('#m4_Range').val(sessionStorage.getItem('m4_rtp_CB_range'));
    }
    $('#m4_Personnel_Title').selectpicker('refresh');
    
    $('#m4_personnel_type').val('Classified Bargaining');
    $('#m4_personnel_type').selectpicker('refresh');
    
    $('#m4_Month').val(sessionStorage.getItem('m4_rtp_CB_month'));
    $('#m4_hrs').val(sessionStorage.getItem('m4_rtp_CB_hrs'));
    $('#m4_annual_cost').val(sessionStorage.getItem('m4_rtp_CB_annual_cost'));
    $('#m4_benefit_cost').val(sessionStorage.getItem('m4_rtp_CB_benefit_cost'));
    $('#m4_total_cost').val(sessionStorage.getItem('m4_rtp_CB_total_cost'));
    $('#m4_describe').val(sessionStorage.getItem('m4_rtp_CB_describe')); 
    $('#m4_hr_rate').val(sessionStorage.getItem('m4_rtp_CB_hr_rate'));
}

function getCBQuestionnaire() {
    $('#mod_quest_field1').val(sessionStorage.getItem('m4_rtp_CB_quest_field1')).trigger('autosize.resize');
    $('#mod_quest_field2').val(sessionStorage.getItem('m4_rtp_CB_quest_field2')).trigger('autosize.resize');
    $('#mod_quest_field3').val(sessionStorage.getItem('m4_rtp_CB_quest_field3')).trigger('autosize.resize');
    $('#mod_quest_field4').val(sessionStorage.getItem('m4_rtp_CB_quest_field4')).trigger('autosize.resize');
    $('#mod_quest_field5').val(sessionStorage.getItem('m4_rtp_CB_quest_field5')).trigger('autosize.resize');
    $('#mod_quest_field6').val(sessionStorage.getItem('m4_rtp_CB_quest_field6')).trigger('autosize.resize');
    $('#mod_quest_field7').val(sessionStorage.getItem('m4_rtp_CB_quest_field7')).trigger('autosize.resize');
    $('#mod_quest_field8').val(sessionStorage.getItem('m4_rtp_CB_quest_field8')).trigger('autosize.resize');
    $('#mod_quest_field9').val(sessionStorage.getItem('m4_rtp_CB_quest_field9')).trigger('autosize.resize');
    $('#mod_quest_field10').val(sessionStorage.getItem('m4_rtp_CB_quest_field10')).trigger('autosize.resize');
    $('#mod_quest_field11').val(sessionStorage.getItem('m4_rtp_CB_quest_field11')).trigger('autosize.resize');
    $('#mod_quest_field12').val(sessionStorage.getItem('m4_rtp_CB_quest_field12')).trigger('autosize.resize');
    $('#mod_quest_field13').val(sessionStorage.getItem('m4_rtp_CB_quest_field13')).trigger('autosize.resize');
    $('#mod_quest_field14').val(sessionStorage.getItem('m4_rtp_CB_quest_field14')).trigger('autosize.resize');
}

function getFromCM() {
    db_getClassifiedManagement();
    selectedClassified();
    
    var new_pos = sessionStorage.getItem('m4_rtp_CM_new_pos');
    if (new_pos !== "") {
        showNewPosition();
        getCMSalaryRange();
        $('#m4_Personnel_Title').val('0');
        $('#m4_new_title_input').val(new_pos);
        
        var salary = db_getCBSalary(sessionStorage.getItem('m4_rtp_CM_range'));
        $('#m4_Salary_Range').val(salary);
        $('#m4_Salary_Range').selectpicker('refresh');
    }
    else {
        $('#m4_Personnel_Title').val(sessionStorage.getItem('m4_rtp_CM_title'));
        $('#m4_Range').val(sessionStorage.getItem('m4_rtp_CM_range'));
    }
    $('#m4_Personnel_Title').selectpicker('refresh');
    
    $('#m4_personnel_type').val('Classified Management');
    $('#m4_personnel_type').selectpicker('refresh');
    
    $('#m4_Month').val(sessionStorage.getItem('m4_rtp_CM_month'));
    $('#m4_hrs').val(sessionStorage.getItem('m4_rtp_CM_hrs'));
    $('#m4_annual_cost').val(sessionStorage.getItem('m4_rtp_CM_annual_cost'));
    $('#m4_benefit_cost').val(sessionStorage.getItem('m4_rtp_CM_benefit_cost'));
    $('#m4_total_cost').val(sessionStorage.getItem('m4_rtp_CM_total_cost'));
    $('#m4_describe').val(sessionStorage.getItem('m4_rtp_CM_describe'));
    $('#m4_hr_rate').val(sessionStorage.getItem('m4_rtp_CM_hr_rate'));
}

function getFromST() {
    db_getSalaryRange();
    selectedShortTerm();
    $('#m4_personnel_type').val('Short-Term Hourly');
    $('#m4_personnel_type').selectpicker('refresh');

    $('#m4_New_Position').val(sessionStorage.getItem('m4_rtp_ST_title'));
    $('#m4_Salary_Range option:selected').html(sessionStorage.getItem('m4_rtp_ST_range'));
    $('#m4_Month').val(sessionStorage.getItem('m4_rtp_ST_month'));
    $('#m4_hrs').val(sessionStorage.getItem('m4_rtp_ST_hrs'));
    $('#m4_annual_cost').val(sessionStorage.getItem('m4_rtp_ST_annual_cost'));
    $('#m4_benefit_cost').val(sessionStorage.getItem('m4_rtp_ST_benefit_cost'));
    $('#m4_total_cost').val(sessionStorage.getItem('m4_rtp_ST_total_cost'));
    $('#m4_describe').val(sessionStorage.getItem('m4_rtp_ST_describe'));
    $('#m4_hr_rate').val(sessionStorage.getItem('m4_rtp_ST_hr_rate'));
}

////////////////////////////////////////////////////////////////////////////////
function saveLocalData() {
    var ptype = $("#m4_personnel_type").val();
    switch (ptype) {
        case "Classified Bargaining":
            saveToCB();
            break;
        case "Classified Management":
            saveToCM();
            break;
        case "Short-Term Hourly":
            saveToST();
            break;
        default:
            break;
    }
}

function saveToCB() {
    var m4_cb_title = $('#m4_Personnel_Title').val();
    var m4_cb_titleName = "";
    var m4_cb_new_pos = "";
    var m4_cb_Range = "";
    
    if (m4_cb_title === "0") {
        m4_cb_titleName = "Create new position";
        m4_cb_new_pos = $('#m4_new_title_input').val();
        m4_cb_Range = $('#m4_Salary_Range option:selected').text();
    }
    else if (m4_cb_title === "-1") {
        m4_cb_Range = $('#m4_Range').val();
    }
    else {
        m4_cb_titleName = db_getSelectedCBTitle($('#m4_Personnel_Title').val());
        m4_cb_Range = $('#m4_Range').val();
    }
    
    var m4_cb_Month = $('#m4_Month').val();
    var m4_cb_Hrs = $('#m4_hrs').val();
    var m4_cb_annual_cost = $('#m4_annual_cost').val();
    var m4_cb_benefit_cost = $('#m4_benefit_cost').val();
    var m4_cb_total_cost = $('#m4_total_cost').val();
    var m4_cb_describe = $('#m4_describe').val();
    var m4_cb_hr_rate = $('#m4_hr_rate').val();

    sessionStorage.setItem('m3_radioPType', "Classified Bargaining");
    localData_setPg4_rtp_CB("Personnel", "Classified Bargaining", m4_cb_title, m4_cb_titleName, m4_cb_Range, m4_cb_Month, m4_cb_Hrs,
            m4_cb_annual_cost, m4_cb_benefit_cost, m4_cb_total_cost, m4_cb_describe, m4_cb_hr_rate, m4_cb_new_pos);
}

function saveToCM() {
    var m4_cm_title = $('#m4_Personnel_Title').val();
    var m4_cm_titleName = "";
    var m4_cm_new_pos = "";
    var m4_cm_Range = "";
    
    if (m4_cm_title === "0") {
        m4_cm_titleName = "Create new position";
        m4_cm_new_pos = $('#m4_new_title_input').val();
        m4_cm_Range = $('#m4_Salary_Range option:selected').text();
    }
    else if (m4_cm_title === "-1") {
        m4_cm_Range = $('#m4_Range').val();
    }
    else {
        m4_cm_titleName = db_getSelectedCMTitle($('#m4_Personnel_Title').val());
        m4_cm_Range = $('#m4_Range').val();
    }
    
    var m4_cm_Month = $('#m4_Month').val();
    var m4_cm_Hrs = $('#m4_hrs').val();
    var m4_cm_annual_cost = $('#m4_annual_cost').val();
    var m4_cm_benefit_cost = $('#m4_benefit_cost').val();
    var m4_cm_total_cost = $('#m4_total_cost').val();
    var m4_cm_describe = $('#m4_describe').val();
    var m4_cm_hr_rate = $('#m4_hr_rate').val();

    sessionStorage.setItem('m3_radioPType', "Classified Management");
    localData_setPg4_rtp_CM("Personnel", "Classified Management", m4_cm_title, m4_cm_titleName, m4_cm_Range, m4_cm_Month, m4_cm_Hrs,
            m4_cm_annual_cost, m4_cm_benefit_cost, m4_cm_total_cost, m4_cm_describe, m4_cm_hr_rate, m4_cm_new_pos);
}

function saveToST() {
    var m4_st_title = $('#m4_New_Position').val();
    var m4_st_Range = $('#m4_Salary_Range option:selected').text();
    var m4_st_Month = $('#m4_Month').val();
    var m4_st_Hrs = $('#m4_hrs').val();
    var m4_st_annual_cost = $('#m4_annual_cost').val();
    var m4_st_benefit_cost = $('#m4_benefit_cost').val();
    var m4_st_total_cost = $('#m4_total_cost').val();
    var m4_st_describe = $('#m4_describe').val();
    var m4_st_hr_rate = $('#m4_hr_rate').val();

    sessionStorage.setItem('m3_radioPType', "Short-Term Hourly");
    localData_setPg4_rtp_ST("Personnel", "Short-Term Hourly", m4_st_title, m4_st_Range, m4_st_Month, m4_st_Hrs,
            m4_st_annual_cost, m4_st_benefit_cost, m4_st_total_cost, m4_st_describe, m4_st_hr_rate);
}

////////////////////////////////////////////////////////////////////////////////
function db_getClassifiedBargaining() {
    var result = new Array(new Array());
    $('#m4_Personnel_Title').empty();

    $.ajax({
        type: "POST",
        url: "php/getClassifiedBargaining.php",
        async: false,
        success: function(data) {
            result = JSON.parse(data);
        }
    });

    if (result[0].length !== 0) {
        var tbody = "<option value='-1'>Select ...</option>";
        tbody += "<option value='0'>Create new position</option>";
        for (var i = 0; i < result.length; i++) {
            tbody += "<option value='" + result[i][0] + "'>" + result[i][1] + "</option>";
        }

        $("#m4_Personnel_Title").append(tbody);
        $('#m4_Personnel_Title').selectpicker('refresh');
    }
}

function db_getClassifiedManagement() {
    var result = new Array(new Array());
    $('#m4_Personnel_Title').empty();

    $.ajax({
        type: "POST",
        url: "php/getClassifiedManagement.php",
        async: false,
        success: function(data) {
            result = JSON.parse(data);
        }
    });

    if (result[0].length !== 0) {
        var tbody = "<option value='-1'>Select ...</option>";
        tbody += "<option value='0'>Create new position</option>";
        for (var i = 0; i < result.length; i++) {
            tbody += "<option value='" + result[i][0] + "'>" + result[i][1] + "</option>";
        }

        $("#m4_Personnel_Title").append(tbody);
        $('#m4_Personnel_Title').selectpicker('refresh');
    }
}

function db_getSalaryRange() {
    var result = new Array(new Array());

    $.ajax({
        type: "POST",
        url: "php/getSalaryRange.php",
        async: false,
        success: function(data) {
            result = JSON.parse(data);
        }
    });

    if (result[0].length !== 0) {
        $("#m4_Salary_Range").empty();
        var tbody = "<option>...</option>";
        for (var i = 0; i < result.length; i++) {
            tbody += "<option value='" + result[i][1] + "'>" + result[i][0] + "</option>";
        }

        $("#m4_Salary_Range").append(tbody);
        $('#m4_Salary_Range').selectpicker('refresh');
    }
}

function getCBSalaryRange() {
    var result = new Array();
    result = db_getCBSalaryRange();

    $("#m4_Salary_Range").empty();
    var tbody = "<option>...</option>";
    for (var i = 0; i < result.length; i++) {
        tbody += "<option value='" + result[i][2] + "'>" + result[i][1] + "</option>";
    }

    $("#m4_Salary_Range").append(tbody);
    $('#m4_Salary_Range').selectpicker('refresh');
}

function getCMSalaryRange() {
    var result = new Array();
    result = db_getCMSalaryRange();
    
    $("#m4_Salary_Range").empty();
    var tbody = "<option>...</option>";
    for (var i = 0; i < result.length; i++) {
        tbody += "<option value='" + result[i][2] + "'>" + result[i][1] + "</option>";
    }

    $("#m4_Salary_Range").append(tbody);
    $('#m4_Salary_Range').selectpicker('refresh');
}

function db_getSelectedCBTitle(CBID) {
    var result = new Array(new Array());
    $.ajax({
        type: "POST",
        url: "php/getSelectedCB.php",
        data: {CBID: CBID},
        async: false,
        success: function(data) {
            result = JSON.parse(data);
        }
    });

    return result[0][3];
}

function db_getSelectedCMTitle(CMID) {
    var result = new Array(new Array());
    $.ajax({
        type: "POST",
        url: "php/getSelectedCM.php",
        data: {CMID: CMID},
        async: false,
        success: function(data) {
            result = JSON.parse(data);
        }
    });

    return result[0][3];
}

////////////////////////////////////////////////////////////////////////////////
function selectedCB() {
    var CBID = $('#m4_Personnel_Title').val();
    clearFields();
    
    if (CBID === "-1") {
        hideNewPosition();
    }
    else if (CBID === "0") {
        showNewPosition();
        getCBSalaryRange();
    }
    else {
        hideNewPosition();
        
        var result = new Array(new Array());
        $.ajax({
            type: "POST",
            url: "php/getSelectedCB.php",
            data: {CBID: CBID},
            async: false,
            success: function(data) {
                result = JSON.parse(data);
            }
        });

        if (result[0].length !== 0) {
            $('#m4_Range').val(result[0][0]);
            rtp_salary = result[0][1];
            $('#m4_hr_rate').val(rtp_salary);

            calculateCost(false);
        }
    }
}

function selectedCM() {
    var CMID = $('#m4_Personnel_Title').val();
    clearFields();
    
    if (CMID === "-1") {
        hideNewPosition();
    }
    else if (CMID === "0") {
        showNewPosition();
        getCMSalaryRange();
    }
    else {
        hideNewPosition();
        
        var result = new Array(new Array());
        $.ajax({
            type: "POST",
            url: "php/getSelectedCM.php",
            data: {CMID: CMID},
            async: false,
            success: function(data) {
                result = JSON.parse(data);
            }
        });

        if (result[0].length !== 0) {
            $('#m4_Range').val(result[0][0]);
            rtp_salary = result[0][1];
            $('#m4_hr_rate').val(rtp_salary);

            calculateCost(false);
        }
    }    
}

function selectedST() {
    var salary = $('#m4_Salary_Range').val();
    var ptype = $('#m4_personnel_type').val();

    clearFields();
    if (salary !== "...") {
        if (salary === ".0000") {
            $('#m4_hr_rate').attr('readonly', false);
        }
        else {
            $('#m4_hr_rate').attr('readonly', true);
            rtp_salary = salary;
            $('#m4_hr_rate').val(rtp_salary);
            if (ptype === "Short-Term Hourly") {
                calculateCost(true);
            }
            else {
                calculateCost(false);
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
function clearFields() {
    $('#m4_Range').val("");
    $('#m4_Month').val("12");
    $('#m4_annual_cost').val("");
    $('#m4_hr_rate').val("");
    $('#m4_hrs').val("40");
    $('#m4_benefit_cost').val("");
    $('#m4_total_cost').val("");
}

function calculateCost(short_term) {
    var hr_rate = 0.0;
    if ($('#m4_hr_rate').val() !== "") {
        hr_rate = Number($('#m4_hr_rate').val());
    }

    var annual_cost = calculate_annual_cost(hr_rate);
    var benefit_cost = calculate_benefit_cost(hr_rate, short_term);
    var total_cost = annual_cost + benefit_cost;

    $('#m4_annual_cost').val(formatDollar(annual_cost));
    $('#m4_benefit_cost').val(formatDollar(benefit_cost));
    $('#m4_total_cost').val(formatDollar(total_cost));
}

function calculate_annual_cost(salary) {
    var annualCost = 0.0;
    var month = 0;
    var hrs = 0;

    if ($('#m4_Month').val() !== "") {
        month = parseInt($('#m4_Month').val());
    }
    if ($('#m4_hrs').val() !== "") {
        hrs = parseInt($('#m4_hrs').val());
    }

    annualCost = month * 4.2 * hrs * salary;

    return annualCost;
}

function calculate_benefit_cost(salary, short_term) {
    var benefitCost = 0.0;
    var month = 0;
    var hrs = 0;

    if ($('#m4_Month').val() !== "") {
        month = parseInt($('#m4_Month').val());
    }
    if ($('#m4_hrs').val() !== "") {
        hrs = parseInt($('#m4_hrs').val());
    }

    benefitCost = month * 4.2 * hrs * salary * 0.2;

    if (hrs >= 30 && short_term !== true) {
        benefitCost += 20000;
    }

    return benefitCost;
}

////////////////////////////////////////////////////////////////////////////////
function formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

////////////////////////////////////////////////////////////////////////////////
function selectedClassified() {
    $('#m4_classified_title').show();
    $('#m4_classified_range').show();

    $('#m4_st_title').hide();
    $('#m4_st_range').hide();
}

function selectedShortTerm() {
    $('#m4_classified_title').hide();
    $('#m4_classified_range').hide();

    $('#m4_st_title').show();
    $('#m4_st_range').show();
}

function showNewPosition() {
    $('#m4_new_title_block').show();
    $('#m4_classified_range').hide();
    
    $('#m4_st_range').show();
}

function hideNewPosition() {
    $('#m4_new_title_block').hide();
    $('#m4_classified_range').show();

    $('#m4_st_range').hide();
}

////////////////////////////////////////////////////////////////////////////////
function setAttachFile() {
    var attach_files = new Array();
    attach_files = mod_getAttachFiles();
    if (attach_files.length > 0) {
        for (var i = 0; i < attach_files.length; i++) {
            var fl_name = attach_files[i][0];
            var f_name = attach_files[i][1];
            var at_html = setAttachFileHTML(i + 1, fl_name, f_name);
            $("#m4_file_list").append(at_html);
        }
    }
}

function setAttachFileHTML(index, file_link_name, file_name) {
    var n_temp_1 = file_link_name.indexOf("_");
    var str_temp_1 = file_link_name.substr(n_temp_1 + 1);
    var n_temp_2 = str_temp_1.indexOf("_");
    var n_file_index = str_temp_1.slice(0, n_temp_2);
    
    var html = "<div class='row' id='m4_file_" + index + "'>";
    html += "<div class='row'>&nbsp;</div>";
    html += "<div class='span5 offset2' style='padding-top: 5px'><a href='attach_files/" + file_link_name + "' target='_blank' id='m4_file_view_" + n_file_index + "'>" + file_name + "</a></div>";
    html += "<button class='btn btn-danger span2' id='m4_file_remove_btn_" + n_file_index + "'>Remove File</button>";
    html += "</div>";
    
    file_index = Number(n_file_index);

    return html;
}

////////////////////////////////////////////////////////////////////////////////
function getFileExtension(file_name) {
    return file_name.substr((file_name.lastIndexOf('.') + 1)).toLowerCase();
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