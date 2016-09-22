var cc_list = new Array();
var fs_list = [];

var total_cost = "";
var resource_type = "";
var funding_src = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('#mod_questionnaire').modal('hide');
        $('#mod_dialog_box').modal('hide');

        $('#m6_CB_questionnaire').hide();
        $('#m6_attach_files').empty();
        hideWorkbookSection();
        
        if (sessionStorage.getItem("m6_submitted") !== null) {
            window.open('home.html', '_self');
        }
        else {
            getGeneralInfo();
            getResourceType();
            getWorksheet();
            getResourceFundSrc();
            getPlanning();
        }
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('#m6_home').click(function() {
        mod_updateResourceStep("Step5", "Page5");
        resetDraftLocalData();
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
        moveSelectedStepPage("General Info");
    });
    
    $('#pbar_resource_type').click(function() {
        moveSelectedStepPage("Resource Type");
    });
    
    $('#pbar_worksheet').click(function() {
        moveSelectedStepPage("Worksheet");
    });
    
    $('#pbar_funding_src').click(function() {
        moveSelectedStepPage("Funding Src");
    });
    
    $('#pbar_planning').click(function() {
        moveSelectedStepPage("Planning");
    });
    
    // questionnaire ///////////////////////////////////////////////////////////
    $("#m4_CB_quest_link").click(function(){
        $('#mod_questionnaire').modal('show');
    });
    
    ////////////////////////////////////////////////////////////////////////////
    $('#m6_back').click(function() {
        window.open('RFMain5.html', '_self');
    });
    
    $('#m6_print').click(function() {
        var prop_title = $('#m6_propTitle').html();
        $('#m6_title').html(prop_title);
        
        window.print();
    });
    
    $('#mod_dialog_box').on('hidden', function () {
        if ($('#mod_dialog_box_header').html() === "Complete") {
            window.open('home.html', '_self');
        }
        else {
            $("#m6_submit").prop("disabled", false);
        }
    });
    
    $('#m6_submit').click(function() {
        $("#m6_submit").prop("disabled", true);

        // only current submission year are allow to submit
        if ($('#m6_fiscal').html() !== getFiscalYear()) {
            $('#mod_dialog_box_header').html("Submission Year Not Allowed");
            $('#mod_dialog_box_body').html("Your request submission year are not allow to submit.<br>Only current submission year (" + getFiscalYear() + ") are allow to submit your request");
            $('#mod_dialog_box').modal('show');
            $("#m6_submit").prop("disabled", false);
            return false;
        }
        
        var login_name = sessionStorage.getItem('m1_loginName');
        var ResourceID = sessionStorage.getItem('m1_ResourceID');
        var resubmit = db_getBacktodraft(ResourceID);
        var current_date = new Date();
        var db_date = db_getEnableSubmitBtn();
        var a = db_date.split(" ");
        var d = a[0].split("-");
        var t = a[1].split(":");
        var enable_date = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
        
        if (current_date > enable_date && resubmit === null //disable all sent back to draft stage
                && login_name !== "Rich Kim" 
                && login_name !== "Bruce Hagan" 
                && login_name !== "stafftest") {
            
            $('#mod_dialog_box_header').html("Submitting Resource Request Expired");
            $('#mod_dialog_box_body').html("The current resource submission process has passed. Your request has been saved as draft.<br><br>Thank you");
            $('#mod_dialog_box').modal('show');
            $("#m6_submit").prop("disabled", false);
            return false;
        }
  
        var m6_RType = sessionStorage.getItem('m3_radioRType');
        var mFS_fs_3 = sessionStorage.getItem('mFS_fs_3');  // funding src: Basic Aid
        var mFS_fs_4 = sessionStorage.getItem('mFS_fs_4');  // funding src: Basic Skills Initiative
        
        mod_updateResourceStep("Step5", "Page5");
        submitToDB(resubmit);
        sendEmailToCreator();
        sendEmailToCC();
        sendEmailToApprover(m6_RType, mFS_fs_3);
        fundingSrcEmailNotification();
        
        // email notification for BSI
        if (mFS_fs_4 === "true") {
            db_insertResourceFSBSI(sessionStorage.getItem('m1_ResourceID'));
            sendEmailBSIFundingInstructionToCreator();
        }

        resetDraftLocalData();
        sessionStorage.setItem('m6_submitted', 'yes');
        
        $('#mod_dialog_box_header').html("Complete");
        $('#mod_dialog_box_body').html("Your request has been submitted successfully.<br><br>Thank you");
        $('#mod_dialog_box').modal('show');
    });
});

////////////////////////////////////////////////////////////////////////////////
function hideWorkbookSection() {
    $('#m6_personnel').hide();
    $('#m6_facilities').hide();
    $('#m6_instructional').hide();
    $('#m6_technology').hide();
    $('#m6_other2').hide();
}

