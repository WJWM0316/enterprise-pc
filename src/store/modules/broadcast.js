import {
  GET_BROADCAST_CATEGORY_LIST
} from '../mutation-types'

import {
  postLiveApi,
  putLiveApi,
  getCategoryListsApi
} from 'API/broadcast'

const state = {
  broadcastCategoryLists: {}
}

const mutations = {
  [GET_BROADCAST_CATEGORY_LIST] (status, data) {
    state.broadcastCategoryLists = data
  }
}

const getters = {
  broadcastCategoryLists: state => state.broadcastCategoryLists
}

const actions = {

  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   新增直播
   * @return   {[type]}          [description]
   */
  postLiveApi (store, params) {
    return postLiveApi(params)
      .then(res => {
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   编辑直播
   * @return   {[type]}          [description]
   */
  putLiveApi (store, params) {
    return putLiveApi(params)
      .then(res => {
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
   /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   获取分类
   * @return   {[type]}          [description]
   */
  getCategoryListsApi (store, params) {
    return getCategoryListsApi(params)
      .then(res => {
        store.commit(GET_BROADCAST_CATEGORY_LIST, res.data.data)
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
