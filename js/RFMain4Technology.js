////////////////////////////////////////////////////////////////////////////////
var tech_index = 1;
var file_index = 0;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {     
    $('#mod_dialog_box').modal('hide');
    $('#m4_add_file').prop('disabled', true);
    
    if (sessionStorage.key(0) !== null) {
        var curPgs = sessionStorage.getItem('m4_pgNum');
        if (curPgs === "Page4") {
            getLocalData_rtt();
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
        saveLocalData_rtt();
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
        saveLocalData_rtt();
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
        saveLocalData_rtt();
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
        saveLocalData_rtt();
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
        saveLocalData_rtt();
        saveLocalDataPrevRType();
        var step3_save = btnSaveDraft();
        if (!step3_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Review");
    });
    
    ////////////////////////////////////////////////////////////////////////////
    $(document).on('change', 'select[id^="m4_te_Item_Type_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("m4_te_Item_Type_", "");
        $('#m4_te_Item_Type_' + ID).selectpicker('refresh');
        
        rtt_calcualteSummaryTotal(ID);
        
        rtt_calculateTaxableTotal();
        rtt_calculateNonTaxableTotal();
        rtt_calculateGrandTotal();

        rtt_clearSummaryDollarFields();
    });
    
    $(document).on('change', 'input[id^="m4_te_Item_Qty_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("m4_te_Item_Qty_", "");
        
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var qty = Number($(this).val());
        if (qty < 1) {
            $(this).val('0');
        }

        rtt_updateQty(ID);
    });
    
    $(document).on('change', 'input[id^="m4_te_Item_Cost_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("m4_te_Item_Cost_", "");
        
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var cost = Number($(this).val());
        if (cost < 0.01) {
            $(this).val('0.00');
        }
        
        rtt_updateCost(ID);
    });
    
    $(document).on('change', 'select[id^="m4_te_Item_Maint_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("m4_te_Item_Maint_", "");
        rtt_select_Maint(ID);
        $('#m4_te_Item_Maint_' + ID).selectpicker('refresh');
    });
    
    $(document).on('input', 'input[id^="m4_te_Item_Yrs_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("m4_te_Item_Yrs_", "");
        
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var yrs = Number($(this).val());
        if (yrs < 1) {
            $(this).val('0');
        }
        
        rtt_updateYrs(ID);
    });
    
    $(document).on('change', 'input[id^="m4_te_Item_Ann_Cost_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("m4_te_Item_Ann_Cost_", "");
        
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var ann_cost = Number($(this).val());
        if (ann_cost < 0.01) {
            $(this).val('0.00');
        }
        
        rtt_updateAnnCost(ID);
    });
    
    $('#btn_add_tech_item').click(function(){
        btnAddTechItem();
    });
    
    $('#btn_remove_tech_item').click(function(){
        btnRemoveTechItem();
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
        saveLocalData_rtt();
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
        
        for (var i = 1; i <= tech_index; i++) {
            var ws_err = "";
            ws_err = wsValidation2(i);
            if (ws_err !== "") {
                alert(ws_err);
                return false;
            }
        }
        
        $("#m4_next").prop("disabled", true);
        saveLocalData_rtt();
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
    $('#m4_te_Additional').autosize();
    $('#m4_te_alt').autosize();
    
    // selectpicker
    $('.selectpicker').selectpicker();
});

////////////////////////////////////////////////////////////////////////////////
//function formValidation() {
//    if ($('#m4_te_Item_Req').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_te_Location').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_te_Item_Descrip_1').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_te_Item_Qty_1').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_te_Item_Cost_1').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_te_Item_Total_1').val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    
//    $('#m4_next').show();
//}

function formValidation2() {
    var err = "";
    
    if ($('#m4_te_Item_Req').val().replace(/\s+/g, '') === "") {
        err += "Item Requested is required\n";
    }
    if ($('#m4_te_Location').val().replace(/\s+/g, '') === "") {
        err += "Location is required\n";
    }
    if ($('#m4_te_Item_Descrip_1').val().replace(/\s+/g, '') === "") {
        err += "Item Description is required\n";
    }
    if ($('#m4_te_Item_Qty_1').val().replace(/\s+/g, '') === "") {
        err += "Item Qty is required\n";
    }
    if ($('#m4_te_Item_Cost_1').val().replace(/\s+/g, '') === "") {
        err += "Item Cost is required\n";
    }
    
    return err;
}

