var user_browser = "";
var browser_wrap = '';

var admin = false;
var login_email = "";
var rate_column = "";

var ar_header = [];
var ar_enable_column = [];
var ar_db_column = [];

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {    
    if (sessionStorage.key(0) !== null) {
        user_browser = bowser.name;
        if (user_browser === "Internet Explorer") {
            browser_wrap = '<div>';
        }
        
        $('#mod_admin_setting').modal('hide');
        $('#mod_admin_add_body_new').hide();
        $('#nav_admin_setting').hide();
        
        $('#mod_export_rating').modal('hide');
        
        setAdminOption();        
        setTableHeader();
        getrateSSAMMOFList();
        initializeTable();
    }
    else {
        window.open('Login.html', '_self');
    }
};

function initializeTable() {
    $("#rf_list").tablesorter({ 
        theme : 'blue',
        widgets: ['stickyHeaders', 'editable'],
        widgetOptions: {
            editable_columns       : ar_enable_column,
            editable_enterToAccept : true,
            editable_autoAccept    : true,
            editable_autoResort    : false,
            editable_validate      : null,
            editable_trimContent   : true,
            editable_focused       : function(txt, columnIndex, $element) {
                if (user_browser === "Internet Explorer") {
                    $element.addClass('focused');
                }
                else {
                    $element.closest('td').addClass('focused');
                }
            },
            editable_blur          : function(txt, columnIndex, $element) {
                if (user_browser === "Internet Explorer") {
                    $element.removeClass('focused');
                }
                else {
                    $element.closest('td').removeClass('focused');
                }
            },
            editable_selectAll     : function(txt, columnIndex, $element){
                return /^b/i.test(txt) && columnIndex === 0;
            },
            editable_wrapContent   : browser_wrap,
            editable_noEdit        : 'no-edit',
            editable_editComplete  : 'editComplete'
        }
    })
    .children('tbody').on('editComplete', 'td', function(event, config){
        var current_id = $(this).attr('id');
        var edit_value = $(this).text();
        
        current_id = current_id.replace("ssa_rate_col_", "");
        var ar_id = current_id.split('_');
        var column = "ssa_mbr_" + ar_id[0];
        var rate_ssammo_id = ar_id[1];
        
        var num_rating = ratingConvertValue(edit_value);
        if (user_browser === "Firefox") {
            setTimeout(function() {
                calculateMedianMean(rate_ssammo_id, column, num_rating);
            }, 100);
            $(this).text(num_rating);
        }
        else if (user_browser === "Internet Explorer") {
            calculateMedianMean(rate_ssammo_id, column, num_rating);
            $(this).html("<div contenteditable=\"true\">" + num_rating + "</div>");
        }
        else {
            calculateMedianMean(rate_ssammo_id, column, num_rating);
            $(this).text(num_rating);
        }
    });
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {  
    $('#nav_home').click(function() {
        window.open('home.html', '_self');
    });
    
    $('#nav_excel_view').click(function() {
        window.open('committeeWorksheet.html', '_self');
    });
    
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
    });
    
    // table mouseover event ///////////////////////////////////////////////////
    $('table').on('mouseover', 'a[id^="resource_title_"]', function() {
        var current_id = $(this).attr('id');
        var ID = current_id.replace("resource_title_", "");
        var title_full = $('#resource_title_full_' + ID).html();
        
        $(this).popover({trigger:"manual", content:title_full, placement:"top"});
        $(this).popover('toggle');
    });
    
    // table mouseleave event //////////////////////////////////////////////////
    $('table').on('mouseleave', 'a[id^="resource_title_"]', function() {
        $(this).popover('hide');
    });
    
    // table row open resource form click //////////////////////////////////////
    $('table').on('click', 'a[id^="resource_title_"]', function(e) {
        e.preventDefault();
        var current_id = $(this).attr('id');
        var ID = current_id.replace("resource_title_", "");
        sessionStorage.setItem('vrf_resource_id', ID);
        window.open('ViewResourceForm.html?resource_id=' + ID, '_blank');
    });
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // modal add new member click event //////////////////////////////////////// 
    $('#nav_admin_setting').click(function(e) {
        getMemberList();
        $('#mod_admin_setting').modal('show');
    });
    
    $('#mod_admin_add_section_new').click(function() {
        var icon = $('#mod_admin_add_icon_new').attr('class');
        var index = icon.indexOf("icon-chevron-right");
        if (index === 0) {
            $('#mod_admin_add_icon_new').attr('class', 'icon-chevron-down icon-black');
            $('#mod_admin_add_body_new').show();
        }
        else {
            $('#mod_admin_add_icon_new').attr('class', 'icon-chevron-right icon-black');
            $('#mod_admin_add_body_new').hide();
        }
    });
    
    // modal add new member sbumit click event /////////////////////////////////
    $('#mod_admin_btn_add').click(function() {
        var err = newMemberValidation();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        insertNewMember();
        clearNewMemberInput();
        getMemberList();
    });
    
    // modal add table update click event //////////////////////////////////////
    $('table').on('click', '[id^="mbr_user_btn_update_"]', function() {
        var selected_id = $(this).attr('id');
        selected_id = selected_id.replace("mbr_user_btn_update_", "");

        updateSelectedMember(selected_id);
        getMemberList();
    });
    
    // modal add table delete click event //////////////////////////////////////
    $('table').on('click', '[id^="mbr_user_btn_delete_"]', function() {
        var selected_id = $(this).attr('id');
        selected_id = selected_id.replace("mbr_user_btn_delete_", "");
        var column_name = $('#mbr_column_name_' + selected_id).html();
        
        deleteSelectedMember(selected_id, column_name);
        getMemberList();
    });
    
    // modal close button click ////////////////////////////////////////////////
    $('#mod_admin_setting_close').click(function() {        
        updateDBMedianMean();
        if (admin) {
            window.open('rateSSAMMO.html', '_self');
        }
    });
    
    $('#mod_admin_setting_x').click(function() {
        updateDBMedianMean();
        if (admin) {
            window.open('rateSSAMMO.html', '_self');
        }
    });
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // modal export rating click event ///////////////////////////////////////// 
    $('#nav_export_mbr_rating').click(function(e) {
        getExportMemberList();
        $('#mod_export_rating').modal('show');
    });
    
    // modal export button click ///////////////////////////////////////////////
    $('#mod_export_btn_export').click(function() {
        var sel_user_email = $('#mod_export_mbr_list').val();
        var sel_column = getExportMemberInfo(sel_user_email);
    });
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // selectpicker
    $('.selectpicker').selectpicker();
});

