import {
  GET_TUTOR_LIST,
  GET_TUTOR_OUTER_LIST
} from '../mutation-types'

import {
  getTutorListApi
} from 'API/tutor'

const state = {
  tutorLists: {},
  tutorOuterLists: {}
}

const mutations = {
  [GET_TUTOR_LIST] (state, data) {
    data.map(field => {
      if(field.group) {
        field.selfGroup = []
        field.group.map(val => {
          field.selfGroup.push(val.groupId)
        })
      }
    })
    state.tutorLists = data
  },
  [GET_TUTOR_OUTER_LIST] (state, data) {
    state.tutorOuterLists = data
  }
}

const getters = {
  tutorLists: state => state.tutorLists,
  tutorOuterLists: state => state.tutorOuterLists
}

const actions = {

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取内部导师列表
   * @return   {[type]}          [description]
   */
  getTutorListApi (store, params) {
    return getTutorListApi(params)
      .then(res => {
        store.commit(GET_TUTOR_LIST, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取外部导师列表
   * @return   {[type]}          [description]
   */
  getTutorOuterListApi (store, params) {
    return getTutorListApi({...params, type: 2})
      .then(res => {
        store.commit(GET_TUTOR_OUTER_LIST, res.data.data)
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
