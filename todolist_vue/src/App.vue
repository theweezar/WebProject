<template>
  <div class="aligncenter">
    <div class="container-fluid row h-100 no-padding">
      <Navigation v-on:change="changeType" class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding" v-bind:func='func'/>
      <TodoList class="col-lg-9 col-md-9 col-sm-9 col-xs-9 no-padding" v-bind:msg='message'/>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList,
    Navigation
  },
  data(){
    return {
      message: 'Hello World',
      func: {k: 1}
    }
  },
  methods:{
    changeType: function(){
      console.log("change");
    }
  }
}
</script>

<style>
.aligncenter{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.no-padding{
  padding: 0! important;
}
</style>