////////////////////////////////////////////////////////////////////////////////
function getGeneralInfo() {   
    $("#m6_creatorName").append(sessionStorage.getItem("m1_creatorName"));
    $("#m6_creatorTitle").append(sessionStorage.getItem("m1_creatorTitle"));
    $("#m6_currentDate").append(sessionStorage.getItem("m1_currentDate"));
    $("#m6_fiscal").append(sessionStorage.getItem("m1_fiscal"));
    $("#m6_creatorDiv").append(sessionStorage.getItem("m1_creatorDiv"));
    $("#m6_cc").append(sessionStorage.getItem("m1_cc"));
    $("#m6_propTitle").append(sessionStorage.getItem("m1_propTitle"));
    $("#m6_needFor").append(sessionStorage.getItem("m1_needFor"));
    $("#m6_prog_info").append(sessionStorage.getItem("m1_prog_type"));
    $("#m6_need_by").append(sessionStorage.getItem("m1_need_by"));
    
    var onetime = sessionStorage.getItem("m1_one_time");
    if (onetime === "true") {
        $("#m6_one_time").append("One Time");
    }
    else {
        $("#m6_one_time").append("");
    }
}

////////////////////////////////////////////////////////////////////////////////
function getResourceType() {
    var resource = sessionStorage.getItem('m3_radioRType');
    $("#m6_RType").append(resource);
    resource_type = resource;
 
    if (resource === "Personnel") {
        var personnel = sessionStorage.getItem('m3_radioPType');
        $("#m6_RType").append(' (' + personnel + ')');
    }
}

////////////////////////////////////////////////////////////////////////////////
function getWorksheet() {
    var resource = sessionStorage.getItem('m3_radioRType');
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    
    switch (resource) {
        case "Personnel":
            $('#m6_personnel').show();
            getWorksheetPersonnel();
            break;
        case "Facilities":
            $('#m6_facilities').show();
            getWorksheetFacilities();
            break;
        case "Instructional":
            $('#m6_instructional').show();
            getWorksheetInstructional();
            break;
        case "Technology":
            $('#m6_technology').show();
            getWorksheetTechnology();
            break;
        case "Other":
            $('#m6_other2').show();
            getWorksheetOther2();
            break;
        default:
            break;
    }
    
    setAttachedFiles(ResourceID, resource);
}

////////////////////////////////////////////////////////////////////////////////
function getWorksheetPersonnel() {
    var personal_type = "";
    var rtp = sessionStorage.getItem('m3_radioPType');
    
    if (rtp === "Classified Bargaining") {
        var new_pos = sessionStorage.getItem("m4_rtp_CB_new_pos");
        if (new_pos === "") {
            $("#m6_personnel_position").append(getCBTitle(sessionStorage.getItem("m4_rtp_CB_title")));
        }
        else {
            $("#m6_personnel_position").append(sessionStorage.getItem("m4_rtp_CB_titleName"));
            $("#m6_new_position").append(sessionStorage.getItem("m4_rtp_CB_new_pos"));
        }

        personal_type = "_CB_";
        $('#m6_CB_questionnaire').show();
        getCBQuestionnaire();
    }
    else if (rtp === "Classified Management") {
        var new_pos = sessionStorage.getItem("m4_rtp_CM_new_pos");
        if (new_pos === "") {
            $("#m6_personnel_position").append(getCMTitle(sessionStorage.getItem("m4_rtp_CM_title")));
        }
        else {
            $("#m6_personnel_position").append(sessionStorage.getItem("m4_rtp_CM_titleName"));
            $("#m6_new_position").append(sessionStorage.getItem("m4_rtp_CM_new_pos"));
        }
        
        personal_type = "_CM_";
    }
    else {
        $("#m6_personnel_position").append(sessionStorage.getItem("m4_rtp_ST_title"));
        personal_type = "_ST_";
    }
    
    $("#m6_personnel_Range").append(sessionStorage.getItem("m4_rtp" + personal_type + "range"));
    $("#m6_personnel_Month").append(sessionStorage.getItem("m4_rtp" + personal_type + "month"));
    $("#m6_personnel_annual_cost").append(sessionStorage.getItem("m4_rtp" + personal_type + "annual_cost"));
    $("#m6_personnel_hrs").append(sessionStorage.getItem("m4_rtp" + personal_type + "hrs"));
    $("#m6_personnel_benefit_cost").append(sessionStorage.getItem("m4_rtp" + personal_type + "benefit_cost"));
    $("#m6_personnel_total_cost").append(sessionStorage.getItem("m4_rtp" + personal_type + "total_cost"));
    $("#m6_personnel_describe").append(sessionStorage.getItem("m4_rtp" + personal_type + "describe"));
    $("#m6_hr_rate").append(sessionStorage.getItem("m4_rtp" + personal_type + "hr_rate"));
    
    total_cost = sessionStorage.getItem("m4_rtp" + personal_type + "total_cost");
}

