import React from 'react';
import ReactDOM from 'react-dom';
/**
 * Ở trên là 2 thành phần chính của react app
 * Ngoài ra ta có thể import thêm nhiều css cùng 1 lúc hoặc đơn giản chỉ 1 file 
 */
import './css/bootstrap.min.css'
/**
 * Component thì ta có thể import thoải mái
 */
import Tutorial from './components/Tutorial';
/**
 * File index.js sẽ chạy và được render bên trong file index.html trong thư mục public
 * nên là không được xóa file index.html mà chỉ được thay đổi dữ liệu bên trong
 * Phần <Header /> dưới này có thể là 1 component gốc của 1 app hoặc đơn giản là 1 component nhỏ
 * vì dưới nó ta có thể add thêm nhiều component khác hoặc có thể thay đổi nó để ra 1 app khác
 */
ReactDOM.render(
  <React.StrictMode>
    <Tutorial />
  </React.StrictMode>,
  document.getElementById('root')
);
