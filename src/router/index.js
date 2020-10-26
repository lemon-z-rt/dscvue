import Vue from 'vue'
import VueRouter from 'vue-router'
import Login  from "../views/Login/login"

Vue.use(VueRouter)

const routes = [
  {
    path: '/home', 
    name: 'Home',
    component:()=>import('../views/Home/index'),
    children:[
      {
        path:"/userlist",
        name:"userlist",
      component:()=> import('../views/Home/user/userlist')},
      {
        path:"/productlist",
        name:"productlist",
      component:()=> import('../views/product/productlist')},
      {
        path:"/productadd",
        name:"productlist",
      component:()=> import('../views/product/productadd')},
      {
        path:"/productedit",
        name:"productlist",
      component:()=> import('../views/product/productedit')},
    ],
    redirect: {
      path: "/userlist"
    }
  },
  
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由守卫
router.beforeEach((to,from,next)=>{
   if(to.path == '/login') next();
   // 获取token
   const mytoken = window.sessionStorage.getItem("mytoken")

   if(!mytoken) {return next("/login") }
   next();

})

export default router
