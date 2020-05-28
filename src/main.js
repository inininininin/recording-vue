// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import store from './store/index.js'
import moment from 'moment'
import axios from 'axios'
import qs from 'qs'
import jquery from 'jquery'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer);
Vue.prototype.$version = '20.0522.2141'
Vue.prototype.$versionIntro = '修复了已知BUG, 优化了用户体验.'
Vue.config.productionTip = false
Vue.prototype.$moment = moment;
moment.locale('zh-cn')
Vue.prototype.$store = store
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$ = jquery
window.Vue=Vue;
Vue.prototype.window=window
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
