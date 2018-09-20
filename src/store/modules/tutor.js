import {
  GET_TUTOR_LIST
} from '../mutation-types'

import {
  getTutorListApi
} from 'API/tutor'

const state = {
  tutorLists: {}
}

const mutations = {
  [GET_TUTOR_LIST] (status, data) {
    data.map(field => {
      field.selfGroup = []
      field.group.map(val => {
        field.selfGroup.push(val.groupId)
      })
    })
    state.tutorLists = data
  }
}

const getters = {
  tutorLists: state => state.tutorLists
}

const actions = {

  // 获取导师列表
  getTutorListApi (store, params) {
    return getTutorListApi(params)
      .then(res => {
        store.commit(GET_TUTOR_LIST, res.data.data)
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