////////////////////////////////////////////////////////////////////////////////
function setAdminOption() {
    login_email = sessionStorage.getItem('m1_loginEmail');
    var result = new Array(); 
    result = db_getmbrSSAMMO(login_email, false);
    
    if (login_email === "ykim160@ivc.edu" || login_email === "bhagan@ivc.edu") {
        admin = true;
        rate_column = "Master";
        setCSSContainerWidth();
        $('#nav_admin_setting').show();
    }
    else {
        if (result[0]['ssaUserAdmin'] === "1") {
//            admin = true;
            $('#nav_admin_setting').show();
        }
        rate_column = result[0]['ssaColumnName'];
    }
}

function setCSSContainerWidth() {
    var result = new Array(); 
    result = db_getmbrSSAMMO(login_email, true);
    
    var width = (result.length * 100 + 1200) + 'px';
    $('.container').css('width', width);
}

////////////////////////////////////////////////////////////////////////////////
function getTableHeaderArray() {
    var result = new Array(); 
    result = db_getmbrSSAMMO(login_email, admin);

    ar_header.length = 0;           
    
    for(var i = 0; i < result.length; i++) {
        var num_column = result[i]['ssaColumnName'];        
        num_column = num_column.replace("ssa_mbr_", "");

        var ar_column = new Array();
        ar_column.push(num_column, result[i]['ssaUserName']);
        ar_header.push(ar_column);
    }
}

