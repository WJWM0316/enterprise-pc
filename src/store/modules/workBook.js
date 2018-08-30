import {
  GET_WORK_BOOK_LIST
} from '../mutation-types'

// import {
//   articleGetArticleListApi,
//   articlePostArticleApi,
//   articleDeleteArticleApi,
//   articlePutArticleApi
// } from 'API/workBook'

const state = {
  workBookLists: {}
}

const mutations = {
  [GET_WORK_BOOK_LIST] (status, data) {
    state.workBookLists = data
  }
}

const getters = {
  workBookLists: state => state.workBookLists
}

const actions = {

  // 获取文章列表
  // articleGetArticleListApi (store, params) {
  //   articleGetArticleListApi(params)
  //     .then(res => {
  //       store.commit(GET_WORK_BOOK_LIST, res.data.info)
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
