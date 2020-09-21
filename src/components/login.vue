<template>
  <div class="login">
    <el-card class="box-card">
      <div class="tabName">
        <p :class=" tabIndex==0 ? 'checkBtn' : 'notBtn'" @click="loginClick">{{$t("login")}}</p>
        <p class="dianBtn">·</p>
        <p :class=" tabIndex==1 ? 'checkBtn' : 'notBtn' " @click="registerClick">{{$t("register")}}</p>
      </div>

      <div class="content" v-show="tabIndex==0">
        <el-form :model="login" status-icon :rules="loginrules" ref="login" class="demo-ruleForm">
          <el-form-item prop="luserName">
            <el-input
              class="contentInput"
              :placeholder="$t('loginName')"
              prefix-icon="el-icon-s-custom"
              v-model="login.luserName"
            ></el-input>
          </el-form-item>
          <el-form-item prop="lpassWord">
            <el-input
              class="contentInput"
              show-password
              :placeholder="$t('password')"
              prefix-icon="el-icon-lock"
              v-model="login.lpassWord"
            ></el-input>
          </el-form-item>
          <el-button
            class="loginConfirm"
            type="primary"
            round
            @click="loginForm('login')"
          >{{$t("login")}}</el-button>
        </el-form>
      </div>

      <div class="content" v-show="tabIndex==1">
        <el-form
          :model="register"
          status-icon
          :rules="registerules"
          ref="register"
          class="demo-ruleForm"
        >
          <el-form-item prop="raliasName">
            <el-input
              class="contentInput"
              :placeholder="$t('username')"
              prefix-icon="el-icon-user"
              v-model="register.raliasName"
            ></el-input>
          </el-form-item>
          <el-form-item prop="ruserName">
            <el-input
              class="contentInput"
              :placeholder="$t('loginName')"
              prefix-icon="el-icon-s-custom"
              v-model="register.ruserName"
            ></el-input>
          </el-form-item>
          <el-form-item prop="rpassWord">
            <el-input
              class="contentInput"
              show-password
              :placeholder="$t('settingpwd')"
              prefix-icon="el-icon-lock"
              v-model="register.rpassWord"
            ></el-input>
          </el-form-item>
          <el-form-item prop="codeValue">
            <el-col :span="13">
              <el-input
                class="codeInput"
                prefix-icon="el-icon-warning-outline"
                :placeholder="$t('verificationcode')"
                v-model="register.codeValue"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-image
                style="width: 90px; height: 40px"
                class="codeImage"
                :src="imageSrc"
                @click="refreshCode"
                fit="fill"
              ></el-image>
            </el-col>
          </el-form-item>
          <el-button class="loginConfirm" type="success" round @click="registerForm('register')">注册</el-button>
        </el-form>

        <p class="agreement">{{$t('agreement')}}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var luserNameRule = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      callback();
    };

    var lpassWordRule = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.login.lpassWord !== "") {
          this.$refs.login.validateField("checkPass");
        }
        callback();
      }
    };

    var raliasNameRule = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      callback();
    };
    var ruserNameRule = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      callback();
    };

    var codeValueRule = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      callback();
    };

    var rpassWordRule = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.register.rpassWord !== "") {
          this.$refs.register.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      tabIndex: 0,
      login: {
        luserName: "",
        lpassWord: "",
      },
      register: {
        raliasName: "",
        ruserName: "",
        rpassWord: "",
        codeValue: "",
      },
      imageSrc: "",
      resCodeVal: "",
      loginrules: {
        luserName: [{ validator: luserNameRule, trigger: "blur" }],
        lpassWord: [{ validator: lpassWordRule, trigger: "blur" }],
      },
      registerules: {
        raliasName: [{ validator: raliasNameRule, trigger: "blur" }],
        ruserName: [{ validator: ruserNameRule, trigger: "blur" }],
        rpassWord: [{ validator: rpassWordRule, trigger: "blur" }],
        codeValue: [{ validator: codeValueRule, trigger: "blur" }],
      },
    };
  },
  methods: {
    //注意v-if删除dom时获取不到
    loginClick() {
      this.tabIndex = 0;
      this.$refs.register.clearValidate();
      this.$refs.register.resetFields();
    },
    registerClick() {
      this.tabIndex = 1;
      this.$refs.login.clearValidate();
      this.$refs.login.resetFields();

      this.$api.getCodeImage().then((res) => {
        // 执行某些操作
        console.log(res);
        let image = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        this.imageSrc = "data:image/png;base64," + image;
        console.log(this.imageSrc);

        this.$api.getCodeValue().then((res) => {
          this.resCodeVal = res.data;
        });
      });
    },
    loginForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.$api);
          let params = {
              username: this.login.luserName,
              password: this.login.lpassWord,
              grant_type: "password",
              scope: "all",
            }

          this.$api.login(params).then(res1=>{
            localStorage.setItem("token", res1.data.access_token);
            this.$store.commit("set_token",res1.data.access_token)
            this.$api.getUserInfo().then((res) => {
              console.log(res);
              localStorage.setItem("userName", res.data.data.name);
            });

            this.$router.replace("index");
            
          })


        } else {
          return false;
        }
      });
    },
    refreshCode() {
      this.$api.getCodeImage().then((res) => {
        // 执行某些操作
        console.log(res);
        let image = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        this.imageSrc = "data:image/png;base64," + image;
        console.log(this.imageSrc);

        this.$api.getCodeValue().then((res) => {
          this.resCodeVal = res.data;
        });
      });
    },
    registerForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit!");
          if (
            this.register.codeValue.toLowerCase() ==
            this.resCodeVal.toLowerCase()
          ) {
            console.log("aaaa");
            let params = {
              name: this.register.raliasName,
              loginName: this.register.ruserName,
              password: this.register.rpassWord,
            };
            console.log(params);
            this.$api.register(params).then((res) => {
              console.log(res);
              this.tabIndex = 0;
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.login {
  width:100%;
  height: 100%;

  .box-card {
    width: 300px;
    height: 470px;
    margin: auto;  
    margin-top: 50px;
    opacity: 0.7;
  }
  
  .tabName {
    display: flex;
    justify-content: center;
    p {
      padding: 10px 20px;
      font-weight: 700;
      color: #969696;
    }

    .notBtn:hover {
      border-bottom: 2px solid #ea6f5a;
      cursor: pointer;
    }

    .checkBtn {
      padding: 10px 20px;
      font-weight: 700;
      color: #ea6f5a;
      border-bottom: 2px solid #ea6f5a;
    }
  }

  .content {
    padding: 20px;
    .codeImage {
      margin-left: 10px;
    }
    .codeInput {
      width: 120px;
    }
    .loginConfirm {
      width: 100%;
    }
    .agreement {
      margin: 10px 0;
      padding: 0;
      text-align: center;
      font-size: 12px;
      line-height: 20px;
      color: #969696;
    }
  }
}
</style>