function setTableHeader() {    
    getTableHeaderArray();
    var col_pos = 8;
    ar_enable_column.length = 0;
    
    $('#head_tr').empty();
    var tbl_html = "<tr>";    
    tbl_html += "<th class='col_50' style='text-align: left;'>ID</th>";
    tbl_html += "<th class='col_400' style='text-align: left;'>Proposal Title</th>";
    tbl_html += "<th class='col_150' style='text-align: right;'>T. Amount</th>";
    tbl_html += "<th class='col_200' style='text-align: left;'>Resource Type</th>";
    tbl_html += "<th class='col_200' style='text-align: left;'>Creator</th>";
    tbl_html += "<th class='col_150' style='text-align: left;'>Stage</th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='ssa_median'>Median</th>";
    tbl_html += "<th class='col_50' style='text-align: center;' id='ssa_mean'>Mean</th>";
    
    for (var i = 0; i < ar_header.length; i++) {
        var num_column = ar_header[i][0];  
        var name_column = ar_header[i][1];
        tbl_html += "<th class='col_100' style='text-align: center;' id='ssa_mbr_" + num_column + "'>" + name_column + "</th>";
        ar_enable_column.push(col_pos + i);
    }
    
    tbl_html += "</tr>";
    $("#head_tr").append(tbl_html);
}

function getrateSSAMMOFList() {
    var result = new Array();
    result = db_getrateSSAMMOList();

    $('#body_tr').empty();
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            var str_totalAmount = "";
            var f_totalAmount = parseFloat(result[i]['TotalAmount']);
            if (f_totalAmount > 0) {
                str_totalAmount = formatDollar(f_totalAmount);
            }
            getrateSSAMMOListHTML(result[i]['rateSSAMMO_ID'], result[i]['ResourceID'], result[i]['ProposalTitle'], str_totalAmount, result[i]['ResourceType'], result[i]['CreatorName'], result[i]['StageLevel']);
            setMedianValue(result[i]['rateSSAMMO_ID'], result[i]['Median']);
            setMeanValue(result[i]['rateSSAMMO_ID'], result[i]['Mean']);
            setMemberRatingValue(result[i]['rateSSAMMO_ID'], i, result);
        }
    }
}

function getrateSSAMMOListHTML(rate_ssammo_id, resource_id, title, amount, type, creator, stage) {
    var brief_title = textTruncate(30, title);
    
    var tbl_html = "<tr id='res_tr_" + rate_ssammo_id + "'>";
    tbl_html += "<td class='col_50'>" + resource_id + "</td>";
    tbl_html += "<td class='col_400'><a href='#' id='resource_title_" + resource_id +  "'>" + brief_title + "</a></td>";
    tbl_html += "<td class='col_150' style='text-align: right;'>" + amount + "</td>";
    tbl_html += "<td class='col_200'>" + type + "</td>";
    tbl_html += "<td class='col_200'>" + creator + "</td>";
    tbl_html += "<td class='col_150'>" + stage + "</td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='ssa_median_" + rate_ssammo_id + "'></td>";
    tbl_html += "<td class='col_50' style='text-align: center;' id='ssa_mean_" + rate_ssammo_id + "'></td>";
    
    for (var i = 0; i < ar_header.length; i++) {
        var num_column = ar_header[i][0];  
        tbl_html += "<td class='col_100' style='text-align: center;' id='ssa_rate_col_" + num_column + "_" + rate_ssammo_id + "'></td>";
    }
    
    // hide html
    tbl_html += "<td class='span1' style='display: none;' id='resource_title_full_" + resource_id + "'>" + title + "</td>";
    tbl_html += "</tr>";
    $('#body_tr').append(tbl_html);
}

function setMedianValue(rate_ssammo_id, median) {
    if (median !== null) {
        $('#ssa_median_' + rate_ssammo_id).html(median);
    }
}

