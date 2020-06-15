import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// const _import = require('./_import_' + process.env.NODE_ENV + '.js')
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require("./_import_" + process.env.NODE_ENV+ '.js');
console.log(process.env.NODE_ENV)

console.dir(_import)


const routes = [
 
  {
    path: '/',
    redirect:'/index'
  },
  {
    path: '/index',
    name: '/index',
    component: _import("index")
  },
  {
    path: '/login',
    name: '/login',
    component: _import( 'login')
  },
  {
    path: '/register',
    name: '/register',
    component: _import( 'register')
  },
  {
    path: '/create-task',
    name: '/create-task',
    component: _import( 'create-task')
  },
  {
    path: '/retrieve-password',
    name: '/retrieve-password',
    component: _import( 'retrieve-password')
  },
  {
    path: '/task',
    name: '/task',
    component: _import( 'task')
  },
  {
    path: '/friend-list',
    name: '/friend-list',
    component: _import( 'friend-list')
  },
  {
    path: '/me',
    name: '/me',
    component: _import( 'me')
  },
  {
    path: '/jump',
    name: '/jump',
    component: _import( 'jump')
  },
  {
    path: '/choose-fuzeren',
    name: '/choose-fuzeren',
    component: _import( 'choose-fuzeren')
  },
  {
    path: '/choose-faburen',
    name: '/choose-faburen',
    component: _import( 'choose-faburen')
  },
]

const router = new Router({
  routes
})

router.afterEach((to,from) =>{
  debugger
  if(to.path==from.path){
    router.replace({path:'/jump',query:{fullPath:to.fullPath}})
  }
})


export default router