import {
  GET_ORGANIZATION_LIST
} from '../mutation-types'

// import {
//   articleGetArticleListApi,
//   articlePostArticleApi,
//   articleDeleteArticleApi,
//   articlePutArticleApi
// } from 'API/organization'

const state = {
  organizationLists: {}
}

const mutations = {
  [GET_ORGANIZATION_LIST] (status, data) {
    state.organizationLists = data
  }
}

const getters = {
  organizationLists: state => state.organizationLists
}

const actions = {

  // 获取文章列表
  // articleGetArticleListApi (store, params) {
  //   articleGetArticleListApi(params)
  //     .then(res => {
  //       store.commit(GET_ORGANIZATION_LIST, res.data.info)
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
