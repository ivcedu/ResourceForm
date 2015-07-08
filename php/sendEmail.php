<?php
    require("class.phpmailer.php");
    
    $Email = filter_input(INPUT_POST, 'Email');
    $Name = filter_input(INPUT_POST, 'Name');
    $Subject = filter_input(INPUT_POST, 'Subject'); 
    $Message = filter_input(INPUT_POST, 'Message');

    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->Host = "smtp1.socccd.edu";
    $mail->From = "ivcfiscal@ivc.edu";
    $mail->FromName = "IVC Fiscal Services";
    $mail->AddAddress($Email, $Name);
    $mail->IsHTML(true); // send as HTML
    $mail->Subject = $Subject;
    $mail->Body = $Message;

    if($mail->Send()) {
        echo "true";
    }
    else {
        echo "false";
    }