<!--  -->
<template>
  <div class="newSong">
    <div>
      <div class="tabs">
        <el-tabs v-model="type" @tab-click="handleClick">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="华语" name="7"></el-tab-pane>
          <el-tab-pane label="欧美" name="96"></el-tab-pane>
          <el-tab-pane label="日本" name="8"></el-tab-pane>
          <el-tab-pane label="韩国" name="16"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="content">
        <ul>
          <li class="playAll">
            <p>
              <i class="iconfont iconshipin"></i>
              播放全部
            </p>
          </li>
          <li
            class="listContent"
            v-for="(item, ind) in allNewSongList"
            :key="ind"
          >
            <p
              class="xuhao"
              v-html="ind + 1 >= 10 ? ind + 1 : '0' + (ind + 1)"
            ></p>
            <div class="songImg">
              <img :src="item.album.picUrl" alt="加载失败" />
              <i class="iconfont iconshipin"></i>
            </div>
            <div class="aliasdiv1">
              <p class="songName">{{ item.name }}</p>
              <p
                class="songAlias"
                v-html="item.alias.length > 0 ? '(' + item.alias[0] + ')' : ''"
              ></p>
            </div>
            <div class="artistsList">
              <p
                class="songArtists"
                v-for="(v, i) in item.artists"
                :key="i"
                v-html="i > 0 ? ' / ' + v.name : v.name"
              ></p>
            </div>
            <div class="aliasdiv2">
              <p class="songAlbumName">{{ item.album.name }}</p>
              <p
                class="songAlbumAlias"
                v-html="item.alias.length > 0 ? '(' + item.alias[0] + ')' : ''"
              ></p>
            </div>
            <p
              class="songLength"
              v-html="
                (parseInt(parseInt(item.duration / 1000) / 60) < 10
                  ? '0' + parseInt(parseInt(item.duration / 1000) / 60)
                  : parseInt(parseInt(item.duration / 1000) / 60)) +
                ':' +
                (parseInt(item.duration / 1000) % 60 < 10
                  ? '0' + (parseInt(item.duration / 1000) % 60)
                  : parseInt(item.duration / 1000) % 60)
              "
            ></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      type: "0",
      allNewSongList: [],
    };
  },
  methods: {
    getNewSongList() {
      let params = {
        type: this.type,
      };
      this.$api.getAllNewSong(params).then((res) => {
        console.log(res);
        this.allNewSongList = res.data.data;
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.getNewSongList();
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getNewSongList();
  },
};
</script>
<style lang='scss' scoped>
.newSong {
  .content {
      border: 0.5px solid #EDEDED;
    font-size: 13px;
    .playAll {
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      cursor: pointer;
      i {
        color: #ea6f5a;
      }
    }
    .listContent:nth-of-type(even){
        background: #F5F5F7;
    }
    .listContent:hover{
        background: #E3E3E5;
    }
    .listContent {
      height: 70px;
      line-height: 70px;
      display: flex;
      .xuhao {
        color: #999;
        padding: 0 20px 0 10px;
      }
      .songImg {
        padding: 10px 0 10px 0;
        position: relative;
        margin-right: 20px;
        img {
          width: 50px;
          height: 50px;
        }
        i {
          position: absolute;
          top: 0;
          left: 17px;
          color: #fff;
        }
      }
      .aliasdiv1 {
        width: 30%;
        display: flex;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 30px;
        .songName {
        }
        .songAlias {
            color: #999;
        }
      }
      .artistsList {
        display: flex;
        margin-right: 30px;
        width: 10%;
        // display: flex;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .songArtists {
        }
      }

      .aliasdiv2 {
        width: 30%;
        display: flex;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 30px;
        .songAlbumName {
        }
        .songAlbumAlias {
            color: #999;
        }
      }

      .songLength {
          color: #999;
      }
    }
  }
}
</style>