function getCBQuestionnaire() {    
    $('#mod_quest_field1').html(sessionStorage.getItem('m4_rtp_CB_quest_field1')).trigger('autosize.resize');
    $('#mod_quest_field2').html(sessionStorage.getItem('m4_rtp_CB_quest_field2')).trigger('autosize.resize');
    $('#mod_quest_field3').html(sessionStorage.getItem('m4_rtp_CB_quest_field3')).trigger('autosize.resize');
    $('#mod_quest_field4').html(sessionStorage.getItem('m4_rtp_CB_quest_field4')).trigger('autosize.resize');
    $('#mod_quest_field5').html(sessionStorage.getItem('m4_rtp_CB_quest_field5')).trigger('autosize.resize');
    $('#mod_quest_field6').html(sessionStorage.getItem('m4_rtp_CB_quest_field6')).trigger('autosize.resize');
    $('#mod_quest_field7').html(sessionStorage.getItem('m4_rtp_CB_quest_field7')).trigger('autosize.resize');
    $('#mod_quest_field8').html(sessionStorage.getItem('m4_rtp_CB_quest_field8')).trigger('autosize.resize');
    $('#mod_quest_field9').html(sessionStorage.getItem('m4_rtp_CB_quest_field9')).trigger('autosize.resize');
    $('#mod_quest_field10').html(sessionStorage.getItem('m4_rtp_CB_quest_field10')).trigger('autosize.resize');
    $('#mod_quest_field11').html(sessionStorage.getItem('m4_rtp_CB_quest_field11')).trigger('autosize.resize');
    $('#mod_quest_field12').html(sessionStorage.getItem('m4_rtp_CB_quest_field12')).trigger('autosize.resize');
    $('#mod_quest_field13').html(sessionStorage.getItem('m4_rtp_CB_quest_field13')).trigger('autosize.resize');
    $('#mod_quest_field14').html(sessionStorage.getItem('m4_rtp_CB_quest_field14')).trigger('autosize.resize');
}

