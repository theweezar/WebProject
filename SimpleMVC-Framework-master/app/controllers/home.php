<?php

class Home extends Controller{
    public function default($name=''){ // dòng này là method. $name là params | test localhost/home/duc -> echo Hello duc
        $user = $this->model('User'); // Coi trong file Controller.php
        $data = $user->GetAllUser();
        $this->view('home/homepage',["user"=>$data]); // truyền dữ liệu kiểu dict vào view để hiện lên front-end
    }

    public function test(){ // gõ localhost/home/test để thử nghiệm
        echo "this is a test";
    }
    
}