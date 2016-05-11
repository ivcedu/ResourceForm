var fiscal_year = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {        
        fiscal_year = getFiscalYear();
        getFundSrcTypeList();
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {  
    $('#nav_home').click(function() {
        window.open('home.html', '_self');
    });
    
    $('#nav_committee_admin').click(function() {
        window.open('committeeWorksheet.html', '_self');
    });
    
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
    });
    
    // budget amount change event //////////////////////////////////////////////
    $(document).on('change', 'input[id^="budget_amt_"]', function(e) {
        e.preventDefault();
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        var amount = Number($(this).val());
         
        if (amount > 0) {
            $(this).val(formatDollar(amount));
        }
        else {
            $(this).val(formatDollar(0.00));
        }
    });
    
    // update fund src type button click ///////////////////////////////////////
    $(document).on('click', '[id^="btn_update_id_"]', function(e) {
        e.preventDefault();
        var fund_src_type_id = $(this).attr('id').replace("btn_update_id_", "");
        var err = formValidation(fund_src_type_id);
        if (err !== "") {
            alert(err);
            return false;
        }
        
        if (updateFundSrcType(fund_src_type_id)) {
            alert("Funding source has been update successfully");
            getFundSrcTypeList();
        }
    });
    
    // update fund src budget button click /////////////////////////////////////
    $(document).on('click', '[id^="btn_fsb_add_id_"]', function(e) {
        e.preventDefault();
        var fund_src_type_id = $(this).attr('id').replace("btn_fsb_add_id_", "");
        var fund_src_col = $('#fund_src_col_' + fund_src_type_id).html();
        var budget_amt = revertDollar($('#budget_amt_' + fund_src_type_id).val());
        
        db_insertFundSrcBudget(fiscal_year, fund_src_col, budget_amt, budget_amt);
        alert("Funding source budget amount has been added successfully");
        getFundSrcTypeList();
    });
    
    // add fund src budget button click ////////////////////////////////////////
    $(document).on('click', '[id^="btn_fsb_update_id_"]', function(e) {
        e.preventDefault();
        var fund_src_type_id = $(this).attr('id').replace("btn_fsb_update_id_", "");
        var fund_src_col = $('#fund_src_col_' + fund_src_type_id).html();     

        var budget_amt = revertDollar($('#budget_amt_' + fund_src_type_id).val());
        var fund_src_sum = Number(db_getResourceFundAmtTotalSrc(fund_src_col + "_amt", fiscal_year));
        var new_balance_amt = budget_amt - fund_src_sum;
           
        db_updateFundSrcBudget(fiscal_year, fund_src_col, budget_amt, new_balance_amt);
        alert("Funding source budget amount has been updated successfully");
        getFundSrcTypeList();
    });
    
    // auto size
    $('#mod_add_note_body').autosize();
});

////////////////////////////////////////////////////////////////////////////////
function formValidation(fund_src_type_id) {
    var err = "";
    if ($('#fund_type_' + fund_src_type_id).val().replace(/\s+/g, '') === "") {
        err += "Funding source name is a required\n";
    }
    if ($('#admin_name_' + fund_src_type_id).val().replace(/\s+/g, '') === "") {
        err += "Funding source administrator name is a required\n";
    }
    if ($('#admin_email_' + fund_src_type_id).val().replace(/\s+/g, '') === "") {
        err += "Funding source admin email is a required\n";
    }
    if ($('#descrip_' + fund_src_type_id).val().replace(/\s+/g, '') === "") {
        err += "Funding source discription is a required\n";
    }
    return err;
}

////////////////////////////////////////////////////////////////////////////////
function updateFundSrcType(fund_src_type_id) {
    var active = ($('#active_' + fund_src_type_id).is(':checked') ? true : false);
    var fund_src_type = textReplaceApostrophe($('#fund_type_' + fund_src_type_id).val());
    var fund_src_admin = textReplaceApostrophe($('#admin_name_' + fund_src_type_id).val());
    var fund_src_email = textReplaceApostrophe($('#admin_email_' + fund_src_type_id).val());
    var fund_src_descrip = textReplaceApostrophe($('#descrip_' + fund_src_type_id).val());
    
    return db_updateFundSrcType(fund_src_type_id, active, fund_src_type, fund_src_admin, fund_src_email, fund_src_descrip);
}

////////////////////////////////////////////////////////////////////////////////
function getFundSrcTypeList() {
    var result = new Array(); 
    result = db_getFundSrcTypeAll();
    
    $('#fund_src_list').empty();
    for(var i = 0; i < result.length; i++) { 
        setFundSrcTypeListHTML(result[i]['FundSrcTypeID']);
        
        if (result[i]['Active'] === "1") {
            $('#active_' + result[i]['FundSrcTypeID']).prop('checked', true);
        }
        $('#fund_type_' + result[i]['FundSrcTypeID']).val(result[i]['FundSrcType']);
        $('#admin_name_' + result[i]['FundSrcTypeID']).val(result[i]['FundSrcAdmin']);
        $('#admin_email_' + result[i]['FundSrcTypeID']).val(result[i]['FundSrcEmail']);
        $('#descrip_' + result[i]['FundSrcTypeID']).autosize();
        $('#descrip_' + result[i]['FundSrcTypeID']).val(result[i]['FundSrcDescrip']).trigger('autosize.resize');
        
        getFundSrcBudget(result[i]['FundSrcTypeID'], result[i]['FundSrcCol']);
    }
}

