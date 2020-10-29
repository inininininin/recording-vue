// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index.js';
import store from './store/index.js';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import jquery from 'jquery';
import _ from 'lodash';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
//if (process.env.NODE_ENV == 'development') require('./mock')
import (process.env.NODE_ENV == 'development')?'./mock.js':null;
import { Notify, Dialog } from 'vant';
import 'vant/lib/index.css';

Vue.use(Dialog).use(Notify);
Dialog.setDefaultOptions({
  messageAlign:'left'
})
Vue.prototype.$version = '1.0.2009011821';
Vue.prototype.$versionIntro = '修复了已知BUG, 优化了用户体验.';
Vue.config.productionTip = false;
Vue.prototype.$store = store;
moment.locale('zh-cn');
Vue.prototype.$moment = moment;
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$ = jquery;
Vue.prototype._ = _;
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

Vue.prototype.$attr = function (obj, keyChain) {
  debugger
    if(!obj || !keyChain)
      return null;
     var keys= keyChain.split('.')
     var obj1 = obj;
     for(var i in keys){
         if(keys[i].indexOf('[')>=0){
            var key=keys[i].substring(0,keys[i].indexOf('['));
            var index = keys[i].substring(keys[i].indexOf('[')+1,keys[i].indexOf(']'));
            obj1=obj1[key];
            if(obj1==null || obj1==undefined)
                return null
            if(obj1.length<=index)
                return null
            obj1=obj1[index];
         }else {
            obj1=obj1[keys[i]];
            if(obj1==null || obj1==undefined)
                return null
         }
     }
     return obj1;
};

Vue.prototype.$highlight = function (text, kw, data) {
  debugger;
  data = data? data : {};
  var color = data.color? data.color:'#c00000';
  let kwList = [];
  let textOut = text;
  if (kw == null || kw == '' || kw == undefined) {
    return textOut;
  }
  if (text == null || text == '' || text == undefined) {
    return textOut;
  }
   if (kw.constructor == String) {
    kwList = [kw];
   }

   if (kw.constructor == Array) {
    kwList = kw;
   }

   for (let k in kwList) {
      if (text.indexOf(kwList[k]) >= 0) {
        textOut = textOut.substring(0, textOut.indexOf(kwList[k])) + `<span style="color:${color}">${kwList[k]}</span>` + textOut.substr(textOut.indexOf(kwList[k]) + kwList[k].length);
      }
   }
   return textOut;
};

Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, attr) {
    // 聚焦元素
  if (attr.value) {
    el.focus();
    }
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

