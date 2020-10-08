<!--  -->
<template>
  <div class="playList">
    <div class="typeSelect">
      <el-popover placement="bottom-start" width="600" trigger="click">
        <div class="popContent">
          <div style="padding: 10px 10px 0 10px">
            <p>添加标签</p>
          </div>
          <el-divider></el-divider>
          <div style="padding: 0 10px 0 10px">
            <p
              :class="type == '全部' ? 'select all' : 'all'"
              @click="selectAll"
            >
              全部
            </p>
            <div class="otherType">
              <div
                class="everyType"
                v-for="(bigItem, bigind) in leftTypeList"
                :key="bigind"
              >
                <p class="leftType">{{ bigItem }}</p>
                <ul class="rightType">
                  <!--  v-for="(smallItem,smallind) in changeList[bigind]" :key="smallind" -->
                  <li
                    @click="selectSmallType(bigind, smallind)"
                    v-for="(smallItem, smallind) in changeList[bigind]"
                    :key="smallind"
                    :class="smallItem.clickFlag == 1 ? 'select' : ''"
                  >
                    {{ smallItem.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <el-button round slot="reference">{{ type }}</el-button>
      </el-popover>
    </div>
    <div class="hotType">
      <p>
        热门标签:
        <span v-for="(item, ind) in hotList" :key="ind"
        @click="hotTypeClick(item.name)"
          ><span v-if="ind != 0 ? true : false">|</span>{{ item.name }}</span
        >
      </p>
    </div>

    <div class="playListContent">
      <div class="fUl">
        <ul>
          <li v-for="(item, ind) in playList" :key="ind">
            <img :src="item.coverImgUrl" alt="歌单封面" />
            <p style="color: #000">{{ item.name }}</p>
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

    <el-pagination
    class="fenye"
        background
        layout="total,prev, pager, next"
        :current-page="offset"
        @current-change = "handleCurrentChange"
        :total="total">
        </el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      changeList: [],
      leftTypeList: [],
      hotList: [],
      type: "全部",
      visible: false,
      playList: [],
      offset:1,
      total:1,
    };
  },
  methods: {
    handleFocus() {
      this.visible = true;
    },
    handleBlur() {
      this.visible = false;
    },
    handleCurrentChange(val) {
        this.offset = val;
        this.getNewPlayList()
      },
    selectSmallType(bigind, ind) {
      this.changeList.map((v) => {
        v.map((item) => {
          item.clickFlag = 0;
        });
      });

      this.changeList[bigind][ind].clickFlag = 1;
      console.log(this.changeList[bigind]);
      this.type = this.changeList[bigind][ind].name;
      this.offset =1
      this.getNewPlayList()
    },
    selectAll() {
      this.changeList.map((v) => {
        v.map((item) => {
          item.clickFlag = 0;
        });
      });
      this.type = "全部";
      this.offset =1
      this.getNewPlayList()
    },
    hotTypeClick(name){
        this.changeList.map((v) => {
            v.map((item) => {
                item.clickFlag =0
                if(item.name == name){
                    item.clickFlag = 1
                    this.type = item.name
                }
            });
        });
        this.offset =1
        this.getNewPlayList()
    },
    getNewPlayList(){
        let params = {
        limit: 50,
        offset:(this.offset-1)*50,
        cat: this.type,
        };
        this.$api.getPlayList(params).then((res) => {
        console.log(res);
        this.playList = res.data.playlists;
        this.total = res.data.total
        });
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.$api.getPlayListType().then((res) => {
      console.log(res);
      for (var k in res.data.categories) {
        this.leftTypeList.push(res.data.categories[k]);
      }
      for (var i = 0; i < this.leftTypeList.length; i++) {
        this.changeList.push([]);
      }

      res.data.sub.map((v) => {
        if (v.hot) {
          this.hotList.push(v);
        }
        this.changeList[v.category].push(v);
      });
      this.changeList.map((v) => {
        v.map((item) => {
          item.clickFlag = 0;
        });
      });
      console.log(this.changeList);
    });
    // 获取歌单
    this.getNewPlayList()
    
  },
};
</script>
<style lang='scss' scoped>
.playList {
  .hotType {
    font-size: 13px;
    margin-top: 20px;
    margin-bottom: 20px;
    span {
      margin-right: 5px;
      color: #999;
      cursor: pointer;
    }
    span:hover {
      color: #000;
    }
  }
  .fenye{
    text-align: center;
    margin-bottom: 50px;
  }
  .fUl {
    ul {
      display: flex;
      flex-wrap: wrap;
      color: #fff;
      font-size: 13px;
      li:hover .playIcon {
        display: block;
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
}
.select {
  border: 1px solid #ea6f5a !important;
}
.popContent {
  height: 400px;
  overflow: auto;
  .all {
    border: 1px solid #eee;
    padding: 10px;
    text-align: center;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .all:hover {
    background-color: #eee;
  }

  .otherType {
    overflow-y: auto;
    .everyType {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 5px;
      .leftType {
        word-break: keep-all; /* 不换行 */
        white-space: nowrap; /* 不换行 */
        margin-right: 70px;
        color: #ea6f5a;
      }
      .rightType {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 70px;
          margin-right: 5px;
          margin-bottom: 5px;
          border: 1px solid #eee;
          padding: 5px;
          text-align: center;
          cursor: pointer;
        }
        li:hover {
          background-color: #eee;
        }
      }
    }
  }
}
</style>