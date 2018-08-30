import {
  GET_TUTOR_LIST
} from '../mutation-types'

// import {
//   articleGetArticleListApi,
//   articlePostArticleApi,
//   articleDeleteArticleApi,
//   articlePutArticleApi
// } from 'API/tutor'

const state = {
  tutorLists: {}
}

const mutations = {
  [GET_TUTOR_LIST] (status, data) {
    state.tutorLists = data
  }
}

const getters = {
  tutorLists: state => state.tutorLists
}

const actions = {

  // 获取文章列表
  // articleGetArticleListApi (store, params) {
  //   articleGetArticleListApi(params)
  //     .then(res => {
  //       store.commit(GET_TUTOR_LIST, res.data.info)
  //       return res
  //     })
  //     .catch(error => {
  //       return error
  //     })
  // }
}

export default {
  state,
  mutations,
  getters,
  actions
}
