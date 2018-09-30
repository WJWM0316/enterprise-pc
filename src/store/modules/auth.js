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

import { saveAccessToken, removeAccessToken, getAccessToken, getUserInfo, saveUserInfo } from '@/store/cacheService'

const state = {
  userInfos: getUserInfo() || null,
  token: getAccessToken(),
  loginValidTime: 60 * 60 * 24 * 7 * 1000
}

const mutations = {
  [LOGIN] (state, data) {
    saveAccessToken(data.token, state.loginValidTime)
    saveUserInfo(data, state.loginValidTime)
    state.userInfos = data
    state.token = data.token
  },
  [LOGOUT] (state) {
    state.userInfos = null
    state.token = null
  }
}

const getters = {
  userInfos: state => state.userInfos,
  token: state => state.token
}

const actions = {
  loginApi(store, data) {
    return loginApi(data)
      .then(res => {
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