function setMeanValue(rate_ssammo_id, mean) {
    if (mean !== null) {
        $('#ssa_mean_' + rate_ssammo_id).html(mean);
    }
}

function setMemberRatingValue(rate_ssammo_id, index, result) {    
    for (var i = 0; i < ar_header.length; i++) {
        var num_column = ar_header[i][0];
        var column_name = "ssa_mbr_" +  num_column;
        var mbr_value = result[index][column_name];
        if (mbr_value !== null) {
            $('#ssa_rate_col_' + num_column + '_' + rate_ssammo_id).html(mbr_value);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
function getMemberList() {
    var result = new Array(); 
    result = db_getmbrSSAMMO(login_email, true);
    
    $('#mod_body_tr').empty();
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            setMemberListHTML(result[i]['mbrSSAMMO_ID'], result[i]['ssaColumnName']);
            setMemberNameHTML(result[i]['mbrSSAMMO_ID'], result[i]['ssaUserName']);
            setMemberEmailHTML(result[i]['mbrSSAMMO_ID'], result[i]['ssaUserEmail']);
            setMemberActiveHTML(result[i]['mbrSSAMMO_ID'], result[i]['ssaUserActive']);
            setMemberAdminHTML(result[i]['mbrSSAMMO_ID'], result[i]['ssaUserAdmin']);
        }
    }
}

function setMemberListHTML(mbr_ssammo_id, ssa_column_name) {
    var tbl_html = "<tr class='row_tr' id='mbr_ssammo_id_" + mbr_ssammo_id + "'>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mbr_user_name_" + mbr_ssammo_id + "'></td>";
    tbl_html += "<td class='span4'><input type='text' class='span12' id='mbr_user_email_" + mbr_ssammo_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal' style='text-align: center;'><input type='checkbox' id='mbr_user_active_" + mbr_ssammo_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal' style='text-align: center;'><input type='checkbox' id='mbr_user_admin_" + mbr_ssammo_id + "'></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mbr_user_btn_update_" + mbr_ssammo_id + "'><i class='icon-circle-arrow-up icon-black'></i></button></td>";
    tbl_html += "<td class='span1 form-horizontal'><button class='btn btn-mini span12' id='mbr_user_btn_delete_" + mbr_ssammo_id + "'><i class='icon-trash icon-black'></i></button></td>";
    tbl_html += "<td class='span1' style='display: none;' id='mbr_column_name_" + mbr_ssammo_id + "'>" + ssa_column_name + "</td>";
    tbl_html += "</tr>";
    
    $("#mod_body_tr").append(tbl_html);
}

function setMemberNameHTML(mbr_ssammo_id, user_name) {
    $('#mbr_user_name_' + mbr_ssammo_id).val(user_name);
}

function setMemberEmailHTML(mbr_ssammo_id, user_email) {
    $('#mbr_user_email_' + mbr_ssammo_id).val(user_email);
}

function setMemberActiveHTML(mbr_ssammo_id, user_active) {
    var ckb_value = (user_active === "1" ? true : false);
    $('#mbr_user_active_' + mbr_ssammo_id).prop('checked', ckb_value);
}

function setMemberAdminHTML(mbr_ssammo_id, user_admin) {
    var ckb_value = (user_admin === "1" ? true : false);
    $('#mbr_user_admin_' + mbr_ssammo_id).prop('checked', ckb_value);
}

////////////////////////////////////////////////////////////////////////////////
function newMemberValidation() {
    var err = "";
    if ($('#mod_admin_add_name_new').val().replace(/\s+/g, '') === "") {
        err += "Member name is a required\n";
    }
    if ($('#mod_admin_add_email_new').val().replace(/\s+/g, '') === "") {
        err += "Member email is a required\n";
    }
    return err;
}

function clearNewMemberInput() {
    $('#mod_admin_add_name_new').val("");
    $('#mod_admin_add_email_new').val("");
    $('#mod_admin_add_admin_new').prop('checked', false);
}

function insertNewMember() { 
    var name = $('#mod_admin_add_name_new').val();
    var email = $('#mod_admin_add_email_new').val();
    var admin = ($('#mod_admin_add_admin_new').is(':checked') ? true : false);
    
    var mbr_ssammo_id = db_insertmbrSSAMMO(textReplaceApostrophe(name), textReplaceApostrophe(email), admin);
    var column = "ssa_mbr_" + mbr_ssammo_id;
    db_updatembrSSAMMOColumn(mbr_ssammo_id, column);
    db_addColumn_rateSSAMMO(column);
}

function updateSelectedMember(mbr_ssammo_id) {
    var name = $('#mbr_user_name_' + mbr_ssammo_id).val();
    var email = $('#mbr_user_email_' + mbr_ssammo_id).val();
    var active = ($('#mbr_user_active_' + mbr_ssammo_id).is(':checked') ? true : false);
    var admin = ($('#mbr_user_admin_' + mbr_ssammo_id).is(':checked') ? true : false);
    
    db_updatembrSSAMMO(mbr_ssammo_id, textReplaceApostrophe(name), textReplaceApostrophe(email), active, admin);
}

function deleteSelectedMember(mbr_ssammo_id, column) {
    db_deletembrSSAMMO(mbr_ssammo_id);
    db_deleteColumn_rateSSAMMO(column);
}

////////////////////////////////////////////////////////////////////////////////
function ratingConvertValue(str_value) {
    var num_rating = Math.round(Number(str_value));
    if (num_rating < 0) {
        return 0;
    }
    else if (num_rating > 5) {
        return 5;
    }
    else {
        return num_rating;
    }
}

function calculateMedianMean(rate_ssammo_id, db_column, db_rating) {    
    db_updaterateSSAMMORating(rate_ssammo_id, db_column, db_rating);
    
    getDBAllColumnArray();
    sqlRawScriptUpdateMedian(rate_ssammo_id);
    sqlRawScriptUpdateMean(rate_ssammo_id);
    
    var result = new Array();
    result = db_getrateSSAMMO(rate_ssammo_id);
    
    if (result[0]['Median'] !== null) {
        $('#ssa_median_' + rate_ssammo_id).html(result[0]['Median']);
    }
    
    if (result[0]['Mean'] !== null) {
        $('#ssa_mean_' + rate_ssammo_id).html(result[0]['Mean']);
    }
}

////////////////////////////////////////////////////////////////////////////////
function getDBAllColumnArray() {
    var result = new Array(); 
    result = db_getmbrSSAMMO(login_email, true);

    ar_db_column.length = 0;           
    
    for(var i = 0; i < result.length; i++) {
        var num_column = result[i]['ssaColumnName'];        
        num_column = num_column.replace("ssa_mbr_", "");

        var ar_column = new Array();
        ar_column.push(num_column);
        ar_db_column.push(ar_column);
    }
}

function updateDBMedianMean() {
    getDBAllColumnArray();
    
    if (ar_db_column.length === 0) {
        nullUpdateMedian();
        nullUpdateMean();
    }
    else if (ar_db_column.length === 1) {
        directUpdateMedian();
        directUpdateMean();
    }
    else {
        sqlAllScriptUpdateMedian();
        sqlAllScriptUpdateMean();
    }
}

function nullUpdateMedian() {
    var sql_query = "UPDATE [IVCRESOURCES].[dbo].[rateSSAMMO] SET Median = null";
    db_script_update_rate(sql_query);
}

function directUpdateMedian() {
    var num_column = ar_db_column[0][0];
    var sql_query = "UPDATE [IVCRESOURCES].[dbo].[rateSSAMMO] SET Median = ssa_mbr_" + num_column;
    db_script_update_rate(sql_query);
}

function sqlRawScriptUpdateMedian(rate_ssammo_id) {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(rateSSAMMO_ID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT rateSSAMMO_ID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateSSAMMO] WHERE rateSSAMMO_ID = " + rate_ssammo_id + ") pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
    var sql_variable = "";
    for (var i = 0; i < ar_db_column.length; i++) {
        var num_column = ar_db_column[i][0];
        sql_variable += "ssa_mbr_" + num_column + ", ";
    }
    sql_variable = sql_variable.substring(0, sql_variable.length - 2);
    sql_query += sql_variable + ")) AS Result ";
    sql_query += "CREATE TABLE #MEDIAN_RESULT (rateSSAMMO_ID int, column_median numeric(3, 2)) ";
    sql_query += ";WITH Counts AS(SELECT rateSSAMMO_ID, c = COUNT(*) FROM #MEDIAN_TABLE GROUP BY rateSSAMMO_ID) ";
    sql_query += "INSERT INTO #MEDIAN_RESULT SELECT a.rateSSAMMO_ID, Median = AVG(0. + value) FROM Counts a ";
    sql_query += "CROSS APPLY(SELECT TOP (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) b.value, r = ROW_NUMBER() OVER (ORDER BY b.value) FROM #MEDIAN_TABLE b WHERE a.rateSSAMMO_ID = b.rateSSAMMO_ID ORDER BY b.value ) p ";
    sql_query += "WHERE r BETWEEN ((a.c - 1) / 2) + 1 AND (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) GROUP BY a.rateSSAMMO_ID; ";
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateSSAMMO] SET Median = rst.column_median ";
    sql_query += "FROM #MEDIAN_RESULT AS rst INNER JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS org ON rst.rateSSAMMO_ID = org.rateSSAMMO_ID ";
    sql_query += "DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

