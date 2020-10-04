<template>
  <div class="headTit">
    <el-container>
      <el-header>
        <div class="leftArea">
          <!-- <p class="logo">{{$t("logo")}}</p> -->
          <el-image
            style="width: 100px; height: 60px; cursor: pointer"
            @click="logoClick"
            :src="logoImg"
            fit="contain"
          ></el-image>
        </div>

        <div class="midArea">
          <ul class="mid_ul">
            <li
              :class="currentTitle == 0 ? 'titSelect' : 'hoverEvent'"
              @click="findClick"
            >
              <i class="iconfont iconfaxian titleIcon"></i>
              &nbsp;
              <span class="titleTxt">{{ $t("found") }}</span>
            </li>
            <li
              :class="currentTitle == 1 ? 'titSelect' : 'hoverEvent'"
              @click="focusClick"
            >
              <i class="iconfont iconshu titleIcon"></i>
              &nbsp;
              <span class="titleTxt">{{ $t("focus") }}</span>
            </li>
            <li
              :class="currentTitle == 2 ? 'titSelect' : 'hoverEvent'"
              @click="msgClick"
            >
              <i class="iconfont iconiconfonterji titleIcon"></i>
              &nbsp;
              <span class="titleTxt">{{ $t("music") }}</span>
            </li>
            <li>
              <el-autocomplete
                popper-class="complete1"
                v-model="state"
                :fetch-suggestions="querySearch"
                :placeholder="$t('search')"
                select-when-unmatched
                class="search"
                @select="handleSelect"
                :popper-append-to-body="false"
              >
                <i
                  class="el-icon-search searchIcon"
                  slot="suffix"
                  @click="handleIconClick"
                ></i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                </template>
              </el-autocomplete>
            </li>
          </ul>

          <!-- 媒体查询小于665时显示下拉框 -->
          <div class="popTitle">
            <el-popover placement="bottom" width="100%" trigger="click">
              <ul class="popul">
                <li
                  :class="currentTitle == 0 ? 'titSelect' : 'hoverEvent'"
                  @click="findClick"
                >
                  <span class="titleTxt">{{ $t("found") }}</span>
                </li>
                <li
                  :class="currentTitle == 1 ? 'titSelect' : 'hoverEvent'"
                  @click="focusClick"
                >
                  <span class="titleTxt">{{ $t("focus") }}</span>
                </li>
                <li
                  :class="currentTitle == 2 ? 'titSelect' : 'hoverEvent'"
                  @click="msgClick"
                >
                  <span class="titleTxt">{{ $t("music") }}</span>
                </li>
                <li>
                  <el-autocomplete
                    popper-class="complete1"
                    v-model="state"
                    :fetch-suggestions="querySearch"
                    :placeholder="$t('search')"
                    select-when-unmatched
                    class="search"
                    @select="handleSelect"
                    :popper-append-to-body="false"
                  >
                    <i
                      class="el-icon-search searchIcon"
                      slot="suffix"
                      @click="handleIconClick"
                    ></i>
                    <template slot-scope="{ item }">
                      <div class="name">{{ item.value }}</div>
                    </template>
                  </el-autocomplete>
                </li>
              </ul>

              <el-button slot="reference">
                <i class="iconfont iconyanzhengma titleIcon"></i>
              </el-button>
            </el-popover>
          </div>
        </div>

        <div class="rightArea">
          <!-- 设置 -->
          <div class="settingIcon">
            <el-popover placement="bottom" width="100" trigger="click">
              <el-radio-group @change="setLang" v-model="lang" size="medium">
                <el-radio-button label="zh">中文</el-radio-button>
                <el-radio-button label="en">En</el-radio-button>
              </el-radio-group>
              <i class="iconfont iconyuyan" slot="reference"></i>
            </el-popover>
          </div>

          <div class="user">
            <el-avatar
              v-if="$store.state.userName == undefined ? false : true"
              style="width: 40px; height: 40px"
              icon="el-icon-user-solid"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <p
              class="username"
              v-if="$store.state.userName == undefined ? false : true"
            >
              {{ $store.state.userName }}
            </p>
            <div
              v-if="$store.state.userName == undefined ? true : false"
              @click="$router.push('/login')"
            >
              {{ $t("login") }}
            </div>
          </div>

          <el-button
            type="primary"
            @click="toWrite"
            v-if="$router.history.current.path != '/write'"
            round
            class="iconfont iconpiyue-yumaobi writeBtn"
            >{{ $t("write") }}</el-button
          >
        </div>
      </el-header>
      <el-divider></el-divider>
    </el-container>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "headTit",
  inject: ["reload"],
  data() {
    return {
      lang: this.$store.state.lang,
      currentTitle: 0,
      logoImg:
        this.$store.state.lang == "zh"
          ? require("../assets/image/logo_zh.png")
          : require("../assets/image/logo_en.png"),
      restaurants: [],
      state: "",
    };
  },
  methods: {
    setLang(val) {
      this.$store.commit("setLang", val);
      console.log(val, this.$store.state.lang);
      this.$i18n.locale = val;
    },
    toWrite() {
      this.$router.push("/write");
    },
    findClick() {
      if (this.$router.history.current.path == "/index") {
        this.reload();
      } else {
        this.$router.push("/index");
      }
      this.currentTitle = 0;
    },
    focusClick() {
      this.currentTitle = 1;
    },
    msgClick() {
      console.log(this.$router);
      if (this.$router.history.current.path == "/music") {
        this.reload();
        this.$nextTick(() => {
          this.currentTitle = 2;
          console.log(this.currentTitle);
        });
      } else {
        this.$router.push("/music");
        this.$nextTick(() => {
          this.currentTitle = 2;
          console.log(this.currentTitle);
        });
      }
      //先刷新再改变下标，刷新时会重置下标为0
      setTimeout(()=>{
        this.currentTitle = 2;
        console.log("time out")
      },2000)
    },
    logoClick() {
      // this.reload()
      console.log(this.$router);
      if (this.$router.history.current.path == "/index") {
        this.reload();
      } else {
        this.$router.push("/index");
      }
    },
    //下拉菜单匹配
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "历史记录1" },
        { value: "历史记录2" },
        { value: "历史记录3" },
        { value: "历史记录4" },
        { value: "历史记录5" },
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
  },

  watch: {
    lang(newval) {
      console.log(newval);
      if (newval == "zh") {
        this.logoImg = require("../assets/image/logo_zh.png");
      } else {
        this.logoImg = require("../assets/image/logo_en.png");
      }
    },
  },
};
</script>
<style>
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.popul {
  /deep/ .el-input__inner {
    /*或者 .s2>>>.el-input__inner  */
    border-radius: 100px; /*输入框圆角值*/
    width: 100%;
    height: 30px;
    transition: width 1s;
  }

  .searchIcon {
    display: block;
    width: 20px;
    height: 20px;
    line-height: 30px;
    margin-right: 5px;
  }
  .titleTxt {
    display: block;
    text-align: center;
  }
  li {
    padding: 5px 0 5px 0;
  }
}

