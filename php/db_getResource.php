<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID = $_POST['ResourceID'];
        
        $query = "SELECT cr.CreatorName, cr.CreatorTitle, cr.CreatorDepartment, rs.strDate, rs.FiscalYear, rs.ProposalTitle, rs.NeedFor, rt.ResourceType, rs.LoginID, rs.CreatorID, pg.ProgramType, rs.OneTime, rs.NeedBy, cr.CreatorEmail "
                    ."FROM [IVCRESOURCES].[dbo].[Resource] AS rs LEFT JOIN [IVCRESOURCES].[dbo].[Creator] AS cr ON rs.CreatorID = cr.CreatorID "
                    ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceTypeItem] AS ri ON rs.ResourceID = ri.ResourceID "
                    ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceType] AS rt ON ri.RTID = rt.RTID "
                    ."LEFT JOIN [IVCRESOURCES].[dbo].[ResourceProg] AS rp ON rs.ResourceID = rp.ResourceID "
                    ."LEFT JOIN [IVCRESOURCES].[dbo].[Program] AS pg ON pg.ProgramID = rp.ProgramID "
                    ."WHERE rs.ResourceID = '" .$ResourceID. "'";
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();
        $rstCount = count($data);

        $index = 0;
        $rows = array(array());
        if ($rstCount > 0)
        {
            foreach($data as $row)
            {
                $rows[$index] = array($row['CreatorName'], $row['CreatorTitle'], $row['CreatorDepartment'], $row['strDate'], $row['FiscalYear'], $row['ProposalTitle'], $row['NeedFor'], 
                                        $row['ResourceType'], $row['LoginID'], $row['CreatorID'], $row['ProgramType'], $row['OneTime'], $row['NeedBy'], $row['CreatorEmail']);
                $index++;
            }
        }

        echo json_encode($rows);
    }
?>