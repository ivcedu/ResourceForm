////////////////////////////////////////////////////////////////////////////////
function proc_sendEmail(email, name, subject, message) {
    var Result = false;
    
    $.ajax({
        type:"POST",
        url:"php/sendEmail.php",
        data:{Email:email, Name:name, Subject:subject, Message:message},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    
    return Result;
}

function proc_sendEmailWithCC(Email, Name, ccEmail, ccName, Subject, Message) {
    var Result = false;
    
    $.ajax({
        type:"POST",
        url:"php/sendEmailWithCC.php",
        data:{Email:Email, Name:Name, ccEmail:ccEmail, ccName:ccName, Subject:Subject, Message:Message},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    
    return Result;
}