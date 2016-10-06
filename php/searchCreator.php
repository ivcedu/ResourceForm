<?php
    $server = "ivc.edu";
    $baseDN = "dc=ivc,dc=edu";
    
    $searchCreator = filter_input(INPUT_POST, 'searchCreator');
    $result = array(array());
    
    $ldapconn = ldap_connect($server);   
    if($ldapconn) {
        ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

        $ldapbind = ldap_bind($ldapconn, "IVCSTAFF\\stafftest", "staff");
        if($ldapbind) {                
            $filter = "(|(displayname=".$searchCreator."*)(mail=".$searchCreator."*))";
            $ladp_result = ldap_search($ldapconn, $baseDN, $filter);
            $data = ldap_get_entries($ldapconn, $ladp_result);

            $rstCount = $data["count"];
            if ($rstCount > 0) {                    
                for ($i = 0; $i < $rstCount; $i++) {
                    $name = $data[$i]["displayname"][0];
                    $email = $data[$i]["mail"][0];
                    $title = $data[$i]["title"][0];
                    $division = $data[$i]["division"][0];
                    $manager = $data[$i]["manager"][0];

                    if (!empty($manager))
                    {
                        $filter2 = "(CN=".setApproverUserName($manager).")";
                        $ladp_result2 = ldap_search($ldapconn, $baseDN, $filter2);
                        $data2 = ldap_get_entries($ldapconn, $ladp_result2);
                        $name2 = $data2[0]["displayname"][0];
                        $email2 = $data2[0]["mail"][0];
                        $title2 = $data2[0]["title"][0];
                        $division2 = $data2[0]["division"][0];
                    }
                    $result[$i] = array($name, $email, $title, $division, $name2, $email2, $title2, $division2);
                }
            }
            ldap_close($ldapconn);
        }
    }
    echo json_encode($result);
    
    function setApproverUserName($manager)
    {
        $pos = strpos($manager, ',');
        return substr($manager, 3, $pos - 3);
    }