<?php
    require("config.php");
    
    $FundSrcTypeID = filter_input(INPUT_POST, 'FundSrcTypeID');
    $Active = filter_input(INPUT_POST, 'Active');
    $FundSrcType = filter_input(INPUT_POST, 'FundSrcType');
    $FundSrcAdmin = filter_input(INPUT_POST, 'FundSrcAdmin');
    $FundSrcEmail = filter_input(INPUT_POST, 'FundSrcEmail');
    $FundSrcDescrip = filter_input(INPUT_POST, 'FundSrcDescrip');

    $query = "UPDATE [IVCRESOURCES].[dbo].[FundSrcType] "
                ."SET Active = '".$Active."', FundSrcType = '".$FundSrcType."', "
                ."FundSrcAdmin = '".$FundSrcAdmin."', FundSrcEmail = '".$FundSrcEmail."', FundSrcDescrip = '".$FundSrcDescrip."' "
                . "WHERE FundSrcTypeID = '".$FundSrcTypeID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);