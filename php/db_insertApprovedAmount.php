<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $Gen_Amt = filter_input(INPUT_POST, 'Gen_Amt');
    $Per_Amt = filter_input(INPUT_POST, 'Per_Amt');
    $BSI_Amt = filter_input(INPUT_POST, 'BSI_Amt');
    $Fou_Amt = filter_input(INPUT_POST, 'Fou_Amt');
    $ASI_Amt = filter_input(INPUT_POST, 'ASI_Amt');
    $Oth_Amt =filter_input(INPUT_POST, 'Oth_Amt');
    $T_Amt = filter_input(INPUT_POST, 'T_Amt');

    $query = "INSERT INTO [IVCRESOURCES].[dbo].[ApprovedAmount] " 
                ."(ResourceID, Gen_Amt, Per_Amt, BSI_Amt, Fou_Amt, ASI_Amt, Oth_Amt, T_Amt) "
                ."VALUES ('$ResourceID', '$Gen_Amt', '$Per_Amt', '$BSI_Amt', '$Fou_Amt', '$ASI_Amt', '$Oth_Amt', '$T_Amt')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
?>
