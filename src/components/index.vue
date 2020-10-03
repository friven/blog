<template>
  <div class="index1">
    <div class="leftNbsp"></div>
    <div class="midBlogList">
      <div class="code" v-for="(item, ind) in list" :key="item.id">
        <div class="listEvery">
          <div class="listdiv">
            <a class="title1">{{ item.title }}</a>
            <div class="info">{{ item.induction }}</div>
            <div class="iconList">
              <span class="hot">
                <i class="iconfont iconDegreeofheat hoticon"></i>
                {{ item.clickRate }}</span
              >
              <span class="author">{{
                item.userName == null ? "无名" : item.userName
              }}</span>
              <span class="commentsNum">
                <i class="iconfont iconpinglun"></i>
                {{ item.commentCount }}</span
              >
              <span class="zan">
                <i class="iconfont iconxinaixin"></i>
                {{ item.top }}</span
              >
            </div>
          </div>
          <div class="listImg" v-if="item.first_image == null ? false : true">
            <img
              style="width: 150px; height: 100px"
              :src="item.first_image"
              alt=""
            />
          </div>
        </div>
        <el-divider v-if="ind >= total-1 ? false : true"></el-divider>
      </div>
      <!-- 占位div，用于加载动画时优化体验 -->
      <div v-if="list.length >= total ? false : true" class="zhanwei">
        <div v-if="loading">
          <placeHolder></placeHolder>
        </div>
      </div>
      <!-- <p v-if="noMore"  class="hint">没有更多了</p>     -->
    </div>
    <div class="rightNbsp"></div>
  </div>
</template>

<script>
import placeHolder from "./animateComponent/placeholder";
import { throttle } from "../utils/common";
export default {
  name: "index",
  components: {
    placeHolder,
  },
  data() {
    return {
      list: [], //文章列表
      // 总条数
      total: 1,
      loading: true, //是否加载
      // 当前条数
      pageSize: 5,
      // 当前页数
      page: 2,
      bottom: false, //是否已经滚动到底部
    };
  },
  methods: {
    load() {
      this.loading = true;
      // 改变页数并从新赋值
      this.pageSize = this.pageSize + 1;
    },
    addData() {
      if (this.list.length >= this.total) {
        this.loading = false;
        return;
      }
      this.page = this.list.length
      let params = {
        page: this.page,
        pageSize: 5,
      };
      this.$api.getBlogList(params).then((res) => {
        this.list.push(...res.data.data.data);
        this.loading = false;
      });
    },
  },
  computed: {
    // noMore() {
    //   //   当循环添加的数据条数大于或等于总条数时停止加载
    //   return this.list.length >= this.total
    // }
  },
  mounted() {
    let params = {
      page: 0,
      pageSize: 7,
    };
    this.$api.getBlogList(params).then((res) => {
      console.log(res);
      this.list = res.data.data.data;
      this.total = res.data.data.totalCount;
    });
    window.addEventListener("scroll", () => {
      // 1.scrollY：返回当前viewport顶部边缘的Y坐标，如果没有viewport，返回的值为0。
      // 2.document.documentElement.clientHeight：以像素为单位的元素的内部高度，包括填充，但不包括水平滚动条高度，边框或边距。
      // 3.document.documentElement.scrollHeight：元素内容的高度，包括由于溢出在屏幕上不可见的内容。
      this.bottom =
        document.documentElement.scrollHeight -
          (document.documentElement.clientHeight + window.scrollY) <=
        10
          ? true
          : false;
    });
  },
  watch: {
    bottom(bottom) {
      console.log(this.list)
      if (bottom) {
        if (this.list.length >= this.total) {
          this.loading = false;
          return;
        }
        this.loading = true;
        //节流方法，防止用户多次触发
        
        throttle(this.addData, 1500, this)();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.index1 {
  width: 100%;
  display: flex;
  .leftNbsp {
    width: 10%;
    min-width: 100px;
    margin-left: 15px;
  }
  .midBlogList {
    width: 50%;
    height: 100%;
    margin-left: 5%;
    text-align: left;
    box-sizing: border-box;
    // background-color: #fff;
    padding: 20px;
    // padding: 10px;
    .code {
      .listEvery {
        display: flex;
        justify-content: space-between;
        .listdiv {
          margin-top: 13px;

          .title1 {
            margin: -7px 0 4px;
            display: inherit;
            font-size: 18px;
            font-weight: 700;
            word-break: break-word; // 词语打断
            white-space: normal; // 正常样式
          }
          .title1:hover {
            text-decoration: underline;
            cursor: pointer;
          }
          .info {
            margin: 0 0 8px;
            font-size: 13px;
            line-height: 24px;
            color: #999;
            word-wrap: break-word;
          }
          .iconList {
            font-size: 12px;
            color: #b4b4b4;
            i {
              font-size: 12px;
            }
            .hot {
              color: #ea6f5a;
              margin-right: 10px;
            }
            .author {
              margin-right: 10px;
            }
            .commentsNum {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
.zhanwei {
  width: 100%;
  height: 150px;
}
</style>
