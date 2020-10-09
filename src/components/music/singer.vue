<!--  -->
<template>
  <div class="singer">
    <div class="fenlei">
      <div class="hotType">
        <p>
          语种:
          <span class="label" v-for="(item, ind) in typeList" :key="ind">
            <span v-if="ind != 0 ? true : false">|</span>
            <span :class="item.select==1?'labelVal select':'labelVal'" @click="typeClick(item.value)">{{ item.label }}</span>
          </span>
        </p>
        <p>
          分类:
          <span class="label" v-for="(item, ind) in areaList" :key="ind"
            ><span v-if="ind != 0 ? true : false">|</span
            ><span :class="item.select==1?'labelVal select':'labelVal'" @click="areaClick(item.value)">{{ item.label }}</span></span
          >
        </p>
        <p>
          筛选:
          <span class="label" v-for="(item, ind) in letterList" :key="ind"
            ><span v-if="ind != 0 ? true : false">|</span
            ><span :class="item.select==1?'labelVal select':'labelVal'" @click="letterClick(item.value)">{{ item.label }}</span></span
          >
        </p>
      </div>

        <el-divider></el-divider>

        <div class="singerContent">
            <ul>
                <li v-for="(item,ind) in singerList" :key="ind">
                    <img :src="item.picUrl" alt="加载失败">
                    <p class="singerName">
                        <span>{{item.name}}</span>
                        <i class="iconfont iconyonghu"></i>
                    </p>
                </li>
            </ul>
        </div>

    </div>
  </div>
</template>

<script>
import { throttle } from "../../utils/common";
export default {
  props: ['tabName'],
  name: "",
  data() {
    return {
      typeList: [
        {
          label: "全部",
          value: "-1",
          select:1
        },
        {
          label: "男歌手",
          value: "1",
          select:0
        },
        {
          label: "女歌手",
          value: "2",
          select:0
        },
        {
          label: "乐队",
          value: "3",
          select:0
        },
      ],
      areaList: [
        {
          label: "全部",
          value: "-1",
          select:1
        },
        {
          label: "华语",
          value: "7",
          select:0
        },
        {
          label: "欧美",
          value: "96",
          select:0
        },
        {
          label: "日本",
          value: "8",
          select:0
        },
        {
          label: "韩国",
          value: "16",
          select:0
        },
        {
          label: "其他",
          value: "0",
          select:0
        },
      ],
      letterList: [
      ],
      typeVal:{
          type:"-1",
          area:"-1",
          letter:"-1"
      },
      singerList: [],
      bottom: false, //是否已经滚动到底部
      more:false
    };
  },
  methods: {
      typeClick(val){
          this.typeList.map(v=>{
              v.select = 0;
              if(v.value == val){
                  v.select =1
                  this.typeVal.type = val
                  this.getSingerList();
              }
          })
      },
      areaClick(val){
          this.areaList.map(v=>{
              v.select = 0;
              if(v.value == val){
                  v.select =1
                  this.typeVal.area = val
                  this.getSingerList();
              }
          })
      },
      letterClick(val){
          this.letterList.map(v=>{
              v.select = 0;
              if(v.value == val){
                  v.select =1
                  this.typeVal.letter = val
                  this.getSingerList();
              }
          })
      },
      getSingerList(){
          let params = {
              type:this.typeVal.type,
              area:this.typeVal.area,
              initial:this.typeVal.letter,
              offset:0,
              limit:40
          }
          this.$api.getSinger(params).then(res=>{
              console.log(res)
              this.singerList = res.data.artists
              this.more = res.data.more
          })
      },
      addData(){
          let params = {
              type:this.typeVal.type,
              area:this.typeVal.area,
              initial:this.typeVal.letter,
              offset:this.singerList.length,
              limit:20
          }
          this.$api.getSinger(params).then(res=>{
              console.log(res)
              this.singerList.push(...(res.data.artists))
              this.more = res.data.more
          })
      }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    //   添加首字母数组
        for (var i = 65; i <= 90; i++) {
            var obj = {}
            obj.value = String.fromCharCode(i).toLowerCase()
            obj.label = String.fromCharCode(i)
            obj.select = 0
            this.letterList.push(obj)
        }
        this.letterList.unshift(
            {label:"热门",value:"-1",select:1}
        )
        this.letterList.push(
            {label:"#",value:"0",select:0}
        )
        // 初始化请求
        this.getSingerList();
        console.log(this.imgUrl)

        window.addEventListener("scroll", () => {
      // 1.scrollY：返回当前viewport顶部边缘的Y坐标，如果没有viewport，返回的值为0。
      // 2.document.documentElement.clientHeight：以像素为单位的元素的内部高度，包括填充，但不包括水平滚动条高度，边框或边距。
      // 3.document.documentElement.scrollHeight：元素内容的高度，包括由于溢出在屏幕上不可见的内容。
      if(this.tabName!="fourth"){
          return
      }
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
        if (!this.more) {
          return;
        }
        //节流方法，防止用户多次触发
        throttle(this.addData, 1000, this)();
      }
    },
  }
};
</script>
<style lang='scss' scoped>
.singer {
  .hotType {
    font-size: 13px;
    margin-top: 20px;
    margin-bottom: 20px;
    p {
      margin-bottom: 15px;
      display:inline-block;width:100%;word-wrap:break-word;white-space:normal;
    }
    .label{
        display:inline-block;
        margin-bottom: 10px;
    }
    .labelVal {
      margin-right: 10px;
      margin-left: 10px;
      color: #999;
      cursor: pointer;
    }
    .label:nth-of-type(1) {
      margin-left: 10px;
    }
    .labelVal:hover {
      color: #000;
      background-color: #eee;
    }
    .labelVal{
        padding: 5px;
    }
    .select{
        color: #000;
        background-color: #eee;
    }
  }
  .singerContent{
      ul{
          display: flex;
          flex-wrap: wrap;
          li{
              width: 22.5%;
              margin:0 10px 10px 10px;
              img{
                  width: 100%;
                  height: auto;
                  cursor: pointer;
              }
              .singerName{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 5px;
                    font-size: 13px;
                    span{
                        cursor: pointer;
                    }
                }
          }
      }
      
  }
}
</style>