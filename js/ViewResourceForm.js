////////////////////////////////////////////////////////////////////////////////
var sel_resource_id = "";
var sel_t_amt = "";
var cc_list = new Array();

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {        
        hideWorkbookSection();
        $('#vrf_attach_files').empty();
        $('#m6_CB_questionnaire').hide();
        
        sel_resource_id = sessionStorage.getItem("vrf_resource_id");
        getURLParameters();
        
        var rtype = getGeneralInfo(sel_resource_id);
        setCCList(sel_resource_id);
        getWorksheet(sel_resource_id, rtype);
        getPlanning(sel_resource_id);
        getResourceFundSrc(sel_resource_id);
        getApprovedAmount(sel_resource_id);
        getTransaction(sel_resource_id);
    }
    else {
        var url_str = "http://services.ivc.edu/ResourceForm/ViewResourceForm.html" + location.search;
        sessionStorage.setItem('ss_rf_url_param', url_str);
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
function getURLParameters() {
    var searchStr = location.search;
    var searchArray = new Array();
    while (searchStr!=='') {
        var name, value;
        // strip off leading ? or &
        if ((searchStr.charAt(0)==='?')||(searchStr.charAt(0)==='&')) {
            searchStr = searchStr.substring(1,searchStr.length);
        }
        // find name
        name = searchStr.substring(0,searchStr.indexOf('='));
        // find value
        if (searchStr.indexOf('&')!==-1) {
            value = searchStr.substring(searchStr.indexOf('=')+1,searchStr.indexOf('&'));
        }
        else {
            value = searchStr.substring(searchStr.indexOf('=')+1,searchStr.length);
        }
        // add pair to an associative array
        value = value.replace("%20", " ");
        searchArray[name] = value;
        // cut first pair from string
        if (searchStr.indexOf('&')!==-1) {
            searchStr =  searchStr.substring(searchStr.indexOf('&')+1,searchStr.length);
        }
        else {
            searchStr = '';
        }
    }
    
    sel_resource_id = searchArray['resource_id'];
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('#nav_print').click(function() {
        window.print();
    });
    
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
    });
});

////////////////////////////////////////////////////////////////////////////////
function hideWorkbookSection() {
    $('#vrf_personnel').hide();
    $('#vrf_facilities').hide();
    $('#vrf_instructional').hide();
    $('#vrf_technology').hide();
    $('#vrf_other2').hide();
}

////////////////////////////////////////////////////////////////////////////////
function getGeneralInfo(ResourceID) {   
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
        $('#vrf_creatorName').html(result[0][0]);
        $('#vrf_creatorTitle').html(result[0][1]);
        $('#vrf_creatorDiv').html(result[0][2]);
        $('#vrf_currentDate').html(result[0][3]);
        $('#vrf_fiscal').html(result[0][4]);
        $('#vrf_prog_info').html(result[0][10]);
        $('#vrf_propTitle').html(result[0][5]);
        $('#vrf_needFor').html(result[0][6]);
        var new_resource = db_getResourceTypeItemNew(sel_resource_id);
        $('#vrf_RType').html(new_resource);
        $('#vrf_one_time').html((result[0][11] === "1" ? "One Time" : ""));
        $('#vrf_need_by').html(result[0][12]);
        
        $('#vrf_title').html(result[0][5]);
        $('#vrf_header_title').html(result[0][5]);
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
    
    $('#vrf_cc').html(cc_list);
}

