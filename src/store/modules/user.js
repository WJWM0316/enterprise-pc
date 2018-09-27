import {
  GET_PERSONAL_INFO_LESSONS,
  GET_PERSONAL_INFO_STUDY,
  GET_PERSONAL_INFO_LIVES,
  GET_PERSONAL_INFO_BASE,
  GET_PERSONAL_INFO_JOB_CIRCLES
} from '../mutation-types'

import {
  getPersonalInfoLessonsApi,
  getPersonalInfoStudyApi,
  getPersonalInfoBaseApi,
  getPersonalInfoLivesApi,
  getPersonalInfoJobCirclesApi
} from 'API/user'

const state = {
  userLists: {},
  personalInfoLessons: {},
  personalInfoStudy: {},
  personalInfoBase: {
    email: null,
    groupName: null,
    mobile: null,
    occupation: null,
    realname: null,
    uid: null,
    wechat: null,
    listItemCounts: {
      jobcircleCount: 0,
      lessonCount: 0,
      liveCount: 0
    },
    avatar: {
      smallUrl: ''
    }
  },
  personalInfoLives: {},
  personalInfoJobCircles: {}
}

const mutations = {
  [GET_PERSONAL_INFO_LESSONS] (state, data) {
    data.map(field => {
      if(!field.courseLessons) {
        field.selfProcess = 0
      } else {
        field.selfProcess = (field.courseFinished / field.courseLessons) * 100
      }
    })
    state.personalInfoLessons = data
  },
  [GET_PERSONAL_INFO_STUDY] (state, data) {
    state.personalInfoStudy = data
  },
  [GET_PERSONAL_INFO_LIVES] (state, data) {
    state.personalInfoLives = data
  },
  [GET_PERSONAL_INFO_BASE] (state, data) {
    state.personalInfoBase = data
  },
  [GET_PERSONAL_INFO_JOB_CIRCLES] (state, data) {
    state.personalInfoJobCircles = data
  }
}

const getters = {
  userLists: state => state.userLists,
  personalInfoLessons: state => state.personalInfoLessons,
  personalInfoStudy: state => state.personalInfoStudy,
  personalInfoBase: state => state.personalInfoBase,
  personalInfoLives: state => state.personalInfoLives,
  personalInfoJobCircles: state => state.personalInfoJobCircles
}

const actions = {

  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   新增直播
   * @return   {[type]}          [description]
   */
  getPersonalInfoLessonsApi (store, params) {
    return getPersonalInfoLessonsApi(params)
      .then(res => {
        store.commit(GET_PERSONAL_INFO_LESSONS, res.data.data)
        return res
      })
      .catch(error => {
        return error
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   新增直播
   * @return   {[type]}          [description]
   */
  getPersonalInfoStudyApi (store, params) {
    return getPersonalInfoStudyApi(params)
      .then(res => {
        store.commit(GET_PERSONAL_INFO_STUDY, res.data.data)
        return res
      })
      .catch(error => {
        return error
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   新增直播
   * @return   {[type]}          [description]
   */
  getPersonalInfoBaseApi (store, params) {
    return getPersonalInfoBaseApi(params)
      .then(res => {
        store.commit(GET_PERSONAL_INFO_BASE, res.data.data)
        return res
      })
      .catch(error => {
        return error
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   新增直播
   * @return   {[type]}          [description]
   */
  getPersonalInfoLivesApi (store, params) {
    return getPersonalInfoLivesApi(params)
      .then(res => {
        store.commit(GET_PERSONAL_INFO_LIVES, res.data.info)
        return res
      })
      .catch(error => {
        return error
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   新增直播
   * @return   {[type]}          [description]
   */
  getPersonalInfoJobCirclesApi (store, params) {
    return getPersonalInfoJobCirclesApi(params)
      .then(res => {
        store.commit(getPersonalInfoJobCirclesApi, res.data.info)
        return res
      })
      .catch(error => {
        return error
      })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