function getCBTitle(CBID) {
    var result = new Array(new Array());
    $.ajax({
        type:"POST",
        url:"php/getCBTitle.php",
        data:{CBID:CBID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    if (result[0].length !== 0) {
        return result[0][0];
    }
    else {
        return "";
    }
}

function getCMTitle(CMID) {
    var result = new Array(new Array());
    $.ajax({
        type:"POST",
        url:"php/getCMTitle.php",
        data:{CMID:CMID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    if (result[0].length !== 0) {
        return result[0][0];
    }
    else {
        return "";
    }
}

////////////////////////////////////////////////////////////////////////////////
function getWorksheetFacilities() {
    $("#m6_fa_Item_Req").append(sessionStorage.getItem("m4_rtf_Item_Req"));
    $("#m6_fa_Location").append(sessionStorage.getItem("m4_rtf_Location"));
    $("#m6_fa_Est_Amt").append(sessionStorage.getItem("m4_rtf_Est_Amt"));
    $("#m6_fa_Est_Descrip").append(sessionStorage.getItem("m4_rtf_Est_Descrip"));
    $("#m6_fa_alt").append(sessionStorage.getItem("m4_rtf_fa_alt"));
    
    total_cost = sessionStorage.getItem("m4_rtf_Est_Amt");
} 

////////////////////////////////////////////////////////////////////////////////
function getWorksheetInstructional() {
    $("#m6_ie_sch_div").append(sessionStorage.getItem("m4_rti_Sch_Div"));
    $("#m6_ie_ex_life").append(sessionStorage.getItem("m4_rti_Ex_Life"));
    $("#m6_ie_descrip").append(sessionStorage.getItem("m4_rti_Descrip"));
    $("#m6_ie_qty").append(sessionStorage.getItem("m4_rti_Qty"));
    $("#m6_ie_cost").append(sessionStorage.getItem("m4_rti_Cost"));
    $("#m6_ie_total").append(sessionStorage.getItem("m4_rti_Total"));
    
    total_cost = sessionStorage.getItem("m4_rti_Total");
}

////////////////////////////////////////////////////////////////////////////////
function getWorksheetTechnology() {
    getTechHeader();
    getTechItems();
    getTechSummary();
}

function getTechHeader() {
    $("#m6_te_Item_Req").append(sessionStorage.getItem("m4_rtt_Item_Req"));
    $("#m6_te_Location").append(sessionStorage.getItem("m4_rtt_Location"));
    $("#m6_te_Additional").append(sessionStorage.getItem("m4_rtt_Additional"));
}

function getTechItems() {
    var tech_index = Number(sessionStorage.getItem("m4_rtt_index"));
    
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
        
        var tbody = setItemHTML(itemType, itemDescrip, itemQty, itemCost, itemTotal, itemMaint, itemYrs, itemAnnCost, itemMaintTotal);
        $("#m6_te_section").append(tbody);
    }
}

function getTechSummary() {
    $('#m6_te_Hardware_Total').append(sessionStorage.getItem('m4_rtt_Hardware_Total'));
    $('#m6_te_Software_Total').append(sessionStorage.getItem('m4_rtt_Software_Total'));
    $('#m6_te_Installation_Total').append(sessionStorage.getItem('m4_rtt_Installation_Total'));
    
    $('#m6_te_Maintenance_Total').append(sessionStorage.getItem('m4_rtt_Maintenance_Total'));
    $('#m6_te_Shipping_Total').append(sessionStorage.getItem('m4_rtt_Shipping_Total'));
    $('#m6_te_Additional_Total').append(sessionStorage.getItem('m4_rtt_Additional_Total'));
    
    $('#m6_te_Tax_Total').append(sessionStorage.getItem('m4_rtt_Tax_Total'));
    $('#m6_te_Total_Taxable').append(sessionStorage.getItem('m4_rtt_Total_Taxable'));
    $('#m6_te_Total_Nontaxable').append(sessionStorage.getItem('m4_rtt_Total_Nontaxable'));
    
    $('#m6_te_Grand_Total').append(sessionStorage.getItem('m4_rtt_Grand_Total'));
    $('#m6_te_alt').append(sessionStorage.getItem('m4_rtt_alt'));
    
    total_cost = sessionStorage.getItem('m4_rtt_Grand_Total');
}

function setItemHTML(itemType, itemDescrip, itemQty, itemCost, itemTotal, itemMaint, itemYrs, itemAnnCost, itemMaintTotal) {
    var tbody = "<div class='row'>";
    tbody += "<div class='span3' style='padding-top: 5px; font-style: italic'>" + itemDescrip + "</div>";  
    tbody += "<div class='span1 text-center' style='padding-top: 5px; font-style: italic'>" + itemQty + "</div>";
    tbody += "<div class='span1 text-right' style='padding-top: 5px; font-style: italic'>" + itemCost + "</div>";
    tbody += "<div class='span2 text-right' style='padding-top: 5px; font-style: italic'>" + itemTotal + "</div>";
    tbody += "<div class='span1 text-center' style='padding-top: 5px; font-style: italic'>" + itemMaint + "</div>";
    tbody += "<div class='span1 text-center' style='padding-top: 5px; font-style: italic'>" + itemYrs + "</div>";
    tbody += "<div class='span1 text-right' style='padding-top: 5px; font-style: italic'>" + itemAnnCost + "</div>";
    tbody += "<div class='span2 text-right' style='padding-top: 5px; font-style: italic'>" + itemMaintTotal + "</div>";
    tbody += "</div>";    
    
    return tbody;
}

////////////////////////////////////////////////////////////////////////////////
function getWorksheetOther2() {    
    $("#m6_ot2_descrip").append(sessionStorage.getItem("m4_ot2_Description"));
    $("#m6_ot2_total_amount").append(sessionStorage.getItem("m4_ot2_Total_Amount"));
    total_cost = sessionStorage.getItem("m4_ot2_Total_Amount");
    
    if (sessionStorage.getItem("m4_ot2_Total_Amount") !== "") {
        var tbody = "<div class='row'>&nbsp;</div><div class='row'>";
        tbody += "<div class='span7' style='font-style: italic'>Item Description</div>";  
        tbody += "<div class='span1 text-center' style='font-style: italic'>Qty</div>";
        tbody += "<div class='span1 text-right' style='font-style: italic'>Cost</div>";
        tbody += "<div class='span2 text-right' style='font-style: italic'>Total</div>";
        tbody += "</div>"; 
        tbody += "<div class='row' style='padding-bottom: 10px'>";
        tbody += "<div class='span12 text-center' style='background-color: gray'></div>";
        tbody += "</div>";
        $("#m6_ot2_section").append(tbody);
        
        var other2_index = Number(sessionStorage.getItem("m4_ot2_Index"));
        
        for (var i = 1; i <= other2_index; i++) {
            var itemID = "m4_ot2_item_" + i;
            var qtyID = "m4_ot2_qty_" + i;
            var costID = "m4_ot2_cost_" + i; 
            var totalID = "m4_ot2_total_" + i;
            var item = sessionStorage.getItem(itemID);
            var qty = sessionStorage.getItem(qtyID);
            var cost = sessionStorage.getItem(costID);
            var total = sessionStorage.getItem(totalID);
            
            var tbody2 = setOther2ItemHTML(item, qty, cost, total);
            $("#m6_ot2_section").append(tbody2);
        }
    } 
}

function setOther2ItemHTML(item, qty, cost, total) {
    var tbody = "<div class='row'>";
    tbody += "<div class='span7' style='padding-top: 5px; font-style: italic'>" + item + "</div>";  
    tbody += "<div class='span1 text-center' style='padding-top: 5px; font-style: italic'>" + qty + "</div>";
    tbody += "<div class='span1 text-right' style='padding-top: 5px; font-style: italic'>" + cost + "</div>";
    tbody += "<div class='span2 text-right' style='padding-top: 5px; font-style: italic'>" + total + "</div>";
    tbody += "</div>";    
    
    return tbody;
}

////////////////////////////////////////////////////////////////////////////////
function setAttachedFiles(ResourceID, RType) {
    var attach_files = new Array();
    attach_files = db_getAttachFiles(ResourceID, RType);
    if (attach_files.length > 0) {
        var attach_file_header = "<div class='row' style='padding-bottom: 10px'>";
        attach_file_header += "<div class='span12 text-center' style='background-color: gray'><font color='white'>Attached Files</font></div></div>";
        $('#m6_attach_files').append(attach_file_header);
        
        for (var i = 0; i < attach_files.length; i++) {
            var fl_name = attach_files[i][0];
            var f_name = attach_files[i][1];
            var at_html = setAttachFileHTML(fl_name, f_name);
            $('#m6_attach_files').append(at_html);
        }
        
        var attach_file_footer = "<div class='row' style='padding-bottom: 10px'><div class='span12 text-center'></div></div>";
        $('#m6_attach_files').append(attach_file_footer);
    }
}

function setAttachFileHTML(file_link_name, file_name) {
    var html = "<div class='span8' style='padding-top: 5px'><a href='attach_files/" + file_link_name + "' target='_blank'>" + file_name + "</a></div>";
    
    return html;
}

////////////////////////////////////////////////////////////////////////////////
function getResourceFundSrc() {   
    var result = new Array();
    result = db_getFundSrcTypeAll();
    var bfs_note = true;
    
    if (sessionStorage.getItem('mFS_fs_1') === "true") {        
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_1') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_1").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_2') === "true") {        
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_2') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_2").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_3') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_3') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_3").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_4') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_4') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_4").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_5') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_5') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_5").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_6') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_6') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_6").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_7') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_7') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_7").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_8') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_8') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_8").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_9') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_9') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_9").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_10') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_10') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_10").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_11') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_11') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_11").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_12') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_12') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_12").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_13') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_13') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_13").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_14') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_14') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_14").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_15') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_15') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_15").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_16') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_16') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_16").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_17') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_17') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_17").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_18') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_18') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_18").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_19') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_19') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_19").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_20') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_20') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_20").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_21') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_21') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_21").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_22') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_22') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_22").prop('checked', true);
    }
    if (sessionStorage.getItem('mFS_fs_23') === "true") {
        for (var i = 0; i < result.length; i++) {
            if (result[i]['FundSrcCol'] === 'fs_23') {
                if (fs_list.length === 0) {
                    var ar_fs = new Array();
                    ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                    fs_list.push(ar_fs);
                }
                else {
                    var fs_update = false;
                    for (var j = 0; j < fs_list.length; j++) {
                        if (fs_list[j][1] === result[i]['FundSrcEmail']) {
                            fs_list[j][2] += ", " + result[i]['FundSrcType'];
                            fs_update = true;
                            break;
                        }
                    }
                    if (!fs_update) {
                        var ar_fs = new Array();
                        ar_fs.push(result[i]['FundSrcAdmin'], result[i]['FundSrcEmail'], result[i]['FundSrcType']);
                        fs_list.push(ar_fs);
                    }
                }
                
                funding_src += result[i]['FundSrcType'] + ", ";
                break;
            }
        }
        
        bfs_note = false;
        $("#fs_23").prop('checked', true);
    }
    
    $('#fund_source_comments').html(sessionStorage.getItem('mFS_fs_comments'));
    
    if (bfs_note) {
        var fs_note_html = "<div class='row-fluid'><div class='span12 text-center' style='padding-top: 5px; font-style: italic; font-weight: bold;'>No Funding Source Selected</div></div>";
        $('#fs_msg').append(fs_note_html);
    }
}

