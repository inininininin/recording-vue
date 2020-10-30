// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index.js';
import store from './store/index.js';
import axios from 'axios';
import qs from 'qs';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
if (process.env.NODE_ENV == 'development') require('./mock')
//import (process.env.NODE_ENV == 'development')?'./mock.js':null;
import { Notify, Dialog } from 'vant';
import 'vant/lib/index.css';

Vue.prototype.$version = '1.0.1.4.201030';
Vue.prototype.$versionIntro = '修复了已知BUG, 优化了用户体验.';
Vue.use(Dialog).use(Notify);
Dialog.setDefaultOptions({
  messageAlign:'left'
})
Vue.config.productionTip = false;
Vue.prototype.$store = store;
moment.locale('zh-cn');
Vue.prototype.$moment = moment;
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.use(Viewer);


window.Vue = Vue;
Vue.prototype.window = window;

Vue.prototype.$axios.interceptors.request.use(
  config => {
    debugger;
    Vue.prototype.$store.state.requestingCount++;
    return config;
  },
  error => {
    Vue.prototype.$store.state.requestingCount--;
    return Promise.reject(error.response);
  }
);

Vue.prototype.$axios.interceptors.response.use(
  response => {
    debugger;
    Vue.prototype.$store.state.requestingCount--;
        return response;
  },
  error => {
    Vue.prototype.$store.state.requestingCount--;
    return Promise.reject(error.response);
  }
);

Vue.prototype.$highlight = function (base, kw, data) {
  debugger;
  data = data? data : {};
  var color = data.color? data.color:'#c00000';
  let kws = [];
  let outBase = base;
  if (kw == null || kw == '' || kw == undefined) {
    return outBase;
  }
  if (base == null || base == '' || base == undefined) {
    return outBase;
  }
   if (kw.constructor == String) {
    kws = [kw];
   }

   if (kw.constructor == Array) {
    kws = kw;
   }

   for (let k in kws) {
      if (base.indexOf(kws[k]) >= 0) {
        outBase = outBase.substring(0, outBase.indexOf(kws[k])) + `<span style="color:${color}">${kws[k]}</span>` + outBase.substr(outBase.indexOf(kws[k]) + kws[k].length);
      }
   }
   return outBase;
};

Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, attr) {
    // 聚焦元素
    el.focus();
  }
});

function O(p_value){
  this.value=p_value;

  O.prototype.attr = function(keyChain){
    debugger
    this.last=null;
    if(!this.value || !keyChain){
      return null;
    }
     var keys= keyChain.split('.')
     var value1 = this.value;
     for(var i in keys){
         if(keys[i].indexOf('[')>=0){
            var key=keys[i].substring(0,keys[i].indexOf('['));
            var index = keys[i].substring(keys[i].indexOf('[')+1,keys[i].indexOf(']'));
            value1=value1[key];
            if(value1==null || value1==undefined){
              value1=null;
              break;
            }
            if(value1.length<=index){
                value1=null;
                break;
            }
            value1=value1[index];
         }else {
            value1=value1[keys[i]];
            if(value1==null || value1==undefined){
              value1=null;
              break;
            }
              
         }
     }
     return value1;
  }
}

function o(data){
  return new O(data);
}

Vue.prototype.$O=O
Vue.prototype.$o=o

Vue.prototype.routes=[]

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

