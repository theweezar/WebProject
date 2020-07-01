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

  var hoverme = new Vue({
    el:'#hoverbtn',
    data:{
      save: "Save option at " + new Date().toLocaleDateString(),
      del: "Delete option at " + new Date().toLocaleDateString()
    }
  });

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

  Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
  })
  
  var app = new Vue({
    el: '#app',
    data: {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]
    }
  })
});