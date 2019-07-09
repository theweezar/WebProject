<?php 
class Controller{
    public function model($model){ // kết nối với file model (table) trong database
        require_once '../app/models/ConnectDB.inc.php'; // {Class MySQL được viết ở đây}
        require_once '../app/models/'.$model.'.php'; // { class $model hiện được viết ở đây}
        return new $model();
    }


    // Có thể thêm parameter tùy ý để phân biệt dữ liệu nếu thích
    public function view($view,$data=[]){ // mọi dữ liệu khi xuất ra đều phải dùng từ khóa $data['somethinginhere']
        require_once '../app/views/'.$view.'.php';
    }
}