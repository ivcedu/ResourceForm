<?php
    require("config.php");
    
    $ResourceID = filter_input(INPUT_POST, 'ResourceID');
    $fs_1 = filter_input(INPUT_POST, 'fs_1');
    $fs_2 = filter_input(INPUT_POST, 'fs_2');
    $fs_3 = filter_input(INPUT_POST, 'fs_3');
    $fs_4 = filter_input(INPUT_POST, 'fs_4');
    $fs_5 = filter_input(INPUT_POST, 'fs_5');
    $fs_6 = filter_input(INPUT_POST, 'fs_6');
    $fs_7 = filter_input(INPUT_POST, 'fs_7');
    $fs_8 = filter_input(INPUT_POST, 'fs_8');
    $fs_9 = filter_input(INPUT_POST, 'fs_9');
    $fs_10 = filter_input(INPUT_POST, 'fs_10');
    $fs_11 = filter_input(INPUT_POST, 'fs_11');
    $fs_12 = filter_input(INPUT_POST, 'fs_12');
    $fs_13 = filter_input(INPUT_POST, 'fs_13');
    $fs_14 = filter_input(INPUT_POST, 'fs_14');
    $fs_15 = filter_input(INPUT_POST, 'fs_15');
    $fs_16 = filter_input(INPUT_POST, 'fs_16');
    $fs_17 = filter_input(INPUT_POST, 'fs_17');
    $fs_18 = filter_input(INPUT_POST, 'fs_18');
    $fs_19 = filter_input(INPUT_POST, 'fs_19');
    $fs_20 = filter_input(INPUT_POST, 'fs_20');
    $fs_21 = filter_input(INPUT_POST, 'fs_21');
    $fs_22 = filter_input(INPUT_POST, 'fs_22');
    $fs_23 = filter_input(INPUT_POST, 'fs_23');
    $fs_comments = filter_input(INPUT_POST, 'fs_comments');

    $query = "UPDATE [IVCRESOURCES].[dbo].[ResourceFundSrc] "
                ."SET fs_1 = '".$fs_1."', fs_2 = '".$fs_2."', fs_3 = '".$fs_3."', fs_4 = '".$fs_4."', fs_5 = '".$fs_5."', "
                . "fs_6 = '".$fs_6."', fs_7 = '".$fs_7."', fs_8 = '".$fs_8."', fs_9 = '".$fs_9."', fs_10 = '".$fs_10."', fs_11 = '".$fs_11."', fs_12 = '".$fs_12."', "
                . "fs_13 = '".$fs_13."', fs_14 = '".$fs_14."', fs_15 = '".$fs_15."', fs_16 = '".$fs_16."', fs_17 = '".$fs_17."', fs_18 = '".$fs_18."', fs_19 = '".$fs_19."', "
                . "fs_20 = '".$fs_20."', fs_21 = '".$fs_21."', fs_22 = '".$fs_22."', fs_23 = '".$fs_23."', fs_comments = '".$fs_comments."' "
                . "WHERE ResourceID = '".$ResourceID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);