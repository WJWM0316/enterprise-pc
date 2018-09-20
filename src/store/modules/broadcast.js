import {
  GET_LIVE_REVIEW_LIST
} from '../mutation-types'

import {
  postLiveApi,
  putLiveApi,
  getLiveReviewListApi
} from 'API/broadcast'

const state = {
  liveReviewList: {
    list: [],
    total: 50
  }
}

const mutations = {
  [GET_LIVE_REVIEW_LIST] (state, data) {
    console.log(data)
    state.liveReviewList = data
  }
}

const getters = {
  liveReviewList: state => state.liveReviewList
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
   * @detail   获取直播就顾
   * @return   {[type]}          [description]
   */
  getLiveReviewListApi (store, params) {
    return getLiveReviewListApi(params)
      .then(res => {
        store.commit(GET_LIVE_REVIEW_LIST, res.data)
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
