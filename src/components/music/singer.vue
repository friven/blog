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

        </div>

    </div>
  </div>
</template>

<script>
export default {
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
      offset:1,
      total:1,
    };
  },
  methods: {
      typeClick(val){
          this.typeList.map(v=>{
              v.select = 0;
              if(v.value == val){
                  v.select =1
                  this.typeVa.type = val
                  this.getSingerList();
              }
          })
      },
      areaClick(val){
          this.areaList.map(v=>{
              v.select = 0;
              if(v.value == val){
                  v.select =1
                  this.typeVa.area = val
                  this.getSingerList();
              }
          })
      },
      letterClick(val){
          this.letterList.map(v=>{
              v.select = 0;
              if(v.value == val){
                  v.select =1
                  this.typeVa.letter = val
                  this.getSingerList();
              }
          })
      },
      getSingerList(){
          let params = {
              type:this.typeVal.type,
              area:this.typeVal.area,
              initial:this.typeVal.letter
          }
          this.$api.getSinger(params).then(res=>{
              console.log(res)
              this.singerList = res.data.artists
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
  },
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
}
</style>