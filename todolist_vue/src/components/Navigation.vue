<template>
  <div class="h-100 bg-light">
    <ul class="nav flex-column position-relative h-ul" >
      <li class="nav-item">
        <div class="text-uppercase">
          Notebook
        </div>
      </li>
      <li class="nav-item px-3">
        <div class="pointer" @click="s1 = !s1">
          All Notebook
          <span class="float-right" v-html="s1 ? '&#11165;':'&#11167;'" ></span>
        </div>
        <ul v-bind:class="['notebook no-padding',s1 ? '':'d-none']">
          <li v-for="n in lstNotebook" v-bind:key="n.key" class="pointer">
            <div>
              {{n.name}}
            </div>
          </li>
          <li>
            <div v-bind:class="['text-primary pointer',!s2 ? '':'d-none']" 
            @click="create()">
              New notebook
            </div>
            <input v-bind:class="[s2 ? '':'d-none']" ref="input"
            type="text" v-model="notebookName" id="setName">
          </li>
        </ul>
      </li>
      
    </ul>
  </div>
</template>

<script>
export default {
  name:'Navigation',
  // Cách để tránh 'vue-waring avoid mutating a prop directly' là thay giá trị của props là những Object
  // Thay vì là 1 kiểu dữ liệu cơ bản như Number, String
  props:['classify'],
  data(){
    return {
      lstNotebook: [
        {key: 1, name:'Notebook 1'},
        {key: 2, name:'Notebook 2'},
      ],
      notebookName:"",
      s1: false,
    }
  },
  methods:{
    setKeyFunction: function(k){
      this.classify.k = k;
      
    },
    create: function(){
      var o = this.lstNotebook.length + 1;
      this.lstNotebook.push({key: o, name:`Notebook ${o}`})
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
.notebook{
  list-style: none;
}
</style>