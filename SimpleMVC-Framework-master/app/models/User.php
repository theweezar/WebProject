<?php 

class User extends MySQL{ // Vào file ConnectDB.inc.php để thay đổi host,username,password,databasename
    private $conn;
    private $tb_name = 'users';
    public function __construct(){
        $this->conn = $this->Connect();
    }
    public function GetAllUser(){
        $result = mysqli_query($this->conn,"SELECT * FROM ".$this->tb_name."");
        $data = array();
        for ($i=0;$i<mysqli_num_rows($result);$i++){
            array_push($data,mysqli_fetch_assoc($result));
        }
        return $data;
    }
}