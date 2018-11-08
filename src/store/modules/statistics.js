import {
  GET_USER_RELATIVE_STATISTICS_LISTS,
  GET_DEPARMENT_RELATIVE_STATISTICS_LISTS,
  GET_WORK_ZONE_STATISTICS_LISTS
} from '../mutation-types'

import {
  getUserRelativeStatisticsListApi,
  getDeparmentRelativeStatisticsListApi,
  getWorkZoneStatisticsListApi
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
  }
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
  }
}

const getters = {
  userRelativeStatisticsList: state => state.userRelativeStatisticsList,
  deparmentRelativeStatisticsList: state => state.deparmentRelativeStatisticsList,
  workZoneStatisticsList: state => state.workZoneStatisticsList,
  workZoneStatisticsTotalNum: state => state.workZoneStatisticsTotalNum
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
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
