import Vue from 'vue/dist/vue.runtime.esm.js';
import Router from 'vue-router';
import store from '../store';

Vue.use(Router);
// const _import = require('./_import_' + process.env.NODE_ENV + '.js')
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./_import_' + process.env.NODE_ENV + '.js');

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: '/index',
    component: _import('index')
  },
  {
    path: '/login',
    name: '/login',
    component: _import('login')
  },
  {
    path: '/register',
    name: '/register',
    component: _import('register')
  },
  {
    path: '/forget-password',
    name: '/forget-password',
    component: _import('forget-password')
  },
  {
    path: '/create-task',
    name: '/create-task',
    component: _import('create-task')
  },
  {
    path: '/task',
    name: '/task',
    component: _import('task')
  },
  {
    path: '/tasks',
    name: '/tasks',
    component: _import('tasks')
  },
  {
    path: '/memory',
    name: '/memory',
    component: _import('memory')
  },
  {
    path: '/memory-book',
    name: '/memory-book',
    component: _import('memory-book')
  },
  {
    path: '/friends',
    name: '/friends',
    component: _import('friends')
  },
  {
    path: '/me',
    name: '/me',
    component: _import('me')
  },
  {
    path: '/redirect',
    name: '/redirect',
    component: _import('redirect')
  }, 
  {
    path: '*',
    name: 'not-found',
    component: _import('not-found')
  }
];

const router = new Router({
  routes
});

router.beforeEach((to, from,next) => {
  debugger;
  store.state.requestingCount++
  next()
});

router.afterEach((to, from) => {
  debugger;
  store.state.requestingCount--
  if(window.history.length==1){
    store.state.routes=[];
    store.state.routes.push(from.path)
    store.state.routes.push(to.path)
  }else{
    store.state.routes.push(to.path)
  }
  if (to.path == from.path) {
    router.replace({path: '/redirect', query: {fullPath: to.fullPath}});
  }
});

export default router;