//function wsValidation(ID) {
//    if ($('#m4_te_Item_Descrip_' + ID).val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_te_Item_Qty_' + ID).val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_te_Item_Cost_' + ID).val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    if ($('#m4_te_Item_Total_' + ID).val().replace(/\s+/g, '') === "") {
//        $('#m4_next').hide();
//        return;
//    }
//    
//    $('#m4_next').show();
//}

function wsValidation2(ID) {
    var err = "";
    
    if ($('#m4_te_Item_Descrip_' + ID).val().replace(/\s+/g, '') === "") {
        err += "Item Description is required\n";
    }
    if ($('#m4_te_Item_Qty_' + ID).val().replace(/\s+/g, '') === "") {
        err += "Item Qty is required\n";
    }
    if ($('#m4_te_Item_Cost_' + ID).val().replace(/\s+/g, '') === "") {
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
    
    var step3_te_result = updateStep3_Technology();
    if (!step3_te_result) {
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
function getLocalData_rtt() {  
    var rtt_index = sessionStorage.getItem('m4_rtt_index');
    if (rtt_index !== null) {
        tech_index = Number(sessionStorage.getItem('m4_rtt_index'));
    }
    
    setLocalDataHeader();
    setLocalDataWorksheet();
    setLocalDataSummary();
    
    setAttachFile();
}

function setLocalDataHeader() {
    $('#m4_te_Item_Req').val(sessionStorage.getItem('m4_rtt_Item_Req'));
    $('#m4_te_Location').val(sessionStorage.getItem('m4_rtt_Location'));
    $('#m4_te_Additional').val(sessionStorage.getItem('m4_rtt_Additional')).trigger('autosize.resize');
}

function setLocalDataWorksheet() {   
    for (var i = 1; i <= tech_index; i++) {
        var itemTypeID = "m4_te_Item_Type_" + i;
        var itemDescripID = "m4_te_Item_Descrip_" + i;
        var itemQtyID = "m4_te_Item_Qty_" + i;
        var itemCostID = "m4_te_Item_Cost_" + i;
        var itemTotalID = "m4_te_Item_Total_" + i;
        var itemMaintID = "m4_te_Item_Maint_" + i;
        var itemYrsID = "m4_te_Item_Yrs_" + i;
        var itemAnnCostID = "m4_te_Item_Ann_Cost_" + i;
        var itemMaintTotalID = "m4_te_Item_Maint_Total_" + i;

        var itemType = sessionStorage.getItem(itemTypeID);
        var itemDescrip = sessionStorage.getItem(itemDescripID);
        var itemQty = sessionStorage.getItem(itemQtyID);
        var itemCost = sessionStorage.getItem(itemCostID);
        var itemTotal = sessionStorage.getItem(itemTotalID);
        var itemMaint = sessionStorage.getItem(itemMaintID);
        var itemYrs = sessionStorage.getItem(itemYrsID);
        var itemAnnCost = sessionStorage.getItem(itemAnnCostID);
        var itemMaintTotal = sessionStorage.getItem(itemMaintTotalID);

        if (i > 1) {
            var index_old = i - 1;
            var tbody = setItemHTML(i, itemTypeID, itemDescripID, itemQtyID, itemCostID, itemTotalID,
                                    itemMaintID, itemYrsID, itemAnnCostID, itemMaintTotalID);
            $("#m4_te_section_" + index_old).append(tbody);
        }
        
        setItemHTMLValues(itemTypeID, itemType,
                            itemDescripID, itemDescrip,
                            itemQtyID, itemQty,
                            itemCostID, itemCost,
                            itemTotalID, itemTotal,
                            itemMaintID, itemMaint, 
                            itemYrsID, itemYrs,
                            itemAnnCostID, itemAnnCost, 
                            itemMaintTotalID, itemMaintTotal);
        
        if (itemMaint === "Yes") {
            $('#' + itemYrsID).attr('readonly', false);
            $('#' + itemAnnCostID).attr('readonly', false);
        }
    }
}

function setLocalDataSummary() {
    $('#m4_te_Hardware_Total').val(sessionStorage.getItem('m4_rtt_Hardware_Total'));
    $('#m4_te_Software_Total').val(sessionStorage.getItem('m4_rtt_Software_Total'));
    $('#m4_te_Installation_Total').val(sessionStorage.getItem('m4_rtt_Installation_Total'));
    
    $('#m4_te_Maintenance_Total').val(sessionStorage.getItem('m4_rtt_Maintenance_Total'));
    $('#m4_te_Shipping_Total').val(sessionStorage.getItem('m4_rtt_Shipping_Total'));
    $('#m4_te_Additional_Total').val(sessionStorage.getItem('m4_rtt_Additional_Total'));
    
    $('#m4_te_Tax_Total').val(sessionStorage.getItem('m4_rtt_Tax_Total'));
    $('#m4_te_Total_Taxable').val(sessionStorage.getItem('m4_rtt_Total_Taxable'));
    $('#m4_te_Total_Nontaxable').val(sessionStorage.getItem('m4_rtt_Total_Nontaxable'));
    
    $('#m4_te_Grand_Total').val(sessionStorage.getItem('m4_rtt_Grand_Total'));
    $('#m4_te_alt').val(sessionStorage.getItem('m4_rtt_alt')).trigger('autosize.resize');
}

////////////////////////////////////////////////////////////////////////////////
function saveLocalData_rtt() {
    localData_setPg4_rtt_index(tech_index);
    
    saveLocalDataHeader();
    saveLocalDataWorksheet();
    saveLocalDataSummary();
    
    setLocalDataStep4();
}

function saveLocalDataHeader() {
    var m4_te_Item_Req = $('#m4_te_Item_Req').val();
    var m4_te_Location = $('#m4_te_Location').val();
    var m4_te_Additional = $('#m4_te_Additional').val();
    
    localData_setPg4_rtt_header(m4_te_Item_Req, m4_te_Location, m4_te_Additional);
}

function saveLocalDataWorksheet() {
    for (var i = 1; i <= tech_index; i++) {
        var itemTypeID = "m4_te_Item_Type_" + i;
        var itemDescripID = "m4_te_Item_Descrip_" + i;
        var itemQtyID = "m4_te_Item_Qty_" + i;
        var itemCostID = "m4_te_Item_Cost_" + i;
        var itemTotalID = "m4_te_Item_Total_" + i;
        var itemMaintID = "m4_te_Item_Maint_" + i;
        var itemYrsID = "m4_te_Item_Yrs_" + i;
        var itemAnnCostID = "m4_te_Item_Ann_Cost_" + i;
        var itemMaintTotalID = "m4_te_Item_Maint_Total_" + i;

        var itemType = formatNull($('#' + itemTypeID).val());
        var itemDescrip = formatNull($('#' + itemDescripID).val());
        var itemQty = formatNull($('#' + itemQtyID).val()); 
        var itemCost = formatNull($('#' + itemCostID).val());
        var itemTotal = formatNull($('#' + itemTotalID).val());
        var itemMaint = formatNull($('#' + itemMaintID).val());
        var itemYrs = formatNull($('#' + itemYrsID).val());
        var itemAnnCost = formatNull($('#' + itemAnnCostID).val());
        var itemMaintTotal = formatNull($('#' + itemMaintTotalID).val());
        
        localData_setPg4_rtt_worksheet(itemTypeID, itemType,
                                        itemDescripID, itemDescrip,
                                        itemQtyID, itemQty,
                                        itemCostID, itemCost,
                                        itemTotalID, itemTotal,
                                        itemMaintID, itemMaint,
                                        itemYrsID, itemYrs,
                                        itemAnnCostID, itemAnnCost,
                                        itemMaintTotalID, itemMaintTotal);
    }
}

function saveLocalDataSummary() {
    var te_Hardware_Total = $('#m4_te_Hardware_Total').val();
    var te_Software_Total = $('#m4_te_Software_Total').val();
    var te_Installation_Total = $('#m4_te_Installation_Total').val();
    
    var te_Maintenance_Total = $('#m4_te_Maintenance_Total').val();
    var te_Shipping_Total = $('#m4_te_Shipping_Total').val();
    var te_Additional_Total = $('#m4_te_Additional_Total').val();
    
    var te_Tax_Total = $('#m4_te_Tax_Total').val();
    var te_Total_Taxable = $('#m4_te_Total_Taxable').val();
    var te_Total_Nontaxable = $('#m4_te_Total_Nontaxable').val();
    
    var te_Grand_Total = $('#m4_te_Grand_Total').val();
    var te_alt = $('#m4_te_alt').val();
    
    localData_setPg4_rtt_summary(te_Hardware_Total, te_Software_Total, te_Installation_Total,
                                    te_Maintenance_Total, te_Shipping_Total, te_Additional_Total,
                                    te_Tax_Total, te_Total_Taxable, te_Total_Nontaxable,
                                    te_Grand_Total, te_alt);
}

////////////////////////////////////////////////////////////////////////////////
function setItemHTML(index, itemTypeID, itemDescripID, itemQtyID, itemCostID, itemTotalID, itemMaintID, itemYrsID, itemAnnCostID, itemMaintTotalID) {
    var tbody = "<div id='m4_te_section_" + index + "'>";
    tbody += "<div class='row'>";
    tbody += "<div class='span3'>";
    tbody += "<select class='selectpicker span3' style='font-style: italic; border-color: blue;' id='" + itemTypeID + "'>";
    tbody += rtt_getItemTypeOption();
    tbody += "</select>";
    tbody += "</div>";
    tbody += "<div class='span9'>";        
    tbody += "<input type='text' class='span9' style='font-style: italic; border-color: blue;' placeholder='resource description' id='" + itemDescripID + "'>";        
    tbody += "</div>";    
    tbody += "</div>";   
    tbody += "<div class='row'>";
    tbody += "<div class='span1' style='padding-top: 5px; text-align: center; color: blue;'>Qty</div>";
    tbody += "<div class='span2' style='padding-top: 5px; text-align: center; color: blue;'>Item Cost</div>";
    tbody += "<div class='span2' style='padding-top: 5px; text-align: center;'>Item Total</div>";
    tbody += "<div class='span2' style='padding-top: 5px; text-align: center;'>Maintenance</div>";
    tbody += "<div class='span1' style='padding-top: 5px; text-align: center;'>Yrs</div>";
    tbody += "<div class='span2' style='padding-top: 5px; text-align: center;'>Annual Cost</div>";
    tbody += "<div class='span2' style='padding-top: 5px; text-align: center;'>Maint. Total</div>";
    tbody += "</div>";
    tbody += "<div class='row-fluid'>";
    tbody += "<div class='span1'>";
    tbody += "<input type='text' class='span12 text-center' style='font-style: italic' placeholder='qty' id='" + itemQtyID + "'>";
    tbody += "</div>";    
    tbody += "<div class='span2'>";        
    tbody += "<input type='text' class='span12 text-right' style='font-style: italic' placeholder='item cost' id='" + itemCostID + "'>";    
    tbody += "</div>";    
    tbody += "<div class='span2'>";        
    tbody += "<input type='text' class='span12 text-right' style='font-style: italic' readonly id='" + itemTotalID + "'>";    
    tbody += "</div>";    
    tbody += "<div class='span2'>";        
    tbody += "<select class='selectpicker span12' style='font-style: italic' id='" + itemMaintID + "'>";    
    tbody += rtt_getItemMaintOption();
    tbody += "</select>";
    tbody += "</div>";        
    tbody += "<div class='span1'>";        
    tbody += "<input type='text' class='span12 text-center' style='font-style: italic' readonly id='" + itemYrsID + "'>";    
    tbody += "</div>";        
    tbody += "<div class='span2'>";   
    tbody += "<input type='text' class='span12 text-right' style='font-style: italic' readonly id='" + itemAnnCostID + "'>";
    tbody += "</div>";        
    tbody += "<div class='span2'>"; 
    tbody += "<input type='text' class='span12 text-right' style='font-style: italic' readonly id='" + itemMaintTotalID + "'>";        
    tbody += "</div>";    
    tbody += "</div>";
    
    return tbody;
}

function setItemHTMLValues(itemTypeID, itemType,
                            itemDescripID, itemDescrip,
                            itemQtyID, itemQty,
                            itemCostID, itemCost,
                            itemTotalID, itemTotal,
                            itemMaintID, itemMaint, 
                            itemYrsID, itemYrs,
                            itemAnnCostID, itemAnnCost, 
                            itemMaintTotalID, itemMaintTotal) {
    $('#' + itemTypeID).val(itemType);
    $('#' + itemTypeID).selectpicker('refresh');
    $('#' + itemDescripID).val(itemDescrip);
    $('#' + itemQtyID).val(itemQty); 
    $('#' + itemCostID).val(itemCost);
    $('#' + itemTotalID).val(itemTotal);
    $('#' + itemMaintID).val(itemMaint);
    $('#' + itemMaintID).selectpicker('refresh');
    $('#' + itemYrsID).val(itemYrs);
    $('#' + itemAnnCostID).val(itemAnnCost);
    $('#' + itemMaintTotalID).val(itemMaintTotal);
}

////////////////////////////////////////////////////////////////////////////////
function btnAddTechItem() {
    var new_tech_index = tech_index + 1;
    
    var itemTypeID = "m4_te_Item_Type_" + new_tech_index;
    var itemDescripID = "m4_te_Item_Descrip_" + new_tech_index;
    var itemQtyID = "m4_te_Item_Qty_" + new_tech_index;
    var itemCostID = "m4_te_Item_Cost_" + new_tech_index;
    var itemTotalID = "m4_te_Item_Total_" + new_tech_index;
    var itemMaintID = "m4_te_Item_Maint_" + new_tech_index;
    var itemYrsID = "m4_te_Item_Yrs_" + new_tech_index;
    var itemAnnCostID = "m4_te_Item_Ann_Cost_" + new_tech_index;
    var itemMaintTotalID = "m4_te_Item_Maint_Total_" + new_tech_index;
    
    var tbody = setItemHTML(new_tech_index, itemTypeID, itemDescripID, itemQtyID, itemCostID, itemTotalID, itemMaintID, itemYrsID, itemAnnCostID, itemMaintTotalID);
    
    $("#m4_te_section_" + tech_index).append(tbody);
    $('#' + itemTypeID).selectpicker('refresh');
    $('#' + itemMaintID).selectpicker('refresh');
    
    tech_index = new_tech_index;
}

function btnRemoveTechItem() {
    if(tech_index > 1) {
        var te_section_last = "#m4_te_section_" + tech_index;
        var te_item_type = "#m4_te_Item_Type_" + tech_index;
        var ItemType = $(te_item_type).val();
        
        $(te_section_last).remove();
        tech_index -= 1;
        
        rtt_calculateHardwareTotal();
        rtt_calculateSoftwareTotle();
        rtt_calculateInstallationTotal();
        rtt_calculateShippingTotal();
        rtt_calculateAdditionalTotal();
        
        rtt_calculateMaintenanceTotal();
        
        rtt_calculateTaxableTotal();
        rtt_calculateNonTaxableTotal();
        rtt_calculateGrandTotal();
        
        rtt_clearSummaryDollarFields();
    }
}

function rtt_getItemTypeOption() {
    var ITOption = "<option value='Hardware'>Hardware</option>";
    ITOption += "<option value='Software'>Software</option>";
    ITOption += "<option value='Installation'>Installation</option>";
    ITOption += "<option value='Shipping'>Shipping</option>";
    ITOption += "<option value='Additional'>Additional</option>";
    
    return ITOption;
}

function rtt_getItemMaintOption() {
    var IMOption = "<option value='No'>No</option>";
    IMOption += "<option value='Yes'>Yes</option>";
    
    return IMOption;
}

function rtt_select_Maint(ID) {
    var item_maint = "#m4_te_Item_Maint_" + ID;
    var item_yrs = "#m4_te_Item_Yrs_" + ID;
    var item_ann_cost = "#m4_te_Item_Ann_Cost_" + ID;
    
    var Maint = $(item_maint).val();
    
    if (Maint === "Yes") {
        $(item_yrs).attr("placeholder", "yrs");
        $(item_ann_cost).attr("placeholder", "annual cost");
        $(item_yrs).attr('readonly', false);
        $(item_ann_cost).attr('readonly', false);
    }
    else {
        rtt_clearMaint(ID);
        $(item_yrs).attr('readonly', true);
        $(item_ann_cost).attr('readonly', true);
    }
    
    rtt_clearSummaryDollarFields();
}

function rtt_updateQty(ID) {    
    rtt_calculateTotal(ID);   
    rtt_calcualteSummaryTotal(ID);
    
    rtt_calculateTaxableTotal();
    rtt_calculateNonTaxableTotal();
    rtt_calculateGrandTotal();
    
    rtt_clearSummaryDollarFields();
}

function rtt_updateCost(ID) {    
    rtt_calculateTotal(ID); 
    rtt_calcualteSummaryTotal(ID); 
    
    rtt_calculateTaxableTotal();
    rtt_calculateNonTaxableTotal();
    rtt_calculateGrandTotal();
    
    rtt_clearSummaryDollarFields();
}

function rtt_updateYrs(ID) {    
    rtt_calculateMaintTotal(ID);
    rtt_calculateMaintenanceTotal();
    
    rtt_calculateNonTaxableTotal();
    rtt_calculateGrandTotal();
    
    rtt_clearSummaryDollarFields();
}

function rtt_updateAnnCost(ID) {    
    rtt_calculateMaintTotal(ID);
    rtt_calculateMaintenanceTotal();
    
    rtt_calculateNonTaxableTotal();
    rtt_calculateGrandTotal();
    
    rtt_clearSummaryDollarFields();
}

////////////////////////////////////////////////////////////////////////////////
function rtt_clearMaint(ID) {
    var item_yrs = "#m4_te_Item_Yrs_" + ID;
    var item_ann_cost = "#m4_te_Item_Ann_Cost_" + ID; 
    var item_maint_total = "#m4_te_Item_Maint_Total_" + ID;
    
    $(item_yrs).val("");
    $(item_ann_cost).val("");
    $(item_maint_total).val("");
    
    rtt_calculateMaintenanceTotal();
    rtt_calculateNonTaxableTotal();
    rtt_calculateGrandTotal();
}

function rtt_clearSummaryDollarFields() {
    var strHardwareTotal = $('#m4_te_Hardware_Total').val();
    var strSoftwareTotal = $('#m4_te_Software_Total').val();
    var strInstallationTotal = $('#m4_te_Installation_Total').val();
    
    if (strHardwareTotal === "$0.00") {
        $('#m4_te_Hardware_Total').val("");
    }
    if (strSoftwareTotal === "$0.00") {
        $('#m4_te_Software_Total').val("");
    }
    if (strInstallationTotal === "$0.00") {
        $('#m4_te_Installation_Total').val("");
    }
    
    var strMaintenanceTotal = $('#m4_te_Maintenance_Total').val();
    var strShippingTotal = $('#m4_te_Shipping_Total').val();
    var strAdditionalTotal = $('#m4_te_Additional_Total').val();
    
    if (strMaintenanceTotal === "$0.00") {
        $('#m4_te_Maintenance_Total').val("");
    }
    if (strShippingTotal === "$0.00") {
        $('#m4_te_Shipping_Total').val("");
    }
    if (strAdditionalTotal === "$0.00") {
        $('#m4_te_Additional_Total').val("");
    }
    
    var strTax = $('#m4_te_Tax_Total').val();
    var strTaxableTotal = $('#m4_te_Total_Taxable').val();
    var strNontaxableTotal = $('#m4_te_Total_Nontaxable').val();
    
    if (strTax === "$0.00")  {
        $('#m4_te_Tax_Total').val("");
    }
    if (strTaxableTotal === "$0.00") {
        $('#m4_te_Total_Taxable').val("");
    }
    if (strNontaxableTotal === "$0.00") {
        $('#m4_te_Total_Nontaxable').val("");
    }
    
    var strGrandTotal = $('#m4_te_Grand_Total').val();
    if (strGrandTotal === "$0.00") {
        $('#m4_te_Grand_Total').val("");
    }
}

////////////////////////////////////////////////////////////////////////////////
function rtt_calculateTotal(ID) {
    var item_qty = "#m4_te_Item_Qty_" + ID;
    var item_cost = "#m4_te_Item_Cost_" + ID; 
    var item_total = "#m4_te_Item_Total_" + ID;
    
    var strQty = $(item_qty).val();
    var strCost = $(item_cost).val();
    if (strQty === "" || strCost === "") {
        return false;
    }
    
    var qty = parseInt(strQty);
    var cost = revertDollar(strCost); 
    var total = qty * cost;
    
    $(item_cost).val(formatDollar(cost));
    $(item_total).val(formatDollar(total));
}

function rtt_calculateMaintTotal(ID) {
    var item_yrs = "#m4_te_Item_Yrs_" + ID;
    var item_ann_cost = "#m4_te_Item_Ann_Cost_" + ID; 
    var item_maint_total = "#m4_te_Item_Maint_Total_" + ID;
    
    var strYrs = $(item_yrs).val();
    var strAnnCost = $(item_ann_cost).val();
    if (strYrs === "" || strAnnCost === "") {
        return false;
    }
    
    var yrs = parseInt(strYrs);
    var ann_cost = revertDollar(strAnnCost); 
    var total = yrs * ann_cost;
    
    $(item_ann_cost).val(formatDollar(ann_cost));
    $(item_maint_total).val(formatDollar(total));
}

////////////////////////////////////////////////////////////////////////////////
function rtt_calcualteSummaryTotal(ID) {
    var item_qty = "#m4_te_Item_Qty_" + ID;
    var item_cost = "#m4_te_Item_Cost_" + ID;
    
    var strQty = $(item_qty).val();
    var strCost = $(item_cost).val();
    if (strQty === "" || strCost === "") {
        return;
    }
    
    rtt_calculateHardwareTotal();
    rtt_calculateSoftwareTotle();
    rtt_calculateInstallationTotal();
    rtt_calculateShippingTotal();
    rtt_calculateAdditionalTotal();
}

function rtt_calculateMaintenanceTotal() {
    var maint_total = 0.0;
    
    for (var i = 1; i <= tech_index; i++) {
        var item_maint_total = "#m4_te_Item_Maint_Total_" + i;
        var strItemMaintTotal = $(item_maint_total).val();
        
        if (strItemMaintTotal === "") {
            continue;
        }
        else {
            maint_total += revertDollar(strItemMaintTotal);
        }
    }
    
    $('#m4_te_Maintenance_Total').val(formatDollar(maint_total));
}

////////////////////////////////////////////////////////////////////////////////
function rtt_calculateHardwareTotal() {
    var hardware_total = 0.0;
    
    for (var i = 1; i <= tech_index; i++) {
        var item_type = "#m4_te_Item_Type_" + i;
        var Type = $(item_type).val();
        if (Type !== "Hardware") {
            continue;
        }
        
        var item_total = "#m4_te_Item_Total_" + i;
        var strItemTotal = $(item_total).val();
        hardware_total += revertDollar(strItemTotal);
    }
    
    $('#m4_te_Hardware_Total').val(formatDollar(hardware_total));
}

function rtt_calculateSoftwareTotle() {
    var software_total = 0.0;
    
    for (var i = 1; i <= tech_index; i++) {
        var item_type = "#m4_te_Item_Type_" + i;
        var Type = $(item_type).val();
        if (Type !== "Software") {
            continue;
        }
        
        var item_total = "#m4_te_Item_Total_" + i;
        var strItemTotal = $(item_total).val();
        software_total += revertDollar(strItemTotal);
    }
    
    $('#m4_te_Software_Total').val(formatDollar(software_total));
}

function rtt_calculateInstallationTotal() {
    var installation_total = 0.0;
    
    for (var i = 1; i <= tech_index; i++) {
        var item_type = "#m4_te_Item_Type_" + i;
        var Type = $(item_type).val();
        if (Type !== "Installation") {
            continue;
        }
        
        var item_total = "#m4_te_Item_Total_" + i;
        var strItemTotal = $(item_total).val();
        installation_total += revertDollar(strItemTotal);
    }
    
    $('#m4_te_Installation_Total').val(formatDollar(installation_total));
}

function rtt_calculateShippingTotal() {
    var shipping_total = 0.0;
    
    for (var i = 1; i <= tech_index; i++) {       
        var item_type = "#m4_te_Item_Type_" + i;
        var Type = $(item_type).val();
        if (Type !== "Shipping") {
            continue;
        }
        
        var item_total = "#m4_te_Item_Total_" + i;
        var strItemTotal = $(item_total).val();
        shipping_total += revertDollar(strItemTotal);
    }
    
    $('#m4_te_Shipping_Total').val(formatDollar(shipping_total));
}

function rtt_calculateAdditionalTotal() {
    var additional_total = 0.0;
    
    for (var i = 1; i <= tech_index; i++) {
        var item_type = "#m4_te_Item_Type_" + i;
        var Type = $(item_type).val();
        if (Type !== "Additional") {
            continue;
        }
        
        var item_total = "#m4_te_Item_Total_" + i;
        var strItemTotal = $(item_total).val();
        additional_total += revertDollar(strItemTotal);
    }
    
    $('#m4_te_Additional_Total').val(formatDollar(additional_total));
}

////////////////////////////////////////////////////////////////////////////////
function rtt_calculateTaxableTotal() {
    var hardware_total = 0.0;
    var software_total = 0.0;
    var installation_total = 0.0;
    var taxable_total = 0.0;
    var tax = 0.0;
    
    var strHardwareTotal = $('#m4_te_Hardware_Total').val();
    var strSoftwareTotal = $('#m4_te_Software_Total').val();
    var strInstallationTotal = $('#m4_te_Installation_Total').val();
    
    if (strHardwareTotal !== "") {
        hardware_total = revertDollar(strHardwareTotal);
    }
    if (strSoftwareTotal !== "") {
        software_total = revertDollar(strSoftwareTotal);
    }
    if (strInstallationTotal !== "") {
        installation_total = revertDollar(strInstallationTotal);
    }
    
    taxable_total = hardware_total + software_total + installation_total;
    tax = taxable_total * 0.08;
    
    $('#m4_te_Tax_Total').val(formatDollar(tax));
    $('#m4_te_Total_Taxable').val(formatDollar(taxable_total));
}

function rtt_calculateNonTaxableTotal() {
    var maintenance_total = 0.0;
    var shipping_total = 0.0;
    var additional_total = 0.0;
    var nontaxable_total = 0.0;

    var strMaintenanceTotal = $('#m4_te_Maintenance_Total').val();
    var strShippingTotal = $('#m4_te_Shipping_Total').val();
    var strAdditionalTotal = $('#m4_te_Additional_Total').val();
    
    if (strMaintenanceTotal !== "") {
        maintenance_total = revertDollar(strMaintenanceTotal);
    }
    if (strShippingTotal !== "") {
        shipping_total = revertDollar(strShippingTotal);
    }
    if (strAdditionalTotal !== "") {
        additional_total = revertDollar(strAdditionalTotal);
    }
    
    nontaxable_total = maintenance_total + shipping_total + additional_total;
    $('#m4_te_Total_Nontaxable').val(formatDollar(nontaxable_total));
}

function rtt_calculateGrandTotal() {
    var tax = 0.0;
    var taxable_tatal = 0.0;
    var nontaxable_total = 0.0;
    
    var strTax = $('#m4_te_Tax_Total').val();
    var strTaxableTotal = $('#m4_te_Total_Taxable').val();
    var strNontaxableTotal = $('#m4_te_Total_Nontaxable').val();
    
    if (strTax !== "") {
        tax = revertDollar(strTax);
    }
    if (strTaxableTotal !== "") {
        taxable_tatal = revertDollar(strTaxableTotal);
    }
    if (strNontaxableTotal !== "") {
        nontaxable_total = revertDollar(strNontaxableTotal);
    }
    
    var grand_total = tax + taxable_tatal + nontaxable_total;
    $('#m4_te_Grand_Total').val(formatDollar(grand_total));
}

////////////////////////////////////////////////////////////////////////////////
function formatNull(value) {
    if (value === null) {
        return "";
    }
    else {
        return value;
    }
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