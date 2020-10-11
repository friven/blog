<template>
  <div class="write">
    <div class="form">
      <el-steps
        class="step"
        :align-center="true"
        :active="active"
        finish-status="success"
      >
        <el-step :title="$t('introduction')"></el-step>
        <el-step :title="$t('content')"></el-step>
        <el-step :title="$t('save')"></el-step>
      </el-steps>
      <el-form label-position="right" :model="artical" label-width="150px">
        <div class="firstStep" v-if="active == 0">
          <el-form-item :label="$t('tit')">
            <el-input
              v-model="artical.title"
              :placeholder="$t('setname')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('label')">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ {{ $t("newtag") }}</el-button
            >
          </el-form-item>

          <el-form-item :label="$t('type')">
            <el-select v-model="artical.type" filterable>
              <el-option :label="$t('original')" :value="0"></el-option>
              <el-option :label="$t('reprinted')" :value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('release')">
            <el-radio v-model="artical.release" :label="1">{{
              $t("public")
            }}</el-radio>
            <el-radio v-model="artical.release" :label="0">{{
              $t("private")
            }}</el-radio>
          </el-form-item>

          <el-form-item :label="$t('codeStyle')">
            <el-select v-model="artical.codeStyle" filterable>
              <el-option v-for="(item,index) in codeStyleList" :key="index" :label="item" :value="index"></el-option>
       
            </el-select>
          </el-form-item>
        </div>

        <el-form-item class="mdform" v-if="active == 1">
          <mavon-editor
            class="markdown"
            ref="editor"
            @change="editChange"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
            :codeStyle="codeStyleList[artical.codeStyle]"
            v-model="artical.content"
          >
          </mavon-editor>
        </el-form-item>

        <div class="finStep" v-if="active == 2">
          <el-form-item :label="$t('bgm')">
            <el-autocomplete
              v-model="musicSearchVal"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>

          <div class="saveGroup">
            <el-button class="saveBtn" type="primary" @click="onSave">保存为草稿</el-button>
            <el-button type="primary" @click="onSubmit">发布</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <div class="activeBtn">
      <el-button
        v-if="active != 0"
        class="last"
        type="primary"
        @click="active--"
        >上一页</el-button
      >
      <el-button
        v-if="active != 2"
        class="next"
        type="primary"
        @click="active++"
        >下一页</el-button
      >
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { getFirstImage } from "../utils/common";
export default {
  name: "write",
  components: { mavonEditor },
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      img_file: {},
      active: 0,
      musicSearchVal: "",
      musicList: [],
      inputValue: "",
      codeStyleList:[
        'agate',
        'androidstudio',
        'arduino-light',
        'arta',
        'ascetic',
        'atelier-cave-dark',
        'atelier-cave-light',
        'atelier-dune-dark',
        'atelier-dune-light',
        'atelier-estuary-dark',
        'atelier-estuary-light',
        'atelier-forest-dark',
        'atelier-forest-light',
        'atelier-heath-dark',
        'atelier-heath-light',
        'atelier-lakeside-dark',
        'atelier-lakeside-light',
        'atelier-plateau-dark',
        'atelier-plateau-light',
        'atelier-savanna-dark',
        'atelier-savanna-light',
        'atelier-seaside-dark',
        'atelier-seaside-light',
        'atelier-sulphurpool-dark',
        'atelier-sulphurpool-light',
        'atom-one-dark',
        'atom-one-light',
        'brown-paper',
        'codepen-embed',
        'color-brewer',
        'darcula',
        'dark',
        'darkula',
        'default',
        'docco',
        'dracula',
        'far',
        'foundation',
        'github-gist',
        'github',
        'googlecode',
        'grayscale',
        'gruvbox-dark',
        'gruvbox-light',
        'hopscotch',
        'hybrid',
        'idea',
        'ir-black',
        'kimbie.dark',
        'kimbie.light',
        'magula',
        'mono-blue',
        'monokai-sublime',
        'monokai',
        'obsidian',
        'ocean',
        'paraiso-dark',
        'paraiso-light',
        'pojoaque',
        'purebasic',
        'qtcreator_dark',
        'qtcreator_light',
        'railscasts',
        'rainbow',
        'routeros',
        'school-book',
        'solarized-dark',
        'solarized-light',
        'sunburst',
        'tomorrow-night-blue',
        'tomorrow-night-bright',
        'tomorrow-night-eighties',
        'tomorrow-night',
        'tomorrow',
        'vs',
        'vs2015',
        'xcode',
        'xt256',
        'zenburn'
      ],
      artical: {
        title: "", //标题
        content: "", //内容
        label: "", //标签
        type: 0, //类型
        release:1, //发布形式
        htmlContent: "",
        mdContent: "",
        textContent: "",
        first_image: "",
        induction: "",
        userid: this.$store.state.userId,
        bgm: "",
        codeStyle:70
      },
    };
  },
  methods: {
    querySearchAsync(queryString, cb) {
      var date = +new Date();
      console.log(date);
      let params = {
        keywords: this.musicSearchVal,
        timestamp: date,
      };

      if (this.musicSearchVal != "") {
        this.$api.searchMusic(params).then((res) => {
          console.log("qqq", res);
          this.musicList = res.data.result.songs.map((item) => {
            item.value = `${item.name}--${item.ar[0].name}`;
            return item;
          });
          cb(this.musicList);
        });
      } else {
        this.$api.getHotSearch().then((res) => {
          console.log("no search", res);
          this.musicList = res.data.result.map((item) => {
            item.value = `${item.name}--${item.song.artists[0].name}`;
            return item;
          });
          cb(this.musicList);
        });
      }
    },
    handleSelect(item) {
      console.log("search val", item);
      console.log(item.id);
      this.$store.commit("setMusic", JSON.stringify(item));
      this.$store.commit("setAudio", true);
      this.artical.bgm = item.id;
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      console.log($file, formdata.get("file"));
      this.$api.saveImage(formdata).then((res) => {
        console.log(res);
        // 缓存图片信息
        this.img_file[pos] = $file;
        this.$refs.editor.$img2Url(pos, res.data.data);
      });
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    onSubmit() {
      //first_image从 htmlContent中拿
      this.artical.first_image = getFirstImage(this.artical.htmlContent);
      // induction从textContent中截取
      if (this.artical.textContent.length > 80) {
        this.artical.induction =
          this.artical.textContent.substring(0, 80) + "...";
      } else {
        this.artical.induction = this.artical.textContent.substring(
          0,
          this.artical.textContent.length
        );
      }

      let params = {
        wordsCount: this.artical.textContent.length,
        subject: this.dynamicTags.join(","),
        mdContent: this.artical.mdContent,
        title: this.artical.title,
        userid: this.artical.userid,
        content: this.artical.textContent,
        htmlContent: this.artical.htmlContent,
        induction: this.artical.induction,
        isOpen: this.artical.release,
        articleType: this.artical.type,
        firstImage: this.artical.first_image,
        bgm:this.artical.bgm
      };

      this.$api.createArtical(params).then((res) => {
        console.log(res);
      });

      console.log(this.musicSearchVal);
    },
    editChange(value, render) {
      var msg = render.replace(/<\/?[^>]*>/g, ""); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容,执行替换成空字符
      msg = msg.replace(/[ | ]*\n/g, "\n"); //去除行尾空白
      msg = msg.replace(/ /gi, ""); //去掉
      this.artical.htmlContent = render;
      this.artical.mdContent = value;
      this.artical.textContent = msg;
    },
    onSave(){

    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.write {
  display: flex;
  height: calc(100vh - 100px);
  width: 100%;
  margin-top: 100px;
  .form {
    width: 66%;
    height: 100%;
    margin: auto;
    .step {
      margin-bottom: 50px;
    }
    .firstStep {
      width: 60%;
      margin-left: 12%;
    }
    .finStep {
      width:40%;
      margin-left: 30%;
      .saveGroup{
        display: flex;
        justify-content: center;
        margin-right: 10px;
      }
    }
    
    .mdform {
      /deep/ .el-form-item__content {
        margin-left: 0 !important;
      }
      .markdown {
        height: calc(100vh - 230px);
      }
    }
  }
  .activeBtn {
    position: fixed;
    right: 20px;
    bottom: 20px;
    .next {
      display: block;
      margin: auto;
      margin-top: 10px;
    }
  }
  
}

.songul {
  width: 500px;
  height: 300px;
  overflow: auto;
  .rowArea {
    li {
      display: flex;
      justify-content: space-between;
    }
  }
}

.songul::-webkit-scrollbar {
  display: none;
}

.el-tag {
  margin-right: 10px;
}

.button-new-tag {
  margin-right: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-right: 10px;
  vertical-align: bottom;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.el-select-dropdown__item {
  padding-left: 20px;
}
</style>