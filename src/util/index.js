/**
 * vue实例扩展函数库
 */
import Vue from 'vue'
import util from './util'
Vue.prototype.$util = util
Vue.prototype.setPathQuery = util.setPathQuery
Vue.prototype.transformBlank = util.transformBlank
Vue.prototype.zikeDefaultPageSize = 20