////////////////////////////////////////////////////////////////////////////////
function getPlanning() {
    var index = sessionStorage.getItem("m5_index");
    
    for (var i = 1; i <= index; i++) {
        var objID = "m5_objective_" + i;
        var goalID = "m5_goal_" + i;
        var impactID = "m5_impact_" + i;
        
        var obj = sessionStorage.getItem(objID);
        var goal = sessionStorage.getItem(goalID);
        var impact = sessionStorage.getItem(impactID);
        
        getPlanning_append(i, obj, goal, impact);
    }
}

function getPlanning_append(index, obj, goal, impact) {
    var tbody = "";
    var main = "m6_main_" + index;
    
    tbody += "<div class='row-fluid' id='" + main + "'>";
    tbody += "<div class='span4'>";
    tbody += "<div class='row-fluid'>";
    tbody += "<div class='span12' style='padding-top: 5px; font-style: italic'>" + obj + "</div>";
    tbody += "</div>";
    tbody += "<div class='row-fluid'>";
    tbody += "<div class='span12' style='padding-top: 5px; font-style: italic'>" + goal + "</div>";
    tbody += "</div>";
    tbody += "</div>";
    tbody += "<div class='span8'>";
    tbody += "<div class='span12' style='padding-top: 5px; font-style: italic'>" + impact + "</div>";
    tbody += "</div>";
    tbody += "</div>";
    
    $("#m6_planning").append(tbody);
}

