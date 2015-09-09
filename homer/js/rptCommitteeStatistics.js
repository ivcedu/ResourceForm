var apt_count = 0;
var bdr_count = 0;
var chp_count = 0;
var iec_count = 0;
var spa_count = 0;
var ssa_count = 0;
var total_count = 0;

var apt_amount = 0.00;
var bdr_amount = 0.00;
var chp_amount = 0.00;
var iec_amount = 0.00;
var spa_amount = 0.00;
var ssa_amount = 0.00;
var total_amount = 0.00;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        rpt_getAllResourceFiscalYear();
        rpt_getCommitteeStatistics();
        rpt_setCommitteeStatisticsList();
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
    
    $('#all_fiscal_yrs').change(function() {
        rpt_resetCommitteeStatistics();
        rpt_resetCommitteeStatisticsList();
        
        rpt_getCommitteeStatistics();
        rpt_setCommitteeStatisticsList();
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
    $('#all_fiscal_yrs').val(rpt_getFiscalYear());
    $('#all_fiscal_yrs').selectpicker('refresh');
}

function rpt_getCommitteeStatistics() {
    var result = new Array();
    result = db_rpt_getCommitteeStatistic($('#all_fiscal_yrs').val());
    
    total_count = result.length;
    for(var i = 0; i < result.length; i++) {     
        total_amount += Number(result[i]['TotalAmount']);
        if (result[i]['APTC'] === "1") {
            apt_count++;
            apt_amount += Number(result[i]['TotalAmount']);
        }
        if (result[i]['BDRPC'] === "1") {
            bdr_count++;
            bdr_amount += Number(result[i]['TotalAmount']);
        }
        if (result[i]['CHPLDTF'] === "1") {
            chp_count++;
            chp_amount += Number(result[i]['TotalAmount']);
        }
        if (result[i]['IEC'] === "1") {
            iec_count++;
            iec_amount += Number(result[i]['TotalAmount']);
        }
        if (result[i]['SPAC'] === "1") {
            spa_count++;
            spa_amount += Number(result[i]['TotalAmount']);
        }
        if (result[i]['SSAMMO'] === "1") {
            ssa_count++;
            ssa_amount += Number(result[i]['TotalAmount']);
        }
    }
}

function rpt_setCommitteeStatisticsList() {
    $('#apt_count').html(apt_count);
    $('#apt_pct_count').html(Number((apt_count/total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
    $('#apt_amount').html(formatDollar(apt_amount));
    $('#apt_pct_amount').html(Number((apt_amount/total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
    $('#cur_date_apt').html("Last update: " + new Date().toLocaleDateString());
    
    $('#bdr_count').html(bdr_count);
    $('#bdr_pct_count').html(Number((bdr_count/total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
    $('#bdr_amount').html(formatDollar(bdr_amount));
    $('#bdr_pct_amount').html(Number((bdr_amount/total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
    $('#cur_date_bdr').html("Last update: " + new Date().toLocaleDateString());
    
    $('#chp_count').html(chp_count);
    $('#chp_pct_count').html(Number((chp_count/total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
    $('#chp_amount').html(formatDollar(chp_amount));
    $('#chp_pct_amount').html(Number((chp_amount/total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
    $('#cur_date_chp').html("Last update: " + new Date().toLocaleDateString());
    
    $('#iec_count').html(iec_count);
    $('#iec_pct_count').html(Number((iec_count/total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
    $('#iec_amount').html(formatDollar(iec_amount));
    $('#iec_pct_amount').html(Number((iec_amount/total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
    $('#cur_date_iec').html("Last update: " + new Date().toLocaleDateString());
    
    $('#spa_count').html(spa_count);
    $('#spa_pct_count').html(Number((spa_count/total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
    $('#spa_amount').html(formatDollar(spa_amount));
    $('#spa_pct_amount').html(Number((spa_amount/total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
    $('#cur_date_spa').html("Last update: " + new Date().toLocaleDateString());
    
    $('#ssa_count').html(ssa_count);
    $('#ssa_pct_count').html(Number((ssa_count/total_count)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
    $('#ssa_amount').html(formatDollar(ssa_amount));
    $('#ssa_pct_amount').html(Number((ssa_amount/total_amount)*100).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
    $('#cur_date_ssa').html("Last update: " + new Date().toLocaleDateString());
}

function rpt_resetCommitteeStatistics() {
    apt_count = 0;
    bdr_count = 0;
    chp_count = 0;
    iec_count = 0;
    spa_count = 0;
    ssa_count = 0;
    total_count = 0;

    apt_amount = 0.00;
    bdr_amount = 0.00;
    chp_amount = 0.00;
    iec_amount = 0.00;
    spa_amount = 0.00;
    ssa_amount = 0.00;
    total_amount = 0.00;
}

function rpt_resetCommitteeStatisticsList() {
    $('#apt_count').html("");
    $('#apt_pct_count').html("");
    $('#apt_amount').html("");
    $('#apt_pct_amount').html("");
    $('#cur_date_apt').html("");
    
    $('#bdr_count').html("");
    $('#bdr_pct_count').html("");
    $('#bdr_amount').html("");
    $('#bdr_pct_amount').html("");
    $('#cur_date_bdr').html("");
    
    $('#chp_count').html("");
    $('#chp_pct_count').html("");
    $('#chp_amount').html("");
    $('#chp_pct_amount').html("");
    $('#cur_date_chp').html("");
    
    $('#iec_count').html("");
    $('#iec_pct_count').html("");
    $('#iec_amount').html("");
    $('#iec_pct_amount').html("");
    $('#cur_date_iec').html("");
    
    $('#spa_count').html("");
    $('#spa_pct_count').html("");
    $('#spa_amount').html("");
    $('#spa_pct_amount').html("");
    $('#cur_date_spa').html("");
    
    $('#ssa_count').html("");
    $('#ssa_pct_count').html("");
    $('#ssa_amount').html("");
    $('#ssa_pct_amount').html("");
    $('#cur_date_ssa').html("");
}