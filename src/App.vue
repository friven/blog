<template>
  <div id="app">
    

    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
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