////////////////////////////////////////////////////////////////////////////////
function submitToDB(resubmit) {  
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    var LoginName = sessionStorage.getItem('m1_loginName');
    var RType = sessionStorage.getItem('m3_radioRType');
    if (RType === "Personnel") {
        RType = sessionStorage.getItem('m3_radioPType');
    }
    
    var CreatorName = sessionStorage.getItem('m1_creatorName');
    var CreatorEmail = sessionStorage.getItem('m1_creatorEmail');
    var CreatorTitle = sessionStorage.getItem('m1_creatorTitle');
    var creatorDiv = sessionStorage.getItem('m1_creatorDiv');
    
    var appName = sessionStorage.getItem('m1_creatorAppName');
    var appEmail = sessionStorage.getItem('m1_creatorAppEmail');
    var appTitle = sessionStorage.getItem('m1_creatorAppTitle');
    var appDiv = sessionStorage.getItem('m1_creatorAppDiv');
    
    var ApproverID = 0;
    var ReviewID = 0;
    var RSID = 0;
    var StageLevelID = 0;

    if (CreatorTitle.indexOf("Vice Pres") !== -1 || CreatorTitle.indexOf("President") !== -1 || CreatorTitle.indexOf("Dean") !== -1 || CreatorTitle.indexOf("Director") !== -1) {
        ApproverID = mod_AddApprover(CreatorName, CreatorEmail, CreatorTitle, creatorDiv);
    }
    else {
        ApproverID = mod_AddApprover(appName, appEmail, appTitle, appDiv);
    }
    
    if (RType === "Facilities") {
        StageLevelID = 2;
        RSID = 8;
        ReviewID = 29;
    }
    else if (RType === "Technology") {
        StageLevelID = 1;
        RSID = 7;
        ReviewID = 1;
    }
    else {
        if (CreatorTitle.indexOf("Vice Pres") !== -1) {
            StageLevelID = 4;
            RSID = 10;
        }
        else if (CreatorTitle.indexOf("President") !== -1) {
            StageLevelID = 5;
            RSID = 11;
        }
        else {
            StageLevelID = 3;
            RSID = 9;
        }
        ReviewID = ApproverID;
    }
    
//    var resubmit = sessionStorage.getItem('m1_enable_resubmit');
    if (resubmit === "1") {
        db_deleteBacktodraft(ResourceID);
    }
   
    updateRFStatus(ResourceID, RSID, ApproverID);
    db_updateRFSubmissionDate(ResourceID);
    db_insertResourceStage(ResourceID, StageLevelID, ReviewID, RSID);
    
    db_insertPriority(ResourceID, -1, -1, -1, -1, -1, -1, -1, -1, -1);
    
    // insert mgr level rating
    db_insertrateMgr(ResourceID, ApproverID, true);
    db_insertrateVPP(ResourceID, ApproverID, true);
//    db_insertrateUser(ResourceID);
    
    // insert committee rating
    db_insertrateAll(ResourceID);
    db_insertrateAPTC(ResourceID);
    db_insertrateBDRPC(ResourceID);
    db_insertrateCHPLDTF(ResourceID);
    db_insertrateIEC(ResourceID);
    db_insertrateSPAC(ResourceID);
    db_insertrateSSAMMO(ResourceID);
    
    // insert resource review period
    var cur_date = new Date();
    var cur_mon = cur_date.getMonth() + 1;
    var cur_day = cur_date.getDate();
    var result = db_getReviewPeriodID("1900-" + cur_mon + "-" + cur_day);
    if (result.length !== 0) {
        var rp_id = result[0]['ReviewPeriodID'];
        db_insertResourceRP(ResourceID, rp_id);
    }

    var note = LoginName + " submitted";
    db_insertTransactions(ResourceID, LoginName, note);
    
    // creator and approver has same dean/director title: email notification to Davit
    if ((CreatorTitle.indexOf("Dean") !== -1 || CreatorTitle.indexOf("Director") !== -1) && (appTitle.indexOf("Dean") !== -1 || appTitle.indexOf("Director") !== -1)) {
        sendEmailToDavitForDuplicateMgrTitle();
    }
}

function fundingSrcEmailNotification() {
    for (var i = 0; i < fs_list.length; i++) {
        if (fs_list[i][2] === "Basic Skills Initiative") {
            continue;
        }
        sendEmailToFundingAdmin(fs_list[i][0], fs_list[i][1], fs_list[i][2]);
    }
}

