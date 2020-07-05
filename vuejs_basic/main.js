'use strict'

$(function(){
  var start = new Vue({
    // el là element cha
    el:'#start',
    // data là toàn bộ biến bên trong cái element cha này
    // biến được đặt trong dấu {{msg}} ở frontend
    data: {
      msg: "Hello Vue.js! Let's get start."
    }
  });

  // Dùng v-bind:[attributeName] - ở đây ta dùng v-bind:title="save or del"
  // v-bind:href, v-bind:class,.....
  var hoverme = new Vue({
    el:'#hoverbtn',
    data:{
      save: "Save option at " + new Date().toLocaleDateString(),
      del: "Delete option at " + new Date().toLocaleDateString()
    }
  });

  // Dùng v-if="tên biến boolean" ở ngoài html
  var boolean = new Vue({
    el:"#boolean",
    data:{
      seen: true
    }
  });

  var list = new Vue({
    el:"#list",
    data:{
      todos: [
        {text:"This is an Object"},
        21,
        "This is string"
      ]
    }
  });

  // Dùng v-on:[eventName] = "tên function"
  // Ở đây ta dùng v-on:click = "tên function" ở ngoài html
  // v-on:mouseon,....
  var clickme = new Vue({
    el:"#clickme",
    data:{
      timeClicked: 0
    },
    methods:{
      plusOne: function(){
        this.timeClicked++;
      }
    }
  });
// document.addEventListener("pointerenter")
  // Dùng v-model = "tên biến mà chúng ta muốn gán vào" ở the <input> html
  // v-model thay đổi liên tục mỗi khi chúng ta nhập vào
  var addlist = new Vue({
    el:"#addlist",
    data:{
      list:[
        {text:"First element here"}
      ],
      todo:""
    },
    methods:{
      push: function(){
        if (this.todo.trim() != '') this.list.push({text:this.todo.trim()});
        this.todo = "";        
      }
    }
  })

  // Này là tạo 1 component cho thẻ <todo-item></todo-item>
  Vue.component('todo-item', {
    // Trong props ta tạo biến và bind nó vào 1 biến bằng 
    // v-bind:"tên biến trong props ở đây là tod" = "cái biến mà ta muốn gán cho tod"
    // Ở đây là ta gán từng phần tử của array groceryList ở bên dưới, thì tod sẽ có 2 thuộc tính id, text
    props: ['tod'],
    template: '<li>{{ tod.text }}</li>'
  });
  
  var app = new Vue({
    el: '#app',
    data: {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ],
    }
  });

  // Dùng v-html bên trang html
  var rawhtml = new Vue({
    el:'#rawhtml',
    data:{
      rawHTML: "<span class='text-danger'>This is red</span>"
    }
  })
});