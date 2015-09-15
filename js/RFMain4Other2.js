////////////////////////////////////////////////////////////////////////////////
var ot2_index = 1;
var file_index = 0;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {   
    $('#mod_dialog_box').modal('hide');
    $('#m4_add_file').prop('disabled', true);
    
    if (sessionStorage.key(0) !== null) {
        var curPgs = sessionStorage.getItem('m4_pgNum');
        if (curPgs === "Page4") {
            getLocalData_ot2();
        }
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {  
    $('#m1_home').click(function(){
        window.open('home.html', '_self');
    });
    
    $('#logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
    });
    
    // progress bar click event ////////////////////////////////////////////////
    $('#pbar_general_info').click(function() {
        $("#pbar_general_info").prop("disabled", true);
        saveLocalData_ot2();
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
        saveLocalData_ot2();
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
        saveLocalData_ot2();
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
        saveLocalData_ot2();
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
        saveLocalData_ot2();
        saveLocalDataPrevRType();
        var step3_save = btnSaveDraft();
        if (!step3_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Review");
    });
    
    ////////////////////////////////////////////////////////////////////////////
    $(document).on('change', 'input[id^="m4_ot2_item_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("m4_ot2_item_", "");
         
        if ($(this).val() === "") {
            disableItemFields(ID);
        }
        else {
            enableItemFields(ID);
        }
    });
    
    $(document).on('change', 'input[id^="m4_ot2_qty_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("m4_ot2_qty_", "");
        
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var qty = Number($(this).val());
        if (qty < 1) {
            $(this).val('');
            $('#m4_ot2_total_' + ID).val('');
            $('#m4_ot2_total_amount').val('');
            return false;
        }
        
        updateTotalFields(ID);
    });
    
    $(document).on('change', 'input[id^="m4_ot2_cost_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("m4_ot2_cost_", "");
        
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var cost = Number($(this).val());
        if (cost < 0.01) {
            $(this).val('');
            $('#m4_ot2_total_' + ID).val('');
            $('#m4_ot2_total_amount').val('');
            return false;
        }
        
        updateTotalFields(ID);
    });
    
    $('#btn_add_ot2_item').click(function(){
        btnAddOT2Item();
    });
    
    $('#btn_remove_ot2_item').click(function(){
        btnRemoveOT2Item();
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
        saveLocalData_ot2();
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
        saveLocalData_ot2();
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
    $('#m4_ot2_descrip').autosize();
});

////////////////////////////////////////////////////////////////////////////////
function disableItemFields(ID) {
    var item_qty = "#m4_ot2_qty_" + ID;
    var item_cost = "#m4_ot2_cost_" + ID;
    
    $(item_qty).attr('readonly', true);
    $(item_cost).attr('readonly', true);
}

function enableItemFields(ID) {
    var item_qty = "#m4_ot2_qty_" + ID;
    var item_cost = "#m4_ot2_cost_" + ID;
    
    $(item_qty).attr('readonly', false);
    $(item_cost).attr('readonly', false);
}

////////////////////////////////////////////////////////////////////////////////
//function formValidation() {    
//    if ($('#m4_ot2_descrip').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    
//    $('#m4_next').show();
//}

function formValidation2() {
    var err = "";
    
    if ($('#m4_ot2_descrip').val().replace(/\s+/g, '') === "") {
        err += "Description is required\n";
    }
    
    return err;
}

