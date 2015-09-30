<?php
    $server = "idc1.ivc.edu idc2.ivc.edu idc3.ivc.edu";
    $baseDN = "dc=ivc,dc=edu";
   
    $username = filter_input(INPUT_POST, 'username');
    $password = filter_input(INPUT_POST, 'password');
    $creator_email = filter_input(INPUT_POST, 'creator_email');
    
    $login = "IVCSTAFF\\".$username;
    $ldapconn = ldap_connect($server);   
    if($ldapconn) {          
        ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

        $ldapbind = ldap_bind($ldapconn, $login, $password);  
        if($ldapbind) {
            $filter = "(&(objectClass=user)(objectCategory=person)(mail=".$creator_email."))";
            $ladp_result = ldap_search($ldapconn, $baseDN, $filter);
            ldap_sort($ldapconn, $ladp_result, 'displayname');
            $data = ldap_get_entries($ldapconn, $ladp_result);
            
            if (array_key_exists('manager', $data[0])) {
                $manager = $data[0]["manager"][0];
            }
            
            if (!empty($manager)) {
                $filter2 = "(&(objectClass=user)(objectCategory=person)(cn=".setApproverUserName($manager)."))";
                $result2 = ldap_search($ldapconn, $baseDN, $filter2);
                $data2 = ldap_get_entries($ldapconn, $result2);

                if (array_key_exists('displayname', $data2[0])) {
                    $name2 = $data2[0]["displayname"][0];
                }
                if (array_key_exists('mail', $data2[0])) {
                    $email2 = $data2[0]["mail"][0];
                }
                if (array_key_exists('title', $data2[0])) {
                    $title2 = $data2[0]["title"][0];
                }
                if (array_key_exists('division', $data2[0])) {
                    $division2 = $data2[0]["division"][0];
                }
                
                $result = array($name2, $email2, $title2, $division2);
                echo json_encode($result);
            }
        }
        ldap_close($ldapconn);
    }
    
    function setApproverUserName($manager) {
        $pos = strpos($manager, ',');
        return substr($manager, 3, $pos - 3);
    }