import {
  GET_USER_RELATIVE_STATISTICS_LISTS
} from '../mutation-types'

import {
  getUserRelativeStatisticsListApi
} from 'API/statistics'

const state = {
  userRelativeStatisticsList: {}
}

const mutations = {
  [GET_USER_RELATIVE_STATISTICS_LISTS] (state, data) {
    state.userRelativeStatisticsList = data
  }
}

const getters = {
  userRelativeStatisticsList: state => state.userRelativeStatisticsList
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
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
