<template>
  <div class="bg-primary">
    <h1>{{msg}}</h1>
      <p>{{kClass}}</p>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  // props là biến được truyền từ component cha và component con bằng v-bind:msg
  props: ['msg','kClass'],
  watch:{
    kClass: function(){
      console.log("change");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
