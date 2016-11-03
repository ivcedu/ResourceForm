////////////////////////////////////////////////////////////////////////////////
function resetDraftLocalData() {
    var loginName = sessionStorage.getItem('m1_loginName');
    var loginEmail = sessionStorage.getItem('m1_loginEmail');
    var loginTitle = sessionStorage.getItem('m1_loginTitle');
    var loginDiv = sessionStorage.getItem('m1_loginDiv');
    var appName = sessionStorage.getItem('m1_appName');
    var appEmail = sessionStorage.getItem('m1_appEmail');
    var appTitle = sessionStorage.getItem('m1_appTitle');
    var appDiv = sessionStorage.getItem('m1_appDiv');
    
    sessionStorage.clear();
    err_msg = "";
    localData_login(loginName, loginEmail, loginTitle, loginDiv, appName, appEmail, appTitle, appDiv);
}

////////////////////////////////////////////////////////////////////////////////
function saveLocalDataPrevRType() {
    var rtype = sessionStorage.getItem('m3_radioRType');
    if (sessionStorage.getItem('m3_prev_RType') === null) {
        sessionStorage.setItem('m3_prev_RType', rtype);
    }
}

////////////////////////////////////////////////////////////////////////////////
function updateStep1() {
    var LoginID = mod_AddLogin();
    var CreatorID = mod_AddCreator();    
    if (LoginID === "" || CreatorID === "") {
        err_msg += "LoginID or CreatorID failed\n";
        return false;
    }
    
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    if (ResourceID === null) {
        ResourceID = mod_AddResource(LoginID, CreatorID, 1);
        if (ResourceID === "") {
            err_msg += "Insert Resource Form failed\n";
            return false;
        }
        var ResourceProgID = mod_AddResourceProg(ResourceID);
        if (ResourceProgID === "") {
            err_msg += "Insert Resource Program failed\n";
            return false;
        }
        sessionStorage.setItem('m1_ResourceID', ResourceID);
        var ResourceStepID = db_insertResourceStep(ResourceID, "Step1", "Page1");
        if (ResourceStepID === "") {
            err_msg += "Insert Resource Step failed\n";
            return false;
        }
        mod_addResourceLink(ResourceID);
    }
    else {
        if (ResourceID === "0" || ResourceID === "") {
            err_msg += "Step1 ResourceID sessionstorage empty or null\n";
            return false;
        }
        
        var update1 = mod_updateResource(ResourceID, CreatorID, 1);
        if (!update1) {
            err_msg += "Step1 update Resource Form failed\n";
            return false;
        }
        var update2 = mod_updateResourceProg(ResourceID);
        if (!update2) {
            err_msg += "Step1 update Resource Program failed\n";
            return false;
        }
        var update3 = db_updateResourcePage(ResourceID, "Page1");
        if (!update3) {
            err_msg += "Step1 update Resource Step failed\n";
            return false;
        }
        mod_updateResourceLink(ResourceID);
    }
    
    return true;
}

function updateStep2() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    
    if (ResourceID === null || ResourceID === "0" || ResourceID === "") {
        err_msg += "Step2 ResourceID sessionstorage empty or null\n";
        return false;
    }
    
    if (sessionStorage.getItem('m1_RTID') === null) {
        var RTID = mod_AddResourceTypeItem(ResourceID);
        if (RTID === "") {
            err_msg += "Step2 insert RTID failed\n";
            return false;
        }
        
        sessionStorage.setItem('m1_RTID', RTID);
        var update1 = db_updateResourceStep(ResourceID, "Step2", "Page2");
        if (!update1) {
            err_msg += "Step2 update Resource Step failed\n";
            return false;
        }
    }
    else {        
        var update = mod_updateResourceTypeItem(ResourceID);
        if (!update) {
            err_msg += "Step2 update RTID failed\n";
            return false;
        }
        
        var rtype = sessionStorage.getItem('m3_radioRType');
        var prev_rtype = sessionStorage.getItem('m3_prev_RType');
        if (rtype !== prev_rtype) {
            switch(prev_rtype) {
                case "Personnel":
                    mod_deletePersonnel();
                    break;
                case "Facilities":
                    mod_deleteFacilities();
                    break;
                case "Instructional":
                    mod_deleteInstructional();
                    break;
                case "Technology":
                    mod_deleteTechnology();
                    break;
                case "Other":
                    mod_deleteOther2();
                    break;
                default:
                    break;
            }
            sessionStorage.setItem('m3_prev_RType', rtype);
        }
        
        var update2 = db_updateResourcePage(ResourceID, "Page2");
        if (!update2) {
            err_msg += "Step2 update Resource Page failed\n";
            return false;
        }
    }
    
    return true;
}

function updateStep3_Personnel() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    var PRTID = db_getResourceType(sessionStorage.getItem('m3_radioPType'));
    var PersonnelID = 0;
    
    if (ResourceID === null || ResourceID === "0" || ResourceID === "") {
        err_msg += "Step3 ResourceID sessionstorage empty or null\n";
        return false;
    }
    
    db_updateResourceTypeItem(ResourceID, PRTID);
    var ptype = sessionStorage.getItem('m3_radioPType');
    switch (ptype) {
        case "Classified Bargaining":
            if (sessionStorage.getItem('m1_PersonnelID') === null) {
                PersonnelID = step3_Personnel_CB(ResourceID, PRTID, true);
                if (PersonnelID === "") {
                    err_msg += "Step3 insert Classified Bargaining failed\n";
                    return false;
                }
//                step3_Personnel_CB_Questionnaire(ResourceID, true);
                sessionStorage.setItem('m1_PersonnelID', PersonnelID);
                var update1 = db_updateResourceStep(ResourceID, "Step3", "Page3");
                if (!update1) {
                    err_msg += "Step3 update Resource Step failed\n";
                    return false;
                }
            }
            else {
                var update = step3_Personnel_CB(ResourceID, PRTID, false);
                if (!update) {
                    err_msg += "Step3 update Classified Bargaining failed\n";
                    return false;
                }
//                step3_Personnel_CB_Questionnaire(ResourceID, false);
                var update2 = db_updateResourcePage(ResourceID, "Page3");
                if (!update2) {
                    err_msg += "Step3 update Resource Page failed\n";
                    return false;
                }
            }
            break;
        case "Classified Management":
            if (sessionStorage.getItem('m1_PersonnelID') === null) {
                PersonnelID = step3_Personnel_CM(ResourceID, PRTID, true);
                if (PersonnelID === "") {
                    err_msg += "Step3 insert Classified Management failed\n";
                    return false;
                }
                
                sessionStorage.setItem('m1_PersonnelID', PersonnelID);
                var update3 = db_updateResourceStep(ResourceID, "Step3", "Page3");
                if (!update3) {
                    err_msg += "Step3 update Resource Step failed\n";
                    return false;
                }
            }
            else {
                var update = step3_Personnel_CM(ResourceID, PRTID, false);
                if (!update) {
                    err_msg += "Step3 update Classified Management failed\n";
                    return false;
                }
                
                var update4 = db_updateResourcePage(ResourceID, "Page3");
                if (!update4) {
                    err_msg += "Step3 update Resource Page failed\n";
                    return false;
                }
            }
            break;
        case "Short-Term Hourly":
            if (sessionStorage.getItem('m1_PersonnelID') === null) {
                PersonnelID = step3_Personnel_ST(ResourceID, PRTID, true);
                if (PersonnelID === "") {
                    err_msg += "Step3 insert Short-Term Hourly failed\n";
                    return false;
                }
                
                sessionStorage.setItem('m1_PersonnelID', PersonnelID);
                var update5 = db_updateResourceStep(ResourceID, "Step3", "Page3");
                if (!update5) {
                    err_msg += "Step3 update Resource Step failed\n";
                    return false;
                }
            }
            else {
                var update = step3_Personnel_ST(ResourceID, PRTID, false);
                if (!update) {
                    err_msg += "Step3 update Short-Term Hourly failed\n";
                    return false;
                }
                
                var update6 = db_updateResourcePage(ResourceID, "Page3");
                if (!update6) {
                    err_msg += "Step3 update Resource Page failed\n";
                    return false;
                }
            }
            break;
        default:
            return false;
    }

    return true;
}

function step3_Personnel_CB(ResourceID, RTID, insert) {
    var m4_cb_titleName = sessionStorage.getItem('m4_rtp_CB_titleName');
    var m4_cb_Range = sessionStorage.getItem('m4_rtp_CB_range');
    var m4_cb_Month = sessionStorage.getItem('m4_rtp_CB_month');
    var m4_cb_Hrs = sessionStorage.getItem('m4_rtp_CB_hrs');
    var m4_cb_annual_cost = revertDollar(sessionStorage.getItem('m4_rtp_CB_annual_cost'));
    var m4_cb_benefit_cost = revertDollar(sessionStorage.getItem('m4_rtp_CB_benefit_cost'));
    var m4_cb_total_cost = revertDollar(sessionStorage.getItem('m4_rtp_CB_total_cost'));
    var m4_cb_describe = sessionStorage.getItem('m4_rtp_CB_describe');
    var m4_cb_hr_rate = sessionStorage.getItem('m4_rtp_CB_hr_rate');
    var m4_cb_new_pos = sessionStorage.getItem('m4_rtp_CB_new_pos');
    
    if (insert) {
        return db_insertPersonnel(ResourceID, RTID, m4_cb_titleName, m4_cb_Range, m4_cb_Month, m4_cb_Hrs, m4_cb_annual_cost, m4_cb_benefit_cost, m4_cb_total_cost, m4_cb_describe, m4_cb_hr_rate, m4_cb_new_pos);
    }
    else {
        return db_updatePersonnel(ResourceID, RTID, m4_cb_titleName, m4_cb_Range, m4_cb_Month, m4_cb_Hrs, m4_cb_annual_cost, m4_cb_benefit_cost, m4_cb_total_cost, m4_cb_describe, m4_cb_hr_rate, m4_cb_new_pos);
    }
}

function step3_Personnel_CB_Questionnaire(ResourceID, insert) {
    var field1 = sessionStorage.getItem('m4_rtp_CB_quest_field1');
    var field2 = sessionStorage.getItem('m4_rtp_CB_quest_field2');
    var field3 = sessionStorage.getItem('m4_rtp_CB_quest_field3');
    var field4 = sessionStorage.getItem('m4_rtp_CB_quest_field4');
    var field5 = sessionStorage.getItem('m4_rtp_CB_quest_field5');
    var field6 = sessionStorage.getItem('m4_rtp_CB_quest_field6');
    var field7 = sessionStorage.getItem('m4_rtp_CB_quest_field7');
    var field8 = sessionStorage.getItem('m4_rtp_CB_quest_field8');
    var field9 = sessionStorage.getItem('m4_rtp_CB_quest_field9');
    var field10 = sessionStorage.getItem('m4_rtp_CB_quest_field10');
    var field11 = sessionStorage.getItem('m4_rtp_CB_quest_field11');
    var field12 = sessionStorage.getItem('m4_rtp_CB_quest_field12');
    var field13 = sessionStorage.getItem('m4_rtp_CB_quest_field13');
    var field14 = sessionStorage.getItem('m4_rtp_CB_quest_field14');
    
    if (insert) {
        return db_insertCBQuestionnaire(ResourceID, field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11, field12, field13, field14);
    }
    else {
        return db_updateCBQuestionnaire(ResourceID, field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11, field12, field13, field14);
    }
}

function step3_Personnel_CM(ResourceID, RTID, insert) {
    var m4_cm_titleName = sessionStorage.getItem('m4_rtp_CM_titleName');
    var m4_cm_Range = sessionStorage.getItem('m4_rtp_CM_range');
    var m4_cm_Month = sessionStorage.getItem('m4_rtp_CM_month');
    var m4_cm_Hrs = sessionStorage.getItem('m4_rtp_CM_hrs');
    var m4_cm_annual_cost = revertDollar(sessionStorage.getItem('m4_rtp_CM_annual_cost'));
    var m4_cm_benefit_cost = revertDollar(sessionStorage.getItem('m4_rtp_CM_benefit_cost'));
    var m4_cm_total_cost = revertDollar(sessionStorage.getItem('m4_rtp_CM_total_cost'));
    var m4_cm_describe = sessionStorage.getItem('m4_rtp_CM_describe');
    var m4_cm_hr_rate = sessionStorage.getItem('m4_rtp_CM_hr_rate');
    var m4_cm_new_pos = sessionStorage.getItem('m4_rtp_CM_new_pos');
        
    if (insert) {
        return db_insertPersonnel(ResourceID, RTID, m4_cm_titleName, m4_cm_Range, m4_cm_Month, m4_cm_Hrs, m4_cm_annual_cost, m4_cm_benefit_cost, m4_cm_total_cost, m4_cm_describe, m4_cm_hr_rate, m4_cm_new_pos);  
    }
    else {
        return db_updatePersonnel(ResourceID, RTID, m4_cm_titleName, m4_cm_Range, m4_cm_Month, m4_cm_Hrs, m4_cm_annual_cost, m4_cm_benefit_cost, m4_cm_total_cost, m4_cm_describe, m4_cm_hr_rate, m4_cm_new_pos);
    }
}

