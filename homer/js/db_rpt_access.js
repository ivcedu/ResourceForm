////////////////////////////////////////////////////////////////////////////////
// db report get ///////////////////////////////////////////////////////////////
function db_rpt_getRFDashboard() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_rpt_getRFDashboard.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_rpt_getFundingSrc() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_rpt_getFundingSrc.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_rpt_getFundSrcBudgetList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_rpt_getFundSrcBudgetList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_rpt_getCommitteeStatistic() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_rpt_getCommitteeStatistic.php",
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