function sqlAllScriptUpdateMedian() {
    var sql_query = "CREATE TABLE #MEDIAN_TABLE(rateSSAMMO_ID int, value numeric(3, 2)) INSERT INTO #MEDIAN_TABLE SELECT rateSSAMMO_ID, CONVERT(numeric(3, 2), Value) ";
    sql_query += "FROM (SELECT * FROM [IVCRESOURCES].[dbo].[rateSSAMMO]) pivotedDate UNPIVOT (Value FOR AgeRAnge IN (";
    var sql_variable = "";
    for (var i = 0; i < ar_db_column.length; i++) {
        var num_column = ar_db_column[i][0];
        sql_variable += "ssa_mbr_" + num_column + ", ";
    }
    sql_variable = sql_variable.substring(0, sql_variable.length - 2);
    sql_query += sql_variable + ")) AS Result ";
    sql_query += "CREATE TABLE #MEDIAN_RESULT (rateSSAMMO_ID int, column_median numeric(3, 2)) ";
    sql_query += ";WITH Counts AS(SELECT rateSSAMMO_ID, c = COUNT(*) FROM #MEDIAN_TABLE GROUP BY rateSSAMMO_ID) ";
    sql_query += "INSERT INTO #MEDIAN_RESULT SELECT a.rateSSAMMO_ID, Median = AVG(0. + value) FROM Counts a ";
    sql_query += "CROSS APPLY(SELECT TOP (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) b.value, r = ROW_NUMBER() OVER (ORDER BY b.value) FROM #MEDIAN_TABLE b WHERE a.rateSSAMMO_ID = b.rateSSAMMO_ID ORDER BY b.value ) p ";
    sql_query += "WHERE r BETWEEN ((a.c - 1) / 2) + 1 AND (((a.c - 1) / 2) + (1 + (1 - a.c % 2))) GROUP BY a.rateSSAMMO_ID; ";
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateSSAMMO] SET Median = rst.column_median ";
    sql_query += "FROM #MEDIAN_RESULT AS rst INNER JOIN [IVCRESOURCES].[dbo].[rateSSAMMO] AS org ON rst.rateSSAMMO_ID = org.rateSSAMMO_ID ";
    sql_query += "UPDATE [IVCRESOURCES].[dbo].[rateSSAMMO] SET Median = NULL ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateSSAMMO] AS org LEFT JOIN #MEDIAN_RESULT AS rst ON org.rateSSAMMO_ID = rst.rateSSAMMO_ID ";
    sql_query += "WHERE rst.ResourceID IS NULL ";
    sql_query += "DROP TABLE #MEDIAN_TABLE DROP TABLE #MEDIAN_RESULT";
    db_script_update_rate(sql_query);
}

