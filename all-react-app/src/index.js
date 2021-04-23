import React from 'react';
import ReactDOM from 'react-dom';
/**
 * Ở trên là 2 thành phần chính của react app
 * Ngoài ra ta có thể import thêm nhiều css cùng 1 lúc hoặc đơn giản chỉ 1 file 
 */
import './css/bootstrap.min.css'
import './css/font-awesome-4.7.0/css/font-awesome.min.css'
/**
 * Component thì ta có thể import thoải mái
 */
// import Tutorial from './tutorial/Tutorial';
// import Admin from './admin_for_landing_page/Admin'
import NoteApp from './note_web_app/NoteApp'
// import NoteApp from './note_web_app/NoteApp_2'
/**
 * File index.js sẽ chạy và được render bên trong file index.html trong thư mục public
 * nên là không được xóa file index.html mà chỉ được thay đổi dữ liệu bên trong
 * Phần <Header /> dưới này có thể là 1 component gốc của 1 app hoặc đơn giản là 1 component nhỏ
 * vì dưới nó ta có thể add thêm nhiều component khác hoặc có thể thay đổi nó để ra 1 app khác
 */

function Index(){
  return(
    <React.StrictMode>
      {/* <Tutorial /> */}
      {/* <Admin /> */}
      {/* <NoteApp /> */}
      <NoteApp />
    </React.StrictMode>
  )
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
