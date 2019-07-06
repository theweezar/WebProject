<?php 

class Users extends MySQL{ // Vào file ConnectDB.inc.php để thay đổi host,username,password,databasename
    private $conn;
    private $tb_name = 'users';
    public function __construct(){
        $this->conn = $this->Connect();
    }

    public function CheckInput($input){
        $input = trim($input);
        $input = stripslashes($input);
        $input = htmlspecialchars($input);
        return $input;
    }
    public function GetAllUser(){
        $result = mysqli_query($this->conn,"SELECT * FROM ".$this->tb_name."");
        $data = array();
        for ($i=0;$i<mysqli_num_rows($result);$i++){
            array_push($data,mysqli_fetch_assoc($result));
        }
        return $data;
    }
    public function Validate($username,$password){
        $username = $this->CheckInput($username);
        $password = hash("md5",$this->CheckInput($password),false);
        $result = mysqli_query($this->conn,"SELECT * FROM ".$this->tb_name." WHERE username= '".$username."' ;");
        if (mysqli_num_rows($result)==0) return false;
        else{
            $val = mysqli_fetch_assoc($result);
            if ($password==$val['password']) return true;
            else return false;
        }
    }
}