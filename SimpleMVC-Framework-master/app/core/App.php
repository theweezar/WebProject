<?php // ví dụ: localhost/$controller/$method/$params[] = localhost/home/default ( vì mặc định đã được set )
    class App {
        protected $controller = 'home'; // nếu truyền parameter mới vào thì chỗ $controller sẽ thay đổi 
        protected $method = 'default'; // method (function trong file $controller.php) 
        protected $params=[]; // List parameter URL
        // ví dụ như : www.example.com/showpost/1 : show cái post có id = 1. 1 ở đây sẽ là params

        public function __construct(){
            // print_r($this->parseURL());
            $url = $this->parseURL();
            if (file_exists('../app/controllers/'.$url[0].'.php')){ // kiểm tra xem file có ko, nếu có thì dòng require
                $this->controller = $url[0];                   // ở dưới sẽ làm việc, không thì nó cứ require thằng this cũ
                unset($url[0]);
            }
            require_once '../app/controllers/'.$this->controller.'.php';
            // mặc định nếu không có parameter truyền vào thì sẽ require cái thằng home.php 
            // có sẵn trong folder controllers
            $this->controller = new $this->controller; // khởi tạo mới là vì trong file home.php có class Home

            if(isset($url[1])){ // kiểm tra xem trong thằng vừa required có những methods function gì
                if(method_exists($this->controller,$url[1])){
                    $this->method = $url[1];
                    unset($url[1]);
                }
            }

            $this->params = $url ? array_values($url) : [];
            // dòng trên có nghĩa là nếu sau dấu '/' không có gì thì nó sẽ gán lại 1 array trống
            // print_r($this->params);
            call_user_func_array([$this->controller,$this->method],$this->params);
        }

        public function parseURL(){ // Phân tích cú pháp mà bạn đã gõ trên URL
            if(isset($_GET['url'])){
                return $url = explode('/',filter_var(rtrim($_GET['url']), FILTER_SANITIZE_URL));
                // Khi ghi 1 cái đường dẫn nào đó trên url nó sẽ pass nguyên cái cụm mới GET vào
                // B1 : nếu $url nó có khoảng trắng, nó sẽ bỏ hết và nối liền string lại, rồi return kết quả
                // B2 : lấy kết quả return trên, nó sẽ lọc tiếp theo bộ lọc có tên FILTER_SANITIZE_URL
                // B3 : nó sẽ dò cái kq return trên, cứ đến chỗ nào có dấu '/' nó sẽ bỏ ra và lấy cái string sau đó
                //      rồi push_back cái string đó vào 1 anonymous array.
                // method print_r ở trên là để xem kiểu dữ liệu list của $url. Nếu dùng printf hoặc echo thì nó sẽ notice: đây là array
            }
        }
    }

