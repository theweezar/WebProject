function KhaiBao(){
    var n = 20;         // number value
    var name = "Minh Duc"; // string value
    var bool = true;    // boolean valua
    var space = null; // null value 
    console.log("n : "+ n,typeof(n));
    console.log("name : "+ name,typeof(name));
    var age = "20"; // n==age : True (So sánh giá trị) 
                    // n===age : False (So sánh kiểu dữ liệu)
}
function Calculate_x(a,b){ // ax+b=0
    if (a==0) console.log("PT vo nghiem");
    else{
        x = -b / a;
        console.log("Nghiem : "+x);
    }
}
a = [3,2,5,4,1,6,8,7];
function Sort(lst){
    var temp;
    for(var i=0;i<lst.length;i++){
        for(var j=i;j<lst.length;j++){
            if (lst[i]>lst[j]){
                temp = lst[i];
                lst[i] = lst[j];
                lst[j] = temp;
            }
        }
    }
    console.log(lst);
}
function ConVoi(n){
    var move;
    if (n%5==0) move = n/5;
    else move = (n/5) + 1;
    console.log("Elephant has to move",move + " time");
}
/*function switch_case(n){
    switch(n){
        case 1:{
            console.log("Đây là case 1");
        }
        case 2:{
            console.log("Đây là case 2");
        }
        default:{
            console.log("Đây là default");
        }
    }
}*/
function alert_(){
    alert("This is alert. Got it ?");
}
function confirm_(){ // confirm khác alert ở chỗ, confirm sẽ đưa ra 2 lựa chọn (OK:true hoặc Cancel:false)
    var choose = confirm("You understand me?");
    if (choose==true){
        alert("Oke. Well done");
    }
    else{
        alert("Fuck you");
    }
}
function prompt_(){
    var temp = prompt("Enter something please: "); // prompt cho nhập chuỗi thông tin vào
    if (temp!=null) alert(temp);
}
function random(){
    var random = Math.floor((Math.random() * 100) + 1); // Từ 1 - 100
    console.log(random);
}

//=========================================== OOP =================================================//

var person = { // Đây là đối tượng được tạo sẵn có thể có giá trị hoặc không, rồi sau đó mới có thể thay đổi
    name:"Hoang Phan Minh Duc",
    age:20,
    getinfor:function(){
        return this.name + " " + this.age; // luôn luôn phải có this trong object - this là con trỏ chỉ cái gì
    },
    /*person.name : return name
    person.age : return age
    person["name"] : return name
    person["age"] : return age
    person.getinfor() : execute function*/
    change:function(){ // thay đổi giá trị tạm thời - reset lại sau khi reload page
        this.name = "Duc dep trai";
        this.age = 18;
    }
}
// person.name = "Minh Duc"; // Có thể thay đổi giá trị age tạm thời bằng cách này hoặc cách trên - dưới
// person["age"] = 25;

function Person(name,age,gender){
    this.Name = name;
    this.Age = age;
    this.Gender = gender;
    this.Information = function(){
        return "Infor : " + this.Name + " - " + this.Age + " - " + this.Gender;
    }
    /* Để khởi tạo trực tiếp 1 đối tượng
    var duc = new Person("Minh Duc",20,"Male");
    mọi con trỏ this trong class này đều là public nên ta có thể gọi ra hết và giá trị cũng dễ dàng thay đổi
    khá là kém bảo mật*/
}
