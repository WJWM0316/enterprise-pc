import {
  GET_BROADCAST_LIST
} from '../mutation-types'

// import {
//   articleGetArticleListApi,
//   articlePostArticleApi,
//   articleDeleteArticleApi,
//   articlePutArticleApi
// } from 'API/broadcast'

const state = {
  broadcastLists: {}
}

const mutations = {
  [GET_BROADCAST_LIST] (status, data) {
    state.broadcastLists = data
  }
}

const getters = {
  broadcastLists: state => state.broadcastLists
}

const actions = {

  // 获取文章列表
  // articleGetArticleListApi (store, params) {
  //   articleGetArticleListApi(params)
  //     .then(res => {
  //       store.commit(GET_BROADCAST_LIST, res.data.info)
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
