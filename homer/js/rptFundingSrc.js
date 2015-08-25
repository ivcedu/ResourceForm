var fs_1_count = 0;
var fs_2_count = 0;
var fs_3_count = 0;
var fs_4_count = 0;
var fs_5_count = 0;
var fs_6_count = 0;
var fs_7_count = 0;
var fs_8_count = 0;
var fs_9_count = 0;
var fs_10_count = 0;
var fs_11_count = 0;
var fs_12_count = 0;
var fs_13_count = 0;
var fs_14_count = 0;
var fs_15_count = 0;
var fs_16_count = 0;
var fs_17_count = 0;
var fs_18_count = 0;
var fs_19_count = 0;
var fs_20_count = 0;
var fs_21_count = 0;
var fs_22_count = 0;
var fs_23_count = 0;
var fs_total_count = 0;

var fa_1_count = 0;
var fa_2_count = 0;
var fa_3_count = 0;
var fa_4_count = 0;
var fa_5_count = 0;
var fa_6_count = 0;
var fa_7_count = 0;
var fa_8_count = 0;
var fa_9_count = 0;
var fa_10_count = 0;
var fa_11_count = 0;
var fa_12_count = 0;
var fa_13_count = 0;
var fa_14_count = 0;
var fa_15_count = 0;
var fa_16_count = 0;
var fa_17_count = 0;
var fa_18_count = 0;
var fa_19_count = 0;
var fa_20_count = 0;
var fa_21_count = 0;
var fa_22_count = 0;
var fa_23_count = 0;

var fs_1_amount = 0.00;
var fs_2_amount = 0.00;
var fs_3_amount = 0.00;
var fs_4_amount = 0.00;
var fs_5_amount = 0.00;
var fs_6_amount = 0.00;
var fs_7_amount = 0.00;
var fs_8_amount = 0.00;
var fs_9_amount = 0.00;
var fs_10_amount = 0.00;
var fs_11_amount = 0.00;
var fs_12_amount = 0.00;
var fs_13_amount = 0.00;
var fs_14_amount = 0.00;
var fs_15_amount = 0.00;
var fs_16_amount = 0.00;
var fs_17_amount = 0.00;
var fs_18_amount = 0.00;
var fs_19_amount = 0.00;
var fs_20_amount = 0.00;
var fs_21_amount = 0.00;
var fs_22_amount = 0.00;
var fs_23_amount = 0.00;
var fs_total_amount = 0.00;

var fa_1_amount = 0.00;
var fa_2_amount = 0.00;
var fa_3_amount = 0.00;
var fa_4_amount = 0.00;
var fa_5_amount = 0.00;
var fa_6_amount = 0.00;
var fa_7_amount = 0.00;
var fa_8_amount = 0.00;
var fa_9_amount = 0.00;
var fa_10_amount = 0.00;
var fa_11_amount = 0.00;
var fa_12_amount = 0.00;
var fa_13_amount = 0.00;
var fa_14_amount = 0.00;
var fa_15_amount = 0.00;
var fa_16_amount = 0.00;
var fa_17_amount = 0.00;
var fa_18_amount = 0.00;
var fa_19_amount = 0.00;
var fa_20_amount = 0.00;
var fa_21_amount = 0.00;
var fa_22_amount = 0.00;
var fa_23_amount = 0.00;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) { 
        rpt_getAllResourceFiscalYear();
        rpt_getFundingSrc();
        rpt_getFundSrcBudgetList();
    }
    else {
        window.open('Login.html', '_self');
    }
};

$(window).bind("load", function () {
    // Remove splash screen after load
    $('.splash').css('display', 'none');
});

$(window).bind("resize click", function () {
    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();

    // Waint until metsiMenu, collapse and other effect finish and set wrapper height
    setTimeout(function () {
        fixWrapperHeight();
    }, 300);
});

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();
    
    // Handle minimalize sidebar menu
    $('.hide-menu').click(function(event){
        event.preventDefault();
        if ($(window).width() < 769) {
            $("body").toggleClass("show-sidebar");
        } else {
            $("body").toggleClass("hide-sidebar");
        }
    });
    
    // Initialize metsiMenu plugin to sidebar menu
    $('#side-menu').metisMenu();
    
    // Initialize iCheck plugin
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
    
    // Initialize animate panel function
    $('.animate-panel').animatePanel();
    
    // Function for collapse hpanel
    $('.showhide').click(function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        var icon = $(this).find('i:first');
        var body = hpanel.find('div.panel-body');
        var footer = hpanel.find('div.panel-footer');
        body.slideToggle(300);
        footer.slideToggle(200);

        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        hpanel.toggleClass('').toggleClass('panel-collapse');
        setTimeout(function () {
            hpanel.resize();
            hpanel.find('[id^=map-]').resize();
        }, 50);
    });
    
    // Function for close hpanel
    $('.closebox').click(function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        hpanel.remove();
    });
    
    // Function for small header
    $('.small-header-action').click(function(event){
        event.preventDefault();
        var icon = $(this).find('i:first');
        var breadcrumb  = $(this).parent().find('#hbreadcrumb');
        $(this).parent().parent().parent().toggleClass('small-header');
        breadcrumb.toggleClass('m-t-lg');
        icon.toggleClass('fa-arrow-up').toggleClass('fa-arrow-down');
    });
    
    // Set minimal height of #wrapper to fit the window
    fixWrapperHeight();
    
    // Sparkline bar chart data and options used under Profile image on left navigation panel
    $("#sparkline1").sparkline([5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 11, 4], {
        type: 'bar',
        barWidth: 7,
        height: '30px',
        barColor: '#62cb31',
        negBarColor: '#53ac2a'
    });
    
    // Initialize tooltips
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]"
    });

    // Initialize popover
    $("[data-toggle=popover]").popover();

    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.modal').appendTo("body");
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#nav_home').click(function() {
        window.open('../home.html', '_self');
        return false;
    });
    
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('../Login.html', '_self');
        return false;
    });
    
    $('#btn_refresh').click(function() {
        rpt_resetFundingSrc();
        rpt_resetFundSrcBudgetList();
        
        rpt_getFundingSrc();
        rpt_getFundSrcBudgetList();
    });
    
    // bootstrap selectpicker
    $('.selectpicker').selectpicker();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});

