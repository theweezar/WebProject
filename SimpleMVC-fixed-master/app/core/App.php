<?php // ví dụ: localhost/$controller/$method/$params[] = localhost/home/default ( vì mặc định đã được set )
    class App { 
        // protected $controller = 'BaseController'; // nếu truyền parameter mới vào thì chỗ $controller sẽ thay đổi 
        protected $method = 'home'; // method (function trong file BaseController.php) 
        protected $params=[]; // List parameter URL
        // ví dụ như : www.example.com/showpost/1 : show cái post có id = 1. 1 ở đây sẽ là params
        public $idjs = 'home';
        public function __construct(){
            // print_r($this->parseURL()); // coi thứ tự trong array;
            $url = $this->parseURL();  // gõ /login thì phải check xem có thằng /login ko, nếu ko thì page not found
            unset($url[0]);
            require_once '../app/controllers/Route.php';
            $route = new Route();
            if(isset($url[1])){ // kiểm tra xem trong thằng vừa required có những methods function gì
                if(method_exists($route,$url[1])){
                    $this->method = $url[1];
                    $this->idjs = $url[1];
                    unset($url[1]);
                }
                else{
                    $this->method = "Pagenotfound";
                }
            }
            
            $this->params = $url ? array_values($url) : [];
            call_user_func_array([$route,$this->method],$this->params);
            // hàm ở trên là gọi 1 function và chỉ gán array vào đó
        }

        public function parseURL(){ // Phân tích cú pháp mà bạn đã gõ trên URL
            if(isset($_GET['url'])){
                return $url = explode('/',filter_var(rtrim($_GET['url']), FILTER_SANITIZE_URL));
                // URL khi chưa bị rewrite localhost/index.php?url=home/(null or ....)
                // cho nên $url = ['home','Sth in here'];
            }
        }
    }

