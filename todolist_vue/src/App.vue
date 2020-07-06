<template>
  <div class="aligncenter bg-dark">
    <div class="container-fluid row h-100 p-2">
      <Notebook class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding" v-bind:classify='classify'/>
      <TodoList class="col-lg-9 col-md-9 col-sm-9 col-xs-9 no-padding" v-bind:msg='message'
      v-bind:kClass="classify.k"/>
    </div>
  </div>
</template>

<script>
import Notebook from './components/Notebook.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList,
    Notebook
  },
  data(){
    return {
      message: 'Hello World',
      classify: {k: 1},
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
.btn:focus, .btn:active, input:focus{
  outline: none! important;
  box-shadow: none! important;
}
</style>
