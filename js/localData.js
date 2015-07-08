//function IsLoginExpired() {
//    var exp_date_time = new Date(localStorage.getItem('ls_rf_expiration_date_time'));
//    var cur_date_time = new Date();
//    if (cur_date_time > exp_date_time) {
//        localStorage.clear();
//        return true;
//    }
//    else {
//        return false;
//    }
//}

////////////////////////////////////////////////////////////////////////////////
function localData_login(loginName, loginEmail, loginTitle, loginDiv, appName, appEmail, appTitle, appDiv) {
//    var cur_date_time = new Date();
//    cur_date_time.setHours(cur_date_time.getHours() + 2);
//    localStorage.setItem('ls_rf_expiration_date_time', cur_date_time);
    
    sessionStorage.setItem('m1_loginName', loginName);
    sessionStorage.setItem('m1_loginEmail', loginEmail);
    sessionStorage.setItem('m1_loginTitle', loginTitle);
    sessionStorage.setItem('m1_loginDiv', loginDiv);
    sessionStorage.setItem('m1_appName', appName);
    sessionStorage.setItem('m1_appEmail', appEmail);
    sessionStorage.setItem('m1_appTitle', appTitle);
    sessionStorage.setItem('m1_appDiv', appDiv);
}

////////////////////////////////////////////////////////////////////////////////
function localData_setPg(creatorName, CreatorEmail, creatorTitle, currentDate, fiscal, creatorDiv, cc, propTitle, needFor, progType, onetime, need_by) {
    sessionStorage.setItem('m1_pgNum', 'Page1');
    sessionStorage.setItem('m1_creatorName', creatorName);
    sessionStorage.setItem('m1_creatorEmail', CreatorEmail);
    sessionStorage.setItem('m1_creatorTitle', creatorTitle);
    sessionStorage.setItem('m1_currentDate', currentDate);
    sessionStorage.setItem('m1_fiscal', fiscal);
    sessionStorage.setItem('m1_creatorDiv', creatorDiv);
    sessionStorage.setItem('m1_cc', cc);
    sessionStorage.setItem('m1_propTitle', propTitle);
    sessionStorage.setItem('m1_needFor', needFor);
    sessionStorage.setItem('m1_prog_type', progType);
    sessionStorage.setItem('m1_one_time', onetime);
    sessionStorage.setItem('m1_need_by', need_by);
}

function localData_setPg_Approver(appName, appEmail, appTitle, appDiv) {
    sessionStorage.setItem('m1_creatorAppName', appName);
    sessionStorage.setItem('m1_creatorAppEmail', appEmail);
    sessionStorage.setItem('m1_creatorAppTitle', appTitle);
    sessionStorage.setItem('m1_creatorAppDiv', appDiv);
}

function localData_setPg2(ckbFunding1, ckbFunding2, ckbFunding3, ckbFunding4, ckbFunding5, ckbFunding6, txtOther) {
    sessionStorage.setItem('m2_pgNum', 'Page2');
    sessionStorage.setItem('m2_ckbFunding1', ckbFunding1);
    sessionStorage.setItem('m2_ckbFunding2', ckbFunding2);
    sessionStorage.setItem('m2_ckbFunding3', ckbFunding3);
    sessionStorage.setItem('m2_ckbFunding4', ckbFunding4);
    sessionStorage.setItem('m2_ckbFunding5', ckbFunding5);
    sessionStorage.setItem('m2_ckbFunding6', ckbFunding6);
    sessionStorage.setItem('m2_txtOther', txtOther);
}

function localData_setPg3(radioRType) {
    sessionStorage.setItem('m3_pgNum', 'Page3');
    sessionStorage.setItem('m3_radioRType', radioRType);
}

////////////////////////////////////////////////////////////////////////////////
function localData_setPg4_rtp_CB(resource, rtp_selected, rtp_title, rtp_titleName, range, month, hrs, annual_cost, benefit_cost, total_cost, describe, hr_rate, new_pos) {
    sessionStorage.setItem('m4_pgNum', 'Page4');
    sessionStorage.setItem('m4_resource', resource);
    sessionStorage.setItem('m4_rtp', rtp_selected);
    sessionStorage.setItem('m4_rtp_CB_title', rtp_title);
    sessionStorage.setItem('m4_rtp_CB_titleName', rtp_titleName);
    sessionStorage.setItem('m4_rtp_CB_range', range);
    sessionStorage.setItem('m4_rtp_CB_month', month);
    sessionStorage.setItem('m4_rtp_CB_hrs', hrs);
    sessionStorage.setItem('m4_rtp_CB_annual_cost', annual_cost);
    sessionStorage.setItem('m4_rtp_CB_benefit_cost', benefit_cost);
    sessionStorage.setItem('m4_rtp_CB_total_cost', total_cost);
    sessionStorage.setItem('m4_rtp_CB_describe', describe);
    sessionStorage.setItem('m4_rtp_CB_hr_rate', hr_rate);
    sessionStorage.setItem('m4_rtp_CB_new_pos', new_pos);
}

