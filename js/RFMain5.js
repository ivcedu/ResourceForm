////////////////////////////////////////////////////////////////////////////////
var index_obj = 1;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {   
    $('#mod_dialog_box').modal('hide');
    $('#m5_goal_1').selectpicker('hide');
    
    if (sessionStorage.key(0) !== null) {
        $('#m5_ref_link').hide();
        var curPgs = sessionStorage.getItem('m5_pgNum');
        if (curPgs === "Page5") { 
            var m5_index = sessionStorage.getItem('m5_index');
            if (m5_index === null || m5_index === "") {
                alert("System error, please call x5596 for help");
                return false;
            }

            index_obj = Number(m5_index);
            
            for (var i = 1; i <= index_obj; i++) {
                var objID = "m5_objective_" + i;
                var goalID = "m5_goal_" + i;
                var impactID = "m5_impact_" + i;

                setLocalData(i, objID, goalID, impactID);
            }
        }
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('#m5_home').click(function() {
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
        var step5_save = btnSaveDraft();
        if (!step5_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("General Info");
    });
    
    $('#pbar_resource_type').click(function() {
        $("#pbar_resource_type").prop("disabled", true);
        saveLocalData();
        var step5_save = btnSaveDraft();
        if (!step5_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Resource Type");
    });
    
    $('#pbar_worksheet').click(function() {
        $("#pbar_worksheet").prop("disabled", true);
        saveLocalData();
        var step5_save = btnSaveDraft();
        if (!step5_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Worksheet");
    });
    
    $('#pbar_funding_src').click(function() {
        $("#pbar_funding_src").prop("disabled", true);
        saveLocalData();
        var step5_save = btnSaveDraft();
        if (!step5_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Funding Src");
    });
    
    $('#pbar_review').click(function() {
        $("#pbar_review").prop("disabled", true);
        saveLocalData();
        var step5_save = btnSaveDraft();
        if (!step5_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        moveSelectedStepPage("Review");
    });
    
    ////////////////////////////////////////////////////////////////////////////
    $(document).on('change', 'select[id^="m5_objective_"]', function() {
        var currentId = $(this).attr('id');
        var value = $(this).val();
        selObjective(currentId, value);
    });
    
    $('#m5_add_objective').click(function() {
        btnAddObjective();
    });
    
    $('#m5_remove_objective').click(function() {
        btnRemoveObjective();
    });
    
    ////////////////////////////////////////////////////////////////////////////
    $('#m5_back').click(function() {
        $("#m5_back").prop("disabled", true);
        saveLocalData();
        
        var step5_save = btnSaveDraft();
        if (!step5_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        window.open('fundingSrc.html', '_self');
    });
    
    $('#m5_next').click(function() {
        $("#m5_next").prop("disabled", true);
        saveLocalData();
        
        var step5_save = btnSaveDraft();
        if (!step5_save) {
            alert("System error, please call x5596 for help\n" + err_msg);
            return false;
        }
        
        window.open('RFMain6.html', '_self');
    });
    
    //auto size
    $('.normal').autosize();
    
    // selectpicker
    $('.selectpicker').selectpicker();
});

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
    
    var step4_result = updateStep4();
    if (!step4_result) {
        return false;
    }
    
    return true;
}

////////////////////////////////////////////////////////////////////////////////
function btnAddObjective() {   
    var new_index_obj = index_obj + 1;
    var main_old = "m5_main_" + index_obj;
    var main_new = "m5_main_" + new_index_obj;
    
    var objID = "m5_objective_" + new_index_obj;
    var goalID = "m5_goal_" + new_index_obj;
    var impactID = "m5_impact_" + new_index_obj;
    
    var tbody = "<div class='row-fluid' id='" + main_new + "'>";
    tbody += "<div class='span4'>";
    tbody += "<div class='row-fluid'>";
    tbody += "<select class='selectpicker span12' id='" + objID + "'>";
    tbody += "<option value='AUR-Strategy'>AUR-Strategy</option>";
    tbody += "<option value='Program Review-Strategy'>Program Review-Strategy</option>";
    tbody += "<option value='District-wide Objective'>District-wide Objective</option>";
    tbody += "<option value='District-wide Technology Objective'>District-wide Technology Objective</option>";
    tbody += "<option value='College Technology Plan'>College Technology Plan</option>";
    tbody += "<option value='ASG Goals'>ASG Goals</option>";
    tbody += "</select>";
    tbody += "</div>";
    tbody += "<div class='row-fluid'>";
    tbody += "<select class='selectpicker span12' id='" + goalID + "'>";
    tbody += "</select>";
    tbody += "</div>";
    tbody += "</div>";
    tbody += "<div class='span8'>";
    tbody += "<textarea class='field span12 normal' style='resize: vertical;' rows='3' id='" + impactID + "'></textarea>";
    tbody += "</div>"; 
    tbody += "</div>"; 

    $("#m5_planning").append(tbody);
    $('#' + objID).selectpicker('refresh');
    $('#' + goalID).selectpicker('refresh');
    $('#' + goalID).selectpicker('hide');
    $('#' + impactID).autosize();
    $('#m5_ref_link').hide();
    
    index_obj = new_index_obj;
}

function btnRemoveObjective() {
    if(index_obj > 1) {
        var main_last = "#m5_main_" + index_obj;
        $(main_last).remove();
        index_obj = index_obj - 1;
    }
}

////////////////////////////////////////////////////////////////////////////////
function selObjective(Id, value) {
    var objIDIndex = Id.replace("m5_objective_", "");
    var goalID = "m5_goal_" + objIDIndex;

    if (value === "District-wide Objective") {
        $("#" + goalID).children().remove();
        $("#" + goalID).append(setDistrictObjective());
        $("#" + goalID).selectpicker('refresh');
        $("#" + goalID).selectpicker('show');
        $('#m5_impact_1').attr('placeholder', '');
        $('#m5_ref_link').prop('href', 'doc/District-wide_Objective.pdf');
        $('#m5_ref_link').html(value);
        $('#m5_ref_link').show();
    }
    else if (value === "District-wide Technology Objective") {
        $("#" + goalID).children().remove();
        $("#" + goalID).append(setDistrictTechObjective());
        $("#" + goalID).selectpicker('refresh');
        $("#" + goalID).selectpicker('show');
        $('#m5_impact_1').attr('placeholder', '');
        $('#m5_ref_link').prop('href', 'doc/SOCCCD_Technology_Master_Plan_Final_Draft_August_2015.pdf');
        $('#m5_ref_link').html(value);
        $('#m5_ref_link').show();
    }
    else if (value === "College Technology Plan") {
        $("#" + goalID).children().remove();
        $("#" + goalID).append(setCollegeTechnologyPlan());
        $("#" + goalID).selectpicker('refresh');
        $("#" + goalID).selectpicker('show');
        $('#m5_impact_1').attr('placeholder', '');
        $('#m5_ref_link').prop('href', 'doc/IVC_Technology_Plan_2016-2021.pdf');
        $('#m5_ref_link').html(value);
        $('#m5_ref_link').show();
    }
    else if (value === "ASG Goals") {
        $("#" + goalID).children().remove();
        $("#" + goalID).append(setASGGoals());
        $("#" + goalID).selectpicker('refresh');
        $("#" + goalID).selectpicker('show');
        $('#m5_impact_1').attr('placeholder', '');
        $('#m5_ref_link').prop('href', 'doc/ASG_Goals_2015_2016.pdf');
        $('#m5_ref_link').html(value);
        $('#m5_ref_link').show();
    }
    else if (value === "Program Review-Strategy") {
        $('#m5_impact_' + objIDIndex).attr('placeholder', 'Please copy and paste the narrative into this box');
        $("#" + goalID).selectpicker('hide');
        $('#m5_ref_link').hide();
    }
    else {
        $('#m5_impact_' + objIDIndex).attr('placeholder', '');
        $("#" + goalID).selectpicker('hide');
        $('#m5_ref_link').hide();
    }
}

////////////////////////////////////////////////////////////////////////////////
function setDistrictObjective() {
    var result = "";
    
    result += "<option value='Objective 1.1 (Support innovative ...)'>Objective 1.1 (Support innovative ...)</option>";
    result += "<option value='Objective 1.2 (Improve climate ...)'>Objective 1.2 (Improve climate ...)</option>";
    result += "<option value='Objective 1.3 (Improve processes ...)'>Objective 1.3 (Improve processes ...)</option>";
    result += "<option value='Objective 1.4 (Professional development ...)'>Objective 1.4 (Professional development ...)</option>";
    result += "<option value='Objective 1.5 (Improve training ...)'>Objective 1.5 (Improve training ...)</option>";
    result += "<option value='Objective 2.1 (Increase completion ...)'>Objective 2.1 (Increase completion ...)</option>";
    result += "<option value='Objective 2.2 (Increase opportunities ...)'>Objective 2.2 (Increase opportunities ...)</option>";
    result += "<option value='Objective 2.3 (Student engagement ...)'>Objective 2.3 (Student engagement ...)</option>";
    result += "<option value='Objective 3.1 (Formalize partnerships ...)'>Objective 3.1 (Formalize partnerships ...)</option>";
    result += "<option value='Objective 3.2 (Alignment workforce ...)'>Objective 3.2 (Alignment workforce ...)</option>";
    result += "<option value='Objective 3.3 (Provide relevant ...)'>Objective 3.3 (Provide relevant ...)</option>";
    result += "<option value='Objective 3.4 (Improve student career ...)'>Objective 3.4 (Improve student career ...)</option>";
    result += "<option value='Objective 4.1 (Effective planning ...)'>Objective 4.1 (Effective planning ...)</option>";
    result += "<option value='Objective 4.2 (Improve efficiences ...)'>Objective 4.2 (Improve efficiences ...)</option>";
    result += "<option value='Objective 4.3 (Financial planning ...)'>Objective 4.3 (Financial planning ...)</option>";
    
    return result;
}

function setDistrictTechObjective() {
    var result = "";
    
    result += "<option value='Objective 1.1 (Investigate and test ...)'>Objective 1.1 (Investigate and test ...)</option>";
    result += "<option value='Objective 1.2 (Sustain a culture ...)'>Objective 1.2 (Sustain a culture ...)</option>";
    result += "<option value='Objective 1.3 (Increase use ...)'>Objective 1.3 (Increase use ...)</option>";
    result += "<option value='Objective 1.4 (Seek out innovation ...)'>Objective 1.4 (Seek out innovation ...)</option>";
    result += "<option value='Objective 2.1 (Engage in team ...)'>Objective 2.1 (Engage in team ...)</option>";
    result += "<option value='Objective 2.2 (Coordinate opportunities ...)'>Objective 2.2 (Coordinate opportunities ...)</option>";
    result += "<option value='Objective 2.3 (Continue to support ...)'>Objective 2.3 (Continue to support ...)</option>";
    result += "<option value='Objective 2.4 (Prioritize district-wide ...)'>Objective 2.4 (Prioritize district-wide ...)</option>";
    result += "<option value='Objective 3.1 (Identify, investigate, ...)'>Objective 3.1 (Identify, investigate, ...)</option>";
    result += "<option value='Objective 3.2 (Develop and expand ...)'>Objective 3.2 (Develop and expand ...)</option>";
    result += "<option value='Objective 3.3 (Expand inter-segmental ...)'>Objective 3.3 (Expand inter-segmental ...)</option>";
    result += "<option value='Objective 3.4 (Leverage data from ...)'>Objective 3.4 (Leverage data from ...)</option>";
    result += "<option value='Objective 4.1 (Incorporate additional ...)'>Objective 4.1 (Incorporate additional ...)</option>";
    result += "<option value='Objective 4.2 (Re-architect data ...)'>Objective 4.2 (Re-architect data ...)</option>";
    result += "<option value='Objective 4.3 (Transform use of data ...)'>Objective 4.3 (Transform use of data ...)</option>";
    result += "<option value='Objective 5.1 (Continue to implement ...)'>Objective 5.1 (Continue to implement ...)</option>";
    result += "<option value='Objective 5.2 (Increase computing ...)'>Objective 5.2 (Increase computing ...)</option>";
    result += "<option value='Objective 5.3 (Remain current with ...)'>Objective 5.3 (Remain current with ...)</option>";
    result += "<option value='Objective 5.4 (Maintain security ...)'>Objective 5.4 (Maintain security ...)</option>";
    
    return result;
}

function setCollegeTechnologyPlan() {
    var result = "";
    
    //////////////////////////Objective 2.4 (Prioritize district-wide ...)
    result += "<option value='Gov-Standards for hardware and software'>Gov-Standards for hardware and software</option>";
    result += "<option value='Gov-Tools for decision making abilities'>Gov-Tools for decision making abilities</option>";
    result += "<option value='Gov-Review of Technology plan'>Gov-Review of Technology plan</option>";
    result += "<option value='App-Replace paper-based forms'>App-Replace paper-based forms</option>";
    result += "<option value='App-Alternative computing devices'>App-Alternative computing devices</option>";
    result += "<option value='App-Video technology'>App-Video technology</option>";
    result += "<option value='App-Campus communications and emergency'>App-Campus communications and emergency</option>";
    result += "<option value='App-Campus efficiencies'>App-Campus efficiencies</option>";
    result += "<option value='App-Colleges web presence'>App-Colleges web presence</option>";
    result += "<option value='Net-Technology refresh'>Net-Technology refresh</option>";
    result += "<option value='Net-Business continuity plans and systems'>Net-Business continuity plans and systems</option>";
    result += "<option value='Net-Virtualization technology'>Net-Virtualization technology</option>";
    result += "<option value='Net-Network security'>Net-Network security</option>";
    result += "<option value='Net-Instructional electronic devices'>Net-Instructional electronic devices</option>";
    result += "<option value='Ops-Help Desk ticketing system'>Ops-Help Desk ticketing system</option>";
    result += "<option value='Ops-Online Education training center'>Ops-Online Education training center</option>";
    result += "<option value='Ops-SharePoint training'>Ops-SharePoint training</option>";
    result += "<option value='Ops-Professional development opportunities'>Ops-Professional development opportunities</option>";
    result += "<option value='Ops-Professional development support'>Ops-Professional development support</option>";
    result += "<option value='Ops-Technology Services staff expansion'>Ops-Technology Services staff expansion</option>";
    result += "<option value='Ops-Software delivery system'>Ops-Software delivery system</option>";
    
    return result;
}

function setASGGoals() {
    var result = "";
    
    result += "<option value='Goal 1 - Services and Activities'>Goal 1 - Services and Activities</option>";
    result += "<option value='Goal 2 - Student Leadership'>Goal 2 - Student Leadership</option>";
    result += "<option value='Goal 3 - Facilities and Technology'>Goal 3 - Facilities and Technology</option>";
    result += "<option value='Goal 4 - Fiscal Management'>Goal 4 - Fiscal Management</option>";
    
    return result;
}

////////////////////////////////////////////////////////////////////////////////
function saveLocalData() {
    localData_setPg5(index_obj);
    
    for (var i = 1; i <= index_obj; i++) {
        var objID = "m5_objective_" + i;
        var goalID = "m5_goal_" + i;
        var impactID = "m5_impact_" + i;

        var obj = $('#' + objID).val();
        var goal = $('#' + goalID).val();
        var impact = $('#' + impactID).val();    
        
        if (goal === null) {
            goal = "";
        }
        
        localData_setPg5_obj(objID, obj, goalID, goal, impactID, impact);
    }
}

function setLocalData(index, objID, goalID, impactID) {
    if (index === 1) {
        $('#' + objID).val(sessionStorage.getItem(objID));
        $('#' + objID).selectpicker('refresh');
        $('#' + impactID).val(sessionStorage.getItem(impactID)).trigger('autosize.resize');
    }
    else {
        var main_new = "m5_main_" + index;
        var tbody = "<div class='row-fluid' id='" + main_new + "'>";
        tbody += "<div class='span4'>";
        tbody += "<div class='row-fluid'>";
        tbody += "<select class='selectpicker span12' id='" + objID + "' onchange='selObjective(this);'>";
        tbody += "<option value='AUR-Strategy'>AUR-Strategy</option>";
        tbody += "<option value='Program Review-Strategy'>Program Review-Strategy</option>";
        tbody += "<option value='District-wide Objective'>District-wide Objective</option>";
        tbody += "<option value='District-wide Technology Objective'>District-wide Technology Objective</option>";
        tbody += "<option value='College Technology Plan'>College Technology Plan</option>";
        tbody += "</select>";
        tbody += "</div>";
        tbody += "<div class='row-fluid'>";
        tbody += "<select class='selectpicker span12' id='" + goalID + "'>";
        tbody += "</select>";
        tbody += "</div>";
        tbody += "</div>";
        tbody += "<div class='span8'>";
        tbody += "<textarea class='field span12 normal' style='resize: vertical;' id='" + impactID + "'></textarea>";
        tbody += "</div>"; 
        tbody += "</div>"; 

        $("#m5_planning").append(tbody);
        
        $('#' + objID).val(sessionStorage.getItem(objID));
        $('#' + objID).selectpicker('refresh');
        $('#' + goalID).selectpicker('hide');
        
        $('#' + impactID).val(sessionStorage.getItem(impactID));
        $('#' + impactID).autosize();
    }
    
    var objective = sessionStorage.getItem(objID);
    if (objective === "District-wide Objective") {
        $("#" + goalID).append(setDistrictObjective());
        $('#' + goalID).val(sessionStorage.getItem(goalID));
        $('#' + goalID).selectpicker('refresh');
        $('#' + goalID).selectpicker('show');
        if (index === index_obj) {
            $('#m5_ref_link').prop('href', 'doc/District-wide_Objective.pdf');
            $('#m5_ref_link').html(objective);
            $('#m5_ref_link').show();
        }
    }
    else if (objective === "District-wide Technology Objective") {
        $("#" + goalID).append(setDistrictTechObjective());
        $('#' + goalID).val(sessionStorage.getItem(goalID));
        $('#' + goalID).selectpicker('refresh');
        $('#' + goalID).selectpicker('show');
        if (index === index_obj) {
            $('#m5_ref_link').prop('href', 'doc/IVC_Technology_Plan_2016-2021.pdf');
            $('#m5_ref_link').html(objective);
            $('#m5_ref_link').show();
        }
    }
    else if (objective === "College Technology Plan") {
        $("#" + goalID).append(setCollegeTechnologyPlan());
        $('#' + goalID).val(sessionStorage.getItem(goalID));
        $('#' + goalID).selectpicker('refresh');
        $('#' + goalID).selectpicker('show');
        if (index === index_obj) {
            $('#m5_ref_link').prop('href', 'doc/IVC_Technology_Plan_2016-2021.pdf');
            $('#m5_ref_link').html(objective);
            $('#m5_ref_link').show();
        }
    }
    else {
        $('#m5_ref_link').hide();
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