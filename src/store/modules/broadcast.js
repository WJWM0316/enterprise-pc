import {
  GET_LIVE_REVIEW_LIST,
  GET_LIVE_MENBER_LIST,
  GET_LIVE_INVISIBLE_LIST,
  GET_LIVE_DETAILS
} from '../mutation-types'

import {
  postLiveApi,
  putLiveApi,
  getLiveReviewListApi,
  getLiveDetailApi,
  getLiveMenberListApi,
  getLiveInvisibleMenberListApi
} from 'API/broadcast'

const state = {
  liveReviewList: {
    list: [],
    total: 50
  },
  liveDetails: {}
}

const mutations = {
  [GET_LIVE_REVIEW_LIST] (state, data) {
    state.liveReviewList.list = data.data
  },
  [GET_LIVE_DETAILS] (state, data) {
    state.liveDetails = data
  },
  [GET_LIVE_INVISIBLE_LIST] (state, data) {
    state.liveReviewList.list = data.data
  },
  [GET_LIVE_MENBER_LIST] (state, data) {
    state.liveReviewList.list = data.data
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
   * @detail   获取直播回顾
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
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   获取直播详情
   * @return   {[type]}          [description]
   */
  getLiveDetailApi (store, params) {
    return getLiveDetailApi(params)
      .then(res => {
        store.commit(GET_LIVE_REVIEW_LIST, res.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   获取必修学员列表
   * @return   {[type]}          [description]
   */
  getLiveMenberListApi (store, params) {
    return getLiveMenberListApi(params)
      .then(res => {
        store.commit(GET_LIVE_REVIEW_LIST, res.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   获取不可见学员列表
   * @return   {[type]}          [description]
   */
  getLiveInvisibleMenberListApi (store, params) {
    return getLiveInvisibleMenberListApi(params)
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
