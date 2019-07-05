const EventEmitter = require('events');

class Messenger extends EventEmitter{
  send(name,msg){
    this.emit("message",{name:name, msg:msg});
    // emit tức là ta gọi tới sự kiện có tên là message và truyền biến là 1 object vào
    // ta có thể gọi tới 1 sự kiện nào đó mà ko cần truyền thêm tham biến nó là 1 arg any
  }
  demo(){
    this.emit("demo");
  }
  setNumber(num){
    this.emit(num);
  }
}

const Msg = new Messenger();
Msg.on("message",(data)=>{ 
  // khi dc gọi tới sự kiện có tên là message thì ta sẽ dùng arrow function hoặc function bình thường để xử lý
  console.log(`Message from ${data.name} : ${data.msg}`);
});
Msg.on("demo",()=>{
  console.log('Call event "demo" successfully !');
});
Msg.on(9,()=>{
  console.log('Number 9 is called');
});
Msg.send('Duc','Hello World!'); // đây là phương thức bình thường của class, ta truyền vào 2 string là name vs msg
Msg.demo();
Msg.setNumber(8);
Msg.setNumber(9); // chỉ khi ta gọi tới số 9 thì event mới dc gọi ra còn số 8 thì ko