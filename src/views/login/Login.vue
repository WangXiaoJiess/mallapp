<template>
  <div>
    <img width="100%" src="../../assets/logo.png" alt />
    <van-tabs color="red" v-model="value">
      <van-tab title="登录">
        <div class="login_one">
          <p>账号</p>
          <p>
            <input class="input" type="text" placeholder="请输入登录账号" v-model="username" />
          </p>
          <p>密码</p>
          <p>
            <input class="input" type="password" placeholder="请输入登录密码" v-model="userpass" />
          </p>
          <p>
            <input type="checkbox" name id />记住密码
          </p>
          <div class="button">
            <button class="button_one" @click="login">登录</button>
          </div>
        </div>
        <p class="key">
          <a href>找回密码</a> |
          <span>还没有注册账号？</span>
          <a href="#" @click="ongoto">立即注册</a>
        </p>
        <img width="100%" src="../../assets/login.png" alt />
        <p class="bottom">湘ICP备19027633号</p>
      </van-tab>
      <van-tab title="注册">
        <div class="login_one">
          <p>手机号码</p>
          <p>
            <input class="input" type="text" placeholder="注册手机为找回密码的唯一凭证" v-model="tel" />
          </p>
          <p>登录名</p>
          <p>
            <input class="input" type="text" placeholder="中、英文均可, 不超过12个字符" v-model="name" />
          </p>
          <p>密码</p>
          <p>
            <input class="input" type="password" placeholder="3-18位英文、数字、符号, 区分大小写" v-model="pass" />
          </p>
          <p>短信验证码</p>
          <div class="login_div">
            <input class="input_key" type="text" placeholder="请输入验证码" v-model="code" />
            <button class="button_two" @click="getIphone">发送验证码</button>
          </div>
          <div class="button">
            <button class="button_one" @click="registor">注册</button>
          </div>
        </div>
        <img width="100%" src="../../assets/login.png" alt />
        <p class="bottom">湘ICP备19027633号</p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Notify } from "vant";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import {
  getPhone,
  getLoginName,
  getCode,
  postlogin,
  postLogin,
} from "../../api/api";
import store from "../../store/index";
export default {
  metaInfo: {
    title: "登录",
  },
  data() {
    return {
      value: 0,
      username: "",
      userpass: "",
      tel: "",
      name: "",
      pass: "",
      code: "",
      codetxt: "",
    };
  },
  methods: {
    ...mapMutations({
      setToken: "setToken",
    }),
    ongoto() {
      this.value = 1;
    },
    login() {
      if (this.username == "" && this.userpass == "") {
        Notify({ type: "warning", message: "请把信息填写完整" });
        return;
      } else {
        postLogin({
          LoginName: this.username,
          LoginPassword: this.userpass,
          isPassing: "yes",
        }).then((res) => {
          console.log(res);
          if (res.code == 200) {
            Notify({ type: "success", message: "登录成功" });
            this.setToken(res.tnToken.tokenStr);
            setTimeout(() => {
              this.$router.push({ path: "/home" });
            }, 1000);
          } else {
            Notify({ type: "warning", message: res.msg });
          }
        });
      }
    },
    Tel() {
      return getPhone({ phone: this.tel });
    },
    User() {
      return getLoginName({ LoginName: this.name });
    },
    async getIphone() {
      if (this.tel == "") {
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.tel)) {
        Notify({ type: "warning", message: "该手机号不存在" });
        this.tel = "";
        return;
      }
      let tel = await this.Tel();

      console.log(tel);
      //   console.log(name);
      if (tel.code == 200) {
        getCode({ phone: this.tel, codeType: "0" }).then((res) => {
          console.log(res.msg);
          this.codetxt = res.msg;
        });
      }

      if (tel.code == 204) {
        Notify({ type: "warning", message: "该手机号已经被注册" });
      }
    },
    async registor() {
      if (this.name == "" && this.pass == "" && this.code == "") {
        Notify({ type: "warning", message: "请把信息填写完整" });
        return;
      }
      let name = await this.User();
      if (name.code == 200) {
        Notify({ type: "danger", message: "用户已存在" });
        return;
      }
      if (this.code == this.codetxt) {
        postlogin({
          LoginName: this.name,
          LoginPassword: this.pass,
          phone: this.tel,
        })
          .then((res) => {
            // console.log(res);
            setTimeout(() => {
              this.value = 0;
              this.name = this.username;
              this.pass = this.userpass;
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom {
  text-align: center;
  font-size: 14px;
}
.key {
  text-align: center;
}
.login_one {
  width: 80%;
  margin: 0 auto;
}
.input {
  width: 100%;
  padding: 20px 0px;
  margin: 30px 0px;
}
input {
  border-radius: 10px;
  border: 1px solid gray;
}
p {
  color: rgb(118, 118, 118);
}
.button {
  width: 100%;
  margin: 50px auto;
}
.button_one {
  width: 80%;
  height: 80px;
  margin: 0px 10%;
  border: none;
  color: white;
  background-color: #409eff;
  border-radius: 10px;
}
.button_two {
  width: 40%;
  height: 80px;
  border: none;
  color: white;
  background-color: #409eff;
  border-radius: 10px;
}
.input_key {
  margin: 0px 50px 0px 0px;
  padding: 20px 0px;
}
.login_div {
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
}
</style>