////////////////////////////////////////////////////////////////////////////////
function getWorksheet(sel_resource_id, rtype) {    
    switch(rtype) {
        case "Classified Bargaining":
        case "Classified Management": 
        case "Short-Term Hourly":
            $('#vrf_personnel').show();
            setWSPersonnel(sel_resource_id);
            if (rtype === "Classified Bargaining") {
                $('#vrf_CB_questionnaire').show();
                setLocalDataCBQuestionnaire(sel_resource_id);
            }
            else {
                $('#vrf_CB_questionnaire').hide();
            }
            setAttachedFiles(sel_resource_id, "Personnel");
            getFundingSrc(sel_resource_id);
            break;
        case "Facilities":
            $('#vrf_facilities').show();
            setWSFacilities(sel_resource_id);
            setAttachedFiles(sel_resource_id, rtype);
            getFundingSrc(sel_resource_id);
            break;
        case "Instructional":
            $('#vrf_instructional').show();
            setWSInstructional(sel_resource_id);
            setAttachedFiles(sel_resource_id, rtype);
            getFundingSrc(sel_resource_id);
            break;
        case "Technology":
            $('#vrf_technology').show();
            setWSTechnology(sel_resource_id);
            setAttachedFiles(sel_resource_id, rtype);
            getFundingSrc(sel_resource_id);
            break;
        case "Other":
            $('#vrf_other2').show();
            setWSOther2(sel_resource_id);
            setAttachedFiles(sel_resource_id, rtype);
            getFundingSrc(sel_resource_id);
            break;
        default:
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////
function setWSPersonnel(ResourceID) {
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
        $('#vrf_personnel_position').html(result[0][0]);
        $('#vrf_new_position').html(result[0][12]);
        $('#vrf_personnel_Range').html(result[0][1]);
        $('#vrf_personnel_Month').html(result[0][2]);
        $('#vrf_personnel_hrs').html(result[0][4]);
        $('#vrf_personnel_annual_cost').html(formatDollar(parseFloat(result[0][5])));
        $('#vrf_personnel_benefit_cost').html(formatDollar(parseFloat(result[0][6])));
        $('#vrf_personnel_total_cost').html(formatDollar(parseFloat(result[0][7])));
        $('#vrf_personnel_describe').html(result[0][8]);
        $('#vrf_hr_rate').html(result[0][11]);
        
        sel_t_amt = formatDollar(parseFloat(result[0][7]));
    }
}

function setLocalDataCBQuestionnaire(ResourceID) {
    var questionnaire = new Array();
    questionnaire = db_getCBQuestionnaire(ResourceID);
    if (questionnaire.length > 0) {        
        $('#mod_quest_field1').html(questionnaire[0][0]);
        $('#mod_quest_field2').html(questionnaire[0][1]);
        $('#mod_quest_field3').html(questionnaire[0][2]);
        $('#mod_quest_field4').html(questionnaire[0][3]);
        $('#mod_quest_field5').html(questionnaire[0][4]);
        $('#mod_quest_field6').html(questionnaire[0][5]);
        $('#mod_quest_field7').html(questionnaire[0][6]);
        $('#mod_quest_field8').html(questionnaire[0][7]);
        $('#mod_quest_field9').html(questionnaire[0][8]);
        $('#mod_quest_field10').html(questionnaire[0][9]);
        $('#mod_quest_field11').html(questionnaire[0][10]);
        $('#mod_quest_field12').html(questionnaire[0][11]);
        $('#mod_quest_field13').html(questionnaire[0][12]);
        $('#mod_quest_field14').html(questionnaire[0][13]);
    }
}

////////////////////////////////////////////////////////////////////////////////
function setWSFacilities(ResourceID) {
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
        $('#vrf_fa_Item_Req').html(result[0][0]);
        $('#vrf_fa_Location').html(result[0][1]);
        $('#vrf_fa_Est_Amt').html(formatDollar(parseFloat(result[0][2])));
        $('#vrf_fa_Est_Descrip').html(result[0][3]);
        $('#vrf_fa_Proj_Amt').html(formatDollar(parseFloat(result[0][6])));
        $('#vrf_fa_Proj_Descrip').html(result[0][7]);
        $('#vrf_fa_alt').html(result[0][4]);
        
        sel_t_amt = formatDollar(parseFloat(result[0][2]));
    }
}

////////////////////////////////////////////////////////////////////////////////
function setWSInstructional(ResourceID) {
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
        $('#vrf_ie_sch_div').html(result[0][0]);
        $('#vrf_ie_ex_life').html(result[0][1]);
        $('#vrf_ie_descrip').html(result[0][2]);
        $('#vrf_ie_qty').html(result[0][3]);
        $('#vrf_ie_cost').html(formatDollar(parseFloat(result[0][4])));
        $('#vrf_ie_total').html(formatDollar(parseFloat(result[0][5])));
        
        sel_t_amt = formatDollar(parseFloat(result[0][5]));
    }
}