////////////////////////////////////////////////////////////////////////////////
function fixWrapperHeight() {
    // Get and set current height
    var headerH = 62;
    var navigationH = $("#navigation").height();
    var contentH = $(".content").height();

    // Set new height when contnet height is less then navigation
    if (contentH < navigationH) {
        $("#wrapper").css("min-height", navigationH + 'px');
    }

    // Set new height when contnet height is less then navigation and navigation is less then window
    if (contentH < navigationH && navigationH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH  + 'px');
    }

    // Set new height when contnet is higher then navigation but less then window
    if (contentH > navigationH && contentH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH + 'px');
    }
}

function setBodySmall() {
    if ($(this).width() < 769) {
        $('body').addClass('page-small');
    } else {
        $('body').removeClass('page-small');
        $('body').removeClass('show-sidebar');
    }
}

// Animate panel function
$.fn['animatePanel'] = function() {
    var element = $(this);
    var effect = $(this).data('effect');
    var delay = $(this).data('delay');
    var child = $(this).data('child');

    // Set default values for attrs
    if(!effect) { effect = 'zoomIn';};
    if(!delay) { delay = 0.1; } else { delay = delay / 10; };
    if(!child) { child = '.row > div';} else {child = "." + child;};

    //Set defaul values for start animation and delay
    var startAnimation = 0;
    var start = Math.abs(delay) + startAnimation;

    // Get all visible element and set opactiy to 0
    var panel = element.find(child);
    panel.addClass('opacity-0');

    // Get all elements and add effect class
    panel = element.find(child);
    panel.addClass('animated-panel').addClass(effect);

    // Add delay for each child elements
    panel.each(function (i, elm) {
        start += delay;
        var rounded = Math.round(start * 10) / 10;
        $(elm).css('animation-delay', rounded + 's');
        // Remove opacity 0 after finish
        $(elm).removeClass('opacity-0');
    });
};

////////////////////////////////////////////////////////////////////////////////
function rpt_getAllResourceFiscalYear() {
    $('#all_fiscal_yrs').html("");
    
    var result = new Array();
    result = db_rpt_getAllResourceFiscalYear();
    var html = "";
    for(var i = 0; i < result.length; i++) { 
        html += "<option value='" + result[i]['FiscalYear'] + "'>" + result[i]['FiscalYear'] + "</option>";
    }
    
    $('#all_fiscal_yrs').append(html);
    $('#all_fiscal_yrs').selectpicker('refresh');
}

