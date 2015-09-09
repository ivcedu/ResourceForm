////////////////////////////////////////////////////////////////////////////////
// db report get ///////////////////////////////////////////////////////////////
function db_rpt_getRFDashboard(FiscalYear) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_rpt_getRFDashboard.php",
        data:{FiscalYear:FiscalYear},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_rpt_getFundingSrc(FiscalYear) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_rpt_getFundingSrc.php",
        data:{FiscalYear:FiscalYear},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_rpt_getFundSrcBudgetList(FiscalYear) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_rpt_getFundSrcBudgetList.php",
        data:{FiscalYear:FiscalYear},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_rpt_getCommitteeStatistic(FiscalYear) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_rpt_getCommitteeStatistic.php",
        data:{FiscalYear:FiscalYear},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_rpt_getAllResourceFiscalYear() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_rpt_getAllResourceFiscalYear.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function formatDollar(num) {
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

////////////////////////////////////////////////////////////////////////////////
function rpt_getFiscalYear() {
    var today = new Date();
    var mon = today.getMonth()+1;
    var yr = today.getFullYear();
    
    if (mon > 6) {
        return yr + "-" + (yr + 1);
    }
    else {
        return (yr - 1) + "-" + yr;
    }
}