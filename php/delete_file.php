<?php
    require("config.php");
    $output_dir = "C:/xampp/htdocs/ResourceForm/attach_files/";
    
    $RType = $_POST['RType'];
    $FileLinkName = $_POST['FileLinkName'];
    
    $Table = getRTypeTable($RType);    
    if ($Table !== "") {
        $query = "DELETE FROM [IVCRESOURCES].[dbo].".$Table."WHERE FileLinkName = '".$FileLinkName."'";
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        
        unlink($output_dir.$FileLinkName);
        echo "Successfully deleted attached files";
    } 
    
    function getRTypeTable($RType) {
        $Table = "";
        switch ($RType) {
            case "Personnel":
            case "Classified Bargaining":
            case "Classified Management":
            case "Short-Term Hourly":
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
        
        return $Table;
    }
 ?>

