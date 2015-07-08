<?php
    require("config.php");
    
    $mbrBDRPC_ID = filter_input(INPUT_POST, 'mbrBDRPC_ID');
    $bdrUserName = filter_input(INPUT_POST, 'bdrUserName');
    $bdrUserEmail = filter_input(INPUT_POST, 'bdrUserEmail');
    $bdrUserActive = filter_input(INPUT_POST, 'bdrUserActive');
    $bdrUserAdmin = filter_input(INPUT_POST, 'bdrUserAdmin');

    $query = "UPDATE [IVCRESOURCES].[dbo].[mbrBDRPC] "
                ."SET bdrUserName = '".$bdrUserName."', bdrUserEmail = '".$bdrUserEmail."', bdrUserActive = '".$bdrUserActive."', bdrUserAdmin = '".$bdrUserAdmin."' "
                . "WHERE mbrBDRPC_ID = '".$mbrBDRPC_ID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);