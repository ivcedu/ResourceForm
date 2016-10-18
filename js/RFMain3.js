////////////////////////////////////////////////////////////////////////////////
window.onload = function() {   
    $('#mod_dialog_box').modal('hide');
    
    if (sessionStorage.key(0) !== null) {
        var curPgs = sessionStorage.getItem('m3_pgNum');
        if (curPgs === "Page3") { 
            var rdRType = sessionStorage.getItem('m3_radioRType');
            $(':radio[value="' + rdRType + '"]').attr('checked', 'checked');
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
        var step2_save = btnSaveDraft();
        if (!step2_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
        }
        else {
            moveSelectedStepPage("General Info");
        }
        return false;
    });
    
    $('#pbar_worksheet').click(function() {
        var err = formValidation2();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        $("#pbar_worksheet").prop("disabled", true);
        saveLocalData();
        var step2_save = btnSaveDraft();
        if (!step2_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
        }
        else {
            moveSelectedStepPage("Worksheet");
        }
        return false;
    });
    
    $('#pbar_funding_src').click(function() {
        var err = formValidation2();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        $("#pbar_funding_src").prop("disabled", true);
        saveLocalData();
        var step2_save = btnSaveDraft();
        if (!step2_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
        }
        else {
            moveSelectedStepPage("Funding Src");
        }
        return false;
    });
    
    $('#pbar_planning').click(function() {
        var err = formValidation2();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        $("#pbar_planning").prop("disabled", true);
        saveLocalData();
        var step2_save = btnSaveDraft();
        if (!step2_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
        }
        else {
            moveSelectedStepPage("Planning");
        }
        return false;
    });
    
    $('#pbar_review').click(function() {
        var err = formValidation2();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        $("#pbar_review").prop("disabled", true);
        saveLocalData();
        var step2_save = btnSaveDraft();
        if (!step2_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
        }
        else {
            moveSelectedStepPage("Review"); 
        }
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////
    $('#m3_back').click(function() {
        $("#m3_back").prop("disabled", true);
        saveLocalData();
        
        var step2_save = btnSaveDraft();
        if (!step2_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
        }
        else {
            window.open('RFMain.html', '_self');
        }
        return false;
    });
    
    $('#m3_next').click(function() {
        var err = formValidation2();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        $("#m3_next").prop("disabled", true);
        saveLocalData();
        
        var step2_save = btnSaveDraft();
        if (!step2_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
        }
        else {
            btnNext();
        }
        return false;
    });
    
    // popover
    $('#m3_rtype_personnel').popover({content:"Full time, part time, upgrade etc", placement:"top"});
    $('#m3_rtype_facilities').popover({content:"Desk, chairs etc", placement:"top"});
    $('#m3_rtype_instructioinal').popover({content:"Lab items, sports equipments etc", placement:"top"});
    $('#m3_rtype_technology').popover({content:"Hardware, Software etc", placement:"top"});
    $('#m3_rtype_other').popover({content:"New initiative, revenue, other", placement:"top"});
});

////////////////////////////////////////////////////////////////////////////////
//function formValidation() {
//    if (!$('input:radio[name=radioRType]').is(':checked')) {
//        $('#m3_next').hide();
//        return;
//    }
//
//    $('#m3_next').show();
//}

function formValidation2() {
    var err = "";
    
    if (!$('input:radio[name=radioRType]').is(':checked')) {
        err += "Resource Type is required\n";
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
    
    return true;
}

function btnSaveHome() {
    var step1_result = updateStep1();
    if (!step1_result) {
        return false;
    }
    
    return true;
}

////////////////////////////////////////////////////////////////////////////////
function btnNext() {   
    var radioRType = $('input[name="radioRType"]:checked').val();
    
    switch (radioRType) {
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
    var radioRType = "";
    if ($('input:radio[name=radioRType]').is(':checked')) {
        radioRType = $('input[name="radioRType"]:checked').val();
    }
    
    localData_setPg3(radioRType);
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    
    resetResourceTypeToNull(radioRType);
    
    if (radioRType === "Personnel") {
        setLocalDataPersonnel(ResourceID);
    }
    else if (radioRType === "Facilities") {
        setLocalDataFacilities(ResourceID);
    }
    else if (radioRType === "Instructional") {
        setLocalDataInstructional(ResourceID);
    }
    else if (radioRType === "Technology") {
        setLocalDataTechnology(ResourceID);
    }
    else if (radioRType === "Other") {
        setLocalDataOther2(ResourceID);
    }
    
    if (sessionStorage.getItem('m3_prev_RType') === null) {
        sessionStorage.setItem('m3_prev_RType', radioRType);
    }
}

function setLocalDataPersonnel(ResourceID) {
    var result = new Array(new Array()); 
    $.ajax({
        type:"POST",
        url:"php/db_getPersonnel.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    if (result[0].length !== 0) {
        var title = "";
        var titleName = result[0][0];
        var range = result[0][1];
        var month = result[0][2];
        //var step = result[0][3];
        var hrswk = result[0][4];
        var annsalary = formatDollar(parseFloat(result[0][5]));
        var annbenefits = formatDollar(parseFloat(result[0][6]));
        var anntotal = formatDollar(parseFloat(result[0][7]));
        var impact = result[0][8];
        var strPTID = result[0][9];
        var PTID = Number(strPTID);
        var PID = result[0][10];
        var hr_rate = result[0][11];
        var new_pos = result[0][12];
        
        switch(PTID) {
            case 1:
                sessionStorage.setItem('m3_radioPType', "Classified Bargaining");
                if (new_pos === "") {
                    title = db_getSelectedCB_ID(titleName);
                }
                localData_setPg4_rtp_CB("Personnel", "Classified Bargaining", title, titleName, range, month, hrswk, annsalary, annbenefits, anntotal, impact, hr_rate, new_pos);
                sessionStorage.setItem('m1_PersonnelID', PID);
                break;
            case 2:
                sessionStorage.setItem('m3_radioPType', "Classified Management");
                if (new_pos === "") {
                    title = db_getSelectedCB_ID(titleName);
                }
                localData_setPg4_rtp_CM("Personnel", "Classified Management", title, titleName, range, month, hrswk, annsalary, annbenefits, anntotal, impact, hr_rate, new_pos);
                sessionStorage.setItem('m1_PersonnelID', PID);
                break;
            case 3:
                sessionStorage.setItem('m3_radioPType', "Short-Term Hourly");
                localData_setPg4_rtp_ST("Personnel", "Short-Term Hourly", title, range, month, hrswk, annsalary, annbenefits, anntotal, impact, hr_rate);
                sessionStorage.setItem('m1_PersonnelID', PID);
                break;
            default:
                break;
        }
    }
}

function setLocalDataFacilities(ResourceID) {
    var result = new Array(new Array()); 
    $.ajax({
        type:"POST",
        url:"php/db_getFacilities.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    if (result[0].length !== 0) {
        var itemreq = result[0][0];
        var location = result[0][1];
        var estamt = formatDollar(parseFloat(result[0][2]));
        var estdescrip = result[0][3];
        var alternative = result[0][4];
        var FacilitiesID = result[0][5];
        
        localData_setPg4_rtf(itemreq, location, estamt, estdescrip, alternative);
        sessionStorage.setItem('m1_FacilitiesID', FacilitiesID);
    }
}

function setLocalDataInstructional(ResourceID) {
    var result = new Array(new Array()); 
    $.ajax({
        type:"POST",
        url:"php/db_getInstructional.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    if (result[0].length !== 0) {
        var SchDiv = result[0][0];
        var Lifespan = result[0][1];
        var Description = result[0][2];
        var Qty = result[0][3];
        var Cost = formatDollar(parseFloat(result[0][4]));
        var Total = formatDollar(parseFloat(result[0][5]));
        var InstructionalID = result[0][6]; 
        
        localData_setPg4_rti(SchDiv, Lifespan, Description, Qty, Cost, Total);
        sessionStorage.setItem('m1_InstructionalID', InstructionalID);
    }
}

function setLocalDataTechnology(ResourceID) {
    setLocalDataTechnologyHeader(ResourceID);
    setLocalDataTechnologyItems(ResourceID);
}

function setLocalDataTechnologyHeader(ResourceID) {
    var result = new Array(new Array()); 
    $.ajax({
        type:"POST",
        url:"php/db_getTechnology.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    if (result[0].length !== 0) {
        var itemreq = result[0][0];
        var location = result[0][1];
        var asinfo = result[0][2];
        var hardtotal = formatDollar(parseFloat(result[0][3]));
        var mainttotal = formatDollar(parseFloat(result[0][4]));
        var taxtotal = formatDollar(parseFloat(result[0][5]));
        var softtotal = formatDollar(parseFloat(result[0][6]));
        var shiptotal = formatDollar(parseFloat(result[0][7]));
        var insttotal = formatDollar(parseFloat(result[0][8]));
        var addtotal = formatDollar(parseFloat(result[0][9]));
        var ttax = formatDollar(parseFloat(result[0][10]));
        var tnontax = formatDollar(parseFloat(result[0][11]));
        var grandtotal = formatDollar(parseFloat(result[0][12]));  
        var alter = result[0][13];
        var TechnologyID = result[0][14];
        
        localData_setPg4_rtt_header(itemreq, location, asinfo);
        localData_setPg4_rtt_summary(hardtotal, softtotal, insttotal, mainttotal, shiptotal, addtotal, taxtotal, ttax, tnontax, grandtotal, alter); 
        sessionStorage.setItem('m1_TechnologyID', TechnologyID);
    }
}

function setLocalDataTechnologyItems(ResourceID) {
    var result = new Array(new Array()); 
    $.ajax({
        type:"POST",
        url:"php/db_getTechnologyItems.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    if (result.length !== 0) {
        localData_setPg4_rtt_index(result.length);
        
        for(var i = 0; i < result.length; i++) { 
            var TypeID = "m4_te_Item_Type_" + (i + 1);
            var DescripID = "m4_te_Item_Descrip_" + (i + 1);
            var QtyID = "m4_te_Item_Qty_" + (i + 1);
            var CostID = "m4_te_Item_Cost_" + (i + 1);
            var TotalID = "m4_te_Item_Total_" + (i + 1);
            var MaintID = "m4_te_Item_Maint_" + (i + 1);
            var YrsID = "m4_te_Item_Yrs_" + (i + 1);
            var AnnCostID = "m4_te_Item_Ann_Cost_" + (i + 1);
            var MaintTotalID = "m4_te_Item_Maint_Total_" + (i + 1);
        
            var type = result[i][0];
            var idesc = result[i][1];
            var iqty = result[i][2];
            var icost = formatDollar(parseFloat(result[i][3]));
            var itotal = formatDollar(parseFloat(result[i][4]));
            var imaint = result[i][5];
            var iyrs = result[i][6];
            var ianncost = formatDollar(parseFloat(result[i][7]));
            var imainttotal = formatDollar(parseFloat(result[i][8]));
            
            localData_setPg4_rtt_worksheet(TypeID, type,
                                            DescripID, idesc,
                                            QtyID, iqty,
                                            CostID, icost,
                                            TotalID, itotal,
                                            MaintID, imaint,
                                            YrsID, iyrs,
                                            AnnCostID, ianncost,
                                            MaintTotalID, imainttotal); 
        }
    }
}

function setLocalDataOther2(ResourceID) {
    setLocalDataOther2Header(ResourceID);
    setLocalDataOther2Items(ResourceID);
}

function setLocalDataOther2Header(ResourceID) {
    var result = new Array(new Array()); 
    $.ajax({
        type:"POST",
        url:"php/db_getOther2.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    if (result[0].length !== 0) {
        var Description = result[0][0];  
        var TotalAmount = result[0][1];
        var strTotalAmount = "";
        if (TotalAmount > 0) {
            strTotalAmount = parseFloat(result[0][1]); 
        }
        var Other2ID = result[0][2];
        
        localData_setPg4_ot2(1, Description, strTotalAmount);
        sessionStorage.setItem('m1_Other2IDID', Other2ID);
    }
}

function setLocalDataOther2Items(ResourceID) {
    var strTotalAmount = sessionStorage.getItem('m4_ot2_Total_Amount');
    if (strTotalAmount !== "") {
        var result2 = new Array(new Array());
        $.ajax({
            type:"POST",
            url:"php/db_getOther2Items.php",
            data:{ResourceID:ResourceID},
            async: false,  
            success:function(data) {
                result2 = JSON.parse(data);
            }
        });

        if (result2.length !== 0) {
            sessionStorage.setItem('m4_ot2_Index', result2.length);
            for(var i = 0; i < result2.length; i++) { 
                var itemID = "m4_ot2_item_" + (i + 1);
                var qtyID = "m4_ot2_qty_" + (i + 1);
                var costID = "m4_ot2_cost_" + (i + 1); 
                var totalID = "m4_ot2_total_" + (i + 1);
                var Item = result2[i][0];
                var Qty = result2[i][1];
                var Cost = formatDollar(parseFloat(result2[i][2]));
                var Total = formatDollar(parseFloat(result2[i][3]));
                
                localData_setPg4_ot2_Items(itemID, Item, qtyID, Qty, costID, Cost, totalID, Total);
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
function resetResourceTypeToNull(radioRType) {
    var prev_RType = sessionStorage.getItem('m3_prev_RType');
    if (prev_RType !== null) {
        if (radioRType !== prev_RType) {            
            sessionStorage.removeItem('m1_PersonnelID');
            sessionStorage.removeItem('m1_FacilitiesID');
            sessionStorage.removeItem('m1_InstructionalID');
            sessionStorage.removeItem('m1_TechnologyID');
            sessionStorage.removeItem('m1_Other2IDID');
        }
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