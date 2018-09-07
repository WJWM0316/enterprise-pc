import {
  LOGIN
} from '../mutation-types'

import {
  login
} from 'API/auth'

import { saveAccessToken } from '@/store/cacheService'

const state = {
  userInfos: {}
}

const mutations = {
  [LOGIN] (status, data) {
    state.userInfos = data
  }
}

const getters = {
  userInfos: state => state.userInfos
}

const actions = {
  loginApi(store, data) {
    return login(data)
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
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
