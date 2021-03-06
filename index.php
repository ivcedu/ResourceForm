<!DOCTYPE HTML>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
        <meta http-equiv="Cache-Control" content="no-cache"/>
        <title>Resource Form Login Page</title>
        <!-- include css -->
        <link rel="stylesheet" href="../include/sweetalert/css/sweetalert.css"/>
        <!-- application css -->
        <link rel="stylesheet" href="css/style-2.css">
    </head>
    <body>
        <div class="body"></div>
        <div class="grad"></div>
        <div class="header">
            <div>Resource</div>
        </div>
        <div class="loginFrame"></div>
        <div class="login">
            <input type="text" placeholder="username or email address" name="user" id="username"><br>
            <input type="password" placeholder="password" name="password" autocomplete="off" id="password"><br>
            <input type="button" value="Login" id="btn_login">
        </div>
        <div class="footer">
            <div id="login_error">Invalid username or password</div>
        </div>
        
        <!-- include javascript -->
        <script src="../include/jquery/jquery-2.0.3.min.js"></script>
        <script src="../include/bowser/bowser.min.js"></script>
        <script src="../include/sweetalert/js/sweetalert.min.js"></script>
        <!-- application javascript -->
        <script src="js/Login.js"></script>
        <script src="js/localData.js"></script>
        <script src="js/mod_SaveDraft.js"></script>
    </body>
</html>