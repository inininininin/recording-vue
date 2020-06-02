// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
Vue.prototype.$version = '20.0522.2141'
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


Vue.prototype.$attr=function(obj,keyChain){
  debugger
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

Vue.directive('focus', {
	// 当被绑定的元素插入到 DOM 中时……
	inserted: function(el, attr) {
		// 聚焦元素
		if (attr.value)
			el.focus()
  },
  update: function(el, attr) {
		// 聚焦元素
		if (attr.value)
			el.focus()
	}
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