////////////////////////////////////////////////////////////////////////////////
function setWSTechnology(ResourceID) {
    setTechnology(ResourceID);
    setTechnologyItems(ResourceID);
}

function setTechnology(ResourceID) {
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
        $('#vrf_te_Item_Req').html(result[0][0]);
        $('#vrf_te_Location').html(result[0][1]);
        $('#vrf_te_Additional').html(result[0][2]);
        $('#vrf_te_Hardware_Total').html(formatDollar(parseFloat(result[0][3])));
        $('#vrf_te_Maintenance_Total').html(formatDollar(parseFloat(result[0][4])));
        $('#vrf_te_Tax_Total').html(formatDollar(parseFloat(result[0][5])));
        $('#vrf_te_Software_Total').html(formatDollar(parseFloat(result[0][6])));
        $('#vrf_te_Shipping_Total').html(formatDollar(parseFloat(result[0][7])));
        $('#vrf_te_Installation_Total').html(formatDollar(parseFloat(result[0][8])));
        $('#vrf_te_Additional_Total').html(formatDollar(parseFloat(result[0][9])));
        $('#vrf_te_Total_Taxable').html(formatDollar(parseFloat(result[0][10])));
        $('#vrf_te_Total_Nontaxable').html(formatDollar(parseFloat(result[0][11])));
        $('#vrf_te_Grand_Total').html(formatDollar(parseFloat(result[0][12])));
        $('#vrf_te_alt').html(result[0][13]);
        
        sel_t_amt = formatDollar(parseFloat(result[0][12]));
    }
}

function setTechnologyItems(ResourceID) {
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
    
    if (result[0].length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            var idesc = result[i][1];
            var iqty = result[i][2];
            var icost = formatDollar(parseFloat(result[i][3]));
            var itotal = formatDollar(parseFloat(result[i][4]));
            var imaint = result[i][5];
            var iyrs = result[i][6];
            var ianncost = formatDollar(parseFloat(result[i][7]));
            var imainttotal = formatDollar(parseFloat(result[i][8]));
            
            var tbody = setItemHTML(idesc, iqty, icost, itotal, imaint, iyrs, ianncost, imainttotal);
            $("#vrf_te_section").append(tbody);
        }
    }
}

function setItemHTML(itemDescrip, itemQty, itemCost, itemTotal, itemMaint, itemYrs, itemAnnCost, itemMaintTotal) {
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
function setWSOther2(ResourceID) {
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
        var strTotalAmount = "";
        var TotalAmount = parseFloat(result[0][1]);    
        sel_t_amt = formatDollar(parseFloat(result[0][1]));
        
        if (TotalAmount > 0) {
            strTotalAmount = formatDollar(TotalAmount);
            setOther2HeaderHTML(Description, strTotalAmount);
            
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
            
            if (result2[0].length !== 0) {                
                for(var i = 0; i < result2.length; i++) { 
                    var Item = result2[i][0];
                    var Qty = result2[i][1];
                    var Cost = formatDollar(parseFloat(result2[i][2]));
                    var Total = formatDollar(parseFloat(result2[i][3]));
                    setOther2ItemHTML(Item, Qty, Cost, Total);
                }
            }
        }
        else {
            setOther2HeaderHTML(Description, strTotalAmount);         
        }
    }
}

function setOther2HeaderHTML(Description, TotalAmount) {
    $('#vrf_ot2_descrip').html(Description);
    $('#vrf_ot2_total_amount').html(TotalAmount);
}

function setOther2ItemHTML(Item, Qty, Cost, Total) {
    var tbody = "<div class='row-fluid'>";  
    tbody += "<div class='span5'>" + Item + "</div>";
    tbody += "<div class='span1 text-center'>" + Qty + "</div>";
    tbody += "<div class='span3 text-right'>" + Cost + "</div>";
    tbody += "<div class='span3 text-right'>" + Total + "</div>";
    tbody += "</div>";
    
    $('#vrf_ot2_section').append(tbody);
}

