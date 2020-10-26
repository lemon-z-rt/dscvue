<!--  -->
<template>
<div class='usertable'>
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/userlist' }">用户列表</el-breadcrumb-item>
  <el-breadcrumb-item>产品列表</el-breadcrumb-item>
  <el-breadcrumb-item>添加产品</el-breadcrumb-item>
  <el-breadcrumb-item>修改产品</el-breadcrumb-item>
   </el-breadcrumb>
    <el-row :gutter="20" >
      <el-col :span="6">
        <el-input placeholder="请输入关键字" v-model="keywords"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="searchlist(1,5)">搜索</el-button>
      </el-col>
    </el-row>
    <el-table
    :data="userListDatas.data"
    border
    fit:true
    style="width: 100%">
    <el-table-column
      prop="user_name"
      label="姓名"
      width="180">
    </el-table-column>
     <el-table-column
      prop="phone"
      label="手机号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
     <el-table-column
      width="210"
      label="操作">
       <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
          <el-button type="info" size="small" @click=" editUser(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="dele(scope.row)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>

  
 <!-- 修改弹出层 -->
    <el-dialog title="修改用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editDatas" :label-width="formLabelWidth" ref="editDatas"
      :rules="editrules">
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="editDatas.user_name" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editDatas.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="editDatas.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editDatas.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click="editSubmitForm('editDatas')">确 定</el-button>
      </div>
    </el-dialog>
   
    <!-- 分页组件 -->
    <el-pagination
      background
      :total="userListDatas.total"
      :page-size="userListDatas.size"
      :current-page="userListDatas.num"
      @current-change="CurrentChange"
      layout="total, prev, pager, next,jumper"
    ></el-pagination>  
</div>
</template>

<script>
import Axios from 'axios';
import toolsReg from "@/tools/Reg.js"
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
 data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号/邮箱不能为空"));
      } else {
        if (!(toolsReg.regPhone.test(value) || toolsReg.regEmail.test(value))) {
          callback(new Error("手机号/邮箱格式不正确"));
        }
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不能为空"));
      } else {
        if (!toolsReg.regPhone.test(value)) {
          callback(new Error("手机号格式不正确"));
        }
        callback();
      }
    };
      return {
       formLabelWidth: "120px",
       editDialogFormVisible: false,
       keywords:'',
       editDatas: {
        user_name: "",
        phone: "",
        age: "",
        address: "",
      },
        editrules: {
        user_name: [{ validator: validateUsername, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
      },
      }
    },
    //监听属性 类似于data概念
computed: {
   userListDatas() {
      return this.$store.state.userListDatas;
    },
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
     handleClick(row) {
      console.log(row);
    },
    getUserList(page, size) {
      this.$store.dispatch("getUserList", { page: page, size: size });
    },
   CurrentChange(page) {
      this.$store.dispatch("getUserList", { page: page, size: 5 });
    },
    editUser(row) {
      console.log(row);
      this.editDialogFormVisible = true;
      this.editDatas = row;
    },
    // 修改方法
  editSubmitForm(formName){
       this.$refs[formName].validate((vaild)=>{
           if(vaild){
          Axios.post("/users/edituser",JSON.stringify(this.editDatas)).then(res=>{
               if(res.status==200){
                  this.$message({
                  message: "修改成功",
                  type: "success",
                });
        this.editDialogFormVisible = false;
               }
             })
           }
       })
      this.editDialogFormVisible = false
    },
  //搜索方法
  searchlist(page,size){
     this.$store.dispatch("getSearchList", {
        page: page,
        size: size,
        keywords: this.keywords,
      });
  },
  // 删除方法
  dele(row){
      Axios.get(`/users/deleuser?user_id=${row.user_id}`).then(res=>{
         if(res.status == 200){
            this.$message({
                  message: "删除成功",
                  type: "success",
                });
        this.getUserList(1, 5);  
         }
      })
  }

},
mounted() {
      this.getUserList(1, 5);
},
}
</script>
<style lang="scss">
  .usertable{
  .el-breadcrumb {
  margin-bottom: 20px;
}
.el-row{
  height: 30px;
  line-height: 30px;
}
.el-table {
  margin-top: 20px;
}
.has-gutter{
  height: 50px;
  line-height: 50px;
}
.el-pagination {
  margin-top: 20px;
}
    
  }
</style>