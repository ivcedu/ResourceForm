////////////////////////////////////////////////////////////////////////////////
var file_index = 0;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {  
    $('#mod_dialog_box').modal('hide');
    $('#m4_add_file').prop('disabled', true);
    
    if (sessionStorage.key(0) !== null) {
        var curPgs = sessionStorage.getItem('m4_pgNum');
        if (curPgs === "Page4") {
            getLocalData_rtf();
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
    $('#pbar_general_info').click(function() {
        $("#pbar_general_info").prop("disabled", true);
        saveLocalData_rtf();
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
        saveLocalData_rtf();
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
        saveLocalData_rtf();
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
        saveLocalData_rtf();
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
        saveLocalData_rtf();
        saveLocalDataPrevRType();
        var step3_save = btnSaveDraft();
        if (!step3_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Review");
    });
    
    ////////////////////////////////////////////////////////////////////////////
    $('#m4_fa_Est_Amt').change(function() {
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var est_amt = Number($(this).val());
        if (est_amt < 0.01) {
            $(this).val('');
        }
        
        rtf_formatEstAmt();
    }); 
    
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
            return false;
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
        saveLocalData_rtf();
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
        saveLocalData_rtf();
        saveLocalDataPrevRType();
        
        var step3_save = btnSaveDraft();
        if (!step3_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        //window.open('RFMain5.html', '_self');
        window.open('fundingSrc.html', '_self');
    });
    
    // bootstrap filestyle
    $(":file").filestyle({classButton: "btn btn-primary"});
    
    //auto size
    $('#m4_fa_Est_Descrip').autosize();
    $('#m4_fa_alt').autosize();
});

////////////////////////////////////////////////////////////////////////////////
//function formValidation() {
//    if ($('#m4_fa_Item_Req').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_fa_Location').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_fa_Est_Amt').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_fa_Est_Descrip').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    
//    $('#m4_next').show();
//}

function formValidation2() {
    var err = "";
    
    if ($('#m4_fa_Item_Req').val().replace(/\s+/g, '') === "") {
        err += "Item Requested is required\n";
    }
    if ($('#m4_fa_Location').val().replace(/\s+/g, '') === "") {
        err += "Location is required\n";
    }
    if ($('#m4_fa_Est_Amt').val().replace(/\s+/g, '') === "") {
        err += "Est Amount is required\n";
    }
    if ($('#m4_fa_Est_Descrip').val().replace(/\s+/g, '') === "") {
        err += "Est Description is required\n";
    }
    
    return err;
}

////////////////////////////////////////////////////////////////////////////////
function rtf_formatEstAmt() {
    var est_amt = 0.0;
    var m4_fa_Est_Amt = $('#m4_fa_Est_Amt').val();
    
    if (m4_fa_Est_Amt === "") {
        return;
    }
    else {
        est_amt = revertDollar(m4_fa_Est_Amt);
    }
    
    $('#m4_fa_Est_Amt').val(formatDollar(est_amt));
}

////////////////////////////////////////////////////////////////////////////////
function getLocalData_rtf() {   
    $('#m4_fa_Item_Req').val(sessionStorage.getItem('m4_rtf_Item_Req'));
    $('#m4_fa_Location').val(sessionStorage.getItem('m4_rtf_Location'));
    $('#m4_fa_Est_Amt').val(sessionStorage.getItem('m4_rtf_Est_Amt'));
    $('#m4_fa_Est_Descrip').val(sessionStorage.getItem('m4_rtf_Est_Descrip')).trigger('autosize.resize');
    $('#m4_fa_alt').val(sessionStorage.getItem('m4_rtf_fa_alt')).trigger('autosize.resize');
    
    setAttachFile();
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
    
    var step3_fa_result = updateStep3_Facilities();
    if (!step3_fa_result) {
        return false;
    }
    
    return true;
}

function btnSaveHome() {
    updateStep1();
    updateStep2();
}

////////////////////////////////////////////////////////////////////////////////
function saveLocalData_rtf() {
    var m4_fa_Item_Req = $('#m4_fa_Item_Req').val();
    var m4_fa_Location = $('#m4_fa_Location').val();
    var m4_fa_Est_Amt = $('#m4_fa_Est_Amt').val();
    var m4_fa_Est_Descrip = $('#m4_fa_Est_Descrip').val();
    var m4_fa_alt = $('#m4_fa_alt').val();

    localData_setPg4_rtf(m4_fa_Item_Req, m4_fa_Location, m4_fa_Est_Amt, m4_fa_Est_Descrip, m4_fa_alt);
    setLocalDataStep4();
}

////////////////////////////////////////////////////////////////////////////////
function setAttachFile() {
    var attach_files = new Array();
    attach_files = mod_getAttachFiles();
    if (attach_files.length > 0) {
        for (var i = 0; i < attach_files.length; i++) {
            var fl_name = attach_files[i][0];
            var f_name = attach_files[i][1];
            var at_html = setAttachFileHTML(i+1, fl_name, f_name);
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
    return file_name.substr((file_name.lastIndexOf('.') +1)).toLowerCase();
}

////////////////////////////////////////////////////////////////////////////////
function setLocalDataStep4() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    var result = new Array(new Array()); 
    $.ajax({
        type:"POST",
        url:"php/db_getPlanning.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    if (result.length !== 0) {
        localData_setPg5(result.length);
        
        for(var i = 0; i < result.length; i++) { 
            var objID = "m5_objective_" + (i + 1);
            var goalID = "m5_goal_" + (i + 1);
            var impactID = "m5_impact_" + (i + 1);
            var objective = result[i][0];
            var goal = result[i][1];
            var impact = result[i][2];
            
            localData_setPg5_obj(objID, objective, goalID, goal, impactID, impact);
        }
        
        sessionStorage.setItem('m1_Planning', true);
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