<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT CONVERT(VARCHAR(10), DTStamp, 101) + STUFF(RIGHT(CONVERT(VARCHAR(26), DTStamp, 109), 15), 7, 7, ' '), LoginName, Note "
                    ."FROM [IVCRESOURCES].[dbo].[Transactions] "
                    ."WHERE ResourceID = '" .$ResourceID. "' "
                    ."ORDER BY TransactionID DESC";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();
        echo json_encode($data);
    }
?>