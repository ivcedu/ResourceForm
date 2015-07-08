////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('.container').css('width', '970px');
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
    
    // table row contract click //////////////////////////////////////////////
    $('table').on('click', 'a', function(e) {
        e.preventDefault();
        var currentId = $(this).attr('id');
        var resource_id = currentId.replace("resource_id_", "");

        sessionStorage.setItem('vrf_resource_id', resource_id);
        window.open('ViewResourceForm.html?resource_id=' + resource_id, '_blank');
    });
});

////////////////////////////////////////////////////////////////////////////////
function getASIVCReportList() {
    var result = new Array(); 
    result = db_getASIVCReportList();
    
    $("#body_tr").empty();
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            var str_totalAmount = formatDollar(Number(result[i]['TotalAmount']));
            setAllRFListHTML(result[i]['ResourceID'], result[i]['ProposalTitle'], result[i]['ResourceLink'], result[i]['ResourceType'], result[i]['ResourceStatus'], result[i]['CreatorName'], str_totalAmount);
        }
    }
    
    $("#tbl_RFList").trigger("update");
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
    
    $("#body_tr").append(tbl_html);
}