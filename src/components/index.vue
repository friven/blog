<template>
  <div class="index1">
    <div class="leftNbsp"></div>
    <div class="midBlogList">
      <div class="list"
      
      >
       <div class="code" v-for="item in list" :key="item.id">
          <div class="list">
              <p class="title">{{item.title}}</p>
              <div>{{item.info}}</div>
              <div class="iconList">
                    <span>文章热度</span>
                    <span>作者</span>
                    <span>评论</span>
                    <span>点赞</span>
              </div>
              <el-divider></el-divider>
          </div>
       </div>
         <p v-if="loading" class="hint">加载中...</p>
         <p v-if="noMore"  class="hint">没有更多了</p>    
     </div>

    </div>
    <div class="rightNbsp"></div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      list:[],
      // 总条数
      total:'',
      loading: false,
      // 当前条数
      pageSize:5,
      // 当前页数
      page:0
    };
  },
  methods: {
    load() {
      this.loading=true
      // 改变页数并从新赋值
       this.pageNum=this.pageNum+1
       console.log(4444,this.pageNum)
        setTimeout(()=>{
            let params = {
              page: 1,
              pageSize: 7
            };
            this.$api.getBlogList(params).then((res) => {
              console.log(res);
              this.list = res.data.data.data
              this.total = res.data.data.totalCount
            });
        },1000)
    },
  },
  computed: {
    noMore() {
      //   当循环添加的数据条数大于或等于总条数时停止加载
        return this.list.length >= this.total
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  mounted() {
    let params = {
      page: 1,
      pageSize: 7
    };
    this.$api.getBlogList(params).then((res) => {
      console.log(res);
      this.list = res.data.data.data
      this.total = res.data.data.totalCount
    });
  },
};
</script>

<style lang="scss" scoped>
.index1 {
  width: 100%;
  display: flex;
  .leftNbsp{
    width: 10%;
    min-width: 100px;
    margin-left: 15px;
  }
  .midBlogList {
    width: 60%;
    height: 100%;
    margin-left:5%;
    text-align: left;
  }
}
</style>
