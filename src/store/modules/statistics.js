import {
  GET_STATISTICS_LIST
} from '../mutation-types'

// import {
//   articleGetArticleListApi,
//   articlePostArticleApi,
//   articleDeleteArticleApi,
//   articlePutArticleApi
// } from 'API/statistics'

const state = {
  statisticsLists: {}
}

const mutations = {
  [GET_STATISTICS_LIST] (status, data) {
    state.statisticsLists = data
  }
}

const getters = {
  statisticsLists: state => state.statisticsLists
}

const actions = {

  // 获取文章列表
  // articleGetArticleListApi (store, params) {
  //   articleGetArticleListApi(params)
  //     .then(res => {
  //       store.commit(GET_STATISTICS_LIST, res.data.info)
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
