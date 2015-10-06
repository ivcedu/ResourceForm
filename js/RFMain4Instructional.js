////////////////////////////////////////////////////////////////////////////////
var file_index = 0;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() { 
    $('#mod_dialog_box').modal('hide');
    $('#m4_add_file').prop('disabled', true);
    
    if (sessionStorage.key(0) !== null) {
        var curPgs = sessionStorage.getItem('m4_pgNum');
        if (curPgs === "Page4") {
            getLocalData_rti();
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
        saveLocalData_rti();
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
        saveLocalData_rti();
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
        saveLocalData_rti();
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
        saveLocalData_rti();
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
        saveLocalData_rti();
        saveLocalDataPrevRType();
        var step3_save = btnSaveDraft();
        if (!step3_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Review");
    });
    
    ////////////////////////////////////////////////////////////////////////////
    $('#m4_ie_qty').on('change', function() {
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var n_qty = Number($(this).val());
        if (n_qty < 1) {
            $(this).val('');
            $('#m4_ie_total').val('');
            return false;
        }
        
        updateQty();
    });
    
    $('#m4_ie_cost').on('change', function() {
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var n_cost = Number($(this).val());
        if (n_cost < 0.01) {
            $(this).val('');
            $('#m4_ie_total').val('');
            return false;
        }
        
        updateCost();
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
        saveLocalData_rti();
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
        saveLocalData_rti();
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
    
    // auto size
    $('#m4_ie_descrip').autosize();
});

////////////////////////////////////////////////////////////////////////////////
//function formValidation() {
//    if ($('#m4_ie_sch_div').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_ie_ex_life').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_ie_descrip').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_ie_qty').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_ie_cost').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    
//    $('#m4_next').show();
//}

function formValidation2() {
    var err = "";
    
    if ($('#m4_ie_sch_div').val().replace(/\s+/g, '') === "") {
        err += "School/Division is required\n";
    }
    if ($('#m4_ie_ex_life').val().replace(/\s+/g, '') === "") {
        err += "Expected Lifespan is required\n";
    }
    if ($('#m4_ie_descrip').val().replace(/\s+/g, '') === "") {
        err += "Description is required\n";
    }
    if ($('#m4_ie_qty').val().replace(/\s+/g, '') === "") {
        err += "Qty is required\n";
    }
    if ($('#m4_ie_cost').val().replace(/\s+/g, '') === "") {
        err += "Cost is required\n";
    }
    
    return err;
}

////////////////////////////////////////////////////////////////////////////////
function updateQty() {
    if ($('#m4_ie_qty').val() !== "") {           
        $('#m4_ie_qty').val($('#m4_ie_qty').val().replace(/[^0-9\.]/g, ''));
        var qty = Number($('#m4_ie_qty').val());
        if (qty < 1) {
            $('#m4_ie_qty').val('');
        }
    }

    calculateTotal();
}

function updateCost() {
    if ($('#m4_ie_cost').val() !== "") {
        $('#m4_ie_cost').val($('#m4_ie_cost').val().replace(/[^0-9\.]/g, ''));
        var cost = Number($('#m4_ie_cost').val());
        if (cost < 0.01) {
            $('#m4_ie_cost').val('');
        }
    }

    calculateTotal();
    $('#m4_ie_cost').val(formatDollar(cost));
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
    
    var step3_in_result = updateStep3_Instructional();
    if (!step3_in_result) {
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
function getLocalData_rti() {   
    $('#m4_ie_sch_div').val(sessionStorage.getItem('m4_rti_Sch_Div'));
    $('#m4_ie_ex_life').val(sessionStorage.getItem('m4_rti_Ex_Life'));
    $('#m4_ie_descrip').val(sessionStorage.getItem('m4_rti_Descrip')).trigger('autosize.resize');
    $('#m4_ie_qty').val(sessionStorage.getItem('m4_rti_Qty'));
    $('#m4_ie_cost').val(sessionStorage.getItem('m4_rti_Cost'));
    $('#m4_ie_total').val(sessionStorage.getItem('m4_rti_Total'));
    
    setAttachFile();
}

////////////////////////////////////////////////////////////////////////////////
function saveLocalData_rti() {
    var sch_div = $('#m4_ie_sch_div').val();
    var ex_life = $('#m4_ie_ex_life').val();
    var descrip = $('#m4_ie_descrip').val();
    var qty = $('#m4_ie_qty').val();
    var cost = $('#m4_ie_cost').val();
    var total = $('#m4_ie_total').val();

    localData_setPg4_rti(sch_div, ex_life, descrip, qty, cost, total);
    setLocalDataStep4();
}

////////////////////////////////////////////////////////////////////////////////
function calculateTotal() {
    var qty = 0;
    var cost = 0.0;
    var total = 0.0;
    
    if ($('#m4_ie_qty').val() !== "") {
        qty = parseInt($('#m4_ie_qty').val());
    }
    
    if ($('#m4_ie_cost').val() !== "") {
        cost = revertDollar($('#m4_ie_cost').val());
    }
    
    total = qty * cost;
    $('#m4_ie_total').val(formatDollar(total));
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