function localData_setPg4_rtp_CB_quest_fields(field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11, field12, field13, field14) {
    sessionStorage.setItem('m4_rtp_CB_quest_field1', field1);
    sessionStorage.setItem('m4_rtp_CB_quest_field2', field2);
    sessionStorage.setItem('m4_rtp_CB_quest_field3', field3);
    sessionStorage.setItem('m4_rtp_CB_quest_field4', field4);
    sessionStorage.setItem('m4_rtp_CB_quest_field5', field5);
    sessionStorage.setItem('m4_rtp_CB_quest_field6', field6);
    sessionStorage.setItem('m4_rtp_CB_quest_field7', field7);
    sessionStorage.setItem('m4_rtp_CB_quest_field8', field8);
    sessionStorage.setItem('m4_rtp_CB_quest_field9', field9);
    sessionStorage.setItem('m4_rtp_CB_quest_field10', field10);
    sessionStorage.setItem('m4_rtp_CB_quest_field11', field11);
    sessionStorage.setItem('m4_rtp_CB_quest_field12', field12);
    sessionStorage.setItem('m4_rtp_CB_quest_field13', field13);
    sessionStorage.setItem('m4_rtp_CB_quest_field14', field14);
}

function localData_setPg4_rtp_CM(resource, rtp_selected, rtp_title, rtp_titleName, range, month, hrs, annual_cost, benefit_cost, total_cost, describe, hr_rate, new_pos) {
    sessionStorage.setItem('m4_pgNum', 'Page4');
    sessionStorage.setItem('m4_resource', resource);
    sessionStorage.setItem('m4_rtp', rtp_selected);
    sessionStorage.setItem('m4_rtp_CM_title', rtp_title);
    sessionStorage.setItem('m4_rtp_CM_titleName', rtp_titleName);
    sessionStorage.setItem('m4_rtp_CM_range', range);
    sessionStorage.setItem('m4_rtp_CM_month', month);
    sessionStorage.setItem('m4_rtp_CM_hrs', hrs);
    sessionStorage.setItem('m4_rtp_CM_annual_cost', annual_cost);
    sessionStorage.setItem('m4_rtp_CM_benefit_cost', benefit_cost);
    sessionStorage.setItem('m4_rtp_CM_total_cost', total_cost);
    sessionStorage.setItem('m4_rtp_CM_describe', describe);
    sessionStorage.setItem('m4_rtp_CM_hr_rate', hr_rate);
    sessionStorage.setItem('m4_rtp_CM_new_pos', new_pos);
}

function localData_setPg4_rtp_ST(resource, rtp_selected, rtp_title, range, month, hrs, annual_cost, benefit_cost, total_cost, describe, hr_rate) {
    sessionStorage.setItem('m4_pgNum', 'Page4');
    sessionStorage.setItem('m4_resource', resource);
    sessionStorage.setItem('m4_rtp', rtp_selected);
    sessionStorage.setItem('m4_rtp_ST_title', rtp_title);
    sessionStorage.setItem('m4_rtp_ST_range', range);
    sessionStorage.setItem('m4_rtp_ST_month', month);
    sessionStorage.setItem('m4_rtp_ST_hrs', hrs);
    sessionStorage.setItem('m4_rtp_ST_annual_cost', annual_cost);
    sessionStorage.setItem('m4_rtp_ST_benefit_cost', benefit_cost);
    sessionStorage.setItem('m4_rtp_ST_total_cost', total_cost);
    sessionStorage.setItem('m4_rtp_ST_describe', describe);
    sessionStorage.setItem('m4_rtp_ST_hr_rate', hr_rate);
}

////////////////////////////////////////////////////////////////////////////////
function localData_setPg4_rtf(Item_Req, Location, Est_Amt, Est_Descrip, fa_alt) {
    sessionStorage.setItem('m4_pgNum', 'Page4');
    sessionStorage.setItem('m4_rtf_Item_Req', Item_Req);
    sessionStorage.setItem('m4_rtf_Location', Location);
    sessionStorage.setItem('m4_rtf_Est_Amt', Est_Amt);
    sessionStorage.setItem('m4_rtf_Est_Descrip', Est_Descrip);
    sessionStorage.setItem('m4_rtf_fa_alt', fa_alt);
}