////////////////////////////////////////////////////////////////////////////////
function setAttachedFiles(ResourceID, RType) {
    var attach_files = new Array();
    attach_files = db_getAttachFiles(ResourceID, RType);
    if (attach_files.length > 0) {
        for (var i = 0; i < attach_files.length; i++) {
            var fl_name = attach_files[i][0];
            var f_name = attach_files[i][1];
            var at_html = setAttachFileHTML(fl_name, f_name);
            $('#vrf_attach_files').append(at_html);
        }
    }
}

function getFundingSrc(ResourceID) {
    var result = new Array(new Array()); 
    result = db_getFundingSrc(ResourceID);
    
    if (result.length !== 0) {
        var perkins = (result[0][1] === "1" ? "Perkins" : "");
        var bsi = (result[0][2] === "1" ? "BSI" : "");
        
        if (perkins !== "") {            
            getMgrAttachment(ResourceID, perkins);
        }
        else if (bsi !== "") {            
            getMgrAttachment(ResourceID, bsi);
        }
    }
}

function getMgrAttachment(ResourceID, FundingSrc) {
    var result = new Array();
    if (FundingSrc === "Perkins") {
        result = db_getPerkinsAttach(ResourceID);
    }
    else {
        result = db_getBSIAttach(ResourceID);
    }
    
    if (result.length !== 0) {         
        var file_link = result[0][0];
        var file_name = result[0][1];
        
        var header_html = "<div class='row'><div class='span12 text-center' style='border-bottom: 1px solid;'>Perkins / BSI Questionnaire Attachment</div></div>";
        $("#vrf_attach_files").append(header_html);
        
        var mod_html = setAttachFileHTML(file_link, file_name);
        $("#vrf_attach_files").append(mod_html);
        $("#vrf_attach_files").append("<div class='row'>&nbsp;</div>");
    }
}

function setAttachFileHTML(file_link_name, file_name) {
    var html = "<div class='row'><div class='span12'><a href='attach_files/" + file_link_name + "' target='_blank'>" + file_name + "</a></div></div>";
    
    return html;
}

////////////////////////////////////////////////////////////////////////////////
function getPlanning(ResourceID) {
    $('#vrf_planning').empty();
    
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
        for(var i = 0; i < result.length; i++) { 
            var objective = result[i][0];
            var goal = result[i][1];
            var description = result[i][2];
            setPlanningHTML(objective, goal, description);
        }
    }
}

function setPlanningHTML(objective, goal, description) {
    var tbody = "<div class='row-fluid'>";
    tbody += "<div class='span4'>";
    tbody += "<div class='row-fluid'>";
    tbody += "<div class='span12'>" + objective + "</div>";
    tbody += "</div>";
    tbody += "<div class='row-fluid'>";
    tbody += "<div class='span12'>" + goal + "</div>";
    tbody += "</div>";
    tbody += "</div>";
    tbody += "<div class='span8'>";
    tbody += "<div class='span12'>" + description + "</div>";
    tbody += "</div>";
    tbody += "</div>";
    
    $('#vrf_planning').append(tbody);
}

////////////////////////////////////////////////////////////////////////////////
function getTransaction(ResourceID) {
    $('#vrf_transaction').html("");
    
    var note_list = new Array(); 
    note_list = db_getTransactions(ResourceID);
    
    var html = "";
    if (note_list.length !== 0) {
        for(var i = 0; i < note_list.length; i++) { 
            var db_note = note_list[i][2];
            var html_note = db_note.replace(/\n/g, "</br>");
            html += note_list[i][0] + "</br>" + html_note + "</br></br>";
        }
    }
   
    $('#vrf_transaction').html(html);
}

////////////////////////////////////////////////////////////////////////////////
function htmlAmount(amount) {
    if (amount > 0) {
        return formatDollar(amount);
    }
    else {
        return "";
    }
}

function getApprovedAmount(ResourceID) {
    var result = new Array(); 
    result = db_getApprovedAmount(ResourceID);
    
    $('#vrf_approved_request_amt').html(sel_t_amt);
//    if (result.length === 1) {
//        $('#vrf_approved_approved_amt').html(htmlAmount(Number(result[0]['TotalAmount'])));
//    }
}

