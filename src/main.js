// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
Vue.prototype.$version = '20.0707.1917'
Vue.prototype.$versionIntro = '修复了已知BUG, 优化了用户体验.'
Vue.config.productionTip = false
import App from './App'
import router from './router/index.js'
import store from './store/index.js'
Vue.prototype.$store = store
import moment from 'moment'
Vue.prototype.$moment = moment;
moment.locale('zh-cn')
import axios from 'axios'
Vue.prototype.$axios = axios
import qs from 'qs'
Vue.prototype.$qs = qs
import jquery from 'jquery'
Vue.prototype.$ = jquery
import _ from 'lodash'
Vue.prototype._ = _
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer);






window.Vue=Vue;
Vue.prototype.window=window


Vue.prototype.$axios.interceptors.request.use(
  config => {
    debugger
    Vue.prototype.$store.state.requestingCount++
    return config;
  },
  error => {
    Vue.prototype.$store.state.requestingCount--
    return Promise.reject(error.response);
  });

  Vue.prototype.$axios.interceptors.response.use(
  response => {
    debugger
    Vue.prototype.$store.state.requestingCount--
        return response;
  },
  error => {
    Vue.prototype.$store.state.requestingCount--
    return Promise.reject(error.response)  
  });


Vue.prototype.$attr=function(obj,keyChain){
    if(!obj || !keyChain)
      return null;
     let keys= keyChain.split('.')
     var obj1 = obj;
     for(var i in keys){
          obj1=obj1[keys[i]];
          if(obj1==null || obj1==undefined)
              return null
     }
     return obj1;
}

Vue.prototype.$kwMark=function(text,kw){
  debugger
  let kwList = [];
  let textOut = text;
  if(kw==null||kw==''||kw==undefined)
    return textOut
  if(text==null||text==''||text==undefined)
    return textOut
 
   if(kw.constructor == String  ){
    kwList=[kw]
   }

   if(kw.constructor ==Array){
    kwList=array
   }

   for(let k in kwList){
      if(text.indexOf(kwList[k])>=0){
        textOut=textOut.substring(0,textOut.indexOf(kwList[k])) + `<span style="color:#c00000">${kwList[k]}</span>`+textOut.substr(textOut.indexOf(kwList[k])+kwList[k].length)
      }
   }
   return textOut;
}

Vue.directive('focus', {
	// 当被绑定的元素插入到 DOM 中时……
	inserted: function(el, attr) {
		// 聚焦元素
		if (attr.value){
      el.focus()
    }
  },

})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
