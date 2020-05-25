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
    path: '/login',
    name: '/login',
    component: _import( 'login')
  },
  {
    path: '/',
    redirect:'/index'
  },
  {
    path: '/index',
    name: '/index',
    component: _import("index")
  },
 
]

const router = new Router({
  routes
})

router.afterEach((to,from) =>{
  debugger

})


export default router