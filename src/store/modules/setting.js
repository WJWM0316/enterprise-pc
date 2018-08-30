import {
  GET_SETTING_LIST
} from '../mutation-types'

// import {
//   articleGetArticleListApi,
//   articlePostArticleApi,
//   articleDeleteArticleApi,
//   articlePutArticleApi
// } from 'API/setting'

const state = {
  settingLists: {}
}

const mutations = {
  [GET_SETTING_LIST] (status, data) {
    state.settingLists = data
  }
}

const getters = {
  settingLists: state => state.settingLists
}

const actions = {

  // 获取文章列表
  // articleGetArticleListApi (store, params) {
  //   articleGetArticleListApi(params)
  //     .then(res => {
  //       store.commit(GET_SETTING_LIST, res.data.info)
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
