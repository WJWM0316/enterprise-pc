import {
  GET_SYSTEM_LIST
} from '../mutation-types'

// import {
//   articleGetArticleListApi,
//   articlePostArticleApi,
//   articleDeleteArticleApi,
//   articlePutArticleApi
// } from 'API/system'

const state = {
  systemLists: {}
}

const mutations = {
  [GET_SYSTEM_LIST] (status, data) {
    state.systemLists = data
  }
}

const getters = {
  systemLists: state => state.systemLists
}

const actions = {

  // 获取文章列表
  // articleGetArticleListApi (store, params) {
  //   articleGetArticleListApi(params)
  //     .then(res => {
  //       store.commit(GET_SYSTEM_LIST, res.data.info)
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