////////////////////////////////////////////////////////////////////////////////
function localData_setPg4_rti(Sch_Div, Ex_Life, Descrip, Qty, Cost, Total) {
    sessionStorage.setItem('m4_pgNum', 'Page4');
    sessionStorage.setItem('m4_rti_Sch_Div', Sch_Div);
    sessionStorage.setItem('m4_rti_Ex_Life', Ex_Life);
    sessionStorage.setItem('m4_rti_Descrip', Descrip);
    sessionStorage.setItem('m4_rti_Qty', Qty);
    sessionStorage.setItem('m4_rti_Cost', Cost);
    sessionStorage.setItem('m4_rti_Total', Total);
}

////////////////////////////////////////////////////////////////////////////////
function localData_setPg4_rtt_index(index) {
    sessionStorage.setItem('m4_pgNum', 'Page4');
    sessionStorage.setItem('m4_rtt_index', index);
}

function localData_setPg4_rtt_header(Item_Req, Location, Additional) {
    sessionStorage.setItem('m4_rtt_Item_Req', Item_Req);
    sessionStorage.setItem('m4_rtt_Location', Location);
    sessionStorage.setItem('m4_rtt_Additional', Additional);
}

function localData_setPg4_rtt_worksheet(itemTypeID, itemType,
                                        itemDescripID, itemDescrip,
                                        itemQtyID, itemQty,
                                        itemCostID, itemCost,
                                        itemTotalID, itemTotal,
                                        itemMaintID, itemMaint,
                                        itemYrsID, itemYrs,
                                        itemAnnCostID, itemAnnCost,
                                        itemMaintTotalID, itemMaintTotal) 
{
    sessionStorage.setItem(itemTypeID, itemType);
    sessionStorage.setItem(itemDescripID, itemDescrip);
    sessionStorage.setItem(itemQtyID, itemQty);
    sessionStorage.setItem(itemCostID, itemCost);
    sessionStorage.setItem(itemTotalID, itemTotal);
    sessionStorage.setItem(itemMaintID, itemMaint);
    sessionStorage.setItem(itemYrsID, itemYrs);
    sessionStorage.setItem(itemAnnCostID, itemAnnCost);
    sessionStorage.setItem(itemMaintTotalID, itemMaintTotal);
}

function localData_setPg4_rtt_summary(Hardware_Total, Software_Total, Installation_Total,
                                        Maintenance_Total, Shipping_Total, Additional_Total,
                                        Tax_Total, Total_Taxable, Total_Nontaxable, 
                                        Grand_Total, alt) 
{
    sessionStorage.setItem('m4_rtt_Hardware_Total', Hardware_Total);
    sessionStorage.setItem('m4_rtt_Software_Total', Software_Total);
    sessionStorage.setItem('m4_rtt_Installation_Total', Installation_Total);
    sessionStorage.setItem('m4_rtt_Maintenance_Total', Maintenance_Total);
    sessionStorage.setItem('m4_rtt_Shipping_Total', Shipping_Total);
    sessionStorage.setItem('m4_rtt_Additional_Total', Additional_Total);
    sessionStorage.setItem('m4_rtt_Tax_Total', Tax_Total);
    sessionStorage.setItem('m4_rtt_Total_Taxable', Total_Taxable);
    sessionStorage.setItem('m4_rtt_Total_Nontaxable', Total_Nontaxable);
    sessionStorage.setItem('m4_rtt_Grand_Total', Grand_Total);
    sessionStorage.setItem('m4_rtt_alt', alt);
}

////////////////////////////////////////////////////////////////////////////////
function localData_setPg4_rto_index(index) {
    sessionStorage.setItem('m4_pgNum', 'Page4');
    sessionStorage.setItem('m4_rto_index', index);
}

function localData_setPg4_rto_header(Item_Req, Location, Additional) {
    sessionStorage.setItem('m4_rto_Item_Req', Item_Req);
    sessionStorage.setItem('m4_rto_Location', Location);
    sessionStorage.setItem('m4_rto_Additional', Additional);
}

function localData_setPg4_rto_worksheet(itemTypeID, itemType,
                                        itemDescripID, itemDescrip,
                                        itemQtyID, itemQty,
                                        itemCostID, itemCost,
                                        itemTotalID, itemTotal,
                                        itemMaintID, itemMaint,
                                        itemYrsID, itemYrs,
                                        itemAnnCostID, itemAnnCost,
                                        itemMaintTotalID, itemMaintTotal) 
{
    sessionStorage.setItem(itemTypeID, itemType);
    sessionStorage.setItem(itemDescripID, itemDescrip);
    sessionStorage.setItem(itemQtyID, itemQty);
    sessionStorage.setItem(itemCostID, itemCost);
    sessionStorage.setItem(itemTotalID, itemTotal);
    sessionStorage.setItem(itemMaintID, itemMaint);
    sessionStorage.setItem(itemYrsID, itemYrs);
    sessionStorage.setItem(itemAnnCostID, itemAnnCost);
    sessionStorage.setItem(itemMaintTotalID, itemMaintTotal);
}

