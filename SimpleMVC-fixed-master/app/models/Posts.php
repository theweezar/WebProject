<?php 

class Posts extends MySQL{
    private $conn;
    private $tb_name = 'posts';

    public function __construct(){
        $this->conn = $this->Connect();
    }

    public function GetAllPosts(){
        $result = mysqli_query($this->conn,"SELECT * FROM ".$this->tb_name." ;");
        $posts = [];
        for($i=0;$i<mysqli_num_rows($result);$i++){
            array_push($posts,mysqli_fetch_assoc($result));
        }
        return $posts;
    }

    public function GetPost($id){
        $result = mysqli_query($this->conn,"SELECT * FROM ".$this->tb_name." WHERE id = ".$id."; ");
        if (mysqli_num_rows($result)==0) return false;
        else{
            $data = mysqli_fetch_assoc($result);
            return $data;
        }
    }

    public function SetId(){
        $result = mysqli_query($this->conn,"SELECT * FROM ".$this->tb_name." WHERE id=(SELECT MAX(id) FROM ".$this->tb_name.");");
        if(mysqli_num_rows($result)==0) return 1;
        else{
            $data = mysqli_fetch_assoc($result);
            $id = $data['id']+1;
            return $id;
        }
    }
    public function CreatePost($newid,$title,$content){
        mysqli_query($this->conn,"INSERT INTO ".$this->tb_name." (id,title,content) VALUES(".$newid.",'".$title."','".$content."') ;");
        mysqli_commit($this->conn);
    }
}