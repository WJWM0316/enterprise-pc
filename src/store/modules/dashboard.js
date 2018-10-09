import {
  GET_USERS_LISTS,
  GET_DESKINFOS
} from '../mutation-types'

import {
  getUserListsApi,
  getDesktopInfosApi
} from 'API/dashboard'

const state = {
  dashboardUserLists: {},
  desktopInfos: {},
  desktopStudyInfo: {
    onlineCourseCount: 0,
    onlineJobCircleCount: 0,
    onlineLiveCount: 0,
    yesterdayStudyPersonCount: 0,
    yesterdayStudyTimeCount: 0
  },
  desktopNewestCourseInfo: {
    coverImg: '',
    peopleCount: 0,
    sessionCardCount: 0,
    title: ''
  },
  desktopNewestLiveInfo: {
    liveName: '',
    status: 3,
    peopleCount: 0,
    cover: {
      smallUrl: ''
    },
    expectedStartTime: ''
  },
  desktopVerInfo: {
    enable: {
      courseCount: 0,
      jobCircleCount: 0,
      liveCount: 0,
      staffCount: 0,
      storageSpaceCount: '0G'
    }
  }
}

const mutations = {
  [GET_USERS_LISTS] (state, data) {
    state.dashboardUserLists = data
  },
  [GET_DESKINFOS] (state, data) {
    state.desktopInfos = data
    state.desktopStudyInfo = data.studyInfo
    state.desktopNewestCourseInfo = data.newestCourseInfo
    state.desktopNewestLiveInfo = data.newestLiveInfo,
    state.desktopVerInfo = data.verInfo
  }
}

const getters = {
  dashboardUserLists: state => state.dashboardUserLists,
  desktopInfos: state => state.desktopInfos,
  desktopStudyInfo: state => state.desktopStudyInfo,
  desktopNewestCourseInfo: state => state.desktopNewestCourseInfo,
  desktopNewestLiveInfo: state => state.desktopNewestLiveInfo,
  desktopVerInfo: state => state.desktopVerInfo
}

const actions = {

  /**
   * @Author   小书包
   * @DateTime 2018-09-15
   * @detail   获取获取首页用户列表
   * @return   {[type]}          [description]
   */
  getUserListsApi (store, params) {
    return getUserListsApi(params)
      .then(res => {
        store.commit(GET_USERS_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-15
   * @detail   获取获取工作台信息
   * @return   {[type]}          [description]
   */
  getDesktopInfosApi (store, params) {
    return getDesktopInfosApi(params)
      .then(res => {
        store.commit(GET_DESKINFOS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
