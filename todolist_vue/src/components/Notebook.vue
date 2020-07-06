<template>
  <div class="bg-light">
    <ul class="nav flex-column position-relative h-ul" >
      <li class="nav-item p-4">
        <div class="text-uppercase">
          Notebook
        </div>
      </li>
      <li style="background: transparent" 
      v-bind:class="{'nav-item p-4 pointer':true, 'bg-primary text-light': classify.k == i.key ? true:false}" 
      v-for="i in navItems" v-bind:key="i.key" @click="setKeyFunction(i.key)">
        <div class="">
          {{i.name}}
        </div>
      </li>
      <li class="py-3 px-2">
        <div v-bind:class="['input-group',!creating ? 'd-none':'']">
          <input v-model="notebookName" type="text" class="form-control" placeholder="Notebook's name">
          <div class="input-group-append">
            <button v-bind:class="['btn', notebookName.trim().length > 0 ? 'btn btn-success':'btn btn-danger']" type="button" 
              v-html="notebookName.trim().length > 0 ? '&#10003;':'&#10005;'" @click="action()"></button>
          </div>
        </div>
      </li>
    </ul>
    <hr>
    <div class="d-flex justify-content-center">
      <button @click="createNotebook()" class="btn btn-primary px-5">Add notebook</button>
    </div>
  </div>
</template>

<script>
export default {
  name:'Notebook',
  // Cách để tránh 'vue-waring avoid mutating a prop directly' là thay giá trị của props là những Object
  // Thay vì là 1 kiểu dữ liệu cơ bản như Number, String
  props:['classify'],
  data(){
    return {
      navItems: [
        {key: 1, name:'All'},
        {key: 2, name:'Active'},
        {key: 3, name:'Completed'},
      ],
      notebookName:"",
      icon: "&times;",
      creating: false
    }
  },
  methods:{
    setKeyFunction: function(k){
      this.classify.k = k;
    },
    createNotebook: function(){
      this.creating = true;
    },
    action: function(){
      if (this.notebookName.trim().length > 0){
        // Ajax to create a new notebook
      }
      else this.creating = false;
      this.notebookName = "";
    }
  }
}
</script>

<style scoped>
.dive{
  z-index: -1;
}
.h-ul{
  height: 85%;
}
</style>