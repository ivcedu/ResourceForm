////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('.container').css('width', '970px');
        getAllResourceFiscalYear();
        getASIVCReportList();
        initializeTable();
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
function initializeTable() {
    $("#tbl_RFList").tablesorter({ 
        headers: { 
            6: {sorter:'currency'}
        },
        widgets: ['stickyHeaders']
    });
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('#nav_home').click(function() {
        window.open('home.html', '_self');
    });
    
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
    });
    
    $('#all_fiscal_yrs').change(function() {
        getASIVCReportList();
    });
    
    // table row contract click //////////////////////////////////////////////
    $('table').on('click', 'a', function(e) {
        e.preventDefault();
        var currentId = $(this).attr('id');
        var resource_id = currentId.replace("resource_id_", "");

        sessionStorage.setItem('vrf_resource_id', resource_id);
        window.open('ViewResourceForm.html?resource_id=' + resource_id, '_blank');
    });
    
    // selectpicker
    $('.selectpicker').selectpicker();
});

////////////////////////////////////////////////////////////////////////////////
function getAllResourceFiscalYear() {
    $('#all_fiscal_yrs').html("");
    
    var result = new Array();
    result = db_getAllResourceFiscalYear();
    var html = "";
    for(var i = 0; i < result.length; i++) { 
        html += "<option value='" + result[i]['FiscalYear'] + "'>" + result[i]['FiscalYear'] + "</option>";
    }
    
    $('#all_fiscal_yrs').append(html);
    $('#all_fiscal_yrs').val(getFiscalYear());
    $('#all_fiscal_yrs').selectpicker('refresh');
}

function getASIVCReportList() {
    var result = new Array(); 
    result = db_getASIVCReportList($('#all_fiscal_yrs').val());
    
    $("#body_tr").empty();
    var html = "";
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            var str_totalAmount = formatDollar(Number(result[i]['TotalAmount']));
            html += setAllRFListHTML(result[i]['ResourceID'], result[i]['ProposalTitle'], result[i]['ResourceLink'], result[i]['ResourceType'], result[i]['ResourceStatus'], result[i]['CreatorName'], str_totalAmount);
        }
    }
    
    $("#body_tr").append(html);
    $('#tbl_RFList').trigger("updateAll");
    $('#tbl_RFList').trigger("appendCache");
}

function setAllRFListHTML(resource_id, proposal_title, resource_link, resource_type, resource_status, creator, str_amount) {   
    var tbl_html = "<tr>";
    tbl_html += "<td class='col_50'>" + resource_id + "</td>";
    tbl_html += "<td class='col_250'><a href=# id='resource_id_" + resource_id +  "'>" + proposal_title + "</a></td>";
    tbl_html += "<td class='col_50'>" + resource_link + "</td>";
    tbl_html += "<td class='col_150'>" + resource_type + "</td>";
    tbl_html += "<td class='col_150'>" + resource_status + "</td>";
    tbl_html += "<td class='col_150'>" + creator + "</td>";
    tbl_html += "<td class='col_100'>" + str_amount + "</td>";
    tbl_html += "</tr>";
    return tbl_html;
}