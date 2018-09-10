import Vue from 'vue'

import App from './App.vue'

import store from './store'

import router from './router'

import './eleui/index.js'

// 引入vue实例扩展函数库
import './util'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#zike-backend')
