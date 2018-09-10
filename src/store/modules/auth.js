/**
 * @Author   小书包
 * @DateTime 2018-09-10
 * @detail   权限模块
 */
import {
  LOGIN,
  LOGOUT
} from '../mutation-types'

import {
  loginApi,
  logoutApi
} from 'API/auth'

import { saveAccessToken, removeAccessToken } from '@/store/cacheService'

const state = {
  userInfos: {}
}

const mutations = {
  [LOGIN] (status, data) {
    state.userInfos = data
  },
  [LOGOUT] (status, data) {
    state.userInfos = {}
  }
}

const getters = {
  userInfos: state => state.userInfos
}

const actions = {
  loginApi(store, data) {
    return loginApi(data)
      .then(res => {
        // 有效期一天周
        const ValidityPeriod = 60 * 60 * 24 * 7 * 1000
        saveAccessToken(res.data.data.token, ValidityPeriod)
        store.commit(LOGIN, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  logoutApi(store) {
    return logoutApi()
      .then(res => {
        removeAccessToken()
        store.commit(LOGOUT)
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