function setFundSrcTypeListHTML(fund_src_type_id) {
    var list_html = "";
    list_html += "<div class='row-fluid'>";
    list_html += "<div class='span1' style='padding-top: 5px;'>" + fund_src_type_id + "</div>";
    list_html += "<div class='span1' style='padding-top: 2px;'><input type='checkbox' disabled id='active_" + fund_src_type_id + "'></div>";
    list_html += "<div class='span3'><input type='text' class='span12' style='font-weight: bold;' readonly id='fund_type_" + fund_src_type_id + "'></div>";
    list_html += "<div class='span3'><input type='text' class='span12' id='admin_name_" + fund_src_type_id + "'></div>";
    list_html += "<div class='span3'><input type='text' class='span12' id='admin_email_" + fund_src_type_id + "'></div>";  
    list_html += "<div class='span1 form-horizontal'><button class='btn span12' id='btn_update_id_" + fund_src_type_id + "'><i class='icon-circle-arrow-up icon-black'></i></button></div>";
    list_html += "</div>";
    list_html += "<div class='row-fluid'>";
    list_html += "<div class='span2'>Description:</div>";
    list_html += "<div class='span10'><textarea class='span12' style='resize: vertical;' id='descrip_" + fund_src_type_id + "'></textarea></div>";
    list_html += "</div>";
    $('#fund_src_list').append(list_html);
}

////////////////////////////////////////////////////////////////////////////////
function getFundSrcBudget(fund_src_type_id, fund_src_col) {
    var result = new Array(); 
    result = db_getFundSrcBudget(fiscal_year, fund_src_col);
    
    var list_html = "";
    list_html += "<div class='row-fluid'>";
    list_html += "<div class='span2' style='padding-top: 5px; font-weight: bold;'>" + fiscal_year + " :</div>";
    list_html += "<div class='span3'><input type='text' class='span12' style='font-weight: bold;' id='budget_amt_" + fund_src_type_id + "'></div>";
    
    if (result.length === 0) {
        list_html += "<div class='span3' style='padding-top: 5px; font-weight: bold; color: blue;' id='balance_amt_" + fund_src_type_id + "'></div>";
    }
    else {
        if (Number(result[0]['BalanceAmt']) >= 0) {
            list_html += "<div class='span3' style='padding-top: 5px; font-weight: bold; color: blue;' id='balance_amt_" + fund_src_type_id + "'></div>";
        }
        else {
            list_html += "<div class='span3' style='padding-top: 5px; font-weight: bold; color: red;' id='balance_amt_" + fund_src_type_id + "'></div>";
        }
    }
    
    if (result.length === 0) {
        list_html += "<div class='span2 form-horizontal'><button class='btn span12' id='btn_fsb_add_id_" + fund_src_type_id + "'><i class='icon-plus-sign icon-black'></i> Add</button></div>";
    }
    else {
        list_html += "<div class='span2 form-horizontal'><button class='btn span12' id='btn_fsb_update_id_" + fund_src_type_id + "'><i class='icon-circle-arrow-up icon-black'></i> Update</button></div>";
    }
    
    list_html += "<div class='span1' style='display: none;' id='pre_budget_amt_" + fund_src_type_id + "'></div>";
    list_html += "<div class='span1' style='display: none;' id='pre_balance_amt_" + fund_src_type_id + "'></div>";
    list_html += "<div class='span1' style='display: none;' id='fund_src_col_" + fund_src_type_id + "'>" + fund_src_col + "</div>";
    list_html += "</div>";
    list_html += "<div class='row-fluid'><hr style='border-color: black;'></div>";
    $('#fund_src_list').append(list_html);
    
    if (result.length === 0) {
        $('#budget_amt_' + fund_src_type_id).val(formatDollar(0.00));
        $('#balance_amt_' + fund_src_type_id).html(formatDollar(0.00));
        $('#pre_budget_amt_' + fund_src_type_id).html(formatDollar(0.00));
        $('#pre_balance_amt_' + fund_src_type_id).html(formatDollar(0.00));
    }
    else {       
        $('#budget_amt_' + fund_src_type_id).val(formatDollar(Number(result[0]['BudgetAmt'])));
        $('#balance_amt_' + fund_src_type_id).html(formatDollar(Number(result[0]['BalanceAmt'])));
        $('#pre_budget_amt_' + fund_src_type_id).html(formatDollar(Number(result[0]['BudgetAmt'])));
        $('#pre_balance_amt_' + fund_src_type_id).html(formatDollar(Number(result[0]['BalanceAmt'])));
    }
}