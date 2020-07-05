<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  // props là biến được truyền từ component cha và component con bằng v-bind:msg
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
