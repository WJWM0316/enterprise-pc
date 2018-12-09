import Vue from 'vue'
import Vuex from 'vuex'

// 公共模块
import common from './modules/common'
// 直播模块
import broadcast from './modules/broadcast'
// 课程模块
import course from './modules/course'
// 控制台模块
import dashboard from './modules/dashboard'
// 通知模块
import notice from './modules/notice'
// 组织模块
import organization from './modules/organization'
// 设置模块
import setting from './modules/setting'
// 统计模块
import statistics from './modules/statistics'
// 系统模块
import system from './modules/system'
// 导师模块
import tutor from './modules/tutor'
// 用户中心模块
import user from './modules/user'
// 职场书模块
import workBook from './modules/workBook'
// 工作圈模块
import workZone from './modules/workZone'
// 权限模块
import auth from './modules/auth'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    common,
    broadcast,
    course,
    dashboard,
    notice,
    organization,
    setting,
    statistics,
    system,
    tutor,
    user,
    workBook,
    workZone,
    auth
  }
})

export default store