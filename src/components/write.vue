<template>
  <div class="write">
      <mavon-editor ref="editor" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="content"> </mavon-editor>
  </div>
</template>

<script>
import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: 'write',
  components: {mavonEditor},
  data () {
      return {
          content:"",
          img_file:{}
      }
  },
  methods: {
        // 绑定@imgAdd event
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('file', $file);
           console.log($file,formdata.get("file"))
        //    axios({
        //        url: 'server url',
        //        method: 'post',
        //        data: formdata,
        //        headers: { 'Content-Type': 'multipart/form-data' },
        //    }).then((url) => {
        //        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        //        /**
        //        * $vm 指为mavonEditor实例，可以通过如下两种方式获取
        //        * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
        //        * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
        //        */
        //        this.$refs.editor.$img2Url(pos, url);
        //    })
            this.$api.saveImage(formdata).then(res=>{
                console.log(res)
                this.$refs.editor.$img2Url(pos, res);
                // 缓存图片信息
                this.img_file[pos] = $file;
            })

        },
        $imgDel(pos){
            delete this.img_file[pos];
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>