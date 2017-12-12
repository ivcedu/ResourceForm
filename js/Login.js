////////////////////////////////////////////////////////////////////////////////
window.onload = function() {   
    $('#login_error').hide();
    var curBrowser = bowser.name;
    var curVersion = Number(bowser.version);
    
    switch (curBrowser) {
        case "Safari":
            if (curVersion < 5)
                window.open('browser_not_support.html', '_self');
            break;
        case "Chrome":
            if (curVersion < 7)
                window.open('browser_not_support.html', '_self');
            break;
        case "Firefox":
            if (curVersion < 22)
                window.open('browser_not_support.html', '_self');
            break;
        case "Internet Explorer":
            if (curVersion < 10)
                window.open('browser_not_support.html', '_self');
            break;
        default:     
            break;
    }
    
    if (sessionStorage.getItem('m1_loginName') !== null) {
        var url_param = sessionStorage.getItem('ss_rf_url_param');
        if (url_param !== null) {
            window.open(url_param, '_self');
        }
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {  
    // enter key to login
    $('#password').keypress(function (e) {
        if(e.keyCode === 13){
            $('#btn_login').click();
        }
    });
    
    $('#btn_login').click(function() {
        // ireport.ivc.edu validation //////////////////////////////////////////
        if(location.href.indexOf("ireport.ivc.edu") >= 0 && !ireportValidation()) {
            swal({  title: "Access Denied",
                    text: "This is a Development site. It will redirect to IVC Application site",
                    type: "error",
                    confirmButtonText: "OK" },
                    function() {
                        sessionStorage.clear();
                        window.open('https://services.ivc.edu/', '_self');
                        return false;
                    }
            );
        }
        ////////////////////////////////////////////////////////////////////////
        else {
            var url_param = sessionStorage.getItem('ss_rf_url_param');  
            if(loginInfo()) {
                if (url_param === null) {
                    window.open('home.html', '_self');
                }
                else {  
                    window.open(url_param, '_self');
                }
            }
            else {
                $('#login_error').show();
                this.blur();
            }
        }
    });
});

////////////////////////////////////////////////////////////////////////////////
function loginInfo() {   
    sessionStorage.clear();
    var result = new Array();
    var username = $('#username').val().toLowerCase().replace("@ivc.edu", "");
    var password = $('#password').val();
    sessionStorage.setItem('m0_username', username);
    sessionStorage.setItem('m0_password', password);
    
    result = getLoginUserInfo("php/login.php", username, password);
    if (result.length === 0) {
        return false;
    }
    else {
        var name = result[0];
        var email = result[1];
        var title = result[2];
        var division = result[3];
        var appName = result[4];
        var appEmail = result[5];
        var appTitle = result[6];
        var appDivision = result[7];
        
        // testing login
//        name = "Davit Khachatryan";
//        email = "dkhachatryan@ivc.edu";
        
        localData_login(name, email, title, division, appName, appEmail, appTitle, appDivision);
        db_insertLogin(email, name, title, division);
        db_insertCreator(email, name, title, division);
        return true;
    }
}

////////////////////////////////////////////////////////////////////////////////
function getLoginUserInfo(php_file, user, pass) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:php_file,
        data:{username:user, password:pass},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

////////////////////////////////////////////////////////////////////////////////
function ireportValidation() {
    var username = $('#username').val().toLowerCase().replace("@ivc.edu", "").replace("@saddleback.edu", "");
    if (ireportDBgetUserAccess(username) !== null) {
        return true;
    }
    else {
        return false;
    }
}