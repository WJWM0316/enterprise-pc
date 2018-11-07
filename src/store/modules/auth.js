/**
 * @Author   小书包
 * @DateTime 2018-09-10
 * @detail   权限模块
 */
import axios from 'axios'

import {
  saveAccessToken,
  removeAccessToken,
  getAccessToken,
  getUserInfo,
  saveUserInfo
} from '@/store/cacheService'

import {
  LOGIN,
  LOGOUT
} from '../mutation-types'

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
  /**
   * @Author   小书包
   * @DateTime 2018-11-01
   * @detail   获取登陆信息
   * @return   {[type]}         [description]
   */
  loginApi(store, params) {
    return axios.post(`${process.env.VUE_APP__TOKEN_URL}/${params.code}/auth/token`, {sso_token: params['Authorization-Sso']})
                .then(res => {
                  store.commit(LOGIN, res.data.data)
                  return res
                })
                .catch(error => {
                  return Promise.reject(error.data || {})
                })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-11-01
   * @detail   用户退出
   * @return   {[type]}         [description]
   */
  logoutApi(store, params) {
    return axios.post(`${process.env.VUE_APP__LOGIN_OUT_URL}`)
                .then(() => {
                  removeAccessToken()
                  store.commit(LOGOUT)
                  window.location.href = process.env.VUE_APP__LOGIN_URL
                  return res
                })
                .catch(error => {
                  return Promise.reject(error.data || {})
                })
    // return axios.get(`${process.env.VUE_APP__TOKEN_URL}/${params.code}/auth/logout`)
    //             .then(res => {
    //                 removeAccessToken()
    //                 store.commit(LOGOUT)
    //                 window.location.href = process.env.VUE_APP__LOGIN_URL
    //                axios.post(`${process.env.VUE_APP__LOGIN_OUT_URL}`)
    //                     .then(() => {
    //                       removeAccessToken()
    //                       store.commit(LOGOUT)
    //                       window.location.href = process.env.VUE_APP__LOGIN_URL
    //                       return res
    //                     })
    //             })
    //             .catch(error => {
    //               return Promise.reject(error.data || {})
    //             })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
