// Sau đây ta sẽ dùng 2 cách khai báo hàm Function và Arrow Function
// Ưu điểm của Function là có thể làm được mọi thứ. Từ 1 hàm đơn giản hoặc là 1 lớp đối tượng 
// (có thể thêm được phương thức)
// Nhược điểm là nếu như code những chương trình lớn thì khi đọc code có thể hơi khó nhìn ra vì chữ nhiều

function Example_String() {
  let str = "Day la dau toi la ai ?";
  console.log("Example: "+str);
  console.log("Split(' '): ");
  console.log(str.split(" "));
  console.log("Substr(0,10): ");
  console.log(str.substr(0,10));
  console.log("Slice(0,10): ");
  console.log(str.slice(0,10));
  console.log("Replace('ai','Duc'): ");
  console.log(str.replace("ai","Duc"));
}
// Example_String();
let e = Example_String;
e();

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

sayHi("Minhduc","Dai"); // truyền array nếu ko thêm dấu [] thì nó chỉ nhận phần tử đầu là Minhduc => length = 7
sayHi(["Duc","Dai","Dong","Dung"]); // nếu ghi thêm dấu thì nó sẽ nhận là 1 array => length = 4

class ImportMe {
  constructor(){
    console.log("Class has been imported");
  }
}

