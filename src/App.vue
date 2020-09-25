<template>
  <div id="app">
    <keep-alive>
      <router-view  v-if="isRouterAlive"/>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  //向子孙组件注入依赖  常见的刷新本页面功能，不会有白屏
  // provide：Object | () => Object
  // inject：Array<string> | { [key: string]: string | Symbol | Object }
  provide () {
   return{
     reload: this.reload
   }
 },
 data () {
   return {
     isRouterAlive:true
   }
 },
 methods: {
   reload(){
     this.isRouterAlive = false;
     this.$nextTick(()=>{
       this.isRouterAlive = true
     })
   }
 }
}
</script>

<style>
body{
  /* background-image: url("./assets/image/bg1.jpg");
  background-size: cover;
  background-repeat:no-repeat;
  background-position:50%,50%; */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
