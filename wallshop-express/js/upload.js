function mediumSize(files){
  if (files.size < 1024*1024*5) return true;
  else return false;
}

function Resize(img = new Image()){
  let width = img.width;
  let height = img.height;
  if (width > height) { // hình chữ nhật nằm ngang
    let max_width = 1920/3; 
    if (width > max_width) {
      height *= max_width / width; // max_width / width < 1 => 1 số nhân với 1 số 0 < x < 1 thì số đó sẽ bé đi
      width = max_width;
    }
  }
  else{
    let max_height = 1080/3;
    if (height > max_height) {
      width *= max_height / height; // max_height / height < 1
      height = max_height;
    }
  }
  return {width:width,height:height};
}

function discardButton(){
  let div = document.createElement('div');
  div.setAttribute('id','btn-discard');
  div.classList.add('btn-discard');
  div.innerText = 'Discard';
  return div;
}

function UploadImage(){
  let reader = new FileReader();
  let img_view = new Image();
  let upload = document.getElementById('upload-btn');
  reader.onloadend = () => { // khi mà FileReader đã đọc xog dữ liệu của tệp truyền vào thì sẽ thực thi tiếp
    if (upload.files[0].size < 1024*1024*5){
      img_view.src = reader.result; // set src = kết quả mới đọc được
      img_view.setAttribute('id','preview-pic');
      img_view.onload = () => { // khi mọi thứ đã được set xog thì mới tiếp tục xữ lý tệp đó 
        let size = Resize(img_view); // giảm size để truyền ra màn hình, nhưng ko giảm sai thực
        img_view.width = size.width;
        img_view.height = size.height;
        document.querySelector('label').setAttribute('style','display: none;'); // nút upload được bỏ đi
        document.getElementById('upload-box').appendChild(img_view); // show ảnh ra
        document.getElementById('upload-box').appendChild(discardButton());
        document.getElementById('post').removeAttribute('style'); // nút POST sẽ được xuất hiện
        document.getElementById('btn-discard').addEventListener('click',() => {
          // discard là xóa ảnh mới vừa upload lên
          document.getElementById('upload-box').removeChild(document.getElementById('preview-pic')); // xóa ảnh đi
          document.getElementById('upload-box').removeChild(document.getElementById('btn-discard'));
          document.getElementById('post').style.display = 'none'; // xóa cái nút post lên database đi
          document.querySelector('label').removeAttribute('style'); // hiện nút choose image lên
        });
      };
    }
    else alert('File is too large !!');
  };
  if (upload.files[0]){
    reader.readAsDataURL(upload.files[0]); // đang đọc dữ liệu file
  }
}
document.getElementById('upload-btn').addEventListener('change',UploadImage);
