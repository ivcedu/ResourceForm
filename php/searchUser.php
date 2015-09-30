<?php
    $server = "idc1.ivc.edu idc2.ivc.edu idc3.ivc.edu";
    $baseDN = "dc=ivc,dc=edu";
    
    $searchUserEmail = filter_input(INPUT_POST, 'searchUserEmail');
    $ldapconn = ldap_connect($server);
    if($ldapconn) {
        ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);
        $ldapbind = ldap_bind($ldapconn, "IVCSTAFF\\stafftest", "staff");
        if($ldapbind) {
            $filter = "(mail=".$searchUserEmail.")";
            $result = ldap_search($ldapconn, $baseDN, $filter);
            $data = ldap_get_entries($ldapconn, $result);
            
            $name = $data[0]["displayname"][0];
            $email = $data[0]["mail"][0];
            $title = $data[0]["title"][0];
            
            if (array_key_exists('manager', $data[0])) {
                $manager = $data[0]["manager"][0];
            }
            if (array_key_exists('division', $data[0])) {
                $division = $data[0]["division"][0];
            }
                
            if ($title === "President") {
                $row = array($name, $email, $title, $division, $name, $email, $title, $division);
                echo json_encode($row);
            }
            else {
                if (!empty($manager)) {
                    $filter2 = "(CN=".setApproverUserName($manager).")";
                    $result2 = ldap_search($ldapconn, $baseDN, $filter2);
                    $data2 = ldap_get_entries($ldapconn, $result2);

                    $name2 = $data2[0]["displayname"][0];
                    $email2 = $data2[0]["mail"][0];
                    $title2 = $data2[0]["title"][0];
                    
                    if (array_key_exists('division', $data2[0])) {
                        $division2 = $data2[0]["division"][0];
                    }

                    $row = array($name, $email, $title, $division, $name2, $email2, $title2, $division2);
                    echo json_encode($row);
                }
            }
        }
        ldap_close($ldapconn);
    }
    
    function setApproverUserName($manager)
    {
        $pos = strpos($manager, ',');
        return substr($manager, 3, $pos - 3);
    }