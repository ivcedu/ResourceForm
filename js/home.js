var sel_facilites_id = "";
var sel_facilities_approver_id = "";

var sel_tech_id = "";
var sel_tech_approver_id = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        var loginName = sessionStorage.getItem('m1_loginName');
        $('#logn_name').text('Welcome ' + loginName);
        $('#mod_popup_cancel').modal('hide');
        
        // administrator button
        $('#show_admin').hide();
        $('#show_master').hide();        
        $('#h_cc_block').hide();
        
        // hide resource list
        $("#h_RFList").empty();
        $("#h_cc_list").empty();
        
        setAdminOption();
        getLoginUserRFList();
        getCCUserRFList();
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() { 
    $('#new_request').click(function() {
        resetDraftLocalData();
        deadlinePastNotification();
        window.open('RFMain.html', '_self');
    });

    $('#nav_master').click(function() {
        window.open('masterPage.html', '_self');
    });
    
    $('#nav_committee_rating').click(function() {
        if (!isMemberOfCommittee()) {
            alert("You are not a member of any committee");
        }
        else {
            window.open('committeeRating.html', '_self');
        }
    });
    
    $('#nav_mgr_worksheet').click(function() {
        window.open('administrator.html', '_self');
    });
    
    $('#logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
    });
    
    // navigation reports //////////////////////////////////////////////////////
    $('#rpt_dashboard').click(function() {
        window.open('homer/rptDashboard.html', '_self');
    });
    
    $('#rpt_committee_report').click(function() {
        window.open('rptCommitteeReport.html', '_self');
    });
    
    $('#rpt_asivc_report').click(function() {
        window.open('rptASIVCReport.html', '_self');
    });
    
    $('#rpt_all_rf_list').click(function() {
        window.open('rptAllRFList.html', '_self');
    });
    
    // RF list /////////////////////////////////////////////////////////////////
    $('#h_RFList').on('mouseover', 'a[id^="ptitle_brief_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("ptitle_brief_", "");
        var ptitle_full = $('#ptitle_full_' + ID).html();
        
        $(this).popover({trigger:"manual", content:ptitle_full, placement:'top'});
        $(this).popover('toggle');
    });
    
    $('#h_RFList').on('mouseleave', 'a[id^="ptitle_brief_"]', function() {
        $(this).popover('hide');
    });
    
    $('#h_RFList').on('click', 'a', function() {        
        var str_currentId = $(this).attr('id');
        var currentId = str_currentId.replace("ptitle_brief_", "");
        var currentStatus = $('#' + currentId + '_status').html();
        
        if (currentStatus !== "Draft") {
            sessionStorage.setItem('vrf_resource_id', currentId);
            window.open('ViewResourceForm.html?resource_id=' + currentId, '_blank');
        }
        else {
            $('#modal_footer_default').show();
            $('#modal_footer_facilities_review').hide();
            $('#modal_footer_tech_review').hide();
            
            openDraftResourceForm(currentId);
            selectedRFBackToDraft(currentId);
        }
    });
    
    $("#h_cc_list").on('click', 'a', function() {        
        var currentId = $(this).attr('id');

        sessionStorage.setItem('vrf_resource_id', currentId);
        window.open('ViewResourceForm.html?resource_id=' + currentId, '_blank');
    });       
    
    // delete resource form ////////////////////////////////////////////////////
    $(document).on('click', 'button[id^="btn_delete_RF_"]', function() {
        var currentId = $(this).attr('id');
        var ID = currentId.replace("btn_delete_RF_", "");
        sessionStorage.setItem('m1_ResourceID', ID);
        $('#mod_popup_cancel').modal('show');
    });
    
    $('#mod_cancel_yes').click(function() {
//        var ResourceID = sessionStorage.getItem('m1_ResourceID');
//        var data = db_getResourceStep(ResourceID);
//        setDraftLocalData(data[0][0]);
        
        deleteAttachFileByResourceID();
        mod_deleteResource();
        
        $("#h_RFList").empty();
        getLoginUserRFList();
    });
});

