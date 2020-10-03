// 配置路由相关的信息
import VueRouter from 'vue-router'
import Vue from 'vue'
 
import login from '../components/login'
import register from '../components/register'
import index from '../components/index'
import headTit from '../components/headTit'
import write from '../components/write'
// 1.通过Vue.use(插件), 安装插件
Vue.use(VueRouter)
 
// 2.创建VueRouter对象
const routes = [
  {
    path:'/',
    component:headTit,
      // redirect重定向
    redirect: '/index',
    name:"headTit",
    children:[
      {
        path: '/index',
        component: index,
        name:"index",
      },
      {
        path: '/login',
        component: login,
        name:"login",
      },
      {
        path: '/register',
        component: register,
        name:"register",
      },
      {
        path: '/write',
        component: write,
        name:"write",
      },
    ]
  },
  
]
const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  routes,
  linkActiveClass: 'active'
})
 
// 3.将router对象传入到Vue实例
export default router