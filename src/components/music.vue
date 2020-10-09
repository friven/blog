<!--  -->
<template>
  <div class="music">
    <el-tabs stretch v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="first">
          <recommended @morePlaylist="morePlaylist" @moreNewSongList="moreNewSongList"></recommended>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="second">
        <playList></playList>
      </el-tab-pane>
      <!-- <el-tab-pane label="排行榜" name="third">排行榜</el-tab-pane> -->
      <el-tab-pane label="歌手" name="fourth">
        <singer :tabName="activeName"></singer>
      </el-tab-pane>
      <el-tab-pane label="最新音乐" name="firth">
        <newSong></newSong>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import recommended from "./music/recommended"
import playList from "./music/playList"
import singer from "./music/singer"
import newSong from "./music/newSong"
export default {
  name: "",
  components: {
      recommended,
      playList,
      singer,
      newSong
  },
  data() {
    return {
        activeName: 'first'
    };
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //第一页的更多跳转至tab第二页，子组件emit触发，父组件绑定监听
      morePlaylist(){
          this.activeName = "second"
      },
      moreNewSongList(){
          this.activeName = "firth"
      }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    
  },
};
</script>
<style lang='scss' scoped>
.music{
    width: 68%;
    margin: auto;
}
</style>