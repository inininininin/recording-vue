import Vue from 'vue';
import Router from 'vue-router';

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
    path: '/choose-fu-ze-ren',
    name: '/choose-fu-ze-ren',
    component: _import('choose-fu-ze-ren')
  },
  {
    path: '/choose-fa-qi-ren',
    name: '/choose-fa-qi-ren',
    component: _import('choose-fa-qi-ren')
  }
];

const router = new Router({
  routes
});

router.afterEach((to, from) => {
  debugger;
  if (to.path == from.path) {
    router.replace({path: '/redirect', query: {fullPath: to.fullPath}});
  }
});

export default router;
