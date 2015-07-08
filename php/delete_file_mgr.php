<?php
    require("config.php");
    $output_dir = "C:/xampp/htdocs/ResourceForm/attach_files/";
    
    $FileLinkName = $_POST['FileLinkName'];
      
    $query = "DELETE FROM [IVCRESOURCES].[dbo].[PerkinsAttach] WHERE FileLinkName = '".$FileLinkName."'";
    $query2 = "DELETE FROM [IVCRESOURCES].[dbo].[BSIAttach] WHERE FileLinkName = '".$FileLinkName."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 
    
    $cmd = $dbConn->prepare($query2);
    $result = $cmd->execute();

    unlink($output_dir.$FileLinkName);
    echo json_encode($result);
 ?>