////////////////////////////////////////////////////////////////////////////////
function setAdminOption() {        
    var LoginEmail = sessionStorage.getItem("m1_loginEmail");
    var ApproverID = db_getApproverID(LoginEmail);
    
    if (ApproverID !== null) {
        $('#show_admin').show();
        if (LoginEmail === "ykim160@ivc.edu" || LoginEmail === "bhagan@ivc.edu") {
            $('#show_master').show();
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
function getLoginUserRFList() {
    var loginEmail = sessionStorage.getItem('m1_loginEmail');
    
    var result = new Array(); 
    result = db_getLoginUserRFList(loginEmail);
    
    $("#h_RFList").empty();
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            var str_totalAmount = "";
            var f_totalAmount = parseFloat(result[i][4]);
            if (f_totalAmount > 0) {
                str_totalAmount = formatDollar(f_totalAmount);
            }
            setResourceFormList(result[i][0], result[i][1], result[i][2], result[i][3], str_totalAmount, result[i][5]);
        }
    }
}

function setResourceFormList(ResourceID, PTile, RType, RStatus, TotalAmount, LinkNum) {
    var ptitle_brief = textTruncate(35, PTile);
    
    var tbody = "<div class='row'>";
    tbody += "<div class='span4'><a data-toggle='modal' href=# id='ptitle_brief_" + ResourceID +  "'>" + ptitle_brief + "</a></div>"; 
    tbody += "<div class='span1 text-left'>" + LinkNum + "</div>"; 
    tbody += "<div class='span2'>" + RType + "</div>";  
    tbody += "<div class='span2' id='" + ResourceID + "_status'>" + RStatus + "</div>";
    tbody += "<div class='span2 text-right'>" + TotalAmount + "</div>";
    if (RStatus === "Draft") {
        tbody += "<div class='span1 text-center'><button class='btn btn-mini' id='btn_delete_RF_" + ResourceID + "'><i class='icon-trash icon-black'></i></button></div>";
    }
    else {
        tbody += "<div class='span1 text-center'></div>";
    }
    tbody += "<div class='span1' style='display: none;' id='ptitle_full_" + ResourceID + "'>" + PTile + "</div>";
    tbody += "</div>";
    
    $("#h_RFList").append(tbody);
}

////////////////////////////////////////////////////////////////////////////////
function getCCUserRFList() {
    var loginEmail = sessionStorage.getItem('m1_loginEmail');
    
    var result = new Array(new Array()); 
    result = db_getCCUserRFList(loginEmail);
    
    $("#h_cc_list").empty();
    if (result.length !== 0) {
        $('#h_cc_block').show();
  
        for(var i = 0; i < result.length; i++) { 
            var str_totalAmount = "";
            var f_totalAmount = parseFloat(result[i][4]);
            if (f_totalAmount > 0) {
                str_totalAmount = formatDollar(f_totalAmount);
            }
            setCCResourceFormList(result[i][0], result[i][1], result[i][2], result[i][3], str_totalAmount, result[i][5]);
        }
    }
}

function setCCResourceFormList(ResourceID, PTile, RType, RStatus, TotalAmount, Creator) {
    var ptitle_brief = textTruncate(35, PTile);
    
    var tbody = "<div class='row'>";
    tbody += "<div class='span4'><a data-toggle='modal' href=# id='" + ResourceID +  "'>" + ptitle_brief + "</a></div>"; 
    tbody += "<div class='span2'>" + RType + "</div>";  
    tbody += "<div class='span2' id='" + ResourceID + "_status'>" + RStatus + "</div>";
    tbody += "<div class='span2 text-right'>" + TotalAmount + "</div>";
    tbody += "<div class='span2'>" + Creator + "</div>";
    tbody += "<div class='span1' style='display: none;' id='cc_ptitle_full_" + ResourceID + "'>" + PTile + "</div>";
    tbody += "</div>";
    
    $("#h_cc_list").append(tbody);
}

////////////////////////////////////////////////////////////////////////////////
function setGeneralInfo(ResourceID) {
    var result = new Array(new Array()); 
    $.ajax({
        type:"POST",
        url:"php/db_getResource.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    if (result[0].length !== 0) {
        var rtype = result[0][7];
        $('#m_gi_name').html(result[0][0]);
        $('#m_gi_title').html(result[0][1]);
        $('#m_gi_division').html(result[0][2]);
        $('#m_gi_date').html(result[0][3]);
        $('#m_gi_fiscal').html(result[0][4]);
        $('#m_gi_prog_type').html(result[0][10]);
        $('#m_gi_proposal').html(result[0][5]);
        $('#m_gi_needfor').html(result[0][6]);
        $('#m_rtype').html(result[0][7]);
        $('#m_gi_one_time').html((result[0][11] === "1" ? "One Time" : ""));
    }
    
    return rtype;
}

function setCCList(ResourceID) {
    var result = new Array(new Array());
    result = db_getCC(ResourceID);
    
    var cc_list = "";
    if (result.length !== 0) {  
        for(var i = 0; i < result.length; i++) {
            cc_list += result[i][0] + "; ";
        }
    }
    
    $('#m_gi_cc').html(cc_list);
}

////////////////////////////////////////////////////////////////////////////////
function openDraftResourceForm(ResourceID) {
    resetDraftLocalData(); 
    getResourceByID(ResourceID);
    setResourceLinkList();
    getCCList(ResourceID);
    
    var data = db_getResourceStep(ResourceID);
    setDraftLocalData(data[0][0]);
    var html_page = setDraftPage(data[0][1]);
        
    window.location.href = html_page;
}

function getResourceByID(ResourceID) {
    var result = new Array(new Array()); 
    $.ajax({
        type:"POST",
        url:"php/db_getResource.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    if (result[0].length !== 0) {
        var creatorName = result[0][0];
        var creatorTitle = result[0][1];
        var creatorDiv = result[0][2];
        var currentDate = result[0][3];
        var fiscal = result[0][4];
        var proposal = result[0][5];
        var needFor = result[0][6];
        var CreatorID = result[0][9];
        var ProgramType = result[0][10];
        var onetime = (result[0][11] === "1" ? "true" : "false");
        var need_by = result[0][12];
        var creatorEmail = result[0][13];
        
        var result2 = new Array();
        result2 = getUserManagerInfo(creatorEmail);
        if (result2.length !== 0) {
            var creatorEmail = result2[1];
            var appName = result2[4];
            var appEmail = result2[5];
            var appTitle = result2[6];
            var appDivision = result2[7];
        }
        
        localData_setPg(creatorName, creatorEmail, creatorTitle, currentDate, fiscal, creatorDiv, "", proposal, needFor, ProgramType, onetime, need_by);
        localData_setPg_Approver(appName, appEmail, appTitle, appDivision);
        sessionStorage.setItem('m1_ResourceID', ResourceID); 
    }
}

function getUserManagerInfo(searchUserEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        datatype:"json",
        url:"php/searchUser.php",
        data:{searchUserEmail:searchUserEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function getCCList(ResourceID) {
    var result = new Array(new Array());
    result = db_getCC(ResourceID);
    
    var cc_list = "";
    if (result.length !== 0) {  
        for(var i = 0; i < result.length; i++) {
            cc_list += result[i][0] + "; ";
        }
    }
    
    sessionStorage.setItem('m1_cc', cc_list);
}

function setDraftLocalData(step) {
    switch (step) {
        case "Step2":
            setLocalDataStep2();
            break;
        case "Step3":
            setLocalDataStep2();
            setLocalDataStep3();
            break;
        case "StepFS":
            setLocalDataStep2();
            setLocalDataStep3();
            setLocalDataStepFS();
            break;
        case "Step4": case "Step5":
            setLocalDataStep2();
            setLocalDataStep3();
            setLocalDataStepFS();
            setLocalDataStep4();
            break;
        default:
            break;
    }
}

function setLocalDataStep2() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    var rtype = db_getResourceTypeItem(ResourceID);
    var RTID = db_getResourceType(rtype);    

    sessionStorage.setItem('m1_RTID', RTID);
    if (rtype === "Classified Bargaining" || rtype === "Classified Management" || rtype === "Short-Term Hourly") {
        rtype = "Personnel";
    }
    
    sessionStorage.setItem('m3_prev_RType', rtype);
    localData_setPg3(rtype);
}

function setLocalDataStep3() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    var strRTID = sessionStorage.getItem('m1_RTID');
    var RTID = Number(strRTID);
    
    if (RTID === 10) {
        RTID = setLocalDataPersonnel2(ResourceID);
    }
    
    switch (RTID) {
        // personnel
        case 1: case 2: case 3:
            setLocalDataPersonnel(ResourceID);
            if (RTID === 1) {
                setLocalDataCBQuestionnaire(ResourceID);
                sessionStorage.setItem('m3_prev_RType', "Classified Bargaining");
            }
            else if (RTID === 2) {
                sessionStorage.setItem('m3_prev_RType', "Classified Management");
            }
            else {
                sessionStorage.setItem('m3_prev_RType', "Short-Term Hourly");
            }
            break;
        // facilities
        case 4:
            setLocalDataFacilities(ResourceID);
            break;
        // instructional equipment
        case 9:
            setLocalDataInstructional(ResourceID);
            break;
        // technology
        case 5:
            setLocalDataTechnology(ResourceID);
            break;
        // other
        case 7:
            setLocalDataOther2(ResourceID);
            break;
        default:
            break;
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
                localData_setPg4_rtp_ST("Personnel", "Short-Term Hourly", titleName, range, month, hrswk, annsalary, annbenefits, anntotal, impact, hr_rate);
                sessionStorage.setItem('m1_PersonnelID', PID);
                break;
            default:
                break;
        }
    }
}

function setLocalDataPersonnel2(ResourceID) {
    var PersonnelTypeID = 10;
    
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
        var strPTID = result[0][9];
        var PTID = Number(strPTID);
        PersonnelTypeID = PTID;
    }
    
    return PersonnelTypeID;
}

function setLocalDataCBQuestionnaire(ResourceID) {
    var attach_files = new Array();
    attach_files = db_getCBQuestionnaire(ResourceID);
    if (attach_files.length > 0) {
        var field1 = attach_files[0][0];
        var field2 = attach_files[0][1];
        var field3 = attach_files[0][2];
        var field4 = attach_files[0][3];
        var field5 = attach_files[0][4];
        var field6 = attach_files[0][5];
        var field7 = attach_files[0][6];
        var field8 = attach_files[0][7];
        var field9 = attach_files[0][8];
        var field10 = attach_files[0][9];
        var field11 = attach_files[0][10];
        var field12 = attach_files[0][11];
        var field13 = attach_files[0][12];
        var field14 = attach_files[0][13];
        
        localData_setPg4_rtp_CB_quest_fields(field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11, field12, field13, field14);
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
            strTotalAmount = formatDollar(parseFloat(result[0][1])); 
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

function setLocalDataStepFS() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    var result = new Array();
    result = db_getResourceFundSrc(ResourceID);
    
    if (result.length !== 0) {
        var fs_1 = (result[0]['fs_1'] === "1" ? true : false);
        var fs_2 = (result[0]['fs_2'] === "1" ? true : false);
        var fs_3 = (result[0]['fs_3'] === "1" ? true : false);
        var fs_4 = (result[0]['fs_4'] === "1" ? true : false);
        var fs_5 = (result[0]['fs_5'] === "1" ? true : false);
        var fs_6 = (result[0]['fs_6'] === "1" ? true : false);
        var fs_7 = (result[0]['fs_7'] === "1" ? true : false);
        var fs_8 = (result[0]['fs_8'] === "1" ? true : false);
        var fs_9 = (result[0]['fs_9'] === "1" ? true : false);
        var fs_10 = (result[0]['fs_10'] === "1" ? true : false);
        var fs_11 = (result[0]['fs_11'] === "1" ? true : false);
        var fs_12 = (result[0]['fs_12'] === "1" ? true : false);
        var fs_13 = (result[0]['fs_13'] === "1" ? true : false);
        var fs_14 = (result[0]['fs_14'] === "1" ? true : false);
        var fs_15 = (result[0]['fs_15'] === "1" ? true : false);
        var fs_16 = (result[0]['fs_16'] === "1" ? true : false);
        var fs_17 = (result[0]['fs_17'] === "1" ? true : false);
        var fs_18 = (result[0]['fs_18'] === "1" ? true : false);
        var fs_19 = (result[0]['fs_19'] === "1" ? true : false);
        var fs_20 = (result[0]['fs_20'] === "1" ? true : false);
        var fs_21 = (result[0]['fs_21'] === "1" ? true : false);
        var fs_22 = (result[0]['fs_22'] === "1" ? true : false);
        var fs_23 = (result[0]['fs_23'] === "1" ? true : false);
        var fs_comments = result[0]['fs_comments'];
        
        localData_setPgFundSrc(fs_1, fs_2, fs_3, fs_4, fs_5, fs_6, fs_7, fs_8, fs_9, fs_10, fs_11, fs_12, fs_13, fs_14, fs_15, fs_16, fs_17, fs_18, fs_19, fs_20, fs_21, fs_22, fs_23, fs_comments);
        sessionStorage.setItem('m1_ResourceFundSrc', true);
    }
}

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

function setDraftPage(page) {
    var html_page = "home.html";
    var strRTID = sessionStorage.getItem('m1_RTID');
    var RTID = Number(strRTID);
    
    switch (page) {
        case "Page1":
            html_page = "RFMain.html";
            break;
        case "Page2":
            html_page = "RFMain3.html";
            break;
        case "Page3":
            switch (RTID) {
                case 1: case 2: case 3:
                    html_page = "RFMain4Personnel.html";
                    break;
                case 4:
                    html_page = "RFMain4Facilities.html";
                    break;
                case 9:
                    html_page = "RFMain4Instructional.html";
                    break;
                case 5:
                    html_page = "RFMain4Technology.html";
                    break;
                case 7:
                    html_page = "RFMain4Other2.html";
                    break;
                default:
                    break;
            }
            break;
        case "PageFS":
            html_page = "fundingSrc.html";
            break;
        case "Page4":
            html_page = "RFMain5.html";
            break;
        case "Page5":
            html_page = "RFMain6.html";
            break;
        default:
            break;
    }
    
    return html_page;
}

////////////////////////////////////////////////////////////////////////////////
function setResourceLinkList() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    var Resource_Parent_ID = db_getResourceLinkByResourceID(ResourceID);
    
    if (Resource_Parent_ID !== null) {
        sessionStorage.setItem('m1_Resource_ParentID', Resource_Parent_ID);
    }
    else {
        sessionStorage.setItem('m1_Resource_ParentID', '0');
    }
}

////////////////////////////////////////////////////////////////////////////////
function selectedRFBackToDraft(ResourceID) {
    var resubmit = db_getBacktodraft(ResourceID);
    if (resubmit === "1") {
        sessionStorage.setItem('m1_enable_resubmit', 'Yes');
    }
    else {
        sessionStorage.setItem('m1_enable_resubmit', 'No');
    }
}

////////////////////////////////////////////////////////////////////////////////
function deadlinePastNotification() {
    var current_date = new Date();
    var db_date = db_getEnableSubmitBtn();
    var a = db_date.split(" ");
    var d = a[0].split("-");
    var t = a[1].split(":");
    var enable_date = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
    if (current_date > enable_date)  {
        alert("NOTE: The deadline has past for submitting resource requests. You can still proceed to create a new request and save it as a draft. Once the next cycle opens up you will be able submit your request.");
    }
}

////////////////////////////////////////////////////////////////////////////////
function isMemberOfCommittee() {
    var login_email = sessionStorage.getItem('m1_loginEmail');
    if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu" || login_email === "dkhachatryan@ivc.edu") {
        return true;
    }
    
    var result_1 = new Array(); 
    result_1 = db_getmbrCHPLDTF(login_email, false);
    var result_2 = new Array(); 
    result_2 = db_getmbrSSAMMO(login_email, false);
    var result_3 = new Array(); 
    result_3 = db_getmbrAPTC(login_email, false);
    var result_4 = new Array(); 
    result_4 = db_getmbrBDRPC(login_email, false);
    var result_5 = new Array(); 
    result_5 = db_getmbrIEC(login_email, false);
    var result_6 = new Array(); 
    result_6 = db_getmbrSPAC(login_email, false);
    
    if (result_1.length === 0 && result_2.length === 0 && result_3.length === 0 && result_4.length === 0 && result_5.length === 0 && result_6.length === 0) {
        return false;
    }
    else {
        return true;
    }
}