function nullUpdateMean() {
    var sql_query = "UPDATE [IVCRESOURCES].[dbo].[rateSSAMMO] SET Mean = null";
    db_script_update_rate(sql_query);
}

function directUpdateMean() {
    var num_column = ar_db_column[0][0];
    var sql_query = "UPDATE [IVCRESOURCES].[dbo].[rateSSAMMO] SET Mean = ssa_mbr_" + num_column;
    db_script_update_rate(sql_query);
}

function sqlRawScriptUpdateMean(rate_ssammo_id) {
    var sql_query = "";
    var sql_query_1 = "UPDATE [IVCRESOURCES].[dbo].[rateSSAMMO] SET Mean = CONVERT(numeric(3, 2), ";
    var sql_query_2 = "NULLIF((";
    for (var i = 0; i < ar_db_column.length; i++) {
        var num_column = ar_db_column[i][0];
        if (i > 0) {
            sql_query_1 += "+ ISNULL(CONVERT(numeric(3, 2), ssa_mbr_" + num_column + "), 0) ";
            sql_query_2 += "+ CASE WHEN ssa_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
        else {
            sql_query_1 += "(ISNULL(CONVERT(numeric(3, 2), ssa_mbr_" + num_column + "), 0) ";
            sql_query_2 += "CASE WHEN ssa_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
    }
    sql_query_1 = sql_query_1.trim();
    sql_query_2 = sql_query_2.trim();
    sql_query += sql_query_1 + ") / " + sql_query_2 + "), 0)) ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateSSAMMO] ";
    sql_query += "WHERE rateSSAMMO_ID = " + rate_ssammo_id;
    db_script_update_rate(sql_query);
}

function sqlAllScriptUpdateMean() {
    var sql_query = "";
    var sql_query_1 = "UPDATE [IVCRESOURCES].[dbo].[rateSSAMMO] SET Mean = CONVERT(numeric(3, 2), ";
    var sql_query_2 = "NULLIF((";
    for (var i = 0; i < ar_db_column.length; i++) {
        var num_column = ar_db_column[i][0];
        if (i > 0) {
            sql_query_1 += "+ ISNULL(CONVERT(numeric(3, 2), ssa_mbr_" + num_column + "), 0) ";
            sql_query_2 += "+ CASE WHEN ssa_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
        else {
            sql_query_1 += "(ISNULL(CONVERT(numeric(3, 2), ssa_mbr_" + num_column + "), 0) ";
            sql_query_2 += "CASE WHEN ssa_mbr_" + num_column + " IS NULL THEN 0 ELSE 1 END ";
        }
    }
    sql_query_1 = sql_query_1.trim();
    sql_query_2 = sql_query_2.trim();
    sql_query += sql_query_1 + ") / " + sql_query_2 + "), 0)) ";
    sql_query += "FROM [IVCRESOURCES].[dbo].[rateSSAMMO]";
    db_script_update_rate(sql_query);
}

////////////////////////////////////////////////////////////////////////////////
function getExportMemberList() {
    var result = new Array(); 
    result = db_getmbrSSAMMO(login_email, true);
    
    $('#mod_export_mbr_list').empty();
    var html = "";
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) {
            html += "<option value=" + result[i]['ssaUserEmail'] + ">" + result[i]['ssaUserName'] + "</option>";
        }
    }
    $("#mod_export_mbr_list").append(html);
    $("#mod_export_mbr_list").selectpicker('refresh');
}

function getExportMemberInfo(email) {
    var result = new Array(); 
    result = db_getmbrSSAMMO(email, false);
    
    if (result.length === 1) {
        return result[0]['ssaColumnName'];
    }
    else {
        return "";
    }
}