.el-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 70px;
  background: #fff;
  z-index: 999;
}
.headTit {
  margin-top: 100px;
}

.el-divider {
  margin: 0;
}
.titSelect {
  color: #ea6f5a;
  cursor: pointer;
}
.hoverEvent:hover {
  background: #eee;
  cursor: pointer;
}
.el-header {
  width: 100%;
  min-width: 400px;
  // background-color: $color;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  // justify-content: space-between;
  .leftArea {
    width: 10%;
    height: 100%;
    min-width: 100px;
    .logo {
      margin: 0;
      font-size: 30px;
      color: #ea6f5a;
      cursor: pointer;
      line-height: 60px;
    }
  }
  .midArea {
    width: 60%;
    height: 100%;
    margin-left: 5%;
    position: relative;
    .popTitle {
      position: absolute;
      top: 0;
      display: none;
      left: 0;
      li {
        font-size: 16px;
        padding: 0 20px 0 20px;
      }
    }
    .mid_ul {
      width: 100%;
      height: 100%;
      display: flex;
      list-style: none;
      justify-content: flex-start;
      li {
        font-size: 16px;
        .titleIcon {
          font-size: 16px;
        }
        padding: 0 10px 0 10px;
        /deep/ .el-input__inner {
          /*或者 .s2>>>.el-input__inner  */
          border-radius: 100px; /*输入框圆角值*/
          width: 150px;
          height: 30px;
          transition: width 1s;
        }
        /deep/ .el-input__inner:focus {
          width: 170px;
        }
        .searchIcon {
          margin-right: 5px;
        }
      }
    }

    @media (max-width: 1069px) {
      .titleIcon {
        display: none;
      }

      .titleTxt {
        display: block;
      }
    }

    @media screen and (min-width: 1069px) and (max-width: 1090px) {
      .titleIcon {
        display: none;
      }
    }

    @media (max-width: 950px) {
      .titleTxt {
        display: none;
      }
      .titleIcon {
        display: block;
      }
    }

    @media (max-width: 800px) {
      li {
        display: none;
      }
      .popTitle {
        display: block;
      }
    }
  }
  .rightArea {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px 0 10px;
      .username {
        margin-left: 10px;
      }
      cursor: pointer;
    }
    .user:hover {
      background: #eee;
    }
    .settingIcon {
      font-size: 20px;
      cursor: pointer;
      padding: 0 20px 0 10px;
      outline: none;
      display: flex;
      justify-content: center;
    }
    .writeBtn {
      margin-left: 10px;
      height: 70%;
      background-color: #ea6f5a;
      border-color: #ea6f5a;
    }
  }
}
</style>
