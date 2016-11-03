<?php
    require("config.php");
    
    if (isset($_POST['ResourceID']))
    {
        $ResourceID= $_POST['ResourceID'];

        $query = "DELETE [IVCRESOURCES].[dbo].[Resource] WHERE ResourceID = '".$ResourceID ."'";
        $query2 = "DELETE [IVCRESOURCES].[dbo].[ResourceTypeItem] WHERE ResourceID = '".$ResourceID ."'";
        $query3 = "DELETE [IVCRESOURCES].[dbo].[Personnel] WHERE ResourceID = '".$ResourceID ."'";
        $query4 = "DELETE [IVCRESOURCES].[dbo].[PersonnelAttach] WHERE ResourceID = '".$ResourceID ."'";
        $query5 = "DELETE [IVCRESOURCES].[dbo].[Facilities] WHERE ResourceID = '".$ResourceID ."'";
        $query6 = "DELETE [IVCRESOURCES].[dbo].[FacilitiesEstAttach] WHERE ResourceID = '".$ResourceID ."'";
        $query7 = "DELETE [IVCRESOURCES].[dbo].[Instructional] WHERE ResourceID = '".$ResourceID ."'";
        $query8 = "DELETE [IVCRESOURCES].[dbo].[InstructionalAttach] WHERE ResourceID = '".$ResourceID ."'";
        $query9 = "DELETE [IVCRESOURCES].[dbo].[Technology] WHERE ResourceID = '".$ResourceID ."'";
        $query10 = "DELETE [IVCRESOURCES].[dbo].[TechnologyItems] WHERE ResourceID = '".$ResourceID ."'";
        $query11 = "DELETE [IVCRESOURCES].[dbo].[TechnologyAttach] WHERE ResourceID = '".$ResourceID ."'";
        $query12 = "DELETE [IVCRESOURCES].[dbo].[Other2] WHERE ResourceID = '".$ResourceID ."'";
        $query13 = "DELETE [IVCRESOURCES].[dbo].[Other2Items] WHERE ResourceID = '".$ResourceID ."'";
        $query14 = "DELETE [IVCRESOURCES].[dbo].[Other2Attach] WHERE ResourceID = '".$ResourceID ."'";
        $query15 = "DELETE [IVCRESOURCES].[dbo].[Planning] WHERE ResourceID = '".$ResourceID ."'";
        $query16 = "DELETE [IVCRESOURCES].[dbo].[ResourceStep] WHERE ResourceID = '".$ResourceID ."'";
        $query17 = "DELETE [IVCRESOURCES].[dbo].[ResourceProg] WHERE ResourceID = '".$ResourceID ."'";
        $query18 = "DELETE [IVCRESOURCES].[dbo].[CBQuestionnaire] WHERE ResourceID = '".$ResourceID ."'";
        $query19 = "DELETE [IVCRESOURCES].[dbo].[CC] WHERE ResourceID = '".$ResourceID ."'";
        $query20 = "DELETE [IVCRESOURCES].[dbo].[ResourceLink] WHERE ResourceID = '".$ResourceID ."'";
        $query21 = "DELETE [IVCRESOURCES].[dbo].[Transactions] WHERE ResourceID = '".$ResourceID ."'";
        $query22 = "DELETE [IVCRESOURCES].[dbo].[Backtodraft] WHERE ResourceID = '".$ResourceID ."'";
        $query23 = "DELETE [IVCRESOURCES].[dbo].[ResourceTypeItem] WHERE ResourceID = '".$ResourceID ."'";
        $query25 = "DELETE [IVCRESOURCES].[dbo].[ResourceFundSrc] WHERE ResourceID = '".$ResourceID ."'";
        $query26 = "DELETE [IVCRESOURCES].[dbo].[ResourceFundAmt] WHERE ResourceID = '".$ResourceID ."'";
        $query27 = "DELETE [IVCRESOURCES].[dbo].[ResourceFundSrcLog] WHERE ResourceID = '".$ResourceID ."'";
        $query28 = "DELETE [IVCRESOURCES].[dbo].[ResourceStage] WHERE ResourceID = '".$ResourceID ."'";
        $query29 = "DELETE [IVCRESOURCES].[dbo].[Priority] WHERE ResourceID = '".$ResourceID ."'";
        $query30 = "DELETE [IVCRESOURCES].[dbo].[ResourceFSBSI] WHERE ResourceID = '".$ResourceID ."'";
        $query31 = "DELETE [IVCRESOURCES].[dbo].[ResourceRP] WHERE ResourceID = '".$ResourceID ."'";
        $query32 = "DELETE [IVCRESOURCES].[dbo].[CommentsMgr] WHERE ResourceID = '".$ResourceID ."'";
        $query33 = "DELETE [IVCRESOURCES].[dbo].[CommentsVPP] WHERE ResourceID = '".$ResourceID ."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute();     
        
        $cmd = $dbConn->prepare($query2);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query3);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query4);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query5);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query6);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query7);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query8);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query9);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query10);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query11);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query12);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query13);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query14);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query15);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query16);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query17);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query18);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query19);
        $result = $cmd->execute(); 
        
        $cmd = $dbConn->prepare($query20);
        $result = $cmd->execute();
        
        $cmd = $dbConn->prepare($query21);
        $result = $cmd->execute();
        
        $cmd = $dbConn->prepare($query22);
        $result = $cmd->execute();
        
        $cmd = $dbConn->prepare($query23);
        $result = $cmd->execute();
        
        $cmd = $dbConn->prepare($query25);
        $result = $cmd->execute();
        
        $cmd = $dbConn->prepare($query26);
        $result = $cmd->execute();
        
        $cmd = $dbConn->prepare($query27);
        $result = $cmd->execute();
        
        $cmd = $dbConn->prepare($query28);
        $result = $cmd->execute();
        
        $cmd = $dbConn->prepare($query29);
        $result = $cmd->execute();
        
        $cmd = $dbConn->prepare($query30);
        $result = $cmd->execute();
        
        $cmd = $dbConn->prepare($query31);
        $result = $cmd->execute();
        
        $cmd = $dbConn->prepare($query32);
        $result = $cmd->execute();
        
        $cmd = $dbConn->prepare($query33);
        $result = $cmd->execute();

        echo json_encode($result);
    }
?>

