<!--  -->
<template>
<div class='addgoods'>
    <h2>增加商品</h2>
   <el-form :model="addForm" status-icon :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="姓名" prop="user_name">
 <el-input v-model.number="addForm.user_name"></el-input>
  </el-form-item>  
  <el-form-item label="密码" prop="login_password">
    <el-input type="password" v-model="addForm.login_password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="phone">
    <el-input v-model.number="addForm.phone"></el-input>
  </el-form-item>
   <el-form-item label="地址" prop="address">
    <el-input v-model.number="addForm.address"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('addForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
 import isReg  from "@/tools/Reg.js"
 import { addUserList } from "@/api/Userlist.js"
 
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
   var validatePhone =(rule,value,callback) =>{
       if(!value){
           return  callback(new Error('手机号不能为空'))
       }else{
           if(!isReg.regPhone.test(value)){
             return  callback(new Error('手机号格式有误'))
           }
            callback();
       }
     
   }
return {
   addForm:{
     user_name:'',
     phone:"",
     login_password:'',
     address:'',
   },
   rules:{
        user_name: [
            { required: true, message:"密码不能为空" ,trigger: 'blur' }
          ],
        login_password:[{required: true, message: "密码不能为空", trigger: "blur" },
           {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
           }],
           phone: [
            { validator:validatePhone, trigger: 'blur' }
          ],
   }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          addUserList(this. addForm).then(res=>{
              console.log(res.data);
              if(res.data.status == 500){
                   this.$message({
                  message: "该手机号已注册!",
                  type: "error",
                });
              }else if(res.data.status == 200){
                   this.$message({
                  message: "注册成功",
                  type: "success",
                });
                this.$router.push("/userlist")
              }
          })
          } else {
            
            return false;
          }
        });
      },
},

}
</script>
<style>

</style>