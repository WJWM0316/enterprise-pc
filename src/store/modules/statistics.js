import {
  GET_USER_RELATIVE_STATISTICS_LISTS,
  GET_DEPARMENT_RELATIVE_STATISTICS_LISTS,
  GET_WORK_ZONE_STATISTICS_LISTS,
  GET_COURSE_SOURSE_STATISTICS_LISTS,
  GET_COURSE_TYPE_STATISTICS_LISTS,
  GET_COURSE_STUDY_STATISTICS_LISTS,
  GET_LIVE_DISTRBUTION_STATISTICS_LISTS,
  GET_LIVE_CATE_DISTRBUTION_STATISTICS_LISTS,
  GET_LIVE_STATISTICS_LISTS,
  GET_LIVE_AND_COURSE_STATISTICS_LISTS,
  GET_DEPARTMENT_SOURSE_STATISTICS_LISTS,
  GET_TUTOR_TYPE_STATISTICS_LISTS
} from '../mutation-types'

import {
  getUserRelativeStatisticsListApi,
  getDeparmentRelativeStatisticsListApi,
  getWorkZoneStatisticsListApi,
  getCourseSourseStatisticsListApi,
  getCourseTypeStatisticsListApi,
  getCourseStudyStatisticsListApi,
  getLiveDistributionStatisticsListApi,
  getLiveCateDistributionStatisticsListApi,
  getLiveStatisticsListApi,
  getLiveAndCourseStatisticsListApi,
  getDepartmentSourseStatisticsListApi,
  getTutorTypeStatisticsListApi
} from 'API/statistics'

const state = {
  userRelativeStatisticsList: {
    totalStudyPeople: 0,
    list: []
  },
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
  courseStudyStatisticsList: {
    list: [],
    currentOnlineCourse: 0
  },
  liveDistributionStatisticsList: {},
  liveCateDistributionStatisticsList: {},
  liveStatisticsList: {
    currentOnlineLive: 0,
    list: []
  },
  liveAndCourseStatisticsList: {},
  departmentSourseStatisticsList: {},
  tutorTypeStatisticsList: {}
}

const mutations = {
  [GET_USER_RELATIVE_STATISTICS_LISTS] (state, data) {
    if(data.totalStudyPeople > 0) {
      state.userRelativeStatisticsList.totalStudyPeople = data.totalStudyPeople
    }
    if(data.list.length) {
      state.userRelativeStatisticsList.list = data.list
    }
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
    if(data.currentOnlineCourse > 0) {
      state.courseTypeStatisticsList.currentOnlineCourse = data.currentOnlineCourse
    }
    if(data.list.length) {
      state.courseTypeStatisticsList.list = data.list
    }
  },
  [GET_COURSE_STUDY_STATISTICS_LISTS] (state, data) {
    if(data.currentOnlineCourse > 0) {
      state.courseStudyStatisticsList.currentOnlineCourse = data.currentOnlineCourse
    }
    if(data.list.length) {
      state.courseStudyStatisticsList.list = data.list
    }
  },
  [GET_LIVE_DISTRBUTION_STATISTICS_LISTS] (state, data) {
    state.liveDistributionStatisticsList = data
  },
  [GET_LIVE_CATE_DISTRBUTION_STATISTICS_LISTS] (state, data) {
    state.liveCateDistributionStatisticsList = data
  },
  [GET_LIVE_STATISTICS_LISTS] (state, data) {
    if(data.currentOnlineLive > 0) {
      state.liveStatisticsList.currentOnlineLive = data.currentOnlineLive
    }
    if(data.list.length) {
      state.liveStatisticsList.list = data.list
    }
  },
  [GET_LIVE_AND_COURSE_STATISTICS_LISTS] (state, data) {
    state.liveAndCourseStatisticsList = data
  },
  [GET_DEPARTMENT_SOURSE_STATISTICS_LISTS] (state, data) {
    state.departmentSourseStatisticsList = data
  },
  [GET_TUTOR_TYPE_STATISTICS_LISTS] (state, data) {
    state.tutorTypeStatisticsList = data
  }
}

const getters = {
  userRelativeStatisticsList: state => state.userRelativeStatisticsList,
  deparmentRelativeStatisticsList: state => state.deparmentRelativeStatisticsList,
  workZoneStatisticsList: state => state.workZoneStatisticsList,
  workZoneStatisticsTotalNum: state => state.workZoneStatisticsTotalNum,
  courseSourseStatisticsList: state => state.courseSourseStatisticsList,
  courseTypeStatisticsList: state => state.courseTypeStatisticsList,
  courseStudyStatisticsList: state => state.courseStudyStatisticsList,
  liveDistributionStatisticsList: state => state.liveDistributionStatisticsList,
  liveCateDistributionStatisticsList: state => state.liveCateDistributionStatisticsList,
  liveStatisticsList: state => state.liveStatisticsList,
  liveAndCourseStatisticsList: state => state.liveAndCourseStatisticsList,
  departmentSourseStatisticsList: state => state.departmentSourseStatisticsList,
  tutorTypeStatisticsList: state => state.tutorTypeStatisticsList
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
        store.commit(GET_COURSE_STUDY_STATISTICS_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取直播来源分布
   * @return   {[type]}          [description]
   */
  getLiveDistributionStatisticsListApi (store, params) {
    return getLiveDistributionStatisticsListApi(params)
      .then(res => {
        store.commit(GET_LIVE_DISTRBUTION_STATISTICS_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取直播来源分布
   * @return   {[type]}          [description]
   */
  getLiveCateDistributionStatisticsListApi (store, params) {
    return getLiveCateDistributionStatisticsListApi(params)
      .then(res => {
        store.commit(GET_LIVE_CATE_DISTRBUTION_STATISTICS_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取直播来源分布
   * @return   {[type]}          [description]
   */
  getLiveStatisticsListApi (store, params) {
    return getLiveStatisticsListApi(params)
      .then(res => {
        store.commit(GET_LIVE_STATISTICS_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取直播和课程数的统计
   * @return   {[type]}          [description]
   */
  getLiveAndCourseStatisticsListApi (store, params) {
    return getLiveAndCourseStatisticsListApi(params)
      .then(res => {
        store.commit(GET_LIVE_AND_COURSE_STATISTICS_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取部门导师分布
   * @return   {[type]}          [description]
   */
  getDepartmentSourseStatisticsListApi (store, params) {
    return getDepartmentSourseStatisticsListApi(params)
      .then(res => {
        store.commit(GET_DEPARTMENT_SOURSE_STATISTICS_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取内外部导师比例
   * @return   {[type]}          [description]
   */
  getTutorTypeStatisticsListApi (store, params) {
    return getTutorTypeStatisticsListApi(params)
      .then(res => {
        store.commit(GET_TUTOR_TYPE_STATISTICS_LISTS, res.data.data)
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
