import {
  GET_USER_RELATIVE_STATISTICS_LISTS,
  GET_DEPARMENT_RELATIVE_STATISTICS_LISTS,
  GET_WORK_ZONE_STATISTICS_LISTS,
  GET_COURSE_SOURSE_STATISTICS_LISTS,
  GET_COURSE_TYPE_STATISTICS_LISTS,
  GET_COURSE_STUDY_STATISTICS_LISTS
} from '../mutation-types'

import {
  getUserRelativeStatisticsListApi,
  getDeparmentRelativeStatisticsListApi,
  getWorkZoneStatisticsListApi,
  getCourseSourseStatisticsListApi,
  getCourseTypeStatisticsListApi,
  getCourseStudyStatisticsListApi
} from 'API/statistics'

const state = {
  userRelativeStatisticsList: {},
  deparmentRelativeStatisticsList: {},
  workZoneStatisticsList: {},
  workZoneStatisticsTotalNum: {
    file: 0,
    picture: 0,
    post: 0,
    urls: 0,
    vedios: 0,
    count: 0
  },
  courseSourseStatisticsList: {},
  courseTypeStatisticsList: {},
  courseStudyStatisticsList: {}
}

const mutations = {
  [GET_USER_RELATIVE_STATISTICS_LISTS] (state, data) {
    state.userRelativeStatisticsList = data
  },
  [GET_DEPARMENT_RELATIVE_STATISTICS_LISTS] (state, data) {
    state.deparmentRelativeStatisticsList = data
  },
  [GET_WORK_ZONE_STATISTICS_LISTS] (state, data) {
    state.workZoneStatisticsList = data.list
    state.workZoneStatisticsTotalNum = data.total
  },
  [GET_COURSE_SOURSE_STATISTICS_LISTS] (state, data) {
    state.courseSourseStatisticsList = data
  },
  [GET_COURSE_TYPE_STATISTICS_LISTS] (state, data) {
    state.courseTypeStatisticsList = data
  },
  [GET_COURSE_STUDY_STATISTICS_LISTS] (state, data) {
    state.courseStudyStatisticsList = data
  }
}

const getters = {
  userRelativeStatisticsList: state => state.userRelativeStatisticsList,
  deparmentRelativeStatisticsList: state => state.deparmentRelativeStatisticsList,
  workZoneStatisticsList: state => state.workZoneStatisticsList,
  workZoneStatisticsTotalNum: state => state.workZoneStatisticsTotalNum,
  courseSourseStatisticsList: state => state.courseSourseStatisticsList,
  courseTypeStatisticsList: state => state.courseTypeStatisticsList,
  courseStudyStatisticsList: state => state.courseStudyStatisticsList
}

const actions = {

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取用户相关统计
   * @return   {[type]}          [description]
   */
  getUserRelativeStatisticsListApi (store, params) {
    return getUserRelativeStatisticsListApi(params)
      .then(res => {
        store.commit(GET_USER_RELATIVE_STATISTICS_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取用户相关统计
   * @return   {[type]}          [description]
   */
  getDeparmentRelativeStatisticsListApi (store, params) {
    return getDeparmentRelativeStatisticsListApi(params)
      .then(res => {
        store.commit(GET_DEPARMENT_RELATIVE_STATISTICS_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取工作圈统计
   * @return   {[type]}          [description]
   */
  getWorkZoneStatisticsListApi (store, params) {
    return getWorkZoneStatisticsListApi(params)
      .then(res => {
        store.commit(GET_WORK_ZONE_STATISTICS_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取课程来源分布
   * @return   {[type]}          [description]
   */
  getCourseSourseStatisticsListApi (store, params) {
    return getCourseSourseStatisticsListApi(params)
      .then(res => {
        store.commit(GET_COURSE_SOURSE_STATISTICS_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取课程类型分布
   * @return   {[type]}          [description]
   */
  getCourseTypeStatisticsListApi (store, params) {
    return getCourseTypeStatisticsListApi(params)
      .then(res => {
        store.commit(GET_COURSE_TYPE_STATISTICS_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取课程类型分布
   * @return   {[type]}          [description]
   */
  getCourseStudyStatisticsListApi (store, params) {
    return getCourseStudyStatisticsListApi(params)
      .then(res => {
        store.commit(GET_COURSE_TYPE_STATISTICS_LISTS, res.data.data)
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
