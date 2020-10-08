<!--  -->
<template>
  <div class="recommended">
    <div>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, ind) in bannerList" :key="ind">
          <img
            @click="bannerSong(item.song)"
            class="bannerImg"
            :src="item.pic"
            alt="加载失败"
          />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div>
      <div class="tjgd">
        <p class="leftText">推荐歌单</p>
        <p class="rightText" @click="moreList">更多></p>
      </div>
      <el-divider class="divider"></el-divider>
      <div class="fUl">
        <ul>
          <li v-for="(item, ind) in playList" :key="ind">
            <img :src="item.picUrl" alt="歌单封面" />
            <p style="color:#000">{{item.name}}</p>
            <p class="copywriter">
              {{ item.copywriter }}
            </p>
            <p class="playcount">
              <i class="iconfont iconiconfonterji"></i>&nbsp;{{
                item.playCount
              }}
            </p>
            <p class="playIcon">
              <i class="iconfont iconshipin"></i>
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div>
        <div class="tjgd">
        <p class="leftText">最新音乐</p>
        <p class="rightText" @click="moreNewList">更多></p>
      </div>
      <el-divider class="divider"></el-divider>
      <div class="newSongUl">
          <ul>
              <li v-for="(item, ind) in newSongList" :key="ind">
                    <p class="xuhao" v-html="(ind+1<10)?'0'+(ind+1):(ind+1)"></p>
                    <div class="newImage">
                        <img :src="item.picUrl" alt="加载失败">
                        <p class="playIcon">
                            <i class="iconfont iconshipin"></i>
                        </p>
                    </div>
                    <div class="newName">
                        <p>{{item.name}}</p>
                        <p>{{item.song.artists[0].name}}</p>
                    </div>
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
      bannerList: [],
      playList: [],
      newSongList:[]
    };
  },
  methods: {
    bannerSong(song) {
      if (song != null) {
        console.log(song);
        console.log(song.id);
        console.log(song.name);
      }
    },
    moreList() {
      this.$emit("morePlaylist");
    },
    moreNewList(){
        this.$emit("moreNewSongList")
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.$api.getBanner().then((res) => {
      console.log(res);
      this.bannerList = res.data.banners;
    });
    this.$api.getRecommendList().then((res) => {
      console.log(res);
      this.playList = res.data.result;
      this.playList.map((v) => {
        v.playCount = parseInt(v.playCount / 10000) + "万";
      });
    });
    this.$api.getNewSong().then(res=>{
        console.log(res)
        this.newSongList = res.data.result
    })
  },
};
</script>
<style lang='scss' scoped>
.recommended {
  .bannerImg {
    width: 100%;
    height: 100%;
  }
  .tjgd {
    display: flex;
    justify-content: space-between;
    .rightText {
      font-size: 13px;
      color: #999;
      cursor: pointer;
    }
  }
  .divider {
    margin-top: 10px;
  }
  @keyframes shuMove {
      0%{
          transform: translateY(-100%);
      }
      100%{
          transform: translateY(0);
      }
  }
  .fUl {
    ul {
      display: flex;
      flex-wrap: wrap;
      color: #fff;
      font-size: 13px;
      li:hover .copywriter {
        display: block;
      }
      li:hover .playIcon {
        display: block;
      }
      li:hover .playcount {
        display: none;
      }
      li {
        position: relative;
        width: 18%;
        margin-right: 1%;
        margin-left: 1%;
        margin: 0 1% 2% 1%;
        cursor: pointer;
        overflow: hidden;
        img {
          width: 100%;
          height: 80%;
        }
        .copywriter {
          position: absolute;
          left: 0;
          top: 0;
          display: none;
          background-color: rgb(80, 75, 75);
          opacity: 0.8;
          font-size: 10px;
          width: 100%;
          padding: 5px;
          box-sizing: border-box;
          animation: shuMove 0.5s linear;
        }
        .playcount {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          text-align: right;
          padding-right: 5px;
          box-sizing: border-box;
        }
        .playIcon {
          position: absolute;
          top: 120px;
          right: 10px;
          display: none;
          i {
            font-size: 20px;
          }
        }
      }
    }
  }
  .newSongUl{
      ul{
          display: flex;
          flex-direction: column;
          height: 400px;
          flex-wrap: wrap;
          li:nth-of-type(2){
              background-color: #F5F5F7;
          }
          li:nth-of-type(4){
              background-color: #F5F5F7;
          }
          li:nth-of-type(7){
              background-color: #F5F5F7;
          }
          li:nth-of-type(9){
              background-color: #F5F5F7;
          }
          li:hover{
              background-color: #EBECED;
          }
          li{
              width: 47.4%;
              display: flex;
              border: 0.5px solid #EDEDED;
              padding: 10px;
              .xuhao{
                  color: #999;
                  align-self: center;
                  margin-right: 20px;
                  margin-left: 10px;
              }
              .newImage{
                  position: relative;
                  margin-right: 10px;
                  cursor: pointer;
                  img{
                      width: 50px;
                      height: 50px;
                  }
                  p{
                      position: absolute;
                      top: 17px;
                      left: 17px;
                      color: #fff;
                  }
              }
              .newName{
                  font-size: 13px;
                  align-self: center;
              }
          }
      }
  }
}
</style>