import {
  GET_USERS_LISTS,
  GET_DESKINFOS,
  GET_VERSION_INFOS
} from '../mutation-types'

import {
  getUserListsApi,
  getDesktopInfosApi,
  getVersionInfoApi
} from 'API/dashboard'

const state = {
  dashboardUserLists: {},
  desktopInfos: {},
  versionInfo: {},
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
    name: '',
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
    },
    created: {
      courseCount: 0,
      jobCircleCount: 0,
      liveCount: 0,
      staffCount: 0,
      storageSpaceCount: '0G'
    },
    isOfficial: true,
    name: 'XPLUS试用版',
    remainDay: 1,
    tip: ''
  }
}

const mutations = {
  [GET_USERS_LISTS] (state, data) {
    state.dashboardUserLists = data
  },
  [GET_VERSION_INFOS] (state, data) {
    state.versionInfo = data
  },
  [GET_DESKINFOS] (state, data) {
    state.desktopInfos = data
    if(data.studyInfo) {
      state.desktopStudyInfo = data.studyInfo
    }
    if(data.newestCourseInfo) {
      state.desktopNewestCourseInfo = data.newestCourseInfo
    }
    if(data.newestLiveInfo) {
      state.desktopNewestLiveInfo = data.newestLiveInfo
    }
    if(data.verInfo) {
      state.desktopVerInfo = data.verInfo
    }
  }
}

const getters = {
  dashboardUserLists: state => state.dashboardUserLists,
  desktopInfos: state => state.desktopInfos,
  desktopStudyInfo: state => state.desktopStudyInfo,
  desktopNewestCourseInfo: state => state.desktopNewestCourseInfo,
  desktopNewestLiveInfo: state => state.desktopNewestLiveInfo,
  desktopVerInfo: state => state.desktopVerInfo,
  versionInfo: state => state.versionInfo
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
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-15
   * @detail   获取获取工作台信息
   * @return   {[type]}          [description]
   */
  getVersionInfoApi (store, params) {
    return getVersionInfoApi(params)
      .then(res => {
        store.commit(GET_VERSION_INFOS, res.data.data)
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