function localData_setPg4_rto_summary(cont_serv_Total, maintenance_Total, tax_Total,
                                        other_Total, trav_conf_Total, rent_leav_Total,
                                        advert_Total, Total_Taxable, Total_Nontaxable, 
                                        Grand_Total, alt) 
{
    sessionStorage.setItem('m4_rto_cont_serv_Total', cont_serv_Total);
    sessionStorage.setItem('m4_rto_maintenance_Total', maintenance_Total);
    sessionStorage.setItem('m4_rto_tax_Total', tax_Total);
    sessionStorage.setItem('m4_rto_other_Total', other_Total);
    sessionStorage.setItem('m4_rto_trav_conf_Total', trav_conf_Total);
    sessionStorage.setItem('m4_rto_rent_leav_Total', rent_leav_Total);
    sessionStorage.setItem('m4_rto_advert_Total', advert_Total);
    sessionStorage.setItem('m4_rto_Total_Taxable', Total_Taxable);
    sessionStorage.setItem('m4_rto_Total_Nontaxable', Total_Nontaxable);
    sessionStorage.setItem('m4_rto_Grand_Total', Grand_Total);
    sessionStorage.setItem('m4_rto_alt', alt);
}

////////////////////////////////////////////////////////////////////////////////
function localData_setPg4_rtr(Rev_Type, Rev_Descrip) {
    sessionStorage.setItem('m4_pgNum', 'Page4');
    sessionStorage.setItem('m4_Rev_Type', Rev_Type);
    sessionStorage.setItem('m4_Rev_Descrip', Rev_Descrip);
}

////////////////////////////////////////////////////////////////////////////////
function localData_setPg4_ot2(Index, Description, TotalAmount) {
    sessionStorage.setItem('m4_pgNum', 'Page4');
    sessionStorage.setItem('m4_ot2_Index', Index);
    sessionStorage.setItem('m4_ot2_Description', Description);
    sessionStorage.setItem('m4_ot2_Total_Amount', TotalAmount);
}

function localData_setPg4_ot2_Items(ItemID, Item, ItemQtyID, ItemQty, ItemCostID, ItemCost, ItemTotalID, ItemTotal) {
    sessionStorage.setItem(ItemID, Item);
    sessionStorage.setItem(ItemQtyID, ItemQty);
    sessionStorage.setItem(ItemCostID, ItemCost);
    sessionStorage.setItem(ItemTotalID, ItemTotal);
}

////////////////////////////////////////////////////////////////////////////////
function localData_setPgFundSrc(fs_1, fs_2, fs_3, fs_4, fs_5, fs_6, fs_7, fs_8, fs_9, fs_10, fs_11, fs_12, fs_13, fs_14, fs_15,
                                fs_16, fs_17, fs_18, fs_19, fs_20, fs_21, fs_22, fs_23) {
    sessionStorage.setItem('mFS_pgNum', 'PageFundSrc');
    sessionStorage.setItem('mFS_fs_1', fs_1);
    sessionStorage.setItem('mFS_fs_2', fs_2);
    sessionStorage.setItem('mFS_fs_3', fs_3);
    sessionStorage.setItem('mFS_fs_4', fs_4);
    sessionStorage.setItem('mFS_fs_5', fs_5);
    sessionStorage.setItem('mFS_fs_6', fs_6);
    sessionStorage.setItem('mFS_fs_7', fs_7);
    sessionStorage.setItem('mFS_fs_8', fs_8);
    sessionStorage.setItem('mFS_fs_9', fs_9);
    sessionStorage.setItem('mFS_fs_10', fs_10);
    sessionStorage.setItem('mFS_fs_11', fs_11);
    sessionStorage.setItem('mFS_fs_12', fs_12);
    sessionStorage.setItem('mFS_fs_13', fs_13);
    sessionStorage.setItem('mFS_fs_14', fs_14);
    sessionStorage.setItem('mFS_fs_15', fs_15);
    sessionStorage.setItem('mFS_fs_16', fs_16);
    sessionStorage.setItem('mFS_fs_17', fs_17);
    sessionStorage.setItem('mFS_fs_18', fs_18);
    sessionStorage.setItem('mFS_fs_19', fs_19);
    sessionStorage.setItem('mFS_fs_20', fs_20);
    sessionStorage.setItem('mFS_fs_21', fs_21);
    sessionStorage.setItem('mFS_fs_22', fs_22);
    sessionStorage.setItem('mFS_fs_23', fs_23);
}

