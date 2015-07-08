<?php
    require("config.php");
    
    if (isset($_POST['LoginEmail']))
    {
        $LoginEmail = $_POST['LoginEmail'];
        
//        if ($LoginEmail != "ykim160@ivc.edu")
//            $sql_where = "WHERE lgur.LoginEmail = '" .$LoginEmail. "'";
        
        $query = "SELECT resr.ResourceID, "
                    ."resr.ProposalTitle "
                    ."FROM [IVCRESOURCES].[dbo].[Resource] AS resr LEFT JOIN [IVCRESOURCES].[dbo].[ResourceLink] AS rslk ON rslk.ResourceID = resr.ResourceID "
                    ."LEFT JOIN [IVCRESOURCES].[dbo].[Creator] AS crtr ON crtr.CreatorID = resr.CreatorID "
                    ."WHERE (rslk.Child = 0 OR rslk.Child IS NULL) AND resr.RSID IN (7, 8, 9, 10, 11) AND crtr.CreatorEmail = '".$LoginEmail."'";

        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();
        echo json_encode($data);
    }
?>