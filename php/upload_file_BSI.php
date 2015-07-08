<?php
    require("config.php");
    $output_dir = "C:/xampp/htdocs/ResourceForm/attach_files/";

    if(isset($_FILES["files"]))
    {    
        $fileString = $_FILES["files"]["name"][0];

        $n_rid = strpos($fileString, "_:_");
        $ResourceID = substr($fileString, 0, $n_rid);
        $ResourceID = str_replace("BSI_", "", $ResourceID);
        $file_name = substr($fileString, $n_rid + 3);

        $upload_file_link = str_replace("_:_", "_", $fileString);

        $result = move_uploaded_file($_FILES["files"]["tmp_name"][0], $output_dir.$upload_file_link);
        $BSIAttachID = insertAttachToDB($dbConn, $ResourceID, $upload_file_link, $file_name);

        echo json_encode($BSIAttachID); 
    }
    
    function insertAttachToDB($dbConn, $ResourceID, $FileLinkName, $FileName) {        
        $ResultID = "";
        $query = "INSERT INTO [IVCRESOURCES].[dbo].[BSIAttach] "
                    ."(ResourceID, FileLinkName, FileName) "
                    ."VALUES ('$ResourceID', '$FileLinkName', '$FileName')";

        $cmd = $dbConn->prepare($query);
        $cmd->execute();
        $ResultID = $dbConn->lastInsertId();
        
        return $ResultID;
    }
 ?>
