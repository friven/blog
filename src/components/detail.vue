<!--  -->
<template>
  <div class="detail">
    <div class="detailArea">
      <div class="leftarea"></div>
      <div class="midarea">
        <section class="midSection">
          <h1 class="mid_title">{{ result.title }}</h1>
          <div class="writerMsg">
              <div class="userImage">
                <!-- <img :src="result.userHeadImg" alt="null"> -->
                <img src="https://upload-images.jianshu.io/upload_images/8207483-9dcc52ee00c0a67b.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240" alt="">
              </div>
              <div class="userMsg">
                <div class="username">
                  <p>{{result.userName}}</p>
                  <el-button class="guanzhu" size="mini" type="danger" plain round>关注</el-button>
                </div>
                <div class="articalMsg">
                  <span>{{result.createTime}}</span>
                  <span>字数 {{result.wordsCount}}</span>
                  <span>阅读 {{result.clickCount}}</span>
                </div>
              </div>
          </div>
          <article class="htmlClass" v-html="result.htmlContent" v-highlight></article>
        </section>
      </div>
      <div class="rightarea"></div>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";
import {timeStampToTime} from "../utils/common"
export default {
  name: "",
  data() {
    return {
      result:{},
    };
  },
  methods: {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // 样式丢失，待处理
    hljs.highlightCode();
    this.$api.getArticalDetail(this.$route.params.id).then((res) => {
      this.result = res.data.data
      this.result.createTime = timeStampToTime(this.result.createTime)
    });
  },
};
</script>
<style lang='scss' scoped>
.detail {
  width: 100%;
  height: 100%;
  background: #f9f9f9;
  list-style:inherit;

  .detailArea {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    .leftarea {
      margin-left: 10%;
      width: 100px;
    }

    .midarea {
      width: 50%;
      min-width: 730px;
      background: #fff;
      margin-top: 20px;
      .midSection {
        padding: 20px 40px 20px 40px;
      }
      .writerMsg{
        display: flex;
        justify-content: flex-start;
        padding: 10px;
        margin-bottom: 20px;
        .userImage{
          align-self: center;
          margin-right: 20px;
          img{
            width: 50px;
            height: 50px;
            border-radius: 100px;
          }
        }
        .userMsg{
          .username{
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            .guanzhu{
              margin-left: 10px;
            }
          }
          .articalMsg{
                color: #969696;
                font-size: 13px;
            span{
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.detail pre {
  position: relative;
  padding-left: 3.8em;
  counter-reset: linenumber;
  word-wrap: normal;
  word-break: break-all;
  white-space: pre;
  // overflow-x: scroll;
  overscroll-behavior-x: contain;
  margin-top: 0;
  margin-bottom: 20px;
  border-radius: 4px;
  z-index: 0;
  padding: 1em;
  line-height: 1.5;
  color: #ccc;
  background: #d6b05d;
}
.detail img{
  width: 100%;
  height: auto;
}
.detail code {
  padding: 0;
  background-color: transparent;
  color: inherit;
  white-space: pre;
  vertical-align: unset;
  // color: #ccc;
  // background: none;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}
</style>