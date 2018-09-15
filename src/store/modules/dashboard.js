import {
  GET_USERS_LISTS
} from '../mutation-types'

import {
  getUserListsApi
} from 'API/dashboard'

const state = {
  dashboardUserLists: {}
}

const mutations = {
  [GET_USERS_LISTS] (status, data) {
    state.dashboardUserLists = data
  }
}

const getters = {
  dashboardUserLists: state => state.dashboardUserLists
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
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