////////////////////////////////////////////////////////////////////////////////
function localData_setPg5(index) {
    sessionStorage.setItem('m5_pgNum', 'Page5');
    sessionStorage.setItem('m5_index', index);
}

function localData_setPg5_obj(objectiveID, objective, goalID, goal, impactID, impact) {
    sessionStorage.setItem(objectiveID, objective);
    sessionStorage.setItem(goalID, goal);
    sessionStorage.setItem(impactID, impact);
}

////////////////////////////////////////////////////////////////////////////////
var err_msg = "";

////////////////////////////////////////////////////////////////////////////////
function stepPageDialogMsg(step) {
    var dialog_msg = "";
    switch (step) {
        case "General Info":
            if (sessionStorage.getItem('m1_pgNum') === null) {
                dialog_msg = "General Info step has not been completed yet";
            }
            break;
        case "Resource Type":
            if (sessionStorage.getItem('m3_pgNum') === null) {
                dialog_msg = "Resource Type step has not been completed yet";
            }
            break;
        case "Worksheet":
            if (sessionStorage.getItem('m4_pgNum') === null) {
                dialog_msg = "Worksheet step has not been completed yet";
            }
            break;
        case "Funding Src":
            if (sessionStorage.getItem('mFS_pgNum') === null) {
                dialog_msg = "Funding Src step has not been completed yet";
            }
            break;
        case "Planning":
            if (sessionStorage.getItem('m5_pgNum') === null) {
                dialog_msg = "Planning step has not been completed yet";
            }
            break;
        case "Review":
            if (sessionStorage.getItem('m1_pgNum') === null) {
                dialog_msg += "General Info<br>";
            }
            if (sessionStorage.getItem('m3_pgNum') === null) {
                dialog_msg += "Resource Type<br>";
            }
            if (sessionStorage.getItem('m4_pgNum') === null) {
                dialog_msg += "Worksheet<br>";
            }
            if (sessionStorage.getItem('mFS_pgNum') === null) {
                dialog_msg += "Funding Src<br>";
            }
            if (sessionStorage.getItem('m5_pgNum') === null) {
                dialog_msg += "Planning<br>";
            }
            if (dialog_msg !== "") {
                dialog_msg += "<br>has not been completed yet";
            }
            break;
        default:
    }
    
    return dialog_msg;
}

function navigateStepPage(step) {
    switch (step) {
        case "General Info":
            window.open('RFMain.html', '_self');
            break;
        case "Resource Type":
            window.open('RFMain3.html', '_self');
            break;
        case "Worksheet":
            var rdRType = sessionStorage.getItem('m3_radioRType');   
            switch (rdRType) {
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
            break;
        case "Funding Src":
            window.open('fundingSrc.html', '_self');
            break;
        case "Planning":
            window.open('RFMain5.html', '_self');
            break;
        case "Review":
            window.open('RFMain6.html', '_self');
            break;
        default:
    }
}

////////////////////////////////////////////////////////////////////////////////
function calculateMedian(arr_values) {
    var median = 0.00;
    arr_values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(arr_values.length/2);

    if(arr_values.length % 2) {
        median = arr_values[half];
    }
    else {
        median = (arr_values[half-1] + arr_values[half]) / 2.0;
    }
    
    return median.toFixed(2);
}

function calculateMean(arr_value) {
    var sum = arr_value.reduce(function(a, b) { return a + b; });
    var avg = sum / arr_value.length;
    
    return avg.toFixed(2);
}

////////////////////////////////////////////////////////////////////////////////
function getFiscalYear() {
    var today = new Date();
    var mon = today.getMonth()+1;
    var yr = today.getFullYear();
    
    if (mon > 6) {
        return (yr + 1) + "-" + (yr + 2);
    }
    else {
        return yr + "-" + (yr + 1);
    }
}

////////////////////////////////////////////////////////////////////////////////
//var BASE64_MARKER = ';base64,';
// 
//function convertDataURIToBinary(dataURI) {
//    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
//    var base64 = dataURI.substring(base64Index);
//    var raw = window.atob(base64);
//    var rawLength = raw.length;
//    var array = new Uint8Array(new ArrayBuffer(rawLength));
//
//    for(i = 0; i < rawLength; i++) {
//      array[i] = raw.charCodeAt(i);
//    }
//    return array;
//}