function step3_Personnel_ST(ResourceID, RTID, insert) {
    var m4_st_title = sessionStorage.getItem('m4_rtp_ST_title');
    var m4_st_Range = sessionStorage.getItem('m4_rtp_ST_range');
    var m4_st_Month = sessionStorage.getItem('m4_rtp_ST_month');
    var m4_st_Hrs = sessionStorage.getItem('m4_rtp_ST_hrs');
    var m4_st_annual_cost = revertDollar(sessionStorage.getItem('m4_rtp_ST_annual_cost'));
    var m4_st_benefit_cost = revertDollar(sessionStorage.getItem('m4_rtp_ST_benefit_cost'));
    var m4_st_total_cost = revertDollar(sessionStorage.getItem('m4_rtp_ST_total_cost'));
    var m4_st_describe = sessionStorage.getItem('m4_rtp_ST_describe');
    var m4_st_hr_rate = sessionStorage.getItem('m4_rtp_ST_hr_rate');
    
    if (m4_st_Range === "...") {
        m4_st_Range = 0;
    }
    
    if (insert) {
        return db_insertPersonnel(ResourceID, RTID, m4_st_title, m4_st_Range, m4_st_Month, m4_st_Hrs, m4_st_annual_cost, m4_st_benefit_cost, m4_st_total_cost, m4_st_describe, m4_st_hr_rate, "");
    }
    else {
        return db_updatePersonnel(ResourceID, RTID, m4_st_title, m4_st_Range, m4_st_Month, m4_st_Hrs, m4_st_annual_cost, m4_st_benefit_cost, m4_st_total_cost, m4_st_describe, m4_st_hr_rate, "");
    }
}

function updateStep3_Facilities() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
  
    if (ResourceID === null || ResourceID === "0" || ResourceID === "") {
        err_msg += "Step3 ResourceID sessionstorage empty or null\n";
        return false;
    }

    if (sessionStorage.getItem('m1_FacilitiesID') === null) {
        var FacilitiesID = step3_Facilities(ResourceID, true);
        if (FacilitiesID === "") {
            err_msg += "Step3 insert Facilities failed\n";
            return false;
        }
        
        sessionStorage.setItem('m1_FacilitiesID', FacilitiesID);
        var update1 = db_updateResourceStep(ResourceID, "Step3", "Page3");
        if (!update1) {
            err_msg += "Step3 update Resource Step failed\n";
            return false;
        }
    }
    else {
        var update = step3_Facilities(ResourceID, false);
        if (!update) {
            err_msg += "Step3 update Facilities failed\n";
            return false;
        }
        
        var update2 = db_updateResourcePage(ResourceID, "Page3");
        if (!update2) {
            err_msg += "Step3 update Resource Page failed\n";
            return false;
        }
    }
    
    return true;
}

function step3_Facilities(ResourceID, insert) {
    var ItemReq = sessionStorage.getItem('m4_rtf_Item_Req');
    var Location = sessionStorage.getItem('m4_rtf_Location'); 
    var EstAmt = revertDollar(sessionStorage.getItem('m4_rtf_Est_Amt'));
    var EstDescrip = sessionStorage.getItem('m4_rtf_Est_Descrip');
    var alt = sessionStorage.getItem('m4_rtf_fa_alt');
    
    if (insert) {
        return db_insertFacilities(ResourceID, ItemReq, Location, EstAmt, EstDescrip, alt);
    }
    else {
        return db_updateFacilities(ResourceID, ItemReq, Location, EstAmt, EstDescrip, alt);
    }
}

function updateStep3_Instructional() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    
    if (ResourceID === null || ResourceID === "0" || ResourceID === "") {
        err_msg += "Step3 ResourceID sessionstorage empty or null\n";
        return false;
    }
    
    if (sessionStorage.getItem('m1_InstructionalID') === null) {
        var InstructionalID = step3_Instructional(ResourceID, true);
        if (InstructionalID === "") {
            err_msg += "Step3 insert Instructional failed\n";
            return false;
        }
        
        sessionStorage.setItem('m1_InstructionalID', InstructionalID);
        var update1 = db_updateResourceStep(ResourceID, "Step3", "Page3");
        if (!update1) {
            err_msg += "Step3 update Resource Step failed\n";
            return false;
        }
    }
    else {
        var update = step3_Instructional(ResourceID, false);
        if (!update) {
            err_msg += "Step3 update Instructional failed\n";
            return false;
        }
        
        var update2 = db_updateResourcePage(ResourceID, "Page3");
        if (!update2) {
            err_msg += "Step3 update Resource Page failed\n";
            return false;
        }
    }
    
    return true;
}

function step3_Instructional(ResourceID, insert) {
    var sch_div = sessionStorage.getItem('m4_rti_Sch_Div');
    var ex_life = sessionStorage.getItem('m4_rti_Ex_Life'); 
    var descrip = sessionStorage.getItem('m4_rti_Descrip');
    var qty = sessionStorage.getItem('m4_rti_Qty');
    var cost = revertDollar(sessionStorage.getItem('m4_rti_Cost'));
    var total = revertDollar(sessionStorage.getItem('m4_rti_Total'));
    
    if (insert) {
        return db_insertInstructional(ResourceID, sch_div, ex_life, descrip, qty, cost, total);
    }
    else {
        return db_updateInstructional(ResourceID, sch_div, ex_life, descrip, qty, cost, total);
    }
}

function updateStep3_Technology() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    
    if (ResourceID === null || ResourceID === "0" || ResourceID === "") {
        err_msg += "Step3 ResourceID sessionstorage empty or null\n";
        return false;
    }
    
    if (sessionStorage.getItem('m1_TechnologyID') === null) {
        var TechnologyID = step3_Technology(ResourceID, true);
        if (TechnologyID === "") {
            err_msg += "Step3 insert Technology failed\n";
            return false;
        }
        
        sessionStorage.setItem('m1_TechnologyID', TechnologyID);
        var update1 = db_updateResourceStep(ResourceID, "Step3", "Page3");
        if (!update1) {
            err_msg += "Step3 update Resource Step failed\n";
            return false;
        }
    }
    else {
        var update = step3_Technology(ResourceID, false);
        if (!update) {
            err_msg += "Step3 update Technology failed\n";
            return false;
        }
        
        var update2 = db_updateResourcePage(ResourceID, "Page3");
        if (!update2) {
            err_msg += "Step3 update Resource Page failed\n";
            return false;
        }
    }
    
    var update3 = updateStep3_TechnologyItems();
    if (!update3) {
        err_msg += "Step3 insert Technology Items failed\n";
        return false;
    }
    
    return true;
}

function step3_Technology(ResourceID, insert) {
    var ItemReq = sessionStorage.getItem('m4_rtt_Item_Req');
    var Location = sessionStorage.getItem('m4_rtt_Location');
    var ASInformation = sessionStorage.getItem('m4_rtt_Additional');
    var HardwareTotal = revertDollar(sessionStorage.getItem('m4_rtt_Hardware_Total'));
    var MaintenanceTotal = revertDollar(sessionStorage.getItem('m4_rtt_Maintenance_Total'));
    var TaxTotal = revertDollar(sessionStorage.getItem('m4_rtt_Tax_Total'));
    var SoftwareTotal = revertDollar(sessionStorage.getItem('m4_rtt_Software_Total'));
    var ShippingTotal = revertDollar(sessionStorage.getItem('m4_rtt_Shipping_Total'));
    var InstallationTotal = revertDollar(sessionStorage.getItem('m4_rtt_Installation_Total'));
    var AdditionalTotal = revertDollar(sessionStorage.getItem('m4_rtt_Additional_Total'));
    var TotalTaxable = revertDollar(sessionStorage.getItem('m4_rtt_Total_Taxable'));
    var TotalNontaxable = revertDollar(sessionStorage.getItem('m4_rtt_Total_Nontaxable'));
    var GrandTotal = revertDollar(sessionStorage.getItem('m4_rtt_Grand_Total'));
    var Alternative = sessionStorage.getItem('m4_rtt_alt');
    
    if (insert) {
        return db_insertTechnology(ResourceID, ItemReq, Location, ASInformation, HardwareTotal, MaintenanceTotal,
                                    TaxTotal, SoftwareTotal, ShippingTotal, InstallationTotal, AdditionalTotal,
                                    TotalTaxable, TotalNontaxable, GrandTotal, Alternative);
    }
    else {
        return db_updateTechnology(ResourceID, ItemReq, Location, ASInformation, HardwareTotal, MaintenanceTotal,
                                TaxTotal, SoftwareTotal, ShippingTotal, InstallationTotal, AdditionalTotal,
                                TotalTaxable, TotalNontaxable, GrandTotal, Alternative);
    }
}

function updateStep3_TechnologyItems() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    db_deleteTechnologyItems(ResourceID);
    
    var tech_index = Number(sessionStorage.getItem('m4_rtt_index'));
    for (var i = 1; i <= tech_index; i++) {
        var ItemTypeID = "m4_te_Item_Type_" + i;
        var ItemDescripID = "m4_te_Item_Descrip_" + i;
        var ItemQtyID = "m4_te_Item_Qty_" + i;
        var ItemCostID = "m4_te_Item_Cost_" + i;
        var ItemTotalID = "m4_te_Item_Total_" + i;
        var ItemMaintID = "m4_te_Item_Maint_" + i;
        var ItemYrsID = "m4_te_Item_Yrs_" + i;
        var ItemAnnCostID = "m4_te_Item_Ann_Cost_" + i;
        var ItemMaintTotalID = "m4_te_Item_Maint_Total_" + i;
        
        var ItemType = sessionStorage.getItem(ItemTypeID);
        var ItemDescrip = sessionStorage.getItem(ItemDescripID);
        var ItemQty = revertDollar(sessionStorage.getItem(ItemQtyID));
        var ItemCost = revertDollar(sessionStorage.getItem(ItemCostID));
        var ItemTotal = revertDollar(sessionStorage.getItem(ItemTotalID));
        var ItemMaint = sessionStorage.getItem(ItemMaintID);
        var ItemYrs = revertDollar(sessionStorage.getItem(ItemYrsID));
        var ItemAnnCost = revertDollar(sessionStorage.getItem(ItemAnnCostID));
        var ItemMaintTotal = revertDollar(sessionStorage.getItem(ItemMaintTotalID));
        
        var TechnologyItemsID = db_insertTechnologyItems(ResourceID, ItemType, ItemDescrip, ItemQty, ItemCost, ItemTotal, ItemMaint, ItemYrs, ItemAnnCost, ItemMaintTotal);
        if (TechnologyItemsID === "") {
            return false;;
        }
    }
    
    return true;
}

function updateStep3_Other2() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    
    if (ResourceID === null || ResourceID === "0" || ResourceID === "") {
        err_msg += "Step3 ResourceID sessionstorage empty or null\n";
        return false;
    }
    
    if (sessionStorage.getItem('m1_Other2IDID') === null) {
        var Other2ID = step3_Other2(ResourceID, true);
        if (Other2ID === "") {
            err_msg += "Step3 insert Other failed\n";
            return false;
        }
        
        sessionStorage.setItem('m1_Other2IDID', Other2ID);
        var update1 = db_updateResourceStep(ResourceID, "Step3", "Page3");
        if (!update1) {
            err_msg += "Step3 update Resource Step failed\n";
            return false;
        }
    }
    else {
        var update = step3_Other2(ResourceID, false);
        if (!update) {
            err_msg += "Step3 update Other failed\n";
            return false;
        }
        
        var update2 = db_updateResourcePage(ResourceID, "Page3");
        if (!update2) {
            err_msg += "Step3 update Resource Page failed\n";
            return false;
        }
    }
    
    var update3 = updateStep3_Other2Items();
    if (!update3) {
        err_msg += "Step3 insert Other Items failed\n";
        return false;
    }
    
    return true;
}

function step3_Other2(ResourceID, insert) {
    var Description = sessionStorage.getItem('m4_ot2_Description');
    var TotalAmount = 0.0;
    var strTotalAmount = sessionStorage.getItem('m4_ot2_Total_Amount');
    if (strTotalAmount !== "") {
        TotalAmount = revertDollar(strTotalAmount);
    }
    
    if (insert) {
        return db_insertOther2(ResourceID, Description, TotalAmount);
    }
    else {
        return db_updateOther2(ResourceID, Description, TotalAmount);
    }
}

function updateStep3_Other2Items() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    db_deleteOther2Items(ResourceID);
    
    var strTAmt = sessionStorage.getItem('m4_ot2_Total_Amount');
    if (strTAmt !== "") {
        var other2_index = Number(sessionStorage.getItem('m4_ot2_Index'));
        for (var i = 1; i <= other2_index; i++) {
            var itemID = "m4_ot2_item_" + i;
            var qtyID = "m4_ot2_qty_" + i;
            var costID = "m4_ot2_cost_" + i; 
            var totalID = "m4_ot2_total_" + i;
            var Item = sessionStorage.getItem(itemID);
            var Qty = sessionStorage.getItem(qtyID);
            var Cost = revertDollar(sessionStorage.getItem(costID));
            var Total = revertDollar(sessionStorage.getItem(totalID));

            var Other2ItemID = db_insertOther2Items(ResourceID, Item, Qty, Cost, Total);
            if (Other2ItemID === "") {
                return false;
            }
        }
    }
    
    return true;
}

