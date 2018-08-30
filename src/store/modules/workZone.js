import {
  GET_WORK_ZONE_LIST
} from '../mutation-types'

// import {
//   articleGetArticleListApi,
//   articlePostArticleApi,
//   articleDeleteArticleApi,
//   articlePutArticleApi
// } from 'API/workZone'

const state = {
  workZoneLists: {}
}

const mutations = {
  [GET_WORK_ZONE_LIST] (status, data) {
    state.workZoneLists = data
  }
}

const getters = {
  workZoneLists: state => state.workZoneLists
}

const actions = {

  // 获取文章列表
  // articleGetArticleListApi (store, params) {
  //   articleGetArticleListApi(params)
  //     .then(res => {
  //       store.commit(GET_WORK_ZONE_LIST, res.data.info)
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
