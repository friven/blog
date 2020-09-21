<template>
  <div class="index">
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6">
          <div class="">
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
      return {
          username:""
      }
  },
  methods: {
    
  },
  mounted () {
    console.log(this.$store.state.userName)
  }
}
</script>

<style scoped>
  
</style>