function rpt_getFundingSrc() {
    var result = new Array();
    result = db_rpt_getFundingSrc($('#all_fiscal_yrs').val());
    
    fs_total_count = result.length;
    for(var i = 0; i < result.length; i++) {         
        if (result[i]['fs_1'] === "1") {
            fs_1_count++;
            fs_1_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_1_amt = Number(result[i]['fs_1_amt']);
            if (fs_1_amt > 0) {
                fa_1_count++;
                fa_1_amount += fs_1_amt;
            }
        }
        if (result[i]['fs_2'] === "1") {
            fs_2_count++;
            fs_2_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_2_amt = Number(result[i]['fs_2_amt']);
            if (fs_2_amt > 0) {
                fa_2_count++;
                fa_2_amount += fs_2_amt;
            }
        }
        if (result[i]['fs_3'] === "1") {
            fs_3_count++;
            fs_3_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_3_amt = Number(result[i]['fs_3_amt']);
            if (fs_3_amt > 0) {
                fa_3_count++;
                fa_3_amount += fs_3_amt;
            }
        }
        if (result[i]['fs_4'] === "1") {
            fs_4_count++;
            fs_4_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_4_amt = Number(result[i]['fs_4_amt']);
            if (fs_4_amt > 0) {
                fa_4_count++;
                fa_4_amount += fs_4_amt;
            }
        }
        if (result[i]['fs_5'] === "1") {
            fs_5_count++;
            fs_5_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_5_amt = Number(result[i]['fs_5_amt']);
            if (fs_5_amt > 0) {
                fa_5_count++;
                fa_5_amount += fs_5_amt;
            }
        }
        if (result[i]['fs_6'] === "1") {
            fs_6_count++;
            fs_6_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_6_amt = Number(result[i]['fs_6_amt']);
            if (fs_6_amt > 0) {
                fa_6_count++;
                fa_6_amount += fs_6_amt;
            }
        }
        if (result[i]['fs_7'] === "1") {
            fs_7_count++;
            fs_7_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_7_amt = Number(result[i]['fs_7_amt']);
            if (fs_7_amt > 0) {
                fa_7_count++;
                fa_7_amount += fs_7_amt;
            }
        }
        if (result[i]['fs_8'] === "1") {
            fs_8_count++;
            fs_8_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_8_amt = Number(result[i]['fs_8_amt']);
            if (fs_8_amt > 0) {
                fa_8_count++;
                fa_8_amount += fs_8_amt;
            }
        }
        if (result[i]['fs_9'] === "1") {
            fs_9_count++;
            fs_9_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_9_amt = Number(result[i]['fs_9_amt']);
            if (fs_9_amt > 0) {
                fa_9_count++;
                fa_9_amount += fs_9_amt;
            }
        }
        if (result[i]['fs_10'] === "1") {
            fs_10_count++;
            fs_10_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_10_amt = Number(result[i]['fs_10_amt']);
            if (fs_10_amt > 0) {
                fa_10_count++;
                fa_10_amount += fs_10_amt;
            }
        }
        if (result[i]['fs_11'] === "1") {
            fs_11_count++;
            fs_11_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_11_amt = Number(result[i]['fs_11_amt']);
            if (fs_11_amt > 0) {
                fa_11_count++;
                fa_11_amount += fs_11_amt;
            }
        }
        if (result[i]['fs_12'] === "1") {
            fs_12_count++;
            fs_12_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_12_amt = Number(result[i]['fs_12_amt']);
            if (fs_12_amt > 0) {
                fa_12_count++;
                fa_12_amount += fs_12_amt;
            }
        }
        if (result[i]['fs_13'] === "1") {
            fs_13_count++;
            fs_13_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_13_amt = Number(result[i]['fs_13_amt']);
            if (fs_13_amt > 0) {
                fa_13_count++;
                fa_13_amount += fs_13_amt;
            }
        }
        if (result[i]['fs_14'] === "1") {
            fs_14_count++;
            fs_14_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_14_amt = Number(result[i]['fs_14_amt']);
            if (fs_14_amt > 0) {
                fa_14_count++;
                fa_14_amount += fs_14_amt;
            }
        }
        if (result[i]['fs_15'] === "1") {
            fs_15_count++;
            fs_15_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_15_amt = Number(result[i]['fs_15_amt']);
            if (fs_15_amt > 0) {
                fa_15_count++;
                fa_15_amount += fs_15_amt;
            }
        }
        if (result[i]['fs_16'] === "1") {
            fs_16_count++;
            fs_16_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_16_amt = Number(result[i]['fs_16_amt']);
            if (fs_16_amt > 0) {
                fa_16_count++;
                fa_16_amount += fs_16_amt;
            }
        }
        if (result[i]['fs_17'] === "1") {
            fs_17_count++;
            fs_17_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_17_amt = Number(result[i]['fs_17_amt']);
            if (fs_17_amt > 0) {
                fa_17_count++;
                fa_17_amount += fs_17_amt;
            }
        }
        if (result[i]['fs_18'] === "1") {
            fs_18_count++;
            fs_18_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_18_amt = Number(result[i]['fs_18_amt']);
            if (fs_18_amt > 0) {
                fa_18_count++;
                fa_18_amount += fs_18_amt;
            }
        }
        if (result[i]['fs_19'] === "1") {
            fs_19_count++;
            fs_19_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_19_amt = Number(result[i]['fs_19_amt']);
            if (fs_19_amt > 0) {
                fa_19_count++;
                fa_19_amount += fs_19_amt;
            }
        }
        if (result[i]['fs_20'] === "1") {
            fs_20_count++;
            fs_20_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_20_amt = Number(result[i]['fs_20_amt']);
            if (fs_20_amt > 0) {
                fa_20_count++;
                fa_20_amount += fs_20_amt;
            }
        }
        if (result[i]['fs_21'] === "1") {
            fs_21_count++;
            fs_21_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_21_amt = Number(result[i]['fs_21_amt']);
            if (fs_21_amt > 0) {
                fa_21_count++;
                fa_21_amount += fs_21_amt;
            }
        }
        if (result[i]['fs_22'] === "1") {
            fs_22_count++;
            fs_22_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_22_amt = Number(result[i]['fs_22_amt']);
            if (fs_22_amt > 0) {
                fa_22_count++;
                fa_22_amount += fs_22_amt;
            }
        }
        if (result[i]['fs_23'] === "1") {
            fs_23_count++;
            fs_23_amount += Number(result[i]['TotalAmount']);
            fs_total_amount += Number(result[i]['TotalAmount']);
            var fs_23_amt = Number(result[i]['fs_23_amt']);
            if (fs_23_amt > 0) {
                fa_23_count++;
                fa_23_amount += fs_23_amt;
            }
        }
    }
}

function rpt_getFundSrcBudgetList() {
    var result = new Array();
    result = db_rpt_getFundSrcBudgetList($('#all_fiscal_yrs').val());
    
    for(var i = 0; i < result.length; i++) { 
        if (result[i]['FundSrcCol'] === "fs_1") {
            $('#fs_1_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_1_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_1_balance').addClass("text-danger");
            }
            $('#fs_1_count').html(fs_1_count);
            $('#fs_1_pct_count').html(Number((fs_1_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_1_amount').html(formatDollar(fs_1_amount));
            $('#fs_1_pct_amount').html(Number((fs_1_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_1_count').html(fa_1_count);
            $('#fa_1_pct_count').html(Number((fa_1_count/fs_1_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_1_amount').html(formatDollar(fa_1_amount));
            $('#fa_1_pct_amount').html(Number((fa_1_amount/fs_1_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_1').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_2") {
            $('#fs_2_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_2_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_2_balance').addClass("text-danger");
            }
            $('#fs_2_count').html(fs_2_count);
            $('#fs_2_pct_count').html(Number((fs_2_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_2_amount').html(formatDollar(fs_2_amount));
            $('#fs_2_pct_amount').html(Number((fs_2_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_2_count').html(fa_2_count);
            $('#fa_2_pct_count').html(Number((fa_2_count/fs_2_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_2_amount').html(formatDollar(fa_2_amount));
            $('#fa_2_pct_amount').html(Number((fa_2_amount/fs_2_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_2').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_3") {
            $('#fs_3_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_3_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_3_balance').addClass("text-danger");
            }
            $('#fs_3_count').html(fs_3_count);
            $('#fs_3_pct_count').html(Number((fs_3_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_3_amount').html(formatDollar(fs_3_amount));
            $('#fs_3_pct_amount').html(Number((fs_3_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_3_count').html(fa_3_count);
            $('#fa_3_pct_count').html(Number((fa_3_count/fs_3_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_3_amount').html(formatDollar(fa_3_amount));
            $('#fa_3_pct_amount').html(Number((fa_3_amount/fs_3_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_3').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_4") {
            $('#fs_4_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_4_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_4_balance').addClass("text-danger");
            }
            $('#fs_4_count').html(fs_4_count);
            $('#fs_4_pct_count').html(Number((fs_4_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_4_amount').html(formatDollar(fs_4_amount));
            $('#fs_4_pct_amount').html(Number((fs_4_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_4_count').html(fa_4_count);
            $('#fa_4_pct_count').html(Number((fa_4_count/fs_4_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_4_amount').html(formatDollar(fa_4_amount));
            $('#fa_4_pct_amount').html(Number((fa_4_amount/fs_4_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_4').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_5") {
            $('#fs_5_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_5_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_5_balance').addClass("text-danger");
            }
            $('#fs_5_count').html(fs_5_count);
            $('#fs_5_pct_count').html(Number((fs_5_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_5_amount').html(formatDollar(fs_5_amount));
            $('#fs_5_pct_amount').html(Number((fs_5_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_5_count').html(fa_5_count);
            $('#fa_5_pct_count').html(Number((fa_5_count/fs_5_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_5_amount').html(formatDollar(fa_5_amount));
            $('#fa_5_pct_amount').html(Number((fa_5_amount/fs_5_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_5').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_6") {
            $('#fs_6_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_6_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_6_balance').addClass("text-danger");
            }
            $('#fs_6_count').html(fs_6_count);
            $('#fs_6_pct_count').html(Number((fs_6_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_6_amount').html(formatDollar(fs_6_amount));
            $('#fs_6_pct_amount').html(Number((fs_6_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_6_count').html(fa_6_count);
            $('#fa_6_pct_count').html(Number((fa_6_count/fs_6_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_6_amount').html(formatDollar(fa_6_amount));
            $('#fa_6_pct_amount').html(Number((fa_6_amount/fs_6_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_6').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_7") {
            $('#fs_7_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_7_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_7_balance').addClass("text-danger");
            }
            $('#fs_7_count').html(fs_7_count);
            $('#fs_7_pct_count').html(Number((fs_7_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_7_amount').html(formatDollar(fs_7_amount));
            $('#fs_7_pct_amount').html(Number((fs_7_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_7_count').html(fa_7_count);
            $('#fa_7_pct_count').html(Number((fa_7_count/fs_7_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_7_amount').html(formatDollar(fa_7_amount));
            $('#fa_7_pct_amount').html(Number((fa_7_amount/fs_7_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_7').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_8") {
            $('#fs_8_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_8_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_8_balance').addClass("text-danger");
            }
            $('#fs_8_count').html(fs_8_count);
            $('#fs_8_pct_count').html(Number((fs_8_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_8_amount').html(formatDollar(fs_8_amount));
            $('#fs_8_pct_amount').html(Number((fs_8_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_8_count').html(fa_8_count);
            $('#fa_8_pct_count').html(Number((fa_8_count/fs_8_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_8_amount').html(formatDollar(fa_8_amount));
            $('#fa_8_pct_amount').html(Number((fa_8_amount/fs_8_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_8').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_9") {
            $('#fs_9_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_9_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_9_balance').addClass("text-danger");
            }
            $('#fs_9_count').html(fs_9_count);
            $('#fs_9_pct_count').html(Number((fs_9_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_9_amount').html(formatDollar(fs_9_amount));
            $('#fs_9_pct_amount').html(Number((fs_9_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_9_count').html(fa_9_count);
            $('#fa_9_pct_count').html(Number((fa_9_count/fs_9_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_9_amount').html(formatDollar(fa_9_amount));
            $('#fa_9_pct_amount').html(Number((fa_9_amount/fs_9_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_9').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_10") {
            $('#fs_10_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_10_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_10_balance').addClass("text-danger");
            }
            $('#fs_10_count').html(fs_10_count);
            $('#fs_10_pct_count').html(Number((fs_10_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_10_amount').html(formatDollar(fs_10_amount));
            $('#fs_10_pct_amount').html(Number((fs_10_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_10_count').html(fa_10_count);
            $('#fa_10_pct_count').html(Number((fa_10_count/fs_10_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_10_amount').html(formatDollar(fa_10_amount));
            $('#fa_10_pct_amount').html(Number((fa_10_amount/fs_10_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_10').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_11") {
            $('#fs_11_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_11_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_11_balance').addClass("text-danger");
            }
            $('#fs_11_count').html(fs_11_count);
            $('#fs_11_pct_count').html(Number((fs_11_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_11_amount').html(formatDollar(fs_11_amount));
            $('#fs_11_pct_amount').html(Number((fs_11_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_11_count').html(fa_11_count);
            $('#fa_11_pct_count').html(Number((fa_11_count/fs_11_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_11_amount').html(formatDollar(fa_11_amount));
            $('#fa_11_pct_amount').html(Number((fa_11_amount/fs_11_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_11').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_12") {
            $('#fs_12_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_12_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_12_balance').addClass("text-danger");
            }
            $('#fs_12_count').html(fs_12_count);
            $('#fs_12_pct_count').html(Number((fs_12_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_12_amount').html(formatDollar(fs_12_amount));
            $('#fs_12_pct_amount').html(Number((fs_12_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_12_count').html(fa_12_count);
            $('#fa_12_pct_count').html(Number((fa_12_count/fs_12_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_12_amount').html(formatDollar(fa_12_amount));
            $('#fa_12_pct_amount').html(Number((fa_12_amount/fs_12_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_12').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_13") {
            $('#fs_13_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_13_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_13_balance').addClass("text-danger");
            }
            $('#fs_13_count').html(fs_13_count);
            $('#fs_13_pct_count').html(Number((fs_13_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_13_amount').html(formatDollar(fs_13_amount));
            $('#fs_13_pct_amount').html(Number((fs_13_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_13_count').html(fa_13_count);
            $('#fa_13_pct_count').html(Number((fa_13_count/fs_13_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_13_amount').html(formatDollar(fa_13_amount));
            $('#fa_13_pct_amount').html(Number((fa_13_amount/fs_13_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_13').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_14") {
            $('#fs_14_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_14_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_14_balance').addClass("text-danger");
            }
            $('#fs_14_count').html(fs_14_count);
            $('#fs_14_pct_count').html(Number((fs_14_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_14_amount').html(formatDollar(fs_14_amount));
            $('#fs_14_pct_amount').html(Number((fs_14_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_14_count').html(fa_14_count);
            $('#fa_14_pct_count').html(Number((fa_14_count/fs_14_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_14_amount').html(formatDollar(fa_14_amount));
            $('#fa_14_pct_amount').html(Number((fa_14_amount/fs_14_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_14').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_15") {
            $('#fs_15_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_15_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_15_balance').addClass("text-danger");
            }
            $('#fs_15_count').html(fs_15_count);
            $('#fs_15_pct_count').html(Number((fs_15_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_15_amount').html(formatDollar(fs_15_amount));
            $('#fs_15_pct_amount').html(Number((fs_15_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_15_count').html(fa_15_count);
            $('#fa_15_pct_count').html(Number((fa_15_count/fs_15_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_15_amount').html(formatDollar(fa_15_amount));
            $('#fa_15_pct_amount').html(Number((fa_15_amount/fs_15_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_15').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_16") {
            $('#fs_16_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_16_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_16_balance').addClass("text-danger");
            }
            $('#fs_16_count').html(fs_16_count);
            $('#fs_16_pct_count').html(Number((fs_16_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_16_amount').html(formatDollar(fs_16_amount));
            $('#fs_16_pct_amount').html(Number((fs_16_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_16_count').html(fa_16_count);
            $('#fa_16_pct_count').html(Number((fa_16_count/fs_16_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_16_amount').html(formatDollar(fa_16_amount));
            $('#fa_16_pct_amount').html(Number((fa_16_amount/fs_16_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_16').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_17") {
            $('#fs_17_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_17_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_17_balance').addClass("text-danger");
            }
            $('#fs_17_count').html(fs_17_count);
            $('#fs_17_pct_count').html(Number((fs_17_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_17_amount').html(formatDollar(fs_17_amount));
            $('#fs_17_pct_amount').html(Number((fs_17_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_17_count').html(fa_17_count);
            $('#fa_17_pct_count').html(Number((fa_17_count/fs_17_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_17_amount').html(formatDollar(fa_17_amount));
            $('#fa_17_pct_amount').html(Number((fa_17_amount/fs_17_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_17').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_18") {
            $('#fs_18_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_18_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_18_balance').addClass("text-danger");
            }
            $('#fs_18_count').html(fs_18_count);
            $('#fs_18_pct_count').html(Number((fs_18_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_18_amount').html(formatDollar(fs_18_amount));
            $('#fs_18_pct_amount').html(Number((fs_18_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_18_count').html(fa_18_count);
            $('#fa_18_pct_count').html(Number((fa_18_count/fs_18_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_18_amount').html(formatDollar(fa_18_amount));
            $('#fa_18_pct_amount').html(Number((fa_18_amount/fs_18_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_18').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_19") {
            $('#fs_19_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_19_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_19_balance').addClass("text-danger");
            }
            $('#fs_19_count').html(fs_19_count);
            $('#fs_19_pct_count').html(Number((fs_19_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_19_amount').html(formatDollar(fs_19_amount));
            $('#fs_19_pct_amount').html(Number((fs_19_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_19_count').html(fa_19_count);
            $('#fa_19_pct_count').html(Number((fa_19_count/fs_19_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_19_amount').html(formatDollar(fa_19_amount));
            $('#fa_19_pct_amount').html(Number((fa_19_amount/fs_19_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_19').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_20") {
            $('#fs_20_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_20_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_20_balance').addClass("text-danger");
            }
            $('#fs_20_count').html(fs_20_count);
            $('#fs_20_pct_count').html(Number((fs_20_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_20_amount').html(formatDollar(fs_20_amount));
            $('#fs_20_pct_amount').html(Number((fs_20_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_20_count').html(fa_20_count);
            $('#fa_20_pct_count').html(Number((fa_20_count/fs_20_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_20_amount').html(formatDollar(fa_20_amount));
            $('#fa_20_pct_amount').html(Number((fa_20_amount/fs_20_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_20').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_21") {
            $('#fs_21_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_21_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_21_balance').addClass("text-danger");
            }
            $('#fs_21_count').html(fs_21_count);
            $('#fs_21_pct_count').html(Number((fs_21_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_21_amount').html(formatDollar(fs_21_amount));
            $('#fs_21_pct_amount').html(Number((fs_21_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_21_count').html(fa_21_count);
            $('#fa_21_pct_count').html(Number((fa_21_count/fs_21_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_21_amount').html(formatDollar(fa_21_amount));
            $('#fa_21_pct_amount').html(Number((fa_21_amount/fs_21_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_21').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_22") {
            $('#fs_22_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_22_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_22_balance').addClass("text-danger");
            }
            $('#fs_22_count').html(fs_22_count);
            $('#fs_22_pct_count').html(Number((fs_22_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_22_amount').html(formatDollar(fs_22_amount));
            $('#fs_22_pct_amount').html(Number((fs_22_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_22_count').html(fa_22_count);
            $('#fa_22_pct_count').html(Number((fa_22_count/fs_22_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_22_amount').html(formatDollar(fa_22_amount));
            $('#fa_22_pct_amount').html(Number((fa_22_amount/fs_22_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_22').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['FundSrcCol'] === "fs_23") {
            $('#fs_23_budget_amt').html(formatDollar(Number(result[i]['BudgetAmt'])));
            $('#fs_23_balance').html(formatDollar(Number(result[i]['BalanceAmt'])));
            if (Number(result[i]['BalanceAmt']) < 0) {
                $('#fs_23_balance').addClass("text-danger");
            }
            $('#fs_23_count').html(fs_23_count);
            $('#fs_23_pct_count').html(Number((fs_23_count/fs_total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fs_23_amount').html(formatDollar(fs_23_amount));
            $('#fs_23_pct_amount').html(Number((fs_23_amount/fs_total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#fa_23_count').html(fa_23_count);
            $('#fa_23_pct_count').html(Number((fa_23_count/fs_23_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#fa_23_amount').html(formatDollar(fa_23_amount));
            $('#fa_23_pct_amount').html(Number((fa_23_amount/fs_23_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-info'></i>");
            $('#cur_date_fs_23').html("Last update: " + new Date().toLocaleDateString());
        }
    }
}

function rpt_resetFundingSrc() {
    fs_1_count = 0;
    fs_1_amount = 0.00;
    fa_1_count = 0;
    fa_1_amount = 0.00;
    
    fs_2_count = 0;
    fs_2_amount = 0.00;
    fa_2_count = 0;
    fa_2_amount = 0.00;
    
    fs_3_count = 0;
    fs_3_amount = 0.00;
    fa_3_count = 0;
    fa_3_amount = 0.00;
    
    fs_4_count = 0;
    fs_4_amount = 0.00;
    fa_4_count = 0;
    fa_4_amount = 0.00;
    
    fs_5_count = 0;
    fs_5_amount = 0.00;
    fa_5_count = 0;
    fa_5_amount = 0.00;
    
    fs_6_count = 0;
    fs_6_amount = 0.00;
    fa_6_count = 0;
    fa_6_amount = 0.00;
    
    fs_7_count = 0;
    fs_7_amount = 0.00;
    fa_7_count = 0;
    fa_7_amount = 0.00;
    
    fs_8_count = 0;
    fs_8_amount = 0.00;
    fa_8_count = 0;
    fa_8_amount = 0.00;
    
    fs_9_count = 0;
    fs_9_amount = 0.00;
    fa_9_count = 0;
    fa_9_amount = 0.00;
    
    fs_10_count = 0;
    fs_10_amount = 0.00;
    fa_10_count = 0;
    fa_10_amount = 0.00;
    
    fs_11_count = 0;
    fs_11_amount = 0.00;
    fa_11_count = 0;
    fa_11_amount = 0.00;
    
    fs_12_count = 0;
    fs_12_amount = 0.00;
    fa_12_count = 0;
    fa_12_amount = 0.00;
    
    fs_13_count = 0;
    fs_13_amount = 0.00;
    fa_13_count = 0;
    fa_12_amount = 0.00;
    
    fs_14_count = 0;
    fs_14_amount = 0.00;
    fa_14_count = 0;
    fa_14_amount = 0.00;
    
    fs_15_count = 0;
    fs_15_amount = 0.00;
    fa_15_count = 0;
    fa_15_amount = 0.00;
    
    fs_16_count = 0;
    fs_16_amount = 0.00;
    fa_16_count = 0;
    fa_16_amount = 0.00;
    
    fs_17_count = 0;
    fs_17_amount = 0.00;
    fa_17_count = 0;
    fa_17_amount = 0.00;
    
    fs_18_count = 0;
    fs_18_amount = 0.00;
    fa_18_count = 0;
    fa_18_amount = 0.00;
    
    fs_19_count = 0;
    fs_18_amount = 0.00;
    fa_18_count = 0;
    fa_18_amount = 0.00;
    
    fs_20_count = 0;
    fs_20_amount = 0.00;
    fa_20_count = 0;
    fa_20_amount = 0.00;
    
    fs_21_count = 0;
    fs_21_amount = 0.00;
    fa_21_count = 0;
    fa_21_amount = 0.00;
    
    fs_22_count = 0;
    fs_22_amount = 0.00;
    fa_22_count = 0;
    fa_22_amount = 0.00;
    
    fs_23_count = 0;
    fs_23_amount = 0.00;
    fa_23_count = 0;
    fa_23_amount = 0.00;
            
    fs_total_amount = 0.00;           
}

function rpt_resetFundSrcBudgetList() {
    $('#fs_1_budget_amt').html("");
    $('#fs_1_balance').html("");
    $('#fs_1_count').html("");
    $('#fs_1_pct_count').html("");
    $('#fs_1_amount').html("");
    $('#fs_1_pct_amount').html("");
    $('#fa_1_count').html("");
    $('#fa_1_pct_count').html("");
    $('#fa_1_amount').html("");
    $('#fa_1_pct_amount').html("");
    $('#cur_date_fs_1').html("");
    
    $('#fs_2_budget_amt').html("");
    $('#fs_2_balance').html("");
    $('#fs_2_count').html("");
    $('#fs_2_pct_count').html("");
    $('#fs_2_amount').html("");
    $('#fs_2_pct_amount').html("");
    $('#fa_2_count').html("");
    $('#fa_2_pct_count').html("");
    $('#fa_2_amount').html("");
    $('#fa_2_pct_amount').html("");
    $('#cur_date_fs_2').html("");
    
    $('#fs_3_budget_amt').html("");
    $('#fs_3_balance').html("");
    $('#fs_3_count').html("");
    $('#fs_3_pct_count').html("");
    $('#fs_3_amount').html("");
    $('#fs_3_pct_amount').html("");
    $('#fa_3_count').html("");
    $('#fa_3_pct_count').html("");
    $('#fa_3_amount').html("");
    $('#fa_3_pct_amount').html("");
    $('#cur_date_fs_3').html("");
    
    $('#fs_4_budget_amt').html("");
    $('#fs_4_balance').html("");
    $('#fs_4_count').html("");
    $('#fs_4_pct_count').html("");
    $('#fs_4_amount').html("");
    $('#fs_4_pct_amount').html("");
    $('#fa_4_count').html("");
    $('#fa_4_pct_count').html("");
    $('#fa_4_amount').html("");
    $('#fa_4_pct_amount').html("");
    $('#cur_date_fs_4').html("");
    
    $('#fs_5_budget_amt').html("");
    $('#fs_5_balance').html("");
    $('#fs_5_count').html("");
    $('#fs_5_pct_count').html("");
    $('#fs_5_amount').html("");
    $('#fs_5_pct_amount').html("");
    $('#fa_5_count').html("");
    $('#fa_5_pct_count').html("");
    $('#fa_5_amount').html("");
    $('#fa_5_pct_amount').html("");
    $('#cur_date_fs_5').html("");
    
    $('#fs_6_budget_amt').html("");
    $('#fs_6_balance').html("");
    $('#fs_6_count').html("");
    $('#fs_6_pct_count').html("");
    $('#fs_6_amount').html("");
    $('#fs_6_pct_amount').html("");
    $('#fa_6_count').html("");
    $('#fa_6_pct_count').html("");
    $('#fa_6_amount').html("");
    $('#fa_6_pct_amount').html("");
    $('#cur_date_fs_6').html("");
    
    $('#fs_7_budget_amt').html("");
    $('#fs_7_balance').html("");
    $('#fs_7_count').html("");
    $('#fs_7_pct_count').html("");
    $('#fs_7_amount').html("");
    $('#fs_7_pct_amount').html("");
    $('#fa_7_count').html("");
    $('#fa_7_pct_count').html("");
    $('#fa_7_amount').html("");
    $('#fa_7_pct_amount').html("");
    $('#cur_date_fs_7').html("");
    
    $('#fs_8_budget_amt').html("");
    $('#fs_8_balance').html("");
    $('#fs_8_count').html("");
    $('#fs_8_pct_count').html("");
    $('#fs_8_amount').html("");
    $('#fs_8_pct_amount').html("");
    $('#fa_8_count').html("");
    $('#fa_8_pct_count').html("");
    $('#fa_8_amount').html("");
    $('#fa_8_pct_amount').html("");
    $('#cur_date_fs_8').html("");
    
    $('#fs_9_budget_amt').html("");
    $('#fs_9_balance').html("");
    $('#fs_9_count').html("");
    $('#fs_9_pct_count').html("");
    $('#fs_9_amount').html("");
    $('#fs_9_pct_amount').html("");
    $('#fa_9_count').html("");
    $('#fa_9_pct_count').html("");
    $('#fa_9_amount').html("");
    $('#fa_9_pct_amount').html("");
    $('#cur_date_fs_9').html("");
    
    $('#fs_10_budget_amt').html("");
    $('#fs_10_balance').html("");
    $('#fs_10_count').html("");
    $('#fs_10_pct_count').html("");
    $('#fs_10_amount').html("");
    $('#fs_10_pct_amount').html("");
    $('#fa_10_count').html("");
    $('#fa_10_pct_count').html("");
    $('#fa_10_amount').html("");
    $('#fa_10_pct_amount').html("");
    $('#cur_date_fs_10').html("");
    
    $('#fs_11_budget_amt').html("");
    $('#fs_11_balance').html("");
    $('#fs_11_count').html("");
    $('#fs_11_pct_count').html("");
    $('#fs_11_amount').html("");
    $('#fs_11_pct_amount').html("");
    $('#fa_11_count').html("");
    $('#fa_11_pct_count').html("");
    $('#fa_11_amount').html("");
    $('#fa_11_pct_amount').html("");
    $('#cur_date_fs_11').html("");
    
    $('#fs_12_budget_amt').html("");
    $('#fs_12_balance').html("");
    $('#fs_12_count').html("");
    $('#fs_12_pct_count').html("");
    $('#fs_12_amount').html("");
    $('#fs_12_pct_amount').html("");
    $('#fa_12_count').html("");
    $('#fa_12_pct_count').html("");
    $('#fa_12_amount').html("");
    $('#fa_12_pct_amount').html("");
    $('#cur_date_fs_12').html("");
    
    $('#fs_13_budget_amt').html("");
    $('#fs_13_balance').html("");
    $('#fs_13_count').html("");
    $('#fs_13_pct_count').html("");
    $('#fs_13_amount').html("");
    $('#fs_13_pct_amount').html("");
    $('#fa_13_count').html("");
    $('#fa_13_pct_count').html("");
    $('#fa_13_amount').html("");
    $('#fa_13_pct_amount').html("");
    $('#cur_date_fs_13').html("");
    
    $('#fs_14_budget_amt').html("");
    $('#fs_14_balance').html("");
    $('#fs_14_count').html("");
    $('#fs_14_pct_count').html("");
    $('#fs_14_amount').html("");
    $('#fs_14_pct_amount').html("");
    $('#fa_14_count').html("");
    $('#fa_14_pct_count').html("");
    $('#fa_14_amount').html("");
    $('#fa_14_pct_amount').html("");
    $('#cur_date_fs_14').html("");
    
    $('#fs_15_budget_amt').html("");
    $('#fs_15_balance').html("");
    $('#fs_15_count').html("");
    $('#fs_15_pct_count').html("");
    $('#fs_15_amount').html("");
    $('#fs_15_pct_amount').html("");
    $('#fa_15_count').html("");
    $('#fa_15_pct_count').html("");
    $('#fa_15_amount').html("");
    $('#fa_15_pct_amount').html("");
    $('#cur_date_fs_15').html("");
    
    $('#fs_16_budget_amt').html("");
    $('#fs_16_balance').html("");
    $('#fs_16_count').html("");
    $('#fs_16_pct_count').html("");
    $('#fs_16_amount').html("");
    $('#fs_16_pct_amount').html("");
    $('#fa_16_count').html("");
    $('#fa_16_pct_count').html("");
    $('#fa_16_amount').html("");
    $('#fa_16_pct_amount').html("");
    $('#cur_date_fs_16').html("");
    
    $('#fs_17_budget_amt').html("");
    $('#fs_17_balance').html("");
    $('#fs_17_count').html("");
    $('#fs_17_pct_count').html("");
    $('#fs_17_amount').html("");
    $('#fs_17_pct_amount').html("");
    $('#fa_17_count').html("");
    $('#fa_17_pct_count').html("");
    $('#fa_17_amount').html("");
    $('#fa_17_pct_amount').html("");
    $('#cur_date_fs_17').html("");
    
    $('#fs_18_budget_amt').html("");
    $('#fs_18_balance').html("");
    $('#fs_18_count').html("");
    $('#fs_18_pct_count').html("");
    $('#fs_18_amount').html("");
    $('#fs_18_pct_amount').html("");
    $('#fa_18_count').html("");
    $('#fa_18_pct_count').html("");
    $('#fa_18_amount').html("");
    $('#fa_18_pct_amount').html("");
    $('#cur_date_fs_18').html("");
    
    $('#fs_19_budget_amt').html("");
    $('#fs_19_balance').html("");
    $('#fs_19_count').html("");
    $('#fs_19_pct_count').html("");
    $('#fs_19_amount').html("");
    $('#fs_19_pct_amount').html("");
    $('#fa_19_count').html("");
    $('#fa_19_pct_count').html("");
    $('#fa_19_amount').html("");
    $('#fa_19_pct_amount').html("");
    $('#cur_date_fs_19').html("");
    
    $('#fs_20_budget_amt').html("");
    $('#fs_20_balance').html("");
    $('#fs_20_count').html("");
    $('#fs_20_pct_count').html("");
    $('#fs_20_amount').html("");
    $('#fs_20_pct_amount').html("");
    $('#fa_20_count').html("");
    $('#fa_20_pct_count').html("");
    $('#fa_20_amount').html("");
    $('#fa_20_pct_amount').html("");
    $('#cur_date_fs_20').html("");
    
    $('#fs_21_budget_amt').html("");
    $('#fs_21_balance').html("");
    $('#fs_21_count').html("");
    $('#fs_21_pct_count').html("");
    $('#fs_21_amount').html("");
    $('#fs_21_pct_amount').html("");
    $('#fa_21_count').html("");
    $('#fa_21_pct_count').html("");
    $('#fa_21_amount').html("");
    $('#fa_21_pct_amount').html("");
    $('#cur_date_fs_21').html("");
    
    $('#fs_22_budget_amt').html("");
    $('#fs_22_balance').html("");
    $('#fs_22_count').html("");
    $('#fs_22_pct_count').html("");
    $('#fs_22_amount').html("");
    $('#fs_22_pct_amount').html("");
    $('#fa_22_count').html("");
    $('#fa_22_pct_count').html("");
    $('#fa_22_amount').html("");
    $('#fa_22_pct_amount').html("");
    $('#cur_date_fs_22').html("");
    
    $('#fs_23_budget_amt').html("");
    $('#fs_23_balance').html("");
    $('#fs_23_count').html("");
    $('#fs_23_pct_count').html("");
    $('#fs_23_amount').html("");
    $('#fs_23_pct_amount').html("");
    $('#fa_23_count').html("");
    $('#fa_23_pct_count').html("");
    $('#fa_23_amount').html("");
    $('#fa_23_pct_amount').html("");
    $('#cur_date_fs_23').html("");
}