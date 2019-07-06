<?php 
    /**
     * Class MySQL này chỉ dùng riêng cho MySQL mà thôi.
     * Nếu dùng loại cơ sở dữ liệu khác thì bạn có thể tự viết 1 class khác rồi qua các file model extends nó ra
     * Dùng PDO để kết nối tới những loại cơ sở dữ liệu khác
     * Hoặc bạn có thể tìm hiểu về Composer vì đây là 1 thư viện về database 
     */
    class MySQL{ 
        private $db_host;
        private $db_username;
        private $db_password;
        private $db_name;
        
        protected function Connect(){
            $this->db_host = "localhost";
            $this->db_username = "root";
            $this->db_password = "minhduc1999";
            $this->db_name = "test";
            return mysqli_connect($this->db_host,$this->db_username,$this->db_password,$this->db_name);
        }

    }
?>