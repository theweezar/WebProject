function readSingleFile(file){
  // Hàm đọc file
  const reader = new FileReader();
  let crypt = false;
  if (file.name.match(/(crypt)+$/g) != null) crypt = true;
  // .onloadend tức là sự kiện khi hàm đọc file đã đọc xong cái file này
  reader.onloadend = function(){
    const item = document.createElement("li");
    item.classList.add("d-block","my-1","pointer");
    item.innerText = file.name;
    $("#listUpload").append(item);
    if (crypt) arrayFileBase64.push(this.result);
    else arrayFileBase64.push({
      data: this.result,
      name: file.name 
    });
  }
  // Phương thức đọc file -> Base64 string
  if (crypt) reader.readAsText(file,"UTF-8");
  else reader.readAsDataURL(file);
}

function readArrayFiles(){
  const arrayFile = this.files;
  console.log(`Upload ${arrayFile.length} files`);
  if (arrayFile.length > 0){
    for(let i = 0; i < arrayFile.length; i++){
      readSingleFile(arrayFile[i]);
    }
  }
}

function download(text){
  const a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  a.setAttribute('download', "cipher.crypt");
  a.click();
}

function uploadToEncrypt(){
  if (arrayFileBase64.length > 0){
    const password = $("input#password").val().trim();
    $.ajax({
      url:"./encrypt",
      type:"POST",
      data: {
        arrayFileBase64: arrayFileBase64,
        password: password
      },
      success: function(rs){
        // console.log(rs);
        download(rs);
      }
    })
  }
}

function loadResult(rs = []){
  rs.forEach(e => {
    const item = document.createElement("li");
    item.classList.add("d-block","my-1","pointer");
    item.innerText = e.name;
    const img = new Image();
    img.src = e.data;
    img.classList.add("preview-item");
    $("#result").append(item);
    item.addEventListener("click", function(){
      $("#preview").html("").append(img);
    })
  })
}

function uploadToDecrypt(){
  if (arrayFileBase64.length > 0){
    const password = $("input#password").val().trim();
    $.ajax({
      url:"./decrypt",
      type:"POST",
      data: {
        arrayFileBase64: arrayFileBase64,
        password: password
      },
      success: function(rs){
        console.log(rs);
        loadResult(rs);
      }
    })
  }
}

function changeMode(){
  const _this = $(this);
  const _upload = $("#fileUpload")

  while(arrayFileBase64.length != 0){
    arrayFileBase64.pop()
    $("#listUpload").html("")
  }

  if (_this.attr("encrypt")){
    _this.removeAttr("encrypt").attr("decrypt","true").html("Decrypt")
    $("#fileUpload").removeAttr("multiple");
    _upload.attr("accept",".crypt")
  }
  else if (_this.attr("decrypt")){
    _this.removeAttr("decrypt").attr("encrypt","true").html("Encrypt")
    $("#fileUpload").attr("multiple","")
    _upload.attr("accept","image/png, image/jpg, image/jpeg, image/gif")
  }
}

const arrayFileBase64 = [];

window.onload = function(){
  $("#fileUpload").on("change", readArrayFiles);
  $("#modeBtn").on("click",changeMode);
  $("#execBtn").on("click", function(){
    if ($("#modeBtn").attr("encrypt")) uploadToEncrypt();
    else if ($("#modeBtn").attr("decrypt")) uploadToDecrypt();
  });
}