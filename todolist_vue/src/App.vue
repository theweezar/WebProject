<template>
  <div class="aligncenter bg-dark">
    <div class="container-fluid row h-100 no-padding">
      <Navigation class="col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padding" v-bind:classify='classify'/>
      <Page class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding"/>
      <TodoList class="col-lg-7 col-md-7 col-sm-7 col-xs-7 no-padding" v-bind:msg='message'
      v-bind:kClass="classify.k"/>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import TodoList from './components/TodoList.vue'
import Page from './components/Page.vue'

export default {
  name: 'App',
  components: {
    TodoList,
    Navigation,
    Page
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
