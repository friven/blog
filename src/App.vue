<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view v-if="isRouterAlive" />
    <!-- </keep-alive> -->
    <audio ref="music" :src="musicUrl"></audio>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  //向子孙组件注入依赖  常见的刷新本页面功能，不会有白屏
  // provide：Object | () => Object
  // inject：Array<string> | { [key: string]: string | Symbol | Object }
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
  computed: {
    musicUrl() {
      return this.$store.state.musicUrl;
    },
    isPlay() {
      return this.$store.state.isPlay;
    },
  },
  watch: {
    musicUrl(){
      // load() 方法重新加载音频/视频元素。
      // load() 方法用于在更改来源或其他设置后对音频/视频元素进行更新。
      //load方法更新估计是异步，等待执行完才可以播放，否则会新版chrome会报错
      this.$nextTick(() => {
        this.$refs.music.load();
        this.$nextTick(()=>{
          this.$refs.music.play();
        })
      });
    },
    isPlay(newVal) {
      this.$nextTick(() => {
        this.$refs.music.load();
      });
      this.$nextTick(() => {
        if (newVal) {
          this.$refs.music.play();
        } else {
          this.$refs.music.pause();
        }
      });
    },
  },
};
</script>

<style>
body {
  /* background-image: url("./assets/image/bg1.jpg");
  background-size: cover;
  background-repeat:no-repeat;
  background-position:50%,50%; */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