function wsValidation2(ID) {
    var err = "";
    
    if ($('#m4_ot2_item_' + ID).val().replace(/\s+/g, '') === "") {
        err += "Item is required\n";
    }
    if ($('#m4_ot2_qty_' + ID).val().replace(/\s+/g, '') === "") {
        err += "Item Qty is required\n";
    }
    if ($('#m4_ot2_cost_' + ID).val().replace(/\s+/g, '') === "") {
        err += "Item Cost is required\n";
    }
    
    return err;
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
    
    var step3_ot_result = updateStep3_Other2();
    if (!step3_ot_result) {
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
function getLocalData_ot2() {      
    ot2_index = Number(sessionStorage.getItem('m4_ot2_Index'));
    var descrip = sessionStorage.getItem('m4_ot2_Description');
    var total_amount = sessionStorage.getItem('m4_ot2_Total_Amount');
    
    $('#m4_ot2_descrip').val(descrip);
    $('#m4_ot2_total_amount').val(total_amount);
    
    if (total_amount !== "") {
        for (var i = 1; i <= ot2_index; i++) {
            var itemID = "m4_ot2_item_" + i;
            var qtyID = "m4_ot2_qty_" + i;
            var costID = "m4_ot2_cost_" + i; 
            var totalID = "m4_ot2_total_" + i;
            
            var item = sessionStorage.getItem(itemID);
            var qty = sessionStorage.getItem(qtyID);
            var cost = sessionStorage.getItem(costID);
            var total = sessionStorage.getItem(totalID);

            if (i > 1) {
                var index_old = i - 1;
                var tbody = setItemHTML(i, itemID, qtyID, costID, totalID);
                $("#m4_ot2_section_" + index_old).append(tbody);
            }

            setItemHTMLValues(itemID, item, qtyID, qty, costID, cost, totalID, total);
            enableItemFields(i);
        }
    }
    
    setAttachFile();
}

////////////////////////////////////////////////////////////////////////////////
function saveLocalData_ot2() {
    var descrip = $('#m4_ot2_descrip').val();
    var total_amount = $('#m4_ot2_total_amount').val();
    
    localData_setPg4_ot2(ot2_index, descrip, total_amount);
    
    if (total_amount !== "") {
        for (var i = 1; i <= ot2_index; i++) {
            var itemID = "m4_ot2_item_" + i;
            var qtyID = "m4_ot2_qty_" + i;
            var costID = "m4_ot2_cost_" + i; 
            var totalID = "m4_ot2_total_" + i;

            var item = $('#' + itemID).val();
            var qty = $('#' + qtyID).val();
            var cost = $('#' + costID).val();    
            var total = $('#' + totalID).val();

            localData_setPg4_ot2_Items(itemID, item, qtyID, qty, costID, cost, totalID, total);
        }
    }
    
    setLocalDataStep4();
}

////////////////////////////////////////////////////////////////////////////////
function btnAddOT2Item() {
    var new_ot2_index = ot2_index + 1;
    
    var itemID = "m4_ot2_item_" + new_ot2_index;
    var itemQtyID = "m4_ot2_qty_" + new_ot2_index;
    var itemCostID = "m4_ot2_cost_" + new_ot2_index;
    var itemTotalID = "m4_ot2_total_" + new_ot2_index;
    
    var tbody = setItemHTML(new_ot2_index, itemID, itemQtyID, itemCostID, itemTotalID);   
    $("#m4_ot2_section_" + ot2_index).append(tbody);
    
    ot2_index = new_ot2_index;
}

function btnRemoveOT2Item() {
    if(ot2_index > 1) {
        var te_section_last = "#m4_ot2_section_" + ot2_index;       
        $(te_section_last).remove();

        ot2_index -= 1;
        calculateTotalAmount();
    }
    else {
        $('#m4_ot2_item_1').val('');
        $('#m4_ot2_qty_1').val('');
        $('#m4_ot2_cost_1').val('');
        $('#m4_ot2_total_1').val('');
        $('#m4_ot2_total_amount').val('');
    }
}

function setItemHTML(index, itemID, itemQtyID, itemCostID, itemTotalID) {
    var tbody = "<div id='m4_ot2_section_" + index + "'>";
    tbody += "<div class='row'>";
    tbody += "<div class='span7'>";
    tbody += "<input type='text' class='span7' style='font-style: italic' placeholder='item description' id='" + itemID + "'>";
    tbody += "</div>";
    tbody += "<div class='span1'>";
    tbody += "<input type='text' class='span1 text-center' style='font-style: italic' placeholder='qty' readonly id='" + itemQtyID + "'>";
    tbody += "</div>";
    tbody += "<div class='span2'>";
    tbody += "<input type='text' class='span2 text-right' style='font-style: italic' placeholder='cost' readonly id='" + itemCostID + "'>";
    tbody += "</div>";
    tbody += "<div class='span2'>";
    tbody += "<input type='text' class='span2 text-right' style='font-style: italic' readonly id='" + itemTotalID + "'>";
    tbody += "</div>";
    tbody += "</div>";    
    tbody += "</div>";
    
    return tbody;
}

function setItemHTMLValues(itemID, item, qtyID, qty, costID, cost, totalID, total) {
    $('#' + itemID).val(item);
    $('#' + qtyID).val(qty);
    $('#' + costID).val(cost);
    $('#' + totalID).val(total);
}

////////////////////////////////////////////////////////////////////////////////
function updateTotalFields(ID) {    
    calculateItemTotal(ID);   
    calculateTotalAmount();
}

function calculateItemTotal(ID) {
    var item_qty = "#m4_ot2_qty_" + ID;
    var item_cost = "#m4_ot2_cost_" + ID; 
    var item_total = "#m4_ot2_total_" + ID;
    
    var strQty = $(item_qty).val();
    var strCost = $(item_cost).val();
    if (strQty === "" || strCost === "") {
        return;
    }
    
    var qty = parseInt(strQty);
    var cost = revertDollar(strCost); 
    var total = qty * cost;
    
    $(item_cost).val(formatDollar(cost));
    $(item_total).val(formatDollar(total));
}

function calculateTotalAmount() {
    var total_amount = 0.0;
    
    for (var i = 1; i <= ot2_index; i++) {
        var item_total = "#m4_ot2_total_" + i;
        var strItemTotal = $(item_total).val();
        
        if (strItemTotal !== "") {
            total_amount += revertDollar(strItemTotal);
        }
    }
    
    $('#m4_ot2_total_amount').val(formatDollar(total_amount));
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