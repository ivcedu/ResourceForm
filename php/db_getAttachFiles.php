<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        $RType = $_POST['RType'];
        $Table = getRTypeTable($RType);
        
        if ($Table !== "") {
            $query = "SELECT FileLinkName, FileName "
                        ."FROM [IVCRESOURCES].[dbo].".$Table
                        ."WHERE ResourceID = '" .$ResourceID. "'";
            $cmd = $dbConn->prepare($query);
            $cmd->execute(); 
            $data = $cmd->fetchAll();
            echo json_encode($data);
        }
    }
    
    function getRTypeTable($RType) {
        $Table = "";
        switch ($RType) {
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
        
        return $Table;
    }
?>

