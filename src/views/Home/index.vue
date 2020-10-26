<!-- 主页 -->
<template>
<div class='home'>
    <el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">
    <el-row class="tac">
    <el-col :span="24">
    <el-menu
     default-active="/userlist"
      class="el-menu-vertical-demo"
      :unique-opened=true
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
       :router="true">
        <el-submenu 
        v-for="meunListData in meunListDatas"
        :key="meunListData.id"
        :index="meunListData.path">
               <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{meunListData.title}}</span>
              </template>
             <el-menu-item
                v-for="meunList in meunListData.child"
                :key="meunList.id"
                :index="meunList.path"
              >
                <i class="el-icon-menu"></i>
                <span slot="title">{{meunList.title}}</span>
              </el-menu-item>
        </el-submenu>
    </el-menu>
  </el-col>
 </el-row>
    </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    meunListDatas: [
        {
          id: 1,
          title: "用户管理",
          path: "userlist",
          child: [
            {
              id: 1001,
              title: "用户列表",
              path: "userlist",

            },
          ],
        },
        {
          id: 2,
          title: "产品管理",
          path: "productlist",
          child: [
            {
              id: 2001,
              title: "产品列表",
              path: "productlist",
            },
            {
              id: 2002,
              title: "添加产品",
              path: "productadd",
            },
            {
              id: 2003,
              title: "修改产品",
              path: "productedit",
            },
          ],
        },
      ],
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},

}
</script>
<style lang="scss">
   .home{
       position: absolute;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       height: 100%;
    
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
   .el-container{
       height: 100%;
   }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    height: 100%;
    text-align: center;
    line-height: 200px;
  }
  .el-main {

    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
   .el-menu {
    border-right: 0;
  }
   }


</style>