// send email //////////////////////////////////////////////////////////////////
function sendEmailToCreator() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    var Email = sessionStorage.getItem('m1_creatorEmail');
    var Name = sessionStorage.getItem('m1_creatorName');
    var RFTitle = sessionStorage.getItem('m1_propTitle');
    
    var str_url = location.href;
    str_url = str_url.replace("RFMain6.html", "ViewResourceForm.html?resource_id=" + ResourceID + "");
    
    var Subject = RFTitle + " has been submitted";
    var Message = "Dear " + Name + ",<br/><br/>";
    Message += "The resource request form, titled <strong>" + RFTitle + "</strong> has been successfully submitted.<br/>";    
    Message += "Please use the link below to review the status of your submission at any time.<br/><br/>";
    Message += "<a href='" + str_url + "'>" + RFTitle + "</a><br/><br/>";
    Message += "Should you have any questions or comments, please contact the office of Fiscal Services.<br/><br/>";
    Message += "Thank you.<br/><br/>";
    Message += "IVC Fiscal Services<br/>";
    Message += "IVCFiscal@ivc.edu<br/>";
    Message += "x5326";
    
    proc_sendEmail(Email, Name, Subject, Message);
}

function sendEmailToCC() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    var RFTitle = sessionStorage.getItem('m1_propTitle');

    cc_list.length = 0;
    cc_list = db_getCC(ResourceID);
    if (cc_list.length > 0) {
        for (var i = 0; i < cc_list.length; i++) {
            var cc_name = cc_list[i][0];
            var cc_email = cc_list[i][1];
            
            var str_url = location.href;
            str_url = str_url.replace("RFMain6.html", "ViewResourceForm.html?resource_id=" + ResourceID + "");

            var Subject = RFTitle + " has been CC to you";
            var Message = "Dear " + cc_name + ",<br/><br/>";
            Message += "Resource request <strong>" + RFTitle + "</strong> has been submitted with you listed to receive a <strong>copy</strong>. ";
            Message += "In order to review the submission, please click on the link below and log in.<br/><br/>";
            Message += "<a href='" + str_url + "'>" + RFTitle + "</a><br/><br/>";
            Message += "Should you have any questions or comments, please contact the office of Fiscal Services.<br/><br/>";
            Message += "Thank you.<br/><br/>";
            Message += "IVC Fiscal Services<br/>";
            Message += "IVCFiscal@ivc.edu<br/>";
            Message += "x5326";
            
            proc_sendEmail(cc_email, cc_name, Subject, Message);
        }
    }
}

function sendEmailToApprover(m6_RType, mFS_fs_3) {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    var appEmail = sessionStorage.getItem('m1_creatorAppEmail');
    var appName = sessionStorage.getItem('m1_creatorAppName');
    var RFTitle = sessionStorage.getItem('m1_propTitle');
    var description = sessionStorage.getItem("m1_needFor");
    
    var Subject = RFTitle + " has been assigned to you";
    var Message = "Dear " + appName + ",<br/><br/>";
    Message += "The resource request form, titled <strong>" + RFTitle + "</strong> has been submitted.<br/><br/>";
    Message += "You can review the resource request now by clicking the link below and instructions on the rating process are available at ";
    Message += "<a href='http://inside.ivc.edu/committees/SPOBDC/General%20Documents/Resource%20Request%20Rating%20Process.pdf'>Rating Process Instruction</a><br><br>";
    if (m6_RType === "Facilities" || m6_RType === "Technology") {
        Message += "This email is to alert you of the submission and will undergo a review by Technology Serivces/Facilities before it will appears in your queue of approval.<br/><br/>";
        Message += "Note: After all of the resource request forms have been submitted you will receive a seperate notification to review all of the requests assigned to you in a list form.<br/><br/>";
    }
    
    var str_url = location.href;
    str_url = str_url.replace("RFMain6.html", "ViewResourceForm.html?resource_id=" + ResourceID + "");

    Message += "Description: <strong>" + description.replace(/\n/g, "</br>") + "</strong><br><br>";
    Message += "<a href='" + str_url + "'>" + RFTitle + "</a><br/>";
    Message += "Costs: <strong>" + total_cost + "</strong><br>";
    
    if (funding_src !== "") {
        var funding = funding_src.substring(0, funding_src.length - 2);
        Message += "Please work with the submitter and their supervisor, <strong>" + appName + "</strong> to validate the resource form can be funded by the <strong>" + funding + "</strong> fund(s) ";
        Message += "Note that the funding source in the resource request form can only be updated by the supervisor.<br><br>";
    }
    
    Message += "Should you have any questions or comments, please contact the office of Fiscal Services.<br/><br/>";
    Message += "Thank you.<br/><br/>";
    Message += "IVC Fiscal Services<br/>";
    Message += "IVCFiscal@ivc.edu<br/>";
    Message += "x5326";
    
    var ccEmail = "";
    var ccName = "";
    if (m6_RType === "Technology") {
        ccEmail = "bhagan@ivc.edu";
        ccName = "Bruce Hagan";
    }
    else if (m6_RType === "Facilities") {
        ccEmail = "jhurlbut@ivc.edu";
        ccName = "Jeffrey Hurlbut";
    }
    
    proc_sendEmailWithCC(appEmail, appName, ccEmail, ccName, Subject, Message);
}