function getResourceFundSrc(ResourceID) {
    var result = new Array(); 
    result = db_getResourceFundSrc(ResourceID);
    var bfs_note = true;
    
    if (result.length === 1) {
        if (result[0]['fs_1'] === "1") {
            bfs_note = false;
            $("#fs_1").prop('checked', true);
        }
        if (result[0]['fs_2'] === "1") {
            bfs_note = false;
            $("#fs_2").prop('checked', true);
        }
        if (result[0]['fs_3'] === "1") {
            bfs_note = false;
            $("#fs_3").prop('checked', true);
        }
        if (result[0]['fs_4'] === "1") {
            bfs_note = false;
            $("#fs_4").prop('checked', true);
        }
        if (result[0]['fs_5'] === "1") {
            bfs_note = false;
            $("#fs_5").prop('checked', true);
        }
        if (result[0]['fs_6'] === "1") {
            bfs_note = false;
            $("#fs_6").prop('checked', true);
        }
        if (result[0]['fs_7'] === "1") {
            bfs_note = false;
            $("#fs_7").prop('checked', true);
        }
        if (result[0]['fs_8'] === "1") {
            bfs_note = false;
            $("#fs_8").prop('checked', true);
        }
        if (result[0]['fs_9'] === "1") {
            bfs_note = false;
            $("#fs_9").prop('checked', true);
        }
        if (result[0]['fs_10'] === "1") {
            bfs_note = false;
            $("#fs_10").prop('checked', true);
        }
        if (result[0]['fs_11'] === "1") {
            bfs_note = false;
            $("#fs_11").prop('checked', true);
        }
        if (result[0]['fs_12'] === "1") {
            bfs_note = false;
            $("#fs_12").prop('checked', true);
        }
        if (result[0]['fs_13'] === "1") {
            bfs_note = false;
            $("#fs_13").prop('checked', true);
        }
        if (result[0]['fs_14'] === "1") {
            bfs_note = false;
            $("#fs_14").prop('checked', true);
        }
        if (result[0]['fs_15'] === "1") {
            bfs_note = false;
            $("#fs_15").prop('checked', true);
        }
        if (result[0]['fs_16'] === "1") {
            bfs_note = false;
            $("#fs_16").prop('checked', true);
        }
        if (result[0]['fs_17'] === "1") {
            bfs_note = false;
            $("#fs_17").prop('checked', true);
        }
        if (result[0]['fs_18'] === "1") {
            bfs_note = false;
            $("#fs_18").prop('checked', true);
        }
        if (result[0]['fs_19'] === "1") {
            bfs_note = false;
            $("#fs_19").prop('checked', true);
        }
        if (result[0]['fs_20'] === "1") {
            bfs_note = false;
            $("#fs_20").prop('checked', true);
        }
        if (result[0]['fs_21'] === "1") {
            bfs_note = false;
            $("#fs_21").prop('checked', true);
        }
        if (result[0]['fs_22'] === "1") {
            bfs_note = false;
            $("#fs_22").prop('checked', true);
        }
        if (result[0]['fs_23'] === "1") {
            bfs_note = false;
            $("#fs_23").prop('checked', true);
        }
        $('#fund_source_comments').html(getResourceFundSrcLog(ResourceID, result[0]['fs_comments']));
    }
    
    if (bfs_note) {
        var fs_note_html = "<div class='row-fluid'><div class='span12 text-center' style='padding-top: 5px; font-style: italic; font-weight: bold;'>No Funding Source Selected</div></div>";
        $('#fs_msg').append(fs_note_html);
    }
}

function getResourceFundSrcLog(ResourceID, req_fs_comments) {
    var result = new Array(); 
    result = db_getResourceFundSrcLog(ResourceID);
    
    var fs_comments = "";
    for(var i = 0; i < result.length; i++) { 
        fs_comments += result[i]['DTStamp'] + ": " + result[i]['LoginName'] + "<br>" + result[i]['Note'].replace(/\n/g, "<br>") + "<br><br>";
    }
    
    return fs_comments + req_fs_comments;
}