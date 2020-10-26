<!-- 登陆页面 -->
<template>
<div class='zt-login'>
   <div class="zt-container">
      <div class="title">
       <h2>学生管理系统</h2>
      </div>
      <!-- 表单 -->
      <div class="form">
     <el-form ref="form" :rules="rules" :model="form">
     <el-form-item prop="user_name">
        <el-input v-model="form.user_name" placeholder="请输入手机号/邮箱"></el-input>
    </el-form-item>
     <el-form-item prop="login_password" >
        <el-input v-model="form.login_password"  type="password" placeholder="请输入密码"
        show-password></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
          <el-input v-model="form.captcha" placeholder="验证码" style="width:70%"></el-input>
          <div class="identify" @click="refresh">
            <Indenifty  :identifyCode="code" />
          </div>
        </el-form-item>

     <el-form-item >
        <el-button type="primary" @click="gologin('form')">登录</el-button>
    </el-form-item>
     <el-form-item >
        <el-button type="primary" >注册</el-button>
    </el-form-item>
      </el-form>   
      </div>
   </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
 import Indenifty from "./Indenifrty"
 // 引入正则
 import  toolsReg  from "../../tools/Reg"
 // 引入发送请求
 import { isLogin }  from "../../api/Userlist"

  export default {
      components:{
          Indenifty,
      },
    data() {
      // 这里写验证的逻辑
      var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号/邮箱不能为空"));
      } else {
        if (!(toolsReg.regPhone.test(value) || toolsReg.regEmail.test(value))) {
          callback(new Error("手机号/邮箱格式不正确"));
        }
        callback();
      }
    };
      return {
        form: {  // form表单里只定义表单里的类容
          user_name: "",
          login_password: "",
          captcha:'',
        },
          code:"ycdq",
          identifyCode: "1234567890abcdefg",
       rules:{
            user_name: [{ validator: validatePhone, trigger: "blur" }],
          login_password:[{required: true, message: "密码不能为空", trigger: "blur" },
           {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
           }],
           captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        }
      }
    },
    methods: {
      refresh(){
      this.code =''
      this.makecode(this.identifyCode,4);
      },
      randomNum(min,max){
          return Math.floor(Math.random()*( max - min )+min)
      },
      makecode(code,len){
           for(var i=0; i<len; i++){
             this.code+=code[this.randomNum(0, code.length)]
           }
      },
      gologin(formName){
         this.$refs[formName].validate((valid) => {
        if(valid){
             if (this.code !== this.form.captcha) {
            alert("验证码输入错误");
            return;
            }
               } 
             })
        isLogin(this.form).then((res)=>{ 
            if(res.status==200){
              sessionStorage.setItem("mytoken", res.token);
              this.$router.push("/userlist");
            }else if(res.status == 500){
                this.$message({
                 message: '密码错误',
             type: 'error'
        });
            }
        })
      }

    },
 mounted() {
     this.refresh()
 },
  }


</script>
<style lang="scss">
  .zt-login{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color:#409eff;
      .title{
      text-align: center;
    font-size: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 99;
    transform: translate(-50%, -50%);
    margin-top: -220px;
      }
      .form{
      color: gray;
     text-align: center;
    width: 480px;
    height: 360px;
    position: absolute;
    margin: -180px 0 0 -240px;
    left: 50%;
    top: 50%;
    background: #fff;
     .el-input {
    float: left;
     }
    .indenifty{
    width: 25%;
    float: left;
    height: 40px;
    margin-left: 5%;
    }
    .el-button {
     width: 96%;
     margin-left: 1%;
  }
      }
  }

</style>