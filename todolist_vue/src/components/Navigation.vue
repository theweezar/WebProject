<template>
  <div class="bg-light">
    <ul class="nav flex-column position-relative" >
      <li style="background: transparent" 
      v-bind:class="{'nav-item p-4 pointer':true, 'bg-primary text-light': func.k == i.key ? true:false}" 
      v-for="i in navItems" v-bind:key="i.key" @click="sendKeyFunction(i.key)">
        <div>
          {{i.name}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'Navigation',
  // Cách để tránh 'vue-waring avoid mutating a prop directly' là thay giá trị của props là những Object
  // Thay vì là 1 kiểu dữ liệu cơ bản như Number, String
  props:['func'],
  data(){
    return {
      navItems: [
        {key: 1, name:'All'},
        {key: 2, name:'Active'},
        {key: 3, name:'Completed'},
      ]
    }
  },
  methods:{
    sendKeyFunction: function(k){
      this.func.k = k;
    }
  }
}
</script>

<style scoped>
.dive{
  z-index: -1;
}
</style>