function updateStepFundSrc() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    if (ResourceID === null || ResourceID === "0" || ResourceID === "") {
        err_msg += "Funding Src ResourceID sessionstorage empty or null\n";
        return false;
    }
    
    if (sessionStorage.getItem('m1_ResourceFundSrc') === null) {
        var ResourceFundSrcID = stepRF_ResourceFundSrc(ResourceID, true);
        if (ResourceFundSrcID === "") {
            err_msg += "StepFS insert resource funding srouce failed\n";
            return false;
        }
        
        sessionStorage.setItem('m1_ResourceFundSrc', true);
        var update1 = db_updateResourceStep(ResourceID, "StepFS", "PageFS");
        if (!update1) {
            err_msg += "StepFS update Resource Step failed\n";
            return false;
        }
    }
    else {
        var update = stepRF_ResourceFundSrc(ResourceID, false);
        if (!update) {
            err_msg += "StepFS update resource funding srouce failed\n";
            return false;
        }
        
        var update2 = db_updateResourcePage(ResourceID, "PageFS");
        if (!update2) {
            err_msg += "StepFS update Resource Step failed\n";
            return false;
        }
    }
    
    return true;
}

function updateStep4() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    
    if (ResourceID === null || ResourceID === "0" || ResourceID === "") {
        err_msg += "Step4 ResourceID sessionstorage empty or null\n";
        return false;
    }
    
    if (sessionStorage.getItem('m1_Planning') === null) {
        var update = step4_Planning(ResourceID);
        if (!update) {
            err_msg += "Step4 insert Planning failed\n";
            return false;
        }
        
        sessionStorage.setItem('m1_Planning', true);
        var update1 = db_updateResourceStep(ResourceID, "Step4", "Page4");
        if (!update1) {
            err_msg += "Step4 update Resource Step failed\n";
            return false;
        }
    }
    else {
        db_deletePlanning(ResourceID);
        var update = step4_Planning(ResourceID);
        if (!update) {
            err_msg += "Step4 update Planning failed\n";
            return false;
        }
        
        var update2 = db_updateResourcePage(ResourceID, "Page4");
        if (!update2) {
            err_msg += "Step4 update Resource Page failed\n";
            return false;
        }
    }

    return true;
}

function step4_Planning(ResourceID) {
    var m5_index = sessionStorage.getItem('m5_index');
    
    if (m5_index === null || m5_index === "") {
        return false;
    }
    
    var Index = Number(m5_index);
    for (var i = 1; i <= Index; i++) 
    {
        var objID = "m5_objective_" + i;
        var goalID = "m5_goal_" + i;
        var impactID = "m5_impact_" + i;
        var obj = sessionStorage.getItem(objID);
        var goal = sessionStorage.getItem(goalID);
        var impact = sessionStorage.getItem(impactID);
        
        var PlanningID = db_insertPlanning(ResourceID, obj, goal, impact);
        if (PlanningID === 0) {
            return false;
        }
    }
    
    return true;
}

function updateRFStatus(ResourceID, Status, ApproverID) {
    db_updateRFStatus(ResourceID, Status, ApproverID);
}

function mod_addResourceLink(ResourceID) {
    var Resource_ParentID = sessionStorage.getItem('m1_Resource_ParentID');
    if (Resource_ParentID !== "0") {
        var result = new Array();
        result = db_getResourceLink(Resource_ParentID);
        var result_count = result.length;
        if (result_count === 0) {
            db_insertResourceLink(Resource_ParentID, Resource_ParentID, Resource_ParentID, 0);
            db_insertResourceLink(ResourceID, Resource_ParentID, Resource_ParentID + "-1", 1);
        }
        else {
            db_insertResourceLink(ResourceID, Resource_ParentID, Resource_ParentID + "-" + result_count, 1);
        }
    }
}

function mod_updateResourceLink(ResourceID) {
    var Resource_ParentID = sessionStorage.getItem('m1_Resource_ParentID');
    var str_Resource_Parent = db_getResourceLinkByResourceID(ResourceID);
    
    if (Resource_ParentID === "0") {
        if (str_Resource_Parent === null) {
            return;
        }
        
        db_deleteResourceLinkByReourceID(ResourceID);
        
        var result = new Array();
        result = db_getResourceLink(str_Resource_Parent);
        var result_count = result.length;
        if (result_count === 1) {
            db_deleteResourceLink(str_Resource_Parent);
        }
    }
    else {
        if (Resource_ParentID === str_Resource_Parent) {
            return;
        }
        else {
            var result = new Array();
            result = db_getResourceLink(Resource_ParentID);
            var result_count = result.length;
            
            if (result_count === 0) {
                db_insertResourceLink(Resource_ParentID, Resource_ParentID, Resource_ParentID, 0);
                if (str_Resource_Parent === null) {
                    db_insertResourceLink(ResourceID, Resource_ParentID, Resource_ParentID + "-1", 1);
                }
                else {
                    if (result_count === 0) {
                        db_updateResourceLink(ResourceID, Resource_ParentID, Resource_ParentID + "-1", 1);
                    }
                    else {
                        db_updateResourceLink(ResourceID, Resource_ParentID, Resource_ParentID + "-" + result_count, 1);
                    }
                }
            }
            else {
                var new_resource_parent_ID = result[0][0];
                if (str_Resource_Parent === null) {
                    db_insertResourceLink(ResourceID, new_resource_parent_ID, new_resource_parent_ID + "-" + result_count, 1);
                }
                else {
                    db_updateResourceLink(ResourceID, new_resource_parent_ID, new_resource_parent_ID + "-" + result_count, 1);
                }
            }
        }
    }
}

// get DB //////////////////////////////////////////////////////////////////////
function db_getAllRFList(bSubmitted, FiscalYear) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAllRFList.php",
        data:{bSubmitted:bSubmitted, FiscalYear:FiscalYear},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getASIVCReportList(FiscalYear) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getASIVCReportList.php",
        data:{FiscalYear:FiscalYear},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getLoginUserRFList(login_email, FiscalYear) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getLoginUserRFList.php",
        data:{LoginEmail:login_email, FiscalYear:FiscalYear},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    return result;
}

function db_getLoginUserRFLinkList(login_email) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getLoginUserRFLinkList.php",
        data:{LoginEmail:login_email},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCCUserRFList(login_email, FiscalYear) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCCUserRFList.php",
        data:{LoginEmail:login_email, FiscalYear:FiscalYear},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFacilitiesReviewRFList(login_email) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFacilitiesReviewRFList.php",
        data:{LoginEmail:login_email},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTechReviewRFList(login_email) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTechReviewRFList.php",
        data:{LoginEmail:login_email},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminRFList(FiscalYear, ReviewPeriodID, Status, StageLevel, StageAppEmail, ResourceType, Program, FundingSrc, OneTime) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminRFList.php",
        data:{FiscalYear:FiscalYear, ReviewPeriodID:ReviewPeriodID, Status:Status, StageLevel:StageLevel, StageAppEmail:StageAppEmail, ResourceType:ResourceType, Program:Program, FundingSrc:FundingSrc, OneTime:OneTime},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCommitteeWorksheetList(FiscalYear, ReviewPeriodID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCommitteeWorksheetList.php",
        data:{FiscalYear:FiscalYear, ReviewPeriodID:ReviewPeriodID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCommitteeRatingList(SqlSelect, SqlFrom, SqlWhere, RatedByID, ResourceType, Program, FundingSrc, OneTime) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCommitteeRatingList.php",
        data:{SqlSelect:SqlSelect, SqlFrom:SqlFrom, SqlWhere:SqlWhere, RatedByID:RatedByID, ResourceType:ResourceType, Program:Program, FundingSrc:FundingSrc, OneTime:OneTime},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceType(ResourceTypeItem) {   
    var RTID = 0;
    $.ajax({
        type:"POST",
        url:"php/db_getResourceType.php",
        data:{ResourceType:ResourceTypeItem},
        async: false,  
        success:function(data) {
            RTID = JSON.parse(data);
        }
    });
    return RTID;
}

function db_getResourceTypeAll() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceTypeAll.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceTypeItem(ResourceID) {  
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getResourceTypeItem.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceTypeItemNew(ResourceID) {  
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getResourceTypeItemNew.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getProgram(ProgramType) {   
    var ProgramID = 0;
    $.ajax({
        type:"POST",
        url:"php/db_getProgram.php",
        data:{ProgramType:ProgramType},
        async: false,  
        success:function(data) {
            ProgramID = JSON.parse(data);
        }
    });
    return ProgramID;
}

function db_getResourceStep(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceStep.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCC(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCC.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPersonnelType(ptype) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getPersonnelType.php",
        data:{PersonnelType:ptype},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCBQuestionnaire(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCBQuestionnaire.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSelectedCB_ID(PositionName) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/getSelectedCB_ID.php",
        data:{PositionName:PositionName},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSelectedCM_ID(PositionName) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/getSelectedCM_ID.php",
        data:{PositionName:PositionName},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function mod_getAttachFiles() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    var RType = sessionStorage.getItem('m3_radioRType');
    
    return db_getAttachFiles(ResourceID, RType);
}

function db_getAttachFiles(ResourceID, RType) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAttachFiles.php",
        data:{ResourceID:ResourceID, RType:RType},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCreatorID(CreatorEmail) {   
    var CreatorID = 0;
    $.ajax({
        type:"POST",
        url:"php/db_getCreatorID.php",
        data:{CreatorEmail:CreatorEmail},
        async: false,  
        success:function(data) {
            CreatorID = JSON.parse(data);
        }
    });
    return CreatorID;
}

function db_getResourceLink(ResourceParentID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceLink.php",
        data:{ResourceParentID:ResourceParentID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceLinkByResourceID(ResourceID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getResourceLinkByResourceID.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTransactions(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTransactions.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundingSrc(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundingSrc.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getApproverID(ApproverEmail) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getApprover.php",
        data:{ApproverEmail:ApproverEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResource2(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResource2.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceRanking(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceRanking.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getApproverByID(ApproverID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getApproverByID.php",
        data:{ApproverID:ApproverID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPerkinsAttach(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPerkinsAttach.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getBSIAttach(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getBSIAttach.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStageLevelID(StageLevel) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getStageLevelID.php",
        data:{StageLevel:StageLevel},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceStatusID(ResourceStatus) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getResourceStatusID.php",
        data:{ResourceStatus:ResourceStatus},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceApproverID(ResourceID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getResourceApproverID.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getBacktodraft(ResourceID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getBacktodraft.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEnableSubmitBtn() {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getEnableSubmitBtn.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEnableMgrWorksheet() {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getEnableMgrWorksheet.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEnableCommitteeWorksheet() {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getEnableCommitteeWorksheet.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getApproverList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getApproverList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceStatusList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceStatusList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStageLevelList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStageLevelList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceFormSelected(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceFormSelected.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceStageSelected(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceStageSelected.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getApprovedAmount(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getApprovedAmount.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCBSalaryRange() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCBSalaryRange.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCBSalary(JobRange) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getCBSalary.php",
        data:{JobRange:JobRange},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCMSalaryRange() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCMSalaryRange.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCMSalary(JobRange) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getCMSalary.php",
        data:{JobRange:JobRange},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundSrcType(FundSrcCol) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundSrcType.php",
        data:{FundSrcCol:FundSrcCol},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundSrcTypeAll() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundSrcTypeAll.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundSrcBudget(FiscalYear, FundSrcCol) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundSrcBudget.php",
        data:{FiscalYear:FiscalYear, FundSrcCol:FundSrcCol},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundSrcBudgetList(FiscalYear) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundSrcBudgetList.php",
        data:{FiscalYear:FiscalYear},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceFundSrc(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceFundSrc.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceFundSrcWithName(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceFundSrcWithName.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceFundSrcBudget(FiscalYear, FundSrcCol) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceFundSrcBudget.php",
        data:{FiscalYear:FiscalYear, FundSrcCol:FundSrcCol},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceFundAmt(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceFundAmt.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceFundAmtTotalList(FiscalYear) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceFundAmtTotalList.php",
        data:{FiscalYear:FiscalYear},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceFundAmtTotalSrc(Column, FiscalYear) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getResourceFundAmtTotalSrc.php",
        data:{Column:Column, FiscalYear:FiscalYear},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceFundAmtSum(ResourceID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getResourceFundAmtSum.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getIVCMgr(username, password, creator_email) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/ldap_getIVCMgr.php",
        data:{username:username, password:password, creator_email:creator_email},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceStatusName(RSID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getResourceStatusName.php",
        data:{RSID:RSID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceFundSrcLog(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceFundSrcLog.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAllResourceFiscalYear() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAllResourceFiscalYear.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceFSBSI(ResourceID) {
    var result;
    $.ajax({
        type:"POST",
        url:"php/db_getResourceFSBSI.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCommentsMgr(ResourceID) {
    var result;
    $.ajax({
        type:"POST",
        url:"php/db_getCommentsMgr.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCommentsVPP(ResourceID) {
    var result;
    $.ajax({
        type:"POST",
        url:"php/db_getCommentsVPP.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

////////////////////////////////////////////////////////////////////////////////
function db_getrateCHPLDTF(rateCHPLDTF_ID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateCHPLDTF.php",
        data:{rateCHPLDTF_ID:rateCHPLDTF_ID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateCHPLDTFUser(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateCHPLDTFUser.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateCHPLDTFActive(ResourceID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getrateCHPLDTFActive.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateSSAMMO(rateSSAMMO_ID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateSSAMMO.php",
        data:{rateSSAMMO_ID:rateSSAMMO_ID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateSSAMMOUser(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateSSAMMOUser.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateSSAMMOActive(ResourceID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getrateSSAMMOActive.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateSSAMMOColumnRating(ResourceID, Column) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getrateSSAMMOColumnRating.php",
        data:{ResourceID:ResourceID, Column:Column},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateAPTC(rateAPTC_ID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateAPTC.php",
        data:{rateAPTC_ID:rateAPTC_ID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateAPTCUser(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateAPTCUser.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateAPTCActive(ResourceID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getrateAPTCActive.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateAPTCColumnRating(ResourceID, Column) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getrateAPTCColumnRating.php",
        data:{ResourceID:ResourceID, Column:Column},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateBDRPC(rateBDRPC_ID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateBDRPC.php",
        data:{rateBDRPC_ID:rateBDRPC_ID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateBDRPCUser(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateBDRPCUser.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateBDRPCActive(ResourceID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getrateBDRPCActive.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateBDRPCColumnRating(ResourceID, Column) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getrateBDRPCColumnRating.php",
        data:{ResourceID:ResourceID, Column:Column},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateIEC(rateIEC_ID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateIEC.php",
        data:{rateIEC_ID:rateIEC_ID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateIECUser(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateIECUser.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateIECActive(ResourceID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getrateIECActive.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateIECColumnRating(ResourceID, Column) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getrateIECColumnRating.php",
        data:{ResourceID:ResourceID, Column:Column},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateSPAC(rateSPAC_ID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateSPAC.php",
        data:{rateSPAC_ID:rateSPAC_ID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateSPACUser(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateSPACUser.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateSPACActive(ResourceID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getrateSPACActive.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateSPACColumnRating(ResourceID, Column) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getrateSPACColumnRating.php",
        data:{ResourceID:ResourceID, Column:Column},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

////////////////////////////////////////////////////////////////////////////////
function db_getmbrCHPLDTF(chpUserEmail, chpUserAdmin) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getmbrCHPLDTF.php",
        data:{chpUserEmail:chpUserEmail, chpUserAdmin:chpUserAdmin},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getmbrCHPLDTFColumnName(chpUserEmail) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getmbrCHPLDTFColumnName.php",
        data:{chpUserEmail:chpUserEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getmbrSSAMMO(ssaUserEmail, ssaUserAdmin) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getmbrSSAMMO.php",
        data:{ssaUserEmail:ssaUserEmail, ssaUserAdmin:ssaUserAdmin},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getmbrSSAMMOColumnName(ssaUserEmail) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getmbrSSAMMOColumnName.php",
        data:{ssaUserEmail:ssaUserEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getmbrAPTC(aptUserEmail, aptUserAdmin) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getmbrAPTC.php",
        data:{aptUserEmail:aptUserEmail, aptUserAdmin:aptUserAdmin},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getmbrAPTCColumnName(aptUserEmail) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getmbrAPTCColumnName.php",
        data:{aptUserEmail:aptUserEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getmbrBDRPC(bdrUserEmail, bdrUserAdmin) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getmbrBDRPC.php",
        data:{bdrUserEmail:bdrUserEmail, bdrUserAdmin:bdrUserAdmin},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getmbrBDRPCColumnName(bdrUserEmail) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getmbrBDRPCColumnName.php",
        data:{bdrUserEmail:bdrUserEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getmbrIEC(iecUserEmail, iecUserAdmin) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getmbrIEC.php",
        data:{iecUserEmail:iecUserEmail, iecUserAdmin:iecUserAdmin},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getmbrIECColumnName(iecUserEmail) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getmbrIECColumnName.php",
        data:{iecUserEmail:iecUserEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getmbrSPAC(spaUserEmail, spaUserAdmin) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getmbrSPAC.php",
        data:{spaUserEmail:spaUserEmail, spaUserAdmin:spaUserAdmin},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getmbrSPACColumnName(spaUserEmail) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getmbrSPACColumnName.php",
        data:{spaUserEmail:spaUserEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

////////////////////////////////////////////////////////////////////////////////
function db_getrateCHPLDTFList(FiscalYear) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateCHPLDTFList.php",
        data:{FiscalYear:FiscalYear},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateSSAMMOList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateSSAMMOList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateAPTCList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateAPTCList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateBDRPCList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateBDRPCList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateIECList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateIECList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateSPACList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateSPACList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEnableCommitteeRating() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEnableCommitteeRating.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateMgr(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getrateMgr.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateMgrCkb(ResourceID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getrateMgrCkb.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getrateVPPCkb(ResourceID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getrateVPPCkb.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// review period ///////////////////////////////////////////////////////////////
function db_getReviewPeriodList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getReviewPeriodList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getReviewPeriodID(SubmitDate) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getReviewPeriodID.php",
        data:{SubmitDate:SubmitDate},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getReviewPeriodByID(ReviewPeriodID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getReviewPeriodByID.php",
        data:{ReviewPeriodID:ReviewPeriodID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceRP(ResourceID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceRP.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// insert DB ///////////////////////////////////////////////////////////////////
function mod_AddLogin() {
    var loginName = sessionStorage.getItem('m1_loginName');
    var loginEmail = sessionStorage.getItem('m1_loginEmail');
    var loginTitle = sessionStorage.getItem('m1_loginTitle');
    var loginDiv = sessionStorage.getItem('m1_loginDiv');
    
    return db_insertLogin(loginName, loginEmail, loginTitle, loginDiv);
}

function db_insertLogin(loginName, loginEmail, loginTitle, loginDiv) {
    var loginID = "";
    loginName = textReplaceApostrophe(loginName);
    loginTitle = textReplaceApostrophe(loginTitle);
    loginDiv = textReplaceApostrophe(loginDiv);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertLogin.php",
        data:{LoginName:loginName, LoginEmail:loginEmail, LoginTitle:loginTitle, LoginDepart:loginDiv},
        async: false,  
        success:function(data) {
            loginID = JSON.parse(data);
        }
    });
    
    return loginID;
}

function mod_AddCreator() {
    var crtName = sessionStorage.getItem('m1_creatorName');
    var crtEmail = sessionStorage.getItem('m1_creatorEmail');
    var crtTitle = sessionStorage.getItem('m1_creatorTitle');
    var crtDiv = sessionStorage.getItem('m1_creatorDiv');
    
    if (crtName === null || crtEmail === "") {
        return "";
    }
    if (crtEmail === null || crtEmail === "") {
        return "";
    }
    if (crtTitle === null || crtTitle === "") {
        return "";
    }
    if (crtDiv === null || crtDiv === "") {
        return "";
    }
    
    return db_insertCreator(crtName, crtEmail, crtTitle, crtDiv);
}

function db_insertCreator(crtName, crtEmail, crtTitle, crtDiv) {
    var creatorID = "";
    crtName = textReplaceApostrophe(crtName);
    crtTitle = textReplaceApostrophe(crtTitle);
    crtDiv = textReplaceApostrophe(crtDiv);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertCreator.php",
        data:{CreatorName:crtName, CreatorEmail:crtEmail, CreatorTitle:crtTitle, CreatorDepart:crtDiv},
        async: false,  
        success:function(data) {
            creatorID = JSON.parse(data);
        }
    });
    
    return creatorID;
}

function mod_AddApprover(appName, appEmail, appTitle, appDiv) {
    return db_insertApprover(appName, appEmail, appTitle, appDiv);
}

function db_insertApprover(appName, appEmail, appTitle, appDiv) {
    var ApproverID = "";
    appName = textReplaceApostrophe(appName);
    appTitle = textReplaceApostrophe(appTitle);
    appDiv = textReplaceApostrophe(appDiv);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertApprover.php",
        data:{AppName:appName, AppEmail:appEmail, AppTitle:appTitle, AppDepart:appDiv},
        async: false,  
        success:function(data) {
            ApproverID = JSON.parse(data);
        }
    });
    
    return ApproverID;
}

function mod_AddResource(LoginID, CreatorID, status) {
    var date = sessionStorage.getItem('m1_currentDate');
    var fiscal = sessionStorage.getItem('m1_fiscal');
    var propTitle = sessionStorage.getItem('m1_propTitle');
    var needFor = sessionStorage.getItem('m1_needFor');
    var onetime = (sessionStorage.getItem('m1_one_time') === "true" ? 1 : 0);
    var need_by = sessionStorage.getItem('m1_need_by');
    
    return db_insertResource(LoginID, CreatorID, date, fiscal, propTitle, needFor, status, onetime, need_by);
}

function db_insertResource(LoginID, CreatorID, date, fiscal, propTitle, needFor, status, onetime, NeedBy) {
    var ResourceID = "";    
    propTitle = textReplaceApostrophe(propTitle);
    needFor = textReplaceApostrophe(needFor);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertResource.php",
        data:{LoginID:LoginID, CreatorID:CreatorID, FiscalYear:fiscal, ProposalTitle:propTitle, NeedFor:needFor, strDate:date, status:status, onetime:onetime, NeedBy:NeedBy},
        async: false,  
        success:function(data) {
            ResourceID = JSON.parse(data);
        }
    });
    
    return ResourceID;
}

function mod_AddResourceTypeItem(ResourceID) {
    var RTID = db_getResourceType(sessionStorage.getItem('m3_radioRType'));
    
    var result_ID = "";
    result_ID = db_insertResourceTypeItem(ResourceID, RTID);
    
    return result_ID;
}

function db_insertResourceTypeItem(ResourceID, RTID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertResourceTypeItem.php",
        data:{ResourceID:ResourceID, RTID:RTID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertResourceTypeItemNew(ResourceID, RTID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertResourceTypeItemNew.php",
        data:{ResourceID:ResourceID, RTID:RTID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function mod_AddResourceProg(ResourceID) {
    var ProgramID = db_getProgram(sessionStorage.getItem('m1_prog_type'));
    return db_insertResourceProg(ResourceID, ProgramID);
}

function db_insertResourceProg(ResourceID, ProgramID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertResourceProg.php",
        data:{ResourceID:ResourceID, ProgramID:ProgramID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertCC(ResourceID, name, email, title, division) {
    var ResultID = "";
    name = textReplaceApostrophe(name);
    title = textReplaceApostrophe(title);
    division = textReplaceApostrophe(division);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertCC.php",
        data:{ResourceID:ResourceID, CCName:name, CCEmail:email, CCTitle:title, CCDepartment:division},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    
    return ResultID;
}

function db_insertResourceStep(ResourceID, ResourceStep, ResourcePage) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertResourceStep.php",
        data:{ResourceID:ResourceID, ResourceStep:ResourceStep, ResourcePage:ResourcePage},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPersonnel(ResourceID, PTID, Title, Range, Month, HrsWk, AnnualSalary, AnnualBenefits, AnnualTotal, PositionImpact, HrRate, NewPosition) {
    var ResultID = "";    
    Title = textReplaceApostrophe(Title);
    NewPosition = textReplaceApostrophe(NewPosition);
    PositionImpact = textReplaceApostrophe(PositionImpact);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertPersonnel.php",
        data:{ResourceID:ResourceID, PersonnelTypeID:PTID, Title:Title, Range:Range, Month:Month, Step:1, HrsWk:HrsWk,
                AnnualSalary:AnnualSalary, AnnualBenefits:AnnualBenefits, AnnualTotal:AnnualTotal, PositionImpact:PositionImpact, HrRate:HrRate, NewPosition:NewPosition},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    
    return ResultID;
}

function db_insertCBQuestionnaire(ResourceID, field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11, field12, field13, field14) {
    var ResultID = "";    
    field1 = textReplaceApostrophe(field1);
    field2 = textReplaceApostrophe(field2);
    field3 = textReplaceApostrophe(field3);
    field4 = textReplaceApostrophe(field4);
    field5 = textReplaceApostrophe(field5);
    field6 = textReplaceApostrophe(field6);
    field7 = textReplaceApostrophe(field7);
    field8 = textReplaceApostrophe(field8);
    field9 = textReplaceApostrophe(field9);
    field10 = textReplaceApostrophe(field10);
    field11 = textReplaceApostrophe(field11);
    field12 = textReplaceApostrophe(field12);
    field13 = textReplaceApostrophe(field13);
    field14 = textReplaceApostrophe(field14);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertCBQuestionnaire.php",
        data:{ResourceID:ResourceID, Field1:field1, Field2:field2, Field3:field3, Field4:field4, Field5:field5, Field6:field6, Field7:field7,
                Field8:field8, Field9:field9, Field10:field10, Field11:field11, Field12:field12, Field13:field13, Field14:field14},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    
    return ResultID;
}

function db_insertFacilities(ResourceID, ItemReq, Location, EstAmt, EstDescrip, alt) {
    var ResultID = "";
    ItemReq = textReplaceApostrophe(ItemReq);
    Location = textReplaceApostrophe(Location);
    EstDescrip = textReplaceApostrophe(EstDescrip);
    alt = textReplaceApostrophe(alt);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertFacilities.php",
        data:{ResourceID:ResourceID, ItemReq:ItemReq, Location:Location, EstAmt:EstAmt, EstDescrip:EstDescrip, Alternative:alt},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    
    return ResultID;
}

function db_insertInstructional(ResourceID, sch_div, ex_life, descrip, qty, cost, total) {
    var ResultID = "";
    sch_div = textReplaceApostrophe(sch_div);
    ex_life = textReplaceApostrophe(ex_life);
    descrip = textReplaceApostrophe(descrip);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertInstructional.php",
        data:{ResourceID:ResourceID, sch_div:sch_div, ex_life:ex_life, descrip:descrip, qty:qty, cost:cost, total:total},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    
    return ResultID;
}

function db_insertTechnology(ResourceID, ItemReq, Location, ASInformation, HardwareTotal, MaintenanceTotal,
                                TaxTotal, SoftwareTotal, ShippingTotal, InstallationTotal, AdditionalTotal,
                                TotalTaxable, TotalNontaxable, GrandTotal, Alternative) {
    var ResultID = "";
    ItemReq = textReplaceApostrophe(ItemReq);
    Location = textReplaceApostrophe(Location);
    ASInformation = textReplaceApostrophe(ASInformation);
    Alternative = textReplaceApostrophe(Alternative);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertTechnology.php",
        data:{ResourceID:ResourceID, ItemReq:ItemReq, Location:Location, ASInformation:ASInformation, HardwareTotal:HardwareTotal, MaintenanceTotal:MaintenanceTotal,
                TaxTotal:TaxTotal, SoftwareTotal:SoftwareTotal, ShippingTotal:ShippingTotal, InstallationTotal:InstallationTotal, AdditionalTotal:AdditionalTotal,
                TotalTaxable:TotalTaxable, TotalNontaxable:TotalNontaxable, GrandTotal:GrandTotal, Alternative:Alternative},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    
    return ResultID;
}

function db_insertTechnologyItems(ResourceID, ItemType, ItemDescrip, ItemQty, ItemCost, ItemTotal, ItemMaint, ItemYrs, ItemAnnCost, ItemMaintTotal) {
    var ResultID = "";
    ItemType = textReplaceApostrophe(ItemType);
    ItemDescrip = textReplaceApostrophe(ItemDescrip);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertTechnologyItems.php",
        data:{ResourceID:ResourceID, ItemType:ItemType, ItemDescrip:ItemDescrip, ItemQty:ItemQty, ItemCost:ItemCost, 
                ItemTotal:ItemTotal, ItemMaint:ItemMaint, ItemYrs:ItemYrs, ItemAnnCost:ItemAnnCost, ItemMaintTotal:ItemMaintTotal},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    
    return ResultID;
}

function db_insertOther2(ResourceID, Description, TotalAmount) {
    var ResultID = "";
    Description = textReplaceApostrophe(Description);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertOther2.php",
        data:{ResourceID:ResourceID, Description:Description, TotalAmount:TotalAmount},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    
    return ResultID;
}

function db_insertOther2Items(ResourceID, Item, Qty, Cost, Total) {
    var ResultID = "";
    Item = textReplaceApostrophe(Item);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertOther2Items.php",
        data:{ResourceID:ResourceID, Item:Item, Qty:Qty, Cost:Cost, Total:Total},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    
    return ResultID;
}

function db_insertPlanning(ResourceID, Objective, Goal, Description) {
    var ResultID = "";
    Description = textReplaceApostrophe(Description);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertPlanning.php",
        data:{ResourceID:ResourceID, Objective:Objective, Goal:Goal, Description:Description},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    
    return ResultID;
}

function db_insertTransactions(ResourceID, LoginName, Note) {
    var ResultID = "";
    Note = textReplaceApostrophe(Note);
    
    $.ajax({
        type:"POST",
        url:"php/db_insertTransactions.php",
        data:{ResourceID:ResourceID, LoginName:LoginName, Note:Note},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    
    return ResultID;
}

function db_insertResourceStage(ResourceID, StageLevelID, ApproverID, ResourceStatusID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertResourceStage.php",
        data:{ResourceID:ResourceID, StageLevelID:StageLevelID, ApproverID:ApproverID, ResourceStatusID:ResourceStatusID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPriority(ResourceID, DepartMgr, VPP, CHPLDTF, TATF, SSAMMO, ATPC, BDRPC, SPAC, PEC) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPriority.php",
        data:{ResourceID:ResourceID, DepartMgr:DepartMgr, VPP:VPP,
                CHPLDTF:CHPLDTF, TATF:TATF, SSAMMO:SSAMMO, ATPC:ATPC, BDRPC:BDRPC, SPAC:SPAC, PEC:PEC},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertResourceLink(ResourceID, ResourceParentID, ResourceLinkNum, Child) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertResourceLink.php",
        data:{ResourceID:ResourceID, ResourceParentID:ResourceParentID, ResourceLinkNum:ResourceLinkNum, Child:Child},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertFundingSrc(ResourceID, General, Perkins, BSI, IVCFoundation, ASIVC, Other, OtherDescription) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertFundingSrc.php",
        data:{ResourceID:ResourceID, General:General, Perkins:Perkins, BSI:BSI, IVCFoundation:IVCFoundation, ASIVC:ASIVC, Other:Other, OtherDescription:OtherDescription},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertBacktodraft(ResourceID, Resubmit) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertBacktodraft.php",
        data:{ResourceID:ResourceID, Resubmit:Resubmit},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

//function db_insertApprovedAmount(ResourceID, Gen_Amt, Per_Amt, BSI_Amt, Fou_Amt, ASI_Amt, Oth_Amt, T_Amt) {
//    var ResultID = "";
//    $.ajax({
//        type:"POST",
//        url:"php/db_insertApprovedAmount.php",
//        data:{ResourceID:ResourceID, Gen_Amt:Gen_Amt, Per_Amt:Per_Amt, BSI_Amt:BSI_Amt, Fou_Amt:Fou_Amt, ASI_Amt:ASI_Amt, Oth_Amt:Oth_Amt, T_Amt:T_Amt},
//        async: false,  
//        success:function(data) {
//            ResultID = JSON.parse(data);
//        }
//    });
//    return ResultID;
//}

function db_insertFundSrcBudget(FiscalYear, FundSrcCol, BudgetAmt, BalanceAmt) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertFundSrcBudget.php",
        data:{FiscalYear:FiscalYear, FundSrcCol:FundSrcCol, BudgetAmt:BudgetAmt, BalanceAmt:BalanceAmt},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function stepRF_ResourceFundSrc(ResourceID, insert) {
    var fs_1 = (sessionStorage.getItem('mFS_fs_1') === "true" ? true : false);
    var fs_2 = (sessionStorage.getItem('mFS_fs_2') === "true" ? true : false);
    var fs_3 = (sessionStorage.getItem('mFS_fs_3') === "true" ? true : false);
    var fs_4 = (sessionStorage.getItem('mFS_fs_4') === "true" ? true : false);
    var fs_5 = (sessionStorage.getItem('mFS_fs_5') === "true" ? true : false);
    var fs_6 = (sessionStorage.getItem('mFS_fs_6') === "true" ? true : false);
    var fs_7 = (sessionStorage.getItem('mFS_fs_7') === "true" ? true : false);
    var fs_8 = (sessionStorage.getItem('mFS_fs_8') === "true" ? true : false);
    var fs_9 = (sessionStorage.getItem('mFS_fs_9') === "true" ? true : false);
    var fs_10 = (sessionStorage.getItem('mFS_fs_10') === "true" ? true : false);
    var fs_11 = (sessionStorage.getItem('mFS_fs_11') === "true" ? true : false);
    var fs_12 = (sessionStorage.getItem('mFS_fs_12') === "true" ? true : false);
    var fs_13 = (sessionStorage.getItem('mFS_fs_13') === "true" ? true : false);
    var fs_14 = (sessionStorage.getItem('mFS_fs_14') === "true" ? true : false);
    var fs_15 = (sessionStorage.getItem('mFS_fs_15') === "true" ? true : false);
    var fs_16 = (sessionStorage.getItem('mFS_fs_16') === "true" ? true : false);
    var fs_17 = (sessionStorage.getItem('mFS_fs_17') === "true" ? true : false);
    var fs_18 = (sessionStorage.getItem('mFS_fs_18') === "true" ? true : false);
    var fs_19 = (sessionStorage.getItem('mFS_fs_19') === "true" ? true : false);
    var fs_20 = (sessionStorage.getItem('mFS_fs_20') === "true" ? true : false);
    var fs_21 = (sessionStorage.getItem('mFS_fs_21') === "true" ? true : false);
    var fs_22 = (sessionStorage.getItem('mFS_fs_22') === "true" ? true : false);
    var fs_23 = (sessionStorage.getItem('mFS_fs_23') === "true" ? true : false);
    var fs_comments = sessionStorage.getItem('mFS_fs_comments');
    
    var result = db_getResourceFundSrc(ResourceID);
    if (insert && result.length === 0) {
        return db_insertResourceFundSrc(ResourceID, fs_1, fs_2, fs_3, fs_4, fs_5, fs_6, fs_7, fs_8, fs_9, fs_10, fs_11, fs_12, fs_13, fs_14, fs_15, fs_16, fs_17, fs_18, fs_19, fs_20, fs_21, fs_22, fs_23, fs_comments);
    }
    else {
        return db_updateResourceFundSrc(ResourceID, fs_1, fs_2, fs_3, fs_4, fs_5, fs_6, fs_7, fs_8, fs_9, fs_10, fs_11, fs_12, fs_13, fs_14, fs_15, fs_16, fs_17, fs_18, fs_19, fs_20, fs_21, fs_22, fs_23, fs_comments);
    }
}

function db_insertResourceFundSrc(ResourceID, fs_1, fs_2, fs_3, fs_4, fs_5, fs_6, fs_7, fs_8, fs_9, fs_10, fs_11, fs_12, fs_13, fs_14, fs_15, fs_16, fs_17, fs_18, fs_19, fs_20, fs_21, fs_22, fs_23, fs_comments) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertResourceFundSrc.php",
        data:{ResourceID:ResourceID, fs_1:fs_1, fs_2:fs_2, fs_3:fs_3, fs_4:fs_4, fs_5:fs_5, fs_6:fs_6, fs_7:fs_7, fs_8:fs_8, fs_9:fs_9, fs_10:fs_10, fs_11:fs_11, fs_12:fs_12, fs_13:fs_13, fs_14:fs_14, fs_15:fs_15,
                fs_16:fs_16, fs_17:fs_17, fs_18:fs_18, fs_19:fs_19, fs_20:fs_20, fs_21:fs_21, fs_22:fs_22, fs_23:fs_23, fs_comments:fs_comments},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertResourceFundAmt(ResourceID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertResourceFundAmt.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

////////////////////////////////////////////////////////////////////////////////
function db_insertmbrCHPLDTF(chpUserName, chpUserEmail, chpUserAdmin) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertmbrCHPLDTF.php",
        data:{chpUserName:chpUserName, chpUserEmail:chpUserEmail, chpUserAdmin:chpUserAdmin},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertmbrSSAMMO(ssaUserName, ssaUserEmail, ssaUserAdmin) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertmbrSSAMMO.php",
        data:{ssaUserName:ssaUserName, ssaUserEmail:ssaUserEmail, ssaUserAdmin:ssaUserAdmin},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertmbrAPTC(aptUserName, aptUserEmail, aptUserAdmin) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertmbrAPTC.php",
        data:{aptUserName:aptUserName, aptUserEmail:aptUserEmail, aptUserAdmin:aptUserAdmin},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertmbrBDRPC(bdrUserName, bdrUserEmail, bdrUserAdmin) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertmbrBDRPC.php",
        data:{bdrUserName:bdrUserName, bdrUserEmail:bdrUserEmail, bdrUserAdmin:bdrUserAdmin},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertmbrIEC(iecUserName, iecUserEmail, iecUserAdmin) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertmbrIEC.php",
        data:{iecUserName:iecUserName, iecUserEmail:iecUserEmail, iecUserAdmin:iecUserAdmin},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertmbrSPAC(spaUserName, spaUserEmail, spaUserAdmin) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertmbrSPAC.php",
        data:{spaUserName:spaUserName, spaUserEmail:spaUserEmail, spaUserAdmin:spaUserAdmin},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

////////////////////////////////////////////////////////////////////////////////
function db_addColumn_rateCHPLDTF(chpColumnName) {
    var ResultID = false;
    $.ajax({
        type:"POST",
        url:"php/db_addColumn_rateCHPLDTF.php",
        data:{chpColumnName:chpColumnName},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_addColumn_rateSSAMMO(ssaColumnName) {
    var ResultID = false;
    $.ajax({
        type:"POST",
        url:"php/db_addColumn_rateSSAMMO.php",
        data:{ssaColumnName:ssaColumnName},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_addColumn_rateAPTC(aptColumnName) {
    var ResultID = false;
    $.ajax({
        type:"POST",
        url:"php/db_addColumn_rateAPTC.php",
        data:{aptColumnName:aptColumnName},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_addColumn_rateBDRPC(bdrColumnName) {
    var ResultID = false;
    $.ajax({
        type:"POST",
        url:"php/db_addColumn_rateBDRPC.php",
        data:{bdrColumnName:bdrColumnName},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_addColumn_rateIEC(iecColumnName) {
    var ResultID = false;
    $.ajax({
        type:"POST",
        url:"php/db_addColumn_rateIEC.php",
        data:{iecColumnName:iecColumnName},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_addColumn_rateSPAC(spaColumnName) {
    var ResultID = false;
    $.ajax({
        type:"POST",
        url:"php/db_addColumn_rateSPAC.php",
        data:{spaColumnName:spaColumnName},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

////////////////////////////////////////////////////////////////////////////////
function db_insertrateMgr(ResourceID, ApproverID, Active) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertrateMgr.php",
        data:{ResourceID:ResourceID, ApproverID:ApproverID, Active:Active},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertrateVPP(ResourceID, ApproverID, Active) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertrateVPP.php",
        data:{ResourceID:ResourceID, ApproverID:ApproverID, Active:Active},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertrateAll(ResourceID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertrateAll.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertrateAPTC(ResourceID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertrateAPTC.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertrateBDRPC(ResourceID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertrateBDRPC.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertrateCHPLDTF(ResourceID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertrateCHPLDTF.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertrateIEC(ResourceID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertrateIEC.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertrateSPAC(ResourceID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertrateSPAC.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertrateSSAMMO(ResourceID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertrateSSAMMO.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertResourceFundSrcLog(ResourceID, LoginName, Note) {
    var ResultID = "";    
    $.ajax({
        type:"POST",
        url:"php/db_insertResourceFundSrcLog.php",
        data:{ResourceID:ResourceID, LoginName:LoginName, Note:Note},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertResourceFSBSI(ResourceID) {
    var ResultID = "";    
    $.ajax({
        type:"POST",
        url:"php/db_insertResourceFSBSI.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertCommentsMgr(ResourceID, ApproverID, Comments) {
    var ResultID = "";    
    $.ajax({
        type:"POST",
        url:"php/db_insertCommentsMgr.php",
        data:{ResourceID:ResourceID, ApproverID:ApproverID, Comments:Comments},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertCommentsVPP(ResourceID, ApproverID, Comments) {
    var ResultID = "";    
    $.ajax({
        type:"POST",
        url:"php/db_insertCommentsVPP.php",
        data:{ResourceID:ResourceID, ApproverID:ApproverID, Comments:Comments},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

// review period ///////////////////////////////////////////////////////////////
function db_insertReviewPeriod(Active, ReviewPeriod, RPStartDate, RPEndDate) {
    var ResultID = "";    
    $.ajax({
        type:"POST",
        url:"php/db_insertReviewPeriod.php",
        data:{Active:Active, ReviewPeriod:ReviewPeriod, RPStartDate:RPStartDate, RPEndDate:RPEndDate},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertResourceRP(ResourceID, ReviewPeriodID) {
    var ResultID = "";    
    $.ajax({
        type:"POST",
        url:"php/db_insertResourceRP.php",
        data:{ResourceID:ResourceID, ReviewPeriodID:ReviewPeriodID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

// update DB ///////////////////////////////////////////////////////////////////
function mod_updateResource(ResourceID, CreatorID, status) {
    var date = sessionStorage.getItem('m1_currentDate');
    var fiscal = sessionStorage.getItem('m1_fiscal');
    var propTitle = sessionStorage.getItem('m1_propTitle');
    var needFor = sessionStorage.getItem('m1_needFor');
    var onetime = (sessionStorage.getItem('m1_one_time') === "true" ? 1 : 0);
    var need_by = sessionStorage.getItem('m1_need_by');
    
    return db_updateResource(ResourceID, CreatorID, date, fiscal, propTitle, needFor, status, onetime, need_by);
}

function db_updateResource(ResourceID, CreatorID, date, fiscal, propTitle, needFor, status, onetime, NeedBy) {
    var Result = false;
    propTitle = textReplaceApostrophe(propTitle);
    needFor = textReplaceApostrophe(needFor);
    
    $.ajax({
        type:"POST",
        url:"php/db_updateResource.php",
        data:{ResourceID:ResourceID, CreatorID:CreatorID, strDate:date, FiscalYear:fiscal, ProposalTitle:propTitle, NeedFor:needFor, status:status, onetime:onetime, NeedBy:NeedBy},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    
    return Result;
}

function db_updateResourceOneTime(ResourceID, OneTime) {
    var Result = false;    
    $.ajax({
        type:"POST",
        url:"php/db_updateResourceOneTime.php",
        data:{ResourceID:ResourceID, OneTime:OneTime},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateResourceRanking(ResourceID, Connect, BEP, Impact) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateResourceRanking.php",
        data:{ResourceID:ResourceID, Connect:Connect, BEP:BEP, Impact:Impact},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function mod_updateResourceTypeItem(ResourceID) {
    var RTID = db_getResourceType(sessionStorage.getItem('m3_radioRType'));
    
    var result = false;
    result = db_updateResourceTypeItem(ResourceID, RTID);
    return result;
}

function db_updateResourceTypeItem(ResourceID, RTID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateResourceTypeItem.php",
        data:{ResourceID:ResourceID, RTID:RTID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function mod_updateResourceProg(ResourceID) {
    var ProgramID = db_getProgram(sessionStorage.getItem('m1_prog_type'));
    return db_updateResourcePro(ResourceID, ProgramID);
}

function db_updateResourcePro(ResourceID, ProgramID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateResourceProg.php",
        data:{ResourceID:ResourceID, ProgramID:ProgramID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function mod_updateResourceStep(Step, Page) {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');  
    return db_updateResourceStep(ResourceID, Step, Page);
}

function db_updateResourceStep(ResourceID, Step, Page) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateResourceStep.php",
        data:{ResourceID:ResourceID, ResourceStep:Step, ResourcePage:Page},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function mod_updateResourcePage(Page) {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    return db_updateResourceStep(ResourceID, Page);
}

function db_updateResourcePage(ResourceID, Page) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateResourcePage.php",
        data:{ResourceID:ResourceID, ResourcePage:Page},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePersonnel(ResourceID, PTID, Title, Range, Month, HrsWk, AnnualSalary, AnnualBenefits, AnnualTotal, PositionImpact, HrRate, NewPosition) {
    var Result = false;
    Title = textReplaceApostrophe(Title);
    NewPosition = textReplaceApostrophe(NewPosition);
    PositionImpact = textReplaceApostrophe(PositionImpact);
    
    $.ajax({
        type:"POST",
        url:"php/db_updatePersonnel.php",
        data:{ResourceID:ResourceID, PersonnelTypeID:PTID, Title:Title, Range:Range, Month:Month, Step:1, HrsWk:HrsWk,
                AnnualSalary:AnnualSalary, AnnualBenefits:AnnualBenefits, AnnualTotal:AnnualTotal, PositionImpact:PositionImpact, HrRate:HrRate, NewPosition:NewPosition},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    
    return Result;
}

function db_updateCBQuestionnaire(ResourceID, field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11, field12, field13, field14) {
    var Result = false;    
    field1 = textReplaceApostrophe(field1);
    field2 = textReplaceApostrophe(field2);
    field3 = textReplaceApostrophe(field3);
    field4 = textReplaceApostrophe(field4);
    field5 = textReplaceApostrophe(field5);
    field6 = textReplaceApostrophe(field6);
    field7 = textReplaceApostrophe(field7);
    field8 = textReplaceApostrophe(field8);
    field9 = textReplaceApostrophe(field9);
    field10 = textReplaceApostrophe(field10);
    field11 = textReplaceApostrophe(field11);
    field12 = textReplaceApostrophe(field12);
    field13 = textReplaceApostrophe(field13);
    field14 = textReplaceApostrophe(field14);
    
    $.ajax({
        type:"POST",
        url:"php/db_updateCBQuestionnaire.php",
        data:{ResourceID:ResourceID, Field1:field1, Field2:field2, Field3:field3, Field4:field4, Field5:field5, Field6:field6, Field7:field7,
                Field8:field8, Field9:field9, Field10:field10, Field11:field11, Field12:field12, Field13:field13, Field14:field14},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    
    return Result;
}

function db_updateFacilities(ResourceID, ItemReq, Location, EstAmt, EstDescrip, Alternative) {
    var Result = false; 
    ItemReq = textReplaceApostrophe(ItemReq);
    Location = textReplaceApostrophe(Location);
    EstDescrip = textReplaceApostrophe(EstDescrip);
    Alternative = textReplaceApostrophe(Alternative);
    
    $.ajax({
        type:"POST",
        url:"php/db_updateFacilities.php",
        data:{ResourceID:ResourceID, ItemReq:ItemReq, Location:Location, EstAmt:EstAmt, EstDescrip:EstDescrip, Alternative:Alternative},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    
    return Result;
}

function db_updateProjFacilities(ResourceID, ProjAmt, ProjDescrip) {
    var Result = false;   
    ProjDescrip = textReplaceApostrophe(ProjDescrip);
    
    $.ajax({
        type:"POST",
        url:"php/db_updateProjFacilities.php",
        data:{ResourceID:ResourceID, ProjAmt:ProjAmt, ProjDescrip:ProjDescrip},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    
    return Result;
}

function db_updateInstructional(ResourceID, sch_div, ex_life, descrip, qty, cost, total) {
    var Result = false; 
    sch_div = textReplaceApostrophe(sch_div);
    ex_life = textReplaceApostrophe(ex_life);
    descrip = textReplaceApostrophe(descrip);
    
    $.ajax({
        type:"POST",
        url:"php/db_updateInstructional.php",
        data:{ResourceID:ResourceID, sch_div:sch_div, ex_life:ex_life, descrip:descrip, qty:qty, cost:cost, total:total},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    
    return Result;
}

function db_updateTechnology(ResourceID, ItemReq, Location, ASInformation, HardwareTotal, MaintenanceTotal,
                                TaxTotal, SoftwareTotal, ShippingTotal, InstallationTotal, AdditionalTotal,
                                TotalTaxable, TotalNontaxable, GrandTotal, Alternative) {
    var Result = false;
    ItemReq = textReplaceApostrophe(ItemReq);
    Location = textReplaceApostrophe(Location);
    ASInformation = textReplaceApostrophe(ASInformation);
    Alternative = textReplaceApostrophe(Alternative);
    
    $.ajax({
        type:"POST",
        url:"php/db_updateTechnology.php",
        data:{ResourceID:ResourceID, ItemReq:ItemReq, Location:Location, ASInformation:ASInformation, HardwareTotal:HardwareTotal, MaintenanceTotal:MaintenanceTotal,
                TaxTotal:TaxTotal, SoftwareTotal:SoftwareTotal, ShippingTotal:ShippingTotal, InstallationTotal:InstallationTotal, AdditionalTotal:AdditionalTotal,
                TotalTaxable:TotalTaxable, TotalNontaxable:TotalNontaxable, GrandTotal:GrandTotal, Alternative:Alternative},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    
    return Result;
}

function db_updateOther2(ResourceID, Description, TotalAmount) {
    var Result = false;
    Description = textReplaceApostrophe(Description);
    
    $.ajax({
        type:"POST",
        url:"php/db_updateOther2.php",
        data:{ResourceID:ResourceID, Description:Description, TotalAmount:TotalAmount},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    
    return Result;
}

function db_updateRFStatus(ResourceID, Status, ApproverID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateRFStatus.php",
        data:{ResourceID:ResourceID, RSID:Status, ApprovalID:ApproverID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateRFFiscalYear(ResourceID, FiscalYear) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateRFFiscalYear.php",
        data:{ResourceID:ResourceID, FiscalYear:FiscalYear},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateRFSubmissionDate(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateRFSubmissionDate.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateRFStatus2(ResourceID, Status) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateRFStatus2.php",
        data:{ResourceID:ResourceID, RSID:Status},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateResourceStage(ResourceID, StageLevelID, ApproverID, ResourceStatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateResourceStage.php",
        data:{ResourceID:ResourceID, StageLevelID:StageLevelID, ApproverID:ApproverID, ResourceStatusID:ResourceStatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateResourceStage2(ResourceID, StageLevelID, ResourceStatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateResourceStage2.php",
        data:{ResourceID:ResourceID, StageLevelID:StageLevelID, ResourceStatusID:ResourceStatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateResourceLink(ResourceID, ResourceParentID, ResourceLinkNum, Child) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateResourceLink.php",
        data:{ResourceID:ResourceID, ResourceParentID:ResourceParentID, ResourceLinkNum:ResourceLinkNum, Child:Child},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateFundingSrc(ResourceID, General, Perkins, BSI, IVCFoundation, ASIVC, Other, OtherDescription) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateFundingSrc.php",
        data:{ResourceID:ResourceID, General:General, Perkins:Perkins, BSI:BSI, IVCFoundation:IVCFoundation, ASIVC:ASIVC, Other:Other, OtherDescription:OtherDescription},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePriorityMgr(ResourceID, DepartMgr) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePriorityMgr.php",
        data:{ResourceID:ResourceID, DepartMgr:DepartMgr},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePriorityVPP(ResourceID, VPP) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePriorityVPP.php",
        data:{ResourceID:ResourceID, VPP:VPP},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePriorityCHPLDTF(ResourceID, CHPLDTF) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePriorityCHPLDTF.php",
        data:{ResourceID:ResourceID, CHPLDTF:CHPLDTF},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePriorityTATF(ResourceID, TATF) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePriorityTATF.php",
        data:{ResourceID:ResourceID, TATF:TATF},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePrioritySSAMMO(ResourceID, SSAMMO) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePrioritySSAMMO.php",
        data:{ResourceID:ResourceID, SSAMMO:SSAMMO},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePriorityAPTC(ResourceID, ATPC) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePriorityATPC.php",
        data:{ResourceID:ResourceID, ATPC:ATPC},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePriorityBDRPC(ResourceID, BDRPC) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePriorityBDRPC.php",
        data:{ResourceID:ResourceID, BDRPC:BDRPC},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePrioritySPAC(ResourceID, SPAC) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePrioritySPAC.php",
        data:{ResourceID:ResourceID, SPAC:SPAC},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePriorityPEC(ResourceID, PEC) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePriorityPEC.php",
        data:{ResourceID:ResourceID, PEC:PEC},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateBacktodraft(ResourceID, Resubmit) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateBacktodraft.php",
        data:{ResourceID:ResourceID, Resubmit:Resubmit},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

//function db_updateApprovedAmount(ResourceID, Gen_Amt, Per_Amt, BSI_Amt, Fou_Amt, ASI_Amt, Oth_Amt, T_Amt) {
//    var Result = false;
//    $.ajax({
//        type:"POST",
//        url:"php/db_updateApprovedAmount.php",
//        data:{ResourceID:ResourceID, Gen_Amt:Gen_Amt, Per_Amt:Per_Amt, BSI_Amt:BSI_Amt, Fou_Amt:Fou_Amt, ASI_Amt:ASI_Amt, Oth_Amt:Oth_Amt, T_Amt:T_Amt},
//        async: false,  
//        success:function(data) {
//            Result = JSON.parse(data);
//        }
//    });
//    return Result;
//}

////////////////////////////////////////////////////////////////////////////////
function db_updateFundSrcType(FundSrcTypeID, Active, FundSrcType, FundSrcAdmin, FundSrcEmail, FundSrcDescrip) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateFundSrcType.php",
        data:{FundSrcTypeID:FundSrcTypeID, Active:Active, FundSrcType:FundSrcType, FundSrcAdmin:FundSrcAdmin, FundSrcEmail:FundSrcEmail, FundSrcDescrip:FundSrcDescrip},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateFundSrcBudget(FiscalYear, FundSrcCol, BudgetAmt, BalanceAmt) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateFundSrcBudget.php",
        data:{FiscalYear:FiscalYear, FundSrcCol:FundSrcCol, BudgetAmt:BudgetAmt, BalanceAmt:BalanceAmt},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateResourceFundSrc(ResourceID, fs_1, fs_2, fs_3, fs_4, fs_5, fs_6, fs_7, fs_8, fs_9, fs_10, fs_11, fs_12, fs_13, fs_14, fs_15, fs_16, fs_17, fs_18, fs_19, fs_20, fs_21, fs_22, fs_23, fs_comments) {
    fs_comments = textReplaceApostrophe(fs_comments);
    
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateResourceFundSrc.php",
        data:{ResourceID:ResourceID, fs_1:fs_1, fs_2:fs_2, fs_3:fs_3, fs_4:fs_4, fs_5:fs_5, fs_6:fs_6, fs_7:fs_7, fs_8:fs_8, fs_9:fs_9, fs_10:fs_10, fs_11:fs_11, fs_12:fs_12, fs_13:fs_13, fs_14:fs_14, fs_15:fs_15,
                fs_16:fs_16, fs_17:fs_17, fs_18:fs_18, fs_19:fs_19, fs_20:fs_20, fs_21:fs_21, fs_22:fs_22, fs_23:fs_23, fs_comments:fs_comments},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateResourceFundSrcColumn(ResourceID, ColumnName, Value) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateResourceFundSrcColumn.php",
        data:{ResourceID:ResourceID, ColumnName:ColumnName, Value:Value},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateResourceFundAmtColumn(ResourceID, ColumnName, Value) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateResourceFundAmtColumn.php",
        data:{ResourceID:ResourceID, ColumnName:ColumnName, Value:Value},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateCommentsMgr(ResourceID, ApproverID, Comments) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateCommentsMgr.php",
        data:{ResourceID:ResourceID, ApproverID:ApproverID, Comments:Comments},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateCommentsVPP(ResourceID, ApproverID, Comments) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateCommentsVPP.php",
        data:{ResourceID:ResourceID, ApproverID:ApproverID, Comments:Comments},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////
function db_updatembrCHPLDTF(mbrCHPLDTF_ID, chpUserName, chpUserEmail, chpUserActive, chpUserAdmin) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatembrCHPLDTF.php",
        data:{mbrCHPLDTF_ID:mbrCHPLDTF_ID, chpUserName:chpUserName, chpUserEmail:chpUserEmail, chpUserActive:chpUserActive, chpUserAdmin:chpUserAdmin},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatembrSSAMMO(mbrSSAMMO_ID, ssaUserName, ssaUserEmail, ssaUserActive, ssaUserAdmin) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatembrSSAMMO.php",
        data:{mbrSSAMMO_ID:mbrSSAMMO_ID, ssaUserName:ssaUserName, ssaUserEmail:ssaUserEmail, ssaUserActive:ssaUserActive, ssaUserAdmin:ssaUserAdmin},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatembrAPTC(mbrAPTC_ID, aptUserName, aptUserEmail, aptUserActive, aptUserAdmin) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatembrAPTC.php",
        data:{mbrAPTC_ID:mbrAPTC_ID, aptUserName:aptUserName, aptUserEmail:aptUserEmail, aptUserActive:aptUserActive, aptUserAdmin:aptUserAdmin},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatembrBDRPC(mbrBDRPC_ID, bdrUserName, bdrUserEmail, bdrUserActive, bdrUserAdmin) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatembrBDRPC.php",
        data:{mbrBDRPC_ID:mbrBDRPC_ID, bdrUserName:bdrUserName, bdrUserEmail:bdrUserEmail, bdrUserActive:bdrUserActive, bdrUserAdmin:bdrUserAdmin},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatembrIEC(mbrIEC_ID, iecUserName, iecUserEmail, iecUserActive, iecUserAdmin) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatembrIEC.php",
        data:{mbrIEC_ID:mbrIEC_ID, iecUserName:iecUserName, iecUserEmail:iecUserEmail, iecUserActive:iecUserActive, iecUserAdmin:iecUserAdmin},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatembrSPAC(mbrSPAC_ID, spaUserName, spaUserEmail, spaUserActive, spaUserAdmin) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatembrSPAC.php",
        data:{mbrSPAC_ID:mbrSPAC_ID, spaUserName:spaUserName, spaUserEmail:spaUserEmail, spaUserActive:spaUserActive, spaUserAdmin:spaUserAdmin},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////
function db_updatembrCHPLDTFColumn(mbrCHPLDTF_ID, chpColumnName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatembrCHPLDTFColumn.php",
        data:{mbrCHPLDTF_ID:mbrCHPLDTF_ID, chpColumnName:chpColumnName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatembrSSAMMOColumn(mbrSSAMMO_ID, ssaColumnName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatembrSSAMMOColumn.php",
        data:{mbrSSAMMO_ID:mbrSSAMMO_ID, ssaColumnName:ssaColumnName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatembrAPTCColumn(mbrAPTC_ID, aptColumnName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatembrAPTCColumn.php",
        data:{mbrAPTC_ID:mbrAPTC_ID, aptColumnName:aptColumnName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatembrBDRPCColumn(mbrBDRPC_ID, bdrColumnName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatembrBDRPCColumn.php",
        data:{mbrBDRPC_ID:mbrBDRPC_ID, bdrColumnName:bdrColumnName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatembrIECColumn(mbrIEC_ID, iecColumnName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatembrIECColumn.php",
        data:{mbrIEC_ID:mbrIEC_ID, iecColumnName:iecColumnName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatembrSPACColumn(mbrSPAC_ID, spaColumnName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatembrSPACColumn.php",
        data:{mbrSPAC_ID:mbrSPAC_ID, spaColumnName:spaColumnName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////
function db_updaterateMgrRating(ResourceID, ApproverID, rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateMgrRating.php",
        data:{ResourceID:ResourceID, ApproverID:ApproverID, rating:rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateMgrCkb(ResourceID, mgr_Ckb) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateMgrCkb.php",
        data:{ResourceID:ResourceID, mgr_Ckb:mgr_Ckb},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateVPPRating(ResourceID, ApproverID, rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateVPPRating.php",
        data:{ResourceID:ResourceID, ApproverID:ApproverID, rating:rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateVPPCkb(ResourceID, vpp_Ckb) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateVPPCkb.php",
        data:{ResourceID:ResourceID, vpp_Ckb:vpp_Ckb},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////
function db_updaterateUserCHPLDTFRating(ResourceID, column, rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateUserCHPLDTFRating.php",
        data:{ResourceID:ResourceID, column:column, rating:rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateCHPLDTFRating(rateCHPLDTF_ID, column, rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateCHPLDTFRating.php",
        data:{rateCHPLDTF_ID:rateCHPLDTF_ID, column:column, rating:rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateCHPLDTFActive(ResourceID, Active) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateCHPLDTFActive.php",
        data:{ResourceID:ResourceID, Active:Active},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateCHPLDTFComplete(ResourceID, Complete) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateCHPLDTFComplete.php",
        data:{ResourceID:ResourceID, Complete:Complete},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateCHPLDTFFinalRating(ResourceID, FinalRating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateCHPLDTFFinalRating.php",
        data:{ResourceID:ResourceID, FinalRating:FinalRating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateUserSSAMMORating(ResourceID, column, rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateUserSSAMMORating.php",
        data:{ResourceID:ResourceID, column:column, rating:rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateSSAMMORating(rateSSAMMO_ID, column, rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateSSAMMORating.php",
        data:{rateSSAMMO_ID:rateSSAMMO_ID, column:column, rating:rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateSSAMMOActive(ResourceID, Active) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateSSAMMOActive.php",
        data:{ResourceID:ResourceID, Active:Active},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateSSAMMOComplete(ResourceID, Complete) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateSSAMMOComplete.php",
        data:{ResourceID:ResourceID, Complete:Complete},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateSSAMMOFinalRating(ResourceID, FinalRating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateSSAMMOFinalRating.php",
        data:{ResourceID:ResourceID, FinalRating:FinalRating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateUserAPTCRating(ResourceID, column, rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateUserAPTCRating.php",
        data:{ResourceID:ResourceID, column:column, rating:rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateAPTCRating(rateAPTC_ID, column, rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateAPTCRating.php",
        data:{rateAPTC_ID:rateAPTC_ID, column:column, rating:rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateAPTCActive(ResourceID, Active) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateAPTCActive.php",
        data:{ResourceID:ResourceID, Active:Active},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateAPTCComplete(ResourceID, Complete) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateAPTCComplete.php",
        data:{ResourceID:ResourceID, Complete:Complete},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateAPTCFinalRating(ResourceID, FinalRating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateAPTCFinalRating.php",
        data:{ResourceID:ResourceID, FinalRating:FinalRating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateUserBDRPCRating(ResourceID, column, rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateUserBDRPCRating.php",
        data:{ResourceID:ResourceID, column:column, rating:rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateBDRPCRating(rateBDRPC_ID, column, rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateBDRPCRating.php",
        data:{rateBDRPC_ID:rateBDRPC_ID, column:column, rating:rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateBDRPCActive(ResourceID, Active) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateBDRPCActive.php",
        data:{ResourceID:ResourceID, Active:Active},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateBDRPCComplete(ResourceID, Complete) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateBDRPCComplete.php",
        data:{ResourceID:ResourceID, Complete:Complete},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateBDRPCFinalRating(ResourceID, FinalRating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateBDRPCFinalRating.php",
        data:{ResourceID:ResourceID, FinalRating:FinalRating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateUserIECRating(ResourceID, column, rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateUserIECRating.php",
        data:{ResourceID:ResourceID, column:column, rating:rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateIECRating(rateIEC_ID, column, rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateIECRating.php",
        data:{rateIEC_ID:rateIEC_ID, column:column, rating:rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateIECActive(ResourceID, Active) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateIECActive.php",
        data:{ResourceID:ResourceID, Active:Active},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateIECComplete(ResourceID, Complete) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateIECComplete.php",
        data:{ResourceID:ResourceID, Complete:Complete},
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateIECFinalRating(ResourceID, FinalRating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateIECFinalRating.php",
        data:{ResourceID:ResourceID, FinalRating:FinalRating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateUserSPACRating(ResourceID, column, rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateUserSPACRating.php",
        data:{ResourceID:ResourceID, column:column, rating:rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateSPACRating(rateSPAC_ID, column, rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateSPACRating.php",
        data:{rateSPAC_ID:rateSPAC_ID, column:column, rating:rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateSPACActive(ResourceID, Active) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateSPACActive.php",
        data:{ResourceID:ResourceID, Active:Active},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateSPACComplete(ResourceID, Complete) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateSPACComplete.php",
        data:{ResourceID:ResourceID, Complete:Complete},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateSPACFinalRating(ResourceID, FinalRating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateSPACFinalRating.php",
        data:{ResourceID:ResourceID, FinalRating:FinalRating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateAllComplete(ResourceID, Complete) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateAllComplete.php",
        data:{ResourceID:ResourceID, Complete:Complete},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updaterateAllMedianMean(ResourceID, Median, Mean) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updaterateAllMedianMean.php",
        data:{ResourceID:ResourceID, Median:Median, Mean:Mean},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////
function db_updateEnableCommitteeRating(ECRatingID, StartDate, EndDate) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateEnableCommitteeRating.php",
        data:{ECRatingID:ECRatingID, StartDate:StartDate, EndDate:EndDate},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateEnableSubmitBtn(EnableDate) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateEnableSubmitBtn.php",
        data:{EnableDate:EnableDate},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateEnableMgrWorksheet(EnableDate) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateEnableMgrWorksheet.php",
        data:{EnableDate:EnableDate},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateEnableCommitteeWorksheet(EnableDate) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateEnableCommitteeWorksheet.php",
        data:{EnableDate:EnableDate},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateLogin(LoginEmail, LoginName, LoginTitle, LoginDepartment) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateLogin.php",
        data:{LoginEmail:LoginEmail, LoginName:LoginName, LoginTitle:LoginTitle, LoginDepartment:LoginDepartment},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateCreator(CreatorEmail, CreatorName, CreatorTitle, CreatorDepartment) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateCreator.php",
        data:{CreatorEmail:CreatorEmail, CreatorName:CreatorName, CreatorTitle:CreatorTitle, CreatorDepartment:CreatorDepartment},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////
function db_script_update_rate(query) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_script_update_rate.php",
        data:{query:query},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// review period ///////////////////////////////////////////////////////////////
function db_updateReviewPeriod(ReviewPeriodID, Active, ReviewPeriod, RPStartDate, RPEndDate) {
    var Result = false;   
    $.ajax({
        type:"POST",
        url:"php/db_updateReviewPeriod.php",
        data:{ReviewPeriodID:ReviewPeriodID, Active:Active, ReviewPeriod:ReviewPeriod, RPStartDate:RPStartDate, RPEndDate:RPEndDate},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateResourceRPByResourceID(ResourceID, ReviewPeriodID) {
    var Result = false;   
    $.ajax({
        type:"POST",
        url:"php/db_updateResourceRPByResourceID.php",
        data:{ResourceID:ResourceID, ReviewPeriodID:ReviewPeriodID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// delete DB ///////////////////////////////////////////////////////////////////
function db_deleteTechnologyItems(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteTechnologyItems.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteOther2Items(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteOther2Items.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deletePlanning(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deletePlanning.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function mod_deletePersonnel() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    return db_deletePersonnel(ResourceID);
}

function db_deletePersonnel(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deletePersonnel.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function mod_deleteFacilities() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    return db_deleteFacilities(ResourceID);
}

function db_deleteFacilities(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteFacilities.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function mod_deleteInstructional() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    return db_deleteInstructional(ResourceID);
}

function db_deleteInstructional(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteInstructional.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function mod_deleteTechnology() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    return db_deleteTechnology(ResourceID);
}

function db_deleteTechnology(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteTechnology.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function mod_deleteOther2() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    return db_deleteOther2(ResourceID);
}

function db_deleteOther2(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteOther2.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function mod_deleteResource() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    return db_deleteResource(ResourceID);
}

function db_deleteResource(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteResource.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteCC(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteCC.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteResourceLink(ResourceParentID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteResourceLink.php",
        data:{ResourceParentID:ResourceParentID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteResourceLinkByReourceID(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteResourceLinkByResourceID.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deletePriority(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deletePriority.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteResourceStage(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteResourceStage.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteResourceFundAmt(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteResourceFundAmt.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteFundingSrc(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteFundingSrc.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteBacktodraft(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteBacktodraft.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteResourceFSBSI(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteResourceFSBSI.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////
function db_deletembrCHPLDTF(mbrCHPLDTF_ID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deletembrCHPLDTF.php",
        data:{mbrCHPLDTF_ID:mbrCHPLDTF_ID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deletembrSSAMMO(mbrSSAMMO_ID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deletembrSSAMMO.php",
        data:{mbrSSAMMO_ID:mbrSSAMMO_ID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deletembrAPTC(mbrAPTC_ID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deletembrAPTC.php",
        data:{mbrAPTC_ID:mbrAPTC_ID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deletembrBDRPC(mbrBDRPC_ID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deletembrBDRPC.php",
        data:{mbrBDRPC_ID:mbrBDRPC_ID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deletembrIEC(mbrIEC_ID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deletembrIEC.php",
        data:{mbrIEC_ID:mbrIEC_ID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deletembrSPAC(mbrSPAC_ID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deletembrSPAC.php",
        data:{mbrSPAC_ID:mbrSPAC_ID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////
function db_deleteColumn_rateCHPLDTF(chpColumnName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteColumn_rateCHPLDTF.php",
        data:{chpColumnName:chpColumnName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteColumn_rateSSAMMO(ssaColumnName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteColumn_rateSSAMMO.php",
        data:{ssaColumnName:ssaColumnName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteColumn_rateAPTC(aptColumnName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteColumn_rateAPTC.php",
        data:{aptColumnName:aptColumnName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteColumn_rateBDRPC(bdrColumnName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteColumn_rateBDRPC.php",
        data:{bdrColumnName:bdrColumnName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteColumn_rateIEC(iecColumnName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteColumn_rateIEC.php",
        data:{iecColumnName:iecColumnName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteColumn_rateSPAC(spaColumnName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteColumn_rateSPAC.php",
        data:{spaColumnName:spaColumnName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////
function db_deleterateMgr(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleterateMgr.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleterateVPP(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleterateVPP.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleterateAll(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleterateAll.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleterateAPTC(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleterateAPTC.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleterateBDRPC(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleterateBDRPC.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleterateCHPLDTF(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleterateCHPLDTF.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleterateIEC(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleterateIEC.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleterateSPAC(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleterateSPAC.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleterateSSAMMO(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleterateSSAMMO.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// review period ///////////////////////////////////////////////////////////////
function db_deleteResourceRP(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteResourceRP.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteCommentsMgr(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteCommentsMgr.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteCommentsVPP(ResourceID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteCommentsVPP.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// upload attach file //////////////////////////////////////////////////////////
function uploadAttachFile(file_data) {
    var Result = "";
    $.ajax({  
        url: "php/upload_file.php",  
        type: "POST",  
        data: file_data,
        processData: false,  
        contentType: false,  
        async: false,
        success:function(data) {
            Result = data;
        }  
    });
    return Result;
}

function uploadAttachFilePerkins(file_data) {
    var Result = "";
    $.ajax({  
        url: "php/upload_file_perkins.php",  
        type: "POST",  
        data: file_data,
        processData: false,  
        contentType: false,  
        async: false,
        success:function(data) {
            Result = data;
        }  
    });
    return Result;
}

function uploadAttachFileBSI(file_data) {
    var Result = "";
    $.ajax({  
        url: "php/upload_file_BSI.php",  
        type: "POST",  
        data: file_data,
        processData: false,  
        contentType: false,  
        async: false,
        success:function(data) {
            Result = data;
        }  
    });
    return Result;
}

// delete attach file //////////////////////////////////////////////////////////
function deleteAttachFile(RType, FileLinkName) {
    var Result = "";
    $.ajax({
        type:"POST",
        url:"php/delete_file.php",
        data:{RType:RType, FileLinkName:FileLinkName},
        async: false,  
        success:function(data) {
            Result = data;
        }
    });
    return Result;
}

function deleteAttachFileMgr(FileLinkName) {
    var Result = "";
    $.ajax({
        type:"POST",
        url:"php/delete_file_mgr.php",
        data:{FileLinkName:FileLinkName},
        async: false,  
        success:function(data) {
            Result = data;
        }
    });
    return Result;
}

function deleteAttachFileByResourceID() {
    var ResourceID = sessionStorage.getItem('m1_ResourceID');
    if (ResourceID !== null) {  
        var RType = db_getResourceTypeItem(ResourceID);
        if (RType !== null) {
            var data = new Array();
            data = mod_getAttachFiles();
            
            for (var i = 0; i < data.length; i++) {
                var file_link_name = data[i][0];
                deleteAttachFile(RType, file_link_name);
            }
        }
    }
} 

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function db_getPriorityRatingCkb(ResourceID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getPriorityRatingCkb.php",
        data:{ResourceID:ResourceID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_updatePriorityRatingCkb(ResourceID, RatingCkb) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePriorityRatingCkb.php",
        data:{ResourceID:ResourceID, RatingCkb:RatingCkb},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////
function ad_SearchCreators(searchCreator) {
    searchCreator = textReplaceApostrophe(searchCreator);
    
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/searchCreator.php",
        data:{searchCreator:searchCreator},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    return result;
}

function ad_SearchUsers(searchUser) {
    searchUser = textReplaceApostrophe(searchUser);
    
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/searchUser2.php",
        data:{searchUser:searchUser},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    
    return result;
}

////////////////////////////////////////////////////////////////////////////////
function formatDollar(num) {
//    var p = num.toFixed(2).split(".");
//    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
//        return  num + (i && !(i % 3) ? "," : "") + acc;
//    }, "") + "." + p[1];

    var negative = "";
    var p = num.toFixed(2).split(".");
    if (p[0].substr(0, 1) === "-") {
        negative = "-";
        p[0] = p[0].substr(1, p[0].length);
    }
    
    var result = p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
    
    if (negative !== "") {
        return "-$" + result;
    }
    else {
        return "$" + result;
    }
}

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
function textTruncate(t_size, t_value) {
    var t_default = t_value.length;
    var tr_text = "";
    
    if (t_default > t_size) {
        tr_text = t_value.substring(0, t_size);
        tr_text += " ...";
    }
    else {
        tr_text = t_value;
    }
    
    return tr_text;
}

////////////////////////////////////////////////////////////////////////////////
function textReplaceApostrophe(str_value) {
    return str_value.replace(/'/g, "''");
}

////////////////////////////////////////////////////////////////////////////////
function convertDBDateToStringFormat(db_date) {
    var a = db_date.split(" ");
    var d = a[0].split("-");
//    var t = a[1].split(":");
    
    return d[1] + "/" + d[2] + "/" + d[0];
}

function convertDBDateToDateTimeFormat(db_date) {
    var a = db_date.split(" ");
    var d = a[0].split("-");
    var t = a[1].split(":");
    return new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
}

////////////////////////////////////////////////////////////////////////////////
function convertStringDateToDBDateFormat(str_date) {
    var ar_date = str_date.split("/");
    return ar_date[2] + "-" + ar_date[0] + "-" + ar_date[1];
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function ireportDBgetUserAccess(Username) {   
    var Result = "";
    $.ajax({
        type:"POST",
        url:"php/ireport_db_getUserAccess.php",
        data:{Username:Username},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}