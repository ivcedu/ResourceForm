var total_count = 0;
var total_amount = 0.00;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) { 
        rpt_getRFDashboard();
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // Initialize tooltips
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]"
    });

    // Initialize popover
    $("[data-toggle=popover]").popover();

    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.modal').appendTo("body");
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
function rpt_getRFDashboard() {
    var result = new Array();
    result = db_rpt_getRFDashboard();
    
    for(var i = 0; i < result.length; i++) {         
        if (result[i]['RType'] === "Facilities") {
            $('#fc_count').html(result[i]['TotalCount']);
            $('#fc_pct_count').html(result[i]['Pct_Count'] + "% <i class='fa fa-level-up text-success'></i>");
            $('#fc_amount').html(formatDollar(Number(result[i]['TotalAmount'])));
            $('#fc_pct_amount').html(Number(result[i]['Pct_Amount']).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#cur_date_fc').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['RType'] === "Instructional") {
            $('#in_count').html(result[i]['TotalCount']);
            $('#in_pct_count').html(result[i]['Pct_Count'] + "% <i class='fa fa-level-up text-success'></i>");
            $('#in_amount').html(formatDollar(Number(result[i]['TotalAmount'])));
            $('#in_pct_amount').html(Number(result[i]['Pct_Amount']).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#cur_date_in').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['RType'] === "Technology") {
            $('#te_count').html(result[i]['TotalCount']);
            $('#te_pct_count').html(result[i]['Pct_Count'] + "% <i class='fa fa-level-up text-success'></i>");
            $('#te_amount').html(formatDollar(Number(result[i]['TotalAmount'])));
            $('#te_pct_amount').html(Number(result[i]['Pct_Amount']).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#cur_date_te').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['RType'] === "Other") {
            $('#ot_count').html(result[i]['TotalCount']);
            $('#ot_pct_count').html(result[i]['Pct_Count'] + "% <i class='fa fa-level-up text-success'></i>");
            $('#ot_amount').html(formatDollar(Number(result[i]['TotalAmount'])));
            $('#ot_pct_amount').html(Number(result[i]['Pct_Amount']).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#cur_date_ot').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['RType'] === "Classified Bargaining") {
            $('#cb_count').html(result[i]['TotalCount']);
            $('#cb_pct_count').html(result[i]['Pct_Count'] + "% <i class='fa fa-level-up text-success'></i>");
            $('#cb_amount').html(formatDollar(Number(result[i]['TotalAmount'])));
            $('#cb_pct_amount').html(Number(result[i]['Pct_Amount']).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#cur_date_cb').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['RType'] === "Classified Management") {
            $('#cm_count').html(result[i]['TotalCount']);
            $('#cm_pct_count').html(result[i]['Pct_Count'] + "% <i class='fa fa-level-up text-success'></i>");
            $('#cm_amount').html(formatDollar(Number(result[i]['TotalAmount'])));
            $('#cm_pct_amount').html(Number(result[i]['Pct_Amount']).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#cur_date_cm').html("Last update: " + new Date().toLocaleDateString());
        }
        else if (result[i]['RType'] === "Short-Term Hourly") {
            $('#st_count').html(result[i]['TotalCount']);
            $('#st_pct_count').html(result[i]['Pct_Count'] + "% <i class='fa fa-level-up text-success'></i>");
            $('#st_amount').html(formatDollar(Number(result[i]['TotalAmount'])));
            $('#st_pct_amount').html(Number(result[i]['Pct_Amount']).toFixed(2) + "% <i class='fa fa-level-up text-success'></i>");
            $('#cur_date_st').html("Last update: " + new Date().toLocaleDateString());
        }
        
        total_count += Number(result[i]['TotalCount']);
        total_amount += Number(result[i]['TotalAmount']);
    }
    
    $('#rf_total_count').html(total_count);
    $('#rf_total_amount').html(formatDollar(total_amount));
    $('#cur_date').html("Last update: " + new Date().toLocaleDateString());
}