<?php
    $server = "IDC1.ivc.edu";
    $baseDN = "dc=ivc,dc=edu";
    
    $searchUser = filter_input(INPUT_POST, 'searchUser');
    $ldapconn = ldap_connect($server);
    if($ldapconn) {
        ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

        $ldapbind = ldap_bind($ldapconn, "IVCSTAFF\\stafftest", "staff");
        if($ldapbind) { 
            $filter = "(&(objectClass=user)(objectCategory=person)(|(displayname=".$searchUser."*)(mail=".$searchUser."*)))";
            $ladp_result = ldap_search($ldapconn, $baseDN, $filter);
            $data = ldap_get_entries($ldapconn, $ladp_result);

            $rstCount = $data["count"];
            $rows = array(array());
            if ($rstCount > 0) {                    
                for ($i = 0; $i < $rstCount; $i++) {
                    $name = $data[$i]["displayname"][0];
                    $email = $data[$i]["mail"][0];
                    $title = $data[$i]["title"][0];
                    $division = $data[$i]["division"][0];

                    $rows[$i] = array($name, $email, $title, $division);
                }
            }

            echo json_encode($rows);
        }
        ldap_close($ldapconn);
    }