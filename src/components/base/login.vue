<template>
  <div class="login">
    <div class="form">
      <van-cell-group>
  
        <van-field
          v-model="phone"
           clearable
          label="手机号"
          placeholder="请输入手机号"
          error-message=""
        />

        <van-field class=""
         v-model="password"
         clearable
         type="password" 
         label="密码"
         placeholder="请输入密码"
         />

        <van-field
          v-model="code"
          center
          clearable
          label="手机登录"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button
              v-bind:disabled="flag"
              size="small"
              type="primary"
              @click="getCode"
              >{{ textsms }}</van-button
            >
          </template>
        </van-field>
      </van-cell-group>

      <div class="item">
        <div class="submit" @click="submit">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
import { userLogin} from "../../api/login";
import { getCaptcha } from "../../api/base";

export default {
  data() {
    return {
      phone: "",
      password:"",
      code:"",
      userid:"",
      textsms: "获取验证码",
      flag: false,
      countdown: 60,
      timer: "",
    };
  },
  methods: {
    getCode() {

      // 1.验证手机号
      let reg =
        /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (!reg.test(this.phone)) {
        Notify({ type: "warning", message: "请输入正确手机号码" });
        return;
      }

      // 请求验证码接口
      getCaptcha({ phone: this.phone }).then((data) => {
        if (data.data) {
          Notify({ type: "success", message: "验证码发送成功" });

          //验证码倒计时
          if (!this.flag) {
            this.flag = true;
            this.timer = window.setInterval(() => {
              this.textsms = this.countdown + "秒重新获取";
              this.countdown -= 1;
              if (this.countdown == -1) {
                window.clearInterval(this.timer);
                this.flag = false;
                this.countdown = 60;
                this.textsms = "获取验证码";
              }
            }, 1000);
          }
        } else {
          Notify({ type: "danger", message: "验证码发送失败" });
        }
      });
    },
    submit() {
      // 1.验证手机号
      let regt =
        /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (!regt.test(this.phone)) {
        Notify({ type: "warning", message: "请输入正确手机号码" });
        return;
      }

      // let reg = /^[0-9]{4}$/;
      // if (!reg.test(this.code)) {
      //   Notify({ type: "warning", message: "请输入正确验证码" });
      //   return;
      // } 


      userLogin({
        phone: this.phone,
        password: this.password,
        captcha:this.code
      })
        .then((data) => {
          this.userid = data.account.id;
          if (data.code == 200) {
            Notify({ type: "success", message: "登录成功" });

             
            
            window.localStorage.setItem("login", "true");
            window.localStorage.setItem("userid", this.userid);

            // 必须登录才能使用
            if (window.localStorage.getItem("guidePage")) {
              this.$router.push("/recommend");
            } else {
              this.$router.push("/guidePage");
            }
            
          } else {
            Notify({ type: "danger", message: "登录失败" });
          }
        })
        .catch(function () {
          Notify({ type: "danger", message: "登录失败" });
        });
    },
  },
  // 清除定时器
  beforeDestroy(){
    window.clearInterval(this.timer);
  }
};
</script>

<style lang="less" >
.login {
  // background-color: #e97068;
  background-image: url(../../assets/images/guidePage/登录页.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  height: 100%;
  color: rgb(105, 105, 105);
  position: absolute;
  .form {
    width: 80%;
    margin: 76% auto;
    // background: #fff;
    padding: 5px 0;
    border-radius: 12px;
    overflow: hidden;
    .van-cell-group{
       background: rgb(241,83,82);
       position: static;
       .mima{
         display: initial;
       }
       .van-cell--center{
         
         .van-field__label{
         color: #fff;
       }

       }
       &::after{
         display: flow-root;
       }
      

    }
    .van-cell{
      background: rgb(241,83,82);
      color: #fff !important;
      // display: inline;
      // border-bottom: 1px solid #ccc;
      input{
        color: #fff;
      }
      .van-cell__title{
        color: #fff;
      }
    }
    .item {
      width: 90%;
      height: 30px;
      line-height: 30px;
      margin: 0 auto;
      border-radius: 30px;
      margin-bottom: 12px;
      margin: 10px auto;
      .submit {
        font-size: 15px;
        background-color: rgb(199,0,23);
        text-align: center;
        color: #ffffff;
        border-radius: 15px;
      }
    }
  }
}
</style>