// Sau đây ta sẽ dùng 2 cách khai báo hàm Function và Arrow Function

// Ưu điểm của Arrow Function là ngắn gọn, đọc code có thể phân biệt được ngay vì có dấu => 
// Nhược điểm là ko thể làm 1 lớp đối tượng như Function được vi ko thể tạo được phương thức, chỉ có biến. Và có những
// chức năng không thể làm được như Function

let sayHi = (Names = []) => { // ta truyền names là 1 mảng
  // console.log(Names.length);
  if (typeof(Names) == typeof([])){
    Names.forEach(name => {
      console.log("Hello "+name);
    });
  }
  else console.log(Names);
}

// sayHi("Minhduc","Dai"); // truyền array nếu ko thêm dấu [] thì nó chỉ nhận phần tử đầu là Minhduc => length = 7
// sayHi(["Duc","Dai","Dong","Dung"]); // nếu ghi thêm dấu thì nó sẽ nhận là 1 array => length = 4


// Ưu điểm của Function là có thể làm được mọi thứ. Từ 1 hàm đơn giản hoặc là 1 lớp đối tượng 
// (có thể thêm được phương thức)
// Nhược điểm là nếu như code những chương trình lớn thì khi đọc code có thể hơi khó nhìn ra vì chữ nhiều

function Example_String() {
  let str = "     Day la dau toi la ai ?     ";
  console.log("Example: "+str);
  console.log(`Split(' '):  ${str.split(" ")}`); // tách chuỗi theo điều kiện và nhét từng phần tử được tách vào 1 array
  console.log(`Substr(0,10): ${str.substr(0,10)}`); // substr với slice khá giống nhau đều hỗ trợ cắt chữ từ đâu tới đâu
  console.log(`Slice(0,10):  ${str.slice(0,10)}`); // cắt chữ và return lại cái đoạn bị cắt
  console.log(`1.Replace('la','is'): ${str.replace("la","is")}`); // thay đổi chữ "la" thành chữ "is" - 
  // nhưng nó chỉ thay đổi đúng 1 chữ đầu tiên mà nó chạm phải - vậy ta có thêm 1 cách để thay đổi toàn bộ chữ "la" 
  // trong 1 string đó là dùng RegExp -> Regular Expression.

  console.log(`2.Replace(/la/g,"is"): ${str.replace(/la/g,"is")}`); // bõ 1 cụm từ mà ta muốn thay đổi trong dấu và 
  // có chữ g nằm cuối / .... / g những phương thức nào mà cần mục tiêu để làm gì đó, ta đều có thể làm như 2 cách ở trên
  
  console.log(`Match('la'): ${str.match(/la/g)}`); // phương thức match dùng để tách tất cả các cụm từ "la" ra khỏi string 
  //và quăng vào 1 array, ta có thể dùng hàm này để xác định có bao nhiêu từ hay cụm từ được lặp lại trong cái string đó
  
  console.log(`str.trim(): ${str.trim()}`); // xóa khoảng ở 2 bên đầu cho đến khi dụng kí tự đầu hay cuối - ko xóa ở giữa

  console.log(`str.repeat(2): ${str.repeat(2)}`); // lặp lại cái string này 2 lần

  console.log(`str.concat("fuck"): ${str.concat("fuck")}`); // nối chuỗi, nhưng thường ta ko dùng phương pháp này 
  
  console.log(`str.includes("toi") : ${str.includes("toi")}`) // phương thức này dùng để xác định xem chuỗi này có chứa
  // ít nhất 1 cụm từ "toi" hay ko, và nó sẽ return về 1 giá trị boolean
}
// Example_String();
let e = Example_String;
e();



