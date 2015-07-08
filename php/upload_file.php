<?php
    require("config.php");
    $output_dir = "C:/xampp/htdocs/ResourceForm/attach_files/";

    if(isset($_FILES["files"]))
    {    
        $fileCount = count($_FILES["files"]["name"]);
        for($i = 0; $i < $fileCount; $i++)
        {
            $fileString = $_FILES["files"]["name"][$i];
            
            $RID_Start = 4;
            $RID_End = strpos($fileString, "_RTYPE:");
            
            $RTYPE_Start = $RID_End + 7;
            $RTYPE_End = strpos($fileString, "_fileName:_");
            
            $ResourceID = substr($fileString, $RID_Start, $RID_End - $RID_Start);
            $ResourceType = substr($fileString, $RTYPE_Start, $RTYPE_End  - $RTYPE_Start);
            $tmpFileName = substr($fileString, $RTYPE_End + 11);
            
            $tmpStart = strpos($tmpFileName, "_");
            $FileName = substr($tmpFileName, $tmpStart + 1);
            $FileLinkName = $ResourceID."_".$tmpFileName;
            
            $result = move_uploaded_file($_FILES["files"]["tmp_name"][$i],$output_dir.$FileLinkName);
            $result2 = insertAttachToDB($dbConn, $ResourceType, $ResourceID, $FileLinkName, $FileName);
        }

        echo "Successfully uploaded attached files"; 
    }
    
    function insertAttachToDB($dbConn, $RTYPE, $ResourceID, $FileLinkName, $FileName) {
        $Table = "";
        switch ($RTYPE) {
            case "Personnel":
                $Table = "[PersonnelAttach] ";
                break;
            case "Facilities":
                $Table = "[FacilitiesEstAttach] ";
                break;
            case "Instructional":
                $Table = "[InstructionalAttach] ";
                break;
            case "Technology":
                $Table = "[TechnologyAttach] ";
                break;
            case "Other":
                $Table = "[Other2Attach] ";
                break;
            default:
                break;
        }
        
        $ResultID = 0;
        if ($Table !== "") {
            $query = "INSERT INTO [IVCRESOURCES].[dbo].".$Table
                        ."(ResourceID, FileLinkName, FileName) "
                        ."VALUES ('$ResourceID', '$FileLinkName', '$FileName')";

            $cmd = $dbConn->prepare($query);
            $cmd->execute();
            $ResultID = $dbConn->lastInsertId();
        }
        
        return $ResultID;
    }
 ?>

