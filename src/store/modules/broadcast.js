import {
  GET_LIVE_REVIEW_LIST,
  GET_LIVE_MENBER_LIST,
  GET_LIVE_INVISIBLE_LIST,
  GET_LIVE_DETAILS,
  GET_LIVE_LIST,
  GET_LIVE_PROBLEM_LIST
} from '../mutation-types'

import {
  postLiveApi,
  putLiveApi,
  getLiveReviewListApi,
  getLiveDetailApi,
  getLiveMenberListApi,
  getLiveInvisibleMenberListApi,
  getLiveListApi,
  updateLiveApi,
  getLiveProblemListApi,
  recoverLiveProblemCommentApi,
  deleteLiveProblemCommentApi
} from 'API/broadcast'

const state = {
  liveReviewList: {
    list: [],
    total: 0,
    page: 1
  },
  liveDetails: {},
  liveLists: {
    list: [],
    total: 0,
    page: 1
  },
  liveProblemList: {
    list: [],
    total: 0,
    page: 1
  },
  liveMenberList: {}
}

const mutations = {
  [GET_LIVE_REVIEW_LIST] (state, data) {
    state.liveReviewList.list = data.data
    state.liveReviewList.total = data.meta.total
  },
  [GET_LIVE_DETAILS] (state, data) {
    state.liveDetails = data
  },
  [GET_LIVE_INVISIBLE_LIST] (state, data) {
    state.liveReviewList.list = data.data
  },
  [GET_LIVE_REVIEW_LIST] (state, data) {
    state.liveReviewList.list = data.data
  },
  [GET_LIVE_MENBER_LIST] (state, data) {
    state.liveMenberList.list = data.data
  },
  [GET_LIVE_LIST] (state, data) {
    state.liveLists.list = data.data
    state.liveLists.total = data.meta.total
  },
  [GET_LIVE_PROBLEM_LIST] (state, data) {
    data.data.map(field => {
      field.replyContent = field.answerInfo.content
      field.replyMan = field.answerInfo.realname
      field.replyType = field.answerInfo.type
      field.askContent = field.problemInfo.content
      field.askMan = field.problemInfo.realname
      field.askType = field.problemInfo.type
    })
    state.liveProblemList.list = data.data
    state.liveProblemList.total = data.meta.total
  }
}

const getters = {
  liveReviewList: state => state.liveReviewList,
  liveLists: state => state.liveLists,
  liveDetails: state => state.liveDetails,
  liveProblemList: state => state.liveProblemList
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
        store.commit(GET_LIVE_DETAILS, res.data.data)
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
        store.commit(GET_LIVE_MENBER_LIST, res.data)
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
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   获取直播列表
   * @return   {[type]}          [description]
   */
  getLiveListApi (store, params) {
    return getLiveListApi(params)
      .then(res => {
        store.commit(GET_LIVE_LIST, res.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   更新直播消息状态
   * @return   {[type]}          [description]
   */
  updateLiveApi (store, params) {
    return updateLiveApi(params)
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
   * @detail   问答区
   * @return   {[type]}          [description]
   */
  getLiveProblemListApi (store, params) {
    return getLiveProblemListApi(params)
      .then(res => {
        store.commit(GET_LIVE_PROBLEM_LIST, res.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
   /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   更新直播消息状态
   * @return   {[type]}          [description]
   */
  deleteLiveProblemCommentApi (store, params) {
    return deleteLiveProblemCommentApi(params)
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
   * @detail   更新直播消息状态
   * @return   {[type]}          [description]
   */
  recoverLiveProblemCommentApi (store, params) {
    return recoverLiveProblemCommentApi(params)
      .then(res => {
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
}

export default {
  state,
  mutations,
  getters,
  actions
}
