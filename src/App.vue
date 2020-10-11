<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view v-if="isRouterAlive" />
    <!-- </keep-alive> -->
    <audio ref="music" :src="realurl"></audio>
    <div
      v-if="!playerDetailVisible"
      @click="playerDetailVisible = true"
      class="player_small"
    >
      <i class="iconfont iconyinle3 playerIcon"></i>
    </div>
    <el-dialog
      class="dialogBox"
      append-to-body
      :title="JSON.parse(musicUrl).name"
      :visible.sync="playerDetailVisible"
    >
      <div class="topArea">
        <div class="recordArea">
          <div class="inBg2">
            <img :src="JSON.parse(musicUrl).picUrl" alt="" />
          </div>
          <div class="recordNeedle">
            <img
              :src="require('./assets/image/play/hjcp/ic_needle.png')"
              alt=""
            />
          </div>
        </div>
        <div class="songArea"></div>
      </div>
      <div class="playerArea">
        <div class="playBtnArea">
          <img
            :src="require('./assets/image/play/playBtn/ic_last.png')"
            alt=""
          />
          <img
            @click="playMusic"
            :src="
              isPlay
                ? require('./assets/image/play/playBtn/ic_play.png')
                : require('./assets/image/play/playBtn/ic_pause.png')
            "
            alt=""
          />
          <img
            :src="require('./assets/image/play/playBtn/ic_next.png')"
            alt=""
          />
        </div>
        <div class="timeArea"></div>
      </div>
    </el-dialog>
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
      isRouterAlive: true,
      playerDetailVisible: false,
      realurl: "",
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    playMusic() {
      this.$nextTick(() => {
        if (this.isPlay) {
          this.$nextTick(() => {
            this.$store.commit("setAudio", false);
          });
        } else {
          this.$nextTick(() => {
            this.$store.commit("setAudio", true);
          });
        }
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
  mounted() {
    console.log("musicmsg", JSON.parse(this.musicUrl));
  },
  watch: {
    musicUrl(newVal) {
      // load() 方法重新加载音频/视频元素。
      // load() 方法用于在更改来源或其他设置后对音频/视频元素进行更新。
      //load方法更新估计是异步，等待执行完才可以播放，否则会新版chrome会报错
      this.$nextTick(() => {
        let params = {
          id: JSON.parse(newVal).id,
        };
        this.$api.getMusicUrl(params).then((res) => {
          this.realurl = res.data.data[0].url;
          this.$nextTick(() => {
            this.$refs.music.load();
            this.$nextTick(() => {
              this.$refs.music.play();
            });
          });
        });
      });
    },
    isPlay(newVal) {
      this.$nextTick(() => {
        this.$refs.music.load();
      });
      this.$nextTick(() => {
        if (newVal) {
          let playPromise = this.$refs.music.play();
          console.log(playPromise);
          if (playPromise) {
            playPromise
              .then(() => {
                // 音频加载成功
                // 音频的播放需要耗时
                setInterval(() => {
                  this.$refs.music.play();
                }, 1000);
              })
              .catch((e) => {
                // 音频加载失败
                console.error(e);
              });
          }
          // this.$refs.music.play();
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

<style lang="scss">
.player_small {
  width: 70px;
  height: 70px;
  border: 1px solid #999;
  cursor: pointer;
  position: fixed;
  bottom: 50px;
  left: 50px;
  text-align: center;
  line-height: 70px;
  .playerIcon {
    font-size: 50px;
    color: #999;
  }
}
.player_small:hover {
  border: 1px solid #ea6f5a;
}
.player_small:hover .playerIcon {
  color: #ea6f5a;
}

.dialogBox {
  width: 100%;

  .el-dialog {
    width: 800px;
    margin-top: 30px !important;
    margin-bottom: 0;
  }
  .topArea {
    width: 40%;
    height: 400px;
    .recordArea {
      width: 100%;
      height: 100%;
      background-color: #eee;
      //               根据W3C的标准，在页面中元素都一个隐含的属性叫做Block Formatting Context
      // 简称BFC，该属性可以设置打开或者关闭，默认是关闭的。
      // 当开启元素的BFC以后，元素将会具有如下的特性：
      //  *     1.父元素的垂直外边距不会和子元素重叠
      //  *     2.开启BFC的元素不会被浮动元素所覆盖
      //  *     3.开启BFC的元素可以包含浮动的子元素
      //               开启元素的BFC
      // *     1.设置元素浮动：使用这种方式开启，虽然可以撑开父元素，但是会导致父元素的宽度丢失，而且使用这种方式也会导致下边的元素上移，不能解决问题
      //  *     2.设置元素绝对定位
      //  *     3.设置元素为inline-block：可以解决问题，但是会导致宽度丢失，不推荐使用这种方式
      // *     4.将元素的overflow设置为一个非visible的值
      //  * 推荐方式：将overflow设置为hidden是副作用最小的开启BFC的方式。
      overflow: hidden;
      position: relative;
      .inBg2 {
        width: 68%;
        height: 206px;
        margin: auto;
        margin-top: 50px; //此处高度塌陷
        background-image: url("./assets/image/play/hjcp/coverall.png");
        background-repeat: no-repeat;
        background-position: -140px -580px;
        img {
          width: 132px;
          height: 132px;
          border-radius: 132px;
          display: inline-block;
          margin-top: 37px;
          margin-left: 37px;
        }
      }
      .recordNeedle {
        position: absolute;
        left: 45%;
        top: -10px;
        img {
          width: 80px;
        }
        transform: rotate(-2deg);
        transform-origin: left top;
      }
    }
    .songArea {
    }
  }
  .playerArea {
    width: 40%;
    background-color: #999;
    padding: 10px;
    box-sizing: border-box;
    .playBtnArea {
      text-align: center;
      img {
        width: 50px;
        height: 50px;
        cursor: pointer;
      }
    }
    .timeArea {
    }
  }
}
</style>