function sendEmailToFundingAdmin(name, email, funding) {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    var creator = sessionStorage.getItem('m1_creatorName');
    var approver = sessionStorage.getItem('m1_creatorAppName');
    var RFTitle = sessionStorage.getItem('m1_propTitle');
    var description = sessionStorage.getItem("m1_needFor");
    
    var str_url = location.href;
    str_url = str_url.replace("RFMain6.html", "ViewResourceForm.html?resource_id=" + ResourceID + "");
    
    var Subject = "Resource Form Funding Source Notification";
    var Message = "Dear " + name + ",<br/><br/>";
    Message += "Please be advised that a new resource form, titled <strong>" + RFTitle + "</strong> has been submitted by <strong>" + creator + "</strong>. ";
    Message += "You have been identified as the funding admin for <strong>" + funding + "</strong> funding source(s). ";
    Message += "Please review the information below for details to ensure the funding source can be considered for this resource request.<br><br>";
    Message += "<a href='" + str_url + "'>" + RFTitle + "</a><br/>";
    Message += "Costs: <strong>" + total_cost + "</strong><br>";
    Message += "Description: <strong>" + description.replace(/\n/g, "</br>") + "</strong><br><br>";
    Message += "Please work with the submitter and their supervisor, <strong>" + approver + "</strong> to validate the resource form can be funded by the <strong>" + funding + "</strong> fund(s) ";
    Message += "Note that the funding source in the resource request form can only be updated by the supervisor.<br><br>";
    
    Message += "Should you have any questions or comments, please contact the office of Fiscal Services.<br/><br/>";
    Message += "Thank you.<br/><br/>";
    Message += "IVC Fiscal Services<br/>";
    Message += "IVCFiscal@ivc.edu<br/>";
    Message += "x5326";
    
    proc_sendEmail(email, name, Subject, Message);
}

function sendEmailToDavitForDuplicateMgrTitle() {
    var email = "dkhachatryan@ivc.edu";
    var name = "Davit Khachatryan";
    var creator_name = sessionStorage.getItem('m1_creatorName');
    var creator_title = sessionStorage.getItem('m1_creatorTitle');
    var approver_name = sessionStorage.getItem('m1_creatorAppName');
    var approver_title = sessionStorage.getItem('m1_creatorAppTitle');
    var RFTitle = sessionStorage.getItem('m1_propTitle');
    
    var Subject = "Creator and Approver has same Dean/Director Title";
    var Message = "Dear " + name + ",<br/><br/>";
    Message += "Please be advised that a new resource form, titled <strong>" + RFTitle + "</strong> has been submitted by <strong>" + creator_name + "</strong><br>";
    Message += "This request required manually change Mgr rating approver because creator manager also Dean/Director<br>";
    Message += "Current Mgr rating set to creator. please change Mgr rating approver to below approver<br><br>";
    Message += "Creator Name: " + creator_name + "<br>";
    Message += "Creator Title: " + creator_title + "<br>";
    Message += "Approver Name: " + approver_name + "<br>";
    Message += "Approver Title: " + approver_title + "<br>";
    
    proc_sendEmail(email, name, Subject, Message);
}

function sendEmailBSIFundingInstructionToCreator() {
    var Email = sessionStorage.getItem('m1_creatorEmail');
    var Name = sessionStorage.getItem('m1_creatorName');
    var RFTitle = sessionStorage.getItem('m1_propTitle');
    
    var result = new Array();
    result = db_getFundSrcType("fs_4");
    var fs_admin_name = result[0]['FundSrcAdmin'];
    var fs_admin_email = result[0]['FundSrcEmail'];
    var fs_type = result[0]['FundSrcType'];
    var str_url = location.href;
    str_url = str_url.replace("RFMain6.html", "/doc/BSI_Funding_Request_Supplemental_Form.pdf");
    
    var Subject = "BSI Request Form";
    var Message = "Dear " + Name + ",<br/><br/>";
    Message += "Your resource request titled <b>" + RFTitle + "</b> has " + fs_type + " as a possible funding source.<br>";
    Message += "Please complete the PDF form <a href='" + str_url + "'>BSI Funding Request Form Fall 2015</a> send back to " + fs_admin_name + " at " + fs_admin_email + ".<br>";
    Message += "If you have any questions about completing the form, the funding source can help to answer your question.<br><br>";
    
    Message += "Thank you.<br><br>";
    Message += "IVC Fiscal Services<br>";
    Message += "IVCFiscal@ivc.edu<br>";
    Message += "x5326";
    
    proc_sendEmailWithCC(Email, Name, fs_admin_email, fs_admin_name, Subject, Message);
}

////////////////////////////////////////////////////////////////////////////////
function revertDollar(amount) {
    var result = 0;
    
    if(amount !== "") {
        amount = amount.replace("$", "");
        amount = amount.replace(/\,/g,'');
        result = parseFloat(amount);
    }
    
    return result;
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

////////////////////////////////////////////////////////////////////////////////
//function startSpin() {
//    spinner.spin(target);
//}
//
//function stopSpin() {
//    spinner.stop();
//}