<?php
/**
 * Đây là MVC microframework - Được viết khá giống với Flask của Python
 * Framework này được dựng nên để hiểu 1 framework hoạt động như thế nào ?
 * Và nó cũng là 1 bước đệm để học những framework MVC lớn như Lavarel,....
 * 
 * File Route.php này có thể chia ra làm 2 file nhỏ: PageController.php và PostController.php
 */
class Route extends Controller{
    public function home(){ // dòng này là method. $name là params | test localhost/home/duc -> echo Hello duc
        $this->view('home/homepage')
    }
    public function aboutme(){ // gõ localhost/home/test để thử nghiệm hoặc localhost/index.php?url=BSCL/test
        echo "<h1>this is about me</h1>";
        // $this->view()
    }
    public function login(){
        if (isset($_SESSION['logged'])) header("Location: home");
        if (isset($_POST['username']) && isset($_POST['password'])){
            $username = $_POST['username'];
            $password = $_POST['password'];
            $user = $this->model("Users");
            $pass = $user->Validate($username,$password);
            if ($pass){
                $_SESSION['logged'] = true;
                $_SESSION['username'] = $username;
                header("Location: /home");
            }
            else $this->view('validations/login',['error'=>"Wrong username or password"]);
        }
        else{
            $this->view('validations/login');
        }
    }
    public function logout(){
        session_destroy();
        header("Location: login");
    }
    public function Pagenotfound(){
        $this->view('pagenotfound');
    }
    public function create_post(){
        if (!isset($_SESSION['logged'])) header("Location: home");
        if (isset($_POST['title']) && isset($_POST['content'])){
            $p = $this->model("Posts");
            $newid = $p->SetId();
            $title = $_POST['title'];
            $content = $_POST['content'];
            $p->CreatePost($newid,$title,$content);
            // $this->view('posts/createpost',['success'=>"Post's created successfully!"]);
            header("Location: showpost/".$newid."/".$title." ");
        }
        $this->view('posts/createpost');
    }
    public function update_post(){
        // Update
    }
    public function delete_post(){
        // Delete
    }
    public function posts_index(){
        $p = $this->model("Posts");
        $posts = $p->GetAllPosts();
        $this->view('posts/posts',['posts'=>$posts]);
    }
    public function showpost($id='',$title=''){
        if (!empty($id) && !empty($title)){
            $p = $this->model("Posts");
            $post = $p->GetPost($id);
            if ($post) $this->view('posts/onepost',["post"=>$post]);
            else{
                unset($p);
                $this->Pagenotfound(); // 1 cách redirect
            }   
        }
        else{
            $this->Pagenotfound();
        }
    }
}