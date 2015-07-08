var selected_fs = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {   
    if (sessionStorage.key(0) !== null) {
        $('#mod_dialog_box').modal('hide');
        var curPgs = sessionStorage.getItem('mFS_pgNum');
        if (curPgs === "PageFundSrc") { 
            getlocalData_setPgFundSrc();
        }
    }
    else {
        window.open('Login.html', '_self');
    }

    $('#mod_dialog').modal('hide');
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('#btn_home').click(function() {
        window.open('home.html', '_self');
    });
    
    $('#btn_logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
    });
    
    // progress bar click event ////////////////////////////////////////////////
    $('#pbar_general_info').click(function() {
        $("#pbar_general_info").prop("disabled", true);
        saveLocalData();
        var stepFS_save = btnSaveDraft();
        if (!stepFS_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("General Info");
    });
    
    $('#pbar_resource_type').click(function() {
        $("#pbar_resource_type").prop("disabled", true);
        saveLocalData();
        var stepFS_save = btnSaveDraft();
        if (!stepFS_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Resource Type");
    });
    
    $('#pbar_worksheet').click(function() {
        $("#pbar_worksheet").prop("disabled", true);
        saveLocalData();
        var stepFS_save = btnSaveDraft();
        if (!stepFS_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Worksheet");
    });
    
    $('#pbar_planning').click(function() {
        $("#pbar_planning").prop("disabled", true);
        saveLocalData();
        var stepFS_save = btnSaveDraft();
        if (!stepFS_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Planning");
    });
    
    $('#pbar_review').click(function() {
        $("#pbar_review").prop("disabled", true);
        saveLocalData();
        var stepFS_save = btnSaveDraft();
        if (!stepFS_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Review");
    });
    
    // navigation button event /////////////////////////////////////////////////
    $('#btn_back').click(function() {
        $("#btn_back").prop("disabled", true);
        saveLocalData();
        
        var stepFS_save = btnSaveDraft();
        if (!stepFS_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        BackToWorksheetPage();
    });
    
    $('#btn_next').click(function() {        
        $("#btn_next").prop("disabled", true);
        saveLocalData();
        
        var stepFS_save = btnSaveDraft();
        if (!stepFS_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        window.open('RFMain5.html', '_self');
    });
    
    // checkbox dialog button event ////////////////////////////////////////////    
    $('#mod_btn_confirm').click(function() {
        $("#" + selected_fs).prop('checked', true);
    });
    
    // mouse event /////////////////////////////////////////////////////////////
    $(document).on('mouseover', '[id^="lable_fs_"]', function() {
        var currentId = $(this).attr('id');
        currentId = currentId.replace("lable_", "");
        var descrip = getFundSrcDescrip(currentId);
        
        $(this).popover({trigger:"manual", content:descrip, placement:"bottom"});
        $(this).popover('toggle');
    });
    
    $(document).on('mouseleave', '[id^="lable_fs_"]', function() {
        $(this).popover('hide');
    });
    
    // checkbox event //////////////////////////////////////////////////////////
    $('#fs_1').change(function() {
        var fs_1 = ($('#fs_1').is(':checked') ? true : false);
        if (fs_1) {
            selected_fs = "fs_1";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_2').change(function() {
        var fs_2 = ($('#fs_2').is(':checked') ? true : false);
        if (fs_2) {
            selected_fs = "fs_2";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_3').change(function() {
        var fs_3 = ($('#fs_3').is(':checked') ? true : false);
        if (fs_3) {
            selected_fs = "fs_3";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_4').change(function() {
        var fs_4 = ($('#fs_4').is(':checked') ? true : false);
        if (fs_4) {
            selected_fs = "fs_4";            
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_5').change(function() {
        var fs_5 = ($('#fs_5').is(':checked') ? true : false);
        if (fs_5) {
            selected_fs = "fs_5";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_6').change(function() {
        var fs_6 = ($('#fs_6').is(':checked') ? true : false);
        if (fs_6) {
            selected_fs = "fs_6";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_7').change(function() {
        var fs_7 = ($('#fs_7').is(':checked') ? true : false);
        if (fs_7) {
            selected_fs = "fs_7";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_8').change(function() {
        var fs_8 = ($('#fs_8').is(':checked') ? true : false);
        if (fs_8) {
            selected_fs = "fs_8";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_9').change(function() {
        var fs_9 = ($('#fs_9').is(':checked') ? true : false);
        if (fs_9) {
            selected_fs = "fs_9";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_10').change(function() {
        var fs_10 = ($('#fs_10').is(':checked') ? true : false);
        if (fs_10) {
            selected_fs = "fs_10";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_11').change(function() {
        var fs_11 = ($('#fs_11').is(':checked') ? true : false);
        if (fs_11) {
            selected_fs = "fs_11";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_12').change(function() {
        var fs_12 = ($('#fs_12').is(':checked') ? true : false);
        if (fs_12) {
            selected_fs = "fs_12";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_13').change(function() {
        var fs_13 = ($('#fs_13').is(':checked') ? true : false);
        if (fs_13) {
            selected_fs = "fs_13";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_14').change(function() {
        var fs_14 = ($('#fs_14').is(':checked') ? true : false);
        if (fs_14) {
            selected_fs = "fs_14";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_15').change(function() {
        var fs_15 = ($('#fs_15').is(':checked') ? true : false);
        if (fs_15) {
            selected_fs = "fs_15";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_16').change(function() {
        var fs_16 = ($('#fs_16').is(':checked') ? true : false);
        if (fs_16) {
            selected_fs = "fs_16";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_17').change(function() {
        var fs_17 = ($('#fs_17').is(':checked') ? true : false);
        if (fs_17) {
            selected_fs = "fs_17";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_18').change(function() {
        var fs_18 = ($('#fs_18').is(':checked') ? true : false);
        if (fs_18) {
            selected_fs = "fs_18";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_19').change(function() {
        var fs_19 = ($('#fs_19').is(':checked') ? true : false);
        if (fs_19) {
            selected_fs = "fs_19";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_20').change(function() {
        var fs_20 = ($('#fs_20').is(':checked') ? true : false);
        if (fs_20) {
            selected_fs = "fs_20";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_21').change(function() {
        var fs_21 = ($('#fs_21').is(':checked') ? true : false);
        if (fs_21) {
            selected_fs = "fs_21";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_22').change(function() {
        var fs_22 = ($('#fs_22').is(':checked') ? true : false);
        if (fs_22) {
            selected_fs = "fs_22";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
    
    $('#fs_23').change(function() {
        var fs_23 = ($('#fs_23').is(':checked') ? true : false);
        if (fs_23) {
            selected_fs = "fs_23";
            var descrip = getFundSrcDescrip(selected_fs);
            $('#mod_dialog_body').html(descrip.replace(/\n/g, "<br>"));
            $('#mod_dialog').modal('show');
            $("#" + selected_fs).prop('checked', false);
        }
    });
});

////////////////////////////////////////////////////////////////////////////////
function formValidation() {    
    if ($('#fs_1').is(':checked')) {
        return "";
    }
    if ($('#fs_2').is(':checked')) {
        return "";
    }
    if ($('#fs_3').is(':checked')) {
        return "";
    }
    if ($('#fs_4').is(':checked')) {
        return "";
    }
    if ($('#fs_5').is(':checked')) {
        return "";
    }
    if ($('#fs_6').is(':checked')) {
        return "";
    }
    if ($('#fs_7').is(':checked')) {
        return "";
    }
    if ($('#fs_8').is(':checked')) {
        return "";
    }
    if ($('#fs_9').is(':checked')) {
        return "";
    }
    if ($('#fs_10').is(':checked')) {
        return "";
    }
    if ($('#fs_11').is(':checked')) {
        return "";
    }
    if ($('#fs_12').is(':checked')) {
        return "";
    }
    if ($('#fs_13').is(':checked')) {
        return "";
    }
    if ($('#fs_14').is(':checked')) {
        return "";
    }
    if ($('#fs_15').is(':checked')) {
        return "";
    }
    if ($('#fs_16').is(':checked')) {
        return "";
    }
    if ($('#fs_17').is(':checked')) {
        return "";
    }
    if ($('#fs_18').is(':checked')) {
        return "";
    }
    if ($('#fs_19').is(':checked')) {
        return "";
    }
    if ($('#fs_20').is(':checked')) {
        return "";
    }
    if ($('#fs_21').is(':checked')) {
        return "";
    }
    if ($('#fs_22').is(':checked')) {
        return "";
    }
    if ($('#fs_23').is(':checked')) {
        return "";
    }
    
    return "At least one funding source required";
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
    
    var rdRType = sessionStorage.getItem('m3_radioRType');   
    switch (rdRType) {
        case "Personnel": 
            var step3_pe_result = updateStep3_Personnel();
            if (!step3_pe_result) {
                return false;
            }
            break;
        case "Facilities":
            var step3_fa_result = updateStep3_Facilities();
            if (!step3_fa_result) {
                return false;
            }
            break;
        case "Instructional":
            var step3_in_result = updateStep3_Instructional();
            if (!step3_in_result) {
                return false;
            }
            break;
        case "Technology":
            var step3_te_result = updateStep3_Technology();
            if (!step3_te_result) {
                return false;
            }
            break;
        case "Other":
            var step3_ot_result = updateStep3_Other2();
            if (!step3_ot_result) {
                return false;
            }
            break;
        default:
    }
    
    var step_fs_result = updateStepFundSrc();
    if (!step_fs_result) {
        return false;
    }
    
    return true;
}

function BackToWorksheetPage() {
    var rdRType = sessionStorage.getItem('m3_radioRType');   
    
    switch (rdRType) {
        case "Personnel":
            window.open('RFMain4Personnel.html', '_self');
            break;
        case "Facilities":
            window.open('RFMain4Facilities.html', '_self');
            break;
        case "Instructional":
            window.open('RFMain4Instructional.html', '_self');
            break;
        case "Technology":
            window.open('RFMain4Technology.html', '_self');
            break;
        case "Other":
            window.open('RFMain4Other2.html', '_self');
            break;
        default:
    }
}

////////////////////////////////////////////////////////////////////////////////
function saveLocalData() {
    var fs_1 = ($('#fs_1').is(':checked') ? true : false);
    var fs_2 = ($('#fs_2').is(':checked') ? true : false);
    var fs_3 = ($('#fs_3').is(':checked') ? true : false);
    var fs_4 = ($('#fs_4').is(':checked') ? true : false);
    var fs_5 = ($('#fs_5').is(':checked') ? true : false);
    var fs_6 = ($('#fs_6').is(':checked') ? true : false);
    var fs_7 = ($('#fs_7').is(':checked') ? true : false);
    var fs_8 = ($('#fs_8').is(':checked') ? true : false);
    var fs_9 = ($('#fs_9').is(':checked') ? true : false);
    var fs_10 = ($('#fs_10').is(':checked') ? true : false);
    var fs_11 = ($('#fs_11').is(':checked') ? true : false);
    var fs_12 = ($('#fs_12').is(':checked') ? true : false);
    var fs_13 = ($('#fs_13').is(':checked') ? true : false);
    var fs_14 = ($('#fs_14').is(':checked') ? true : false);
    var fs_15 = ($('#fs_15').is(':checked') ? true : false);
    var fs_16 = ($('#fs_16').is(':checked') ? true : false);
    var fs_17 = ($('#fs_17').is(':checked') ? true : false);
    var fs_18 = ($('#fs_18').is(':checked') ? true : false);
    var fs_19 = ($('#fs_19').is(':checked') ? true : false);
    var fs_20 = ($('#fs_20').is(':checked') ? true : false);
    var fs_21 = ($('#fs_21').is(':checked') ? true : false);
    var fs_22 = ($('#fs_22').is(':checked') ? true : false);
    var fs_23 = ($('#fs_23').is(':checked') ? true : false);
    
    localData_setPgFundSrc(fs_1, fs_2, fs_3, fs_4, fs_5, fs_6, fs_7, fs_8, fs_9, fs_10, fs_11, fs_12, fs_13, fs_14, fs_15, fs_16, fs_17, fs_18, fs_19, fs_20, fs_21, fs_22, fs_23);
}

////////////////////////////////////////////////////////////////////////////////
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

function getlocalData_setPgFundSrc() {
    if (sessionStorage.getItem('mFS_fs_1') === "true") {
        $("#fs_1").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_2') === "true") {
        $("#fs_2").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_3') === "true") {
        $("#fs_3").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_4') === "true") {
        $("#fs_4").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_5') === "true") {
        $("#fs_5").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_6') === "true") {
        $("#fs_6").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_7') === "true") {
        $("#fs_7").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_8') === "true") {
        $("#fs_8").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_9') === "true") {
        $("#fs_9").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_10') === "true") {
        $("#fs_10").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_11') === "true") {
        $("#fs_11").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_12') === "true") {
        $("#fs_12").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_13') === "true") {
        $("#fs_13").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_14') === "true") {
        $("#fs_14").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_15') === "true") {
        $("#fs_15").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_16') === "true") {
        $("#fs_16").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_17') === "true") {
        $("#fs_17").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_18') === "true") {
        $("#fs_18").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_19') === "true") {
        $("#fs_19").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_20') === "true") {
        $("#fs_20").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_21') === "true") {
        $("#fs_21").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_22') === "true") {
        $("#fs_22").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_23') === "true") {
        $("#fs_23").prop('checked', true);
    }
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