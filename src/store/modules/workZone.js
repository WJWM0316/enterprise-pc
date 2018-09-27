import {
  GET_WORK_ZONE_LISTS,
  GET_JOB_CIRCLE_ORGANIZATION_LISTS,
  GET_JOB_CIRCLE_HIT_LISTS,
  GET_JOB_CIRCLE_MENBER_LISTS,
  GET_JOB_CIRCLE_MENBER_DETAILS,
  GET_JOB_CIRCLE_NOTE_LISTS,
  GET_JOB_CIRCLE_COMMENT_FIRST_LISTS,
  GET_JOB_CIRCLE_COMMENT_SECOND_LISTS
} from '../mutation-types'

import {
  getJobCircleListsApi,
  getJobCircleOrganizationListsApi,
  getJobCircleHitListsApi,
  getJobCircleMemberListsApi,
  putJobCircleApi,
  getJobCircleDetailsApi,
  postJobCircleApi,
  getJobCircleNoteListsApi,
  deleteJobCircleNoteApi,
  setJobCircleNotetoTopApi,
  updateJobCircleNoteVisibleApi,
  recoverJobCircleNoteApi,
  getJobCircleCommentFirstListsApi,
  getJobCircleCommentSearchListsApi,
  deleteJobCircleCommentApi,
  recoverJobCircleCommentApi,
  setJobCircleHotCommentApi,
  cancleJobCircleHotCommentApi,
  getJobCircleCommentSecondListsApi
} from 'API/workZone'

const state = {
  // 工作圈首页列表
  jobCircleLists: {
    list: [],
    total: 0
  },
  jobCircleMemberLists: [],
  jobCircleDetails: {},
  jobCircleOrganizationLists: [],
  jobCircleHitLists: [],
  jobCircleNoteLists: {
    list: [],
    total: 0
  },
  jobCircleCommentFirstLists: {
    list: [],
    total: 0
  },
  jobCircleCommentSecondLists: {
    list: [],
    total: 0
  }
}

const mutations = {
  [GET_WORK_ZONE_LISTS] (state, data) {
    state.jobCircleLists.list = data.data
    state.jobCircleLists.total = data.meta.total
  },
  [GET_JOB_CIRCLE_MENBER_LISTS] (state, data) {
    state.jobCircleMemberLists = data
  },
  [GET_JOB_CIRCLE_MENBER_LISTS] (state, data) {
    state.jobCircleMemberLists = data
  },
  [GET_JOB_CIRCLE_MENBER_DETAILS] (state, data) {
    state.jobCircleDetails = data
  },
  [GET_JOB_CIRCLE_ORGANIZATION_LISTS] (state, data) {
    state.jobCircleOrganizationLists = data
  },
  [GET_JOB_CIRCLE_HIT_LISTS] (state, data) {
    state.jobCircleHitLists = data
  },
  [GET_JOB_CIRCLE_NOTE_LISTS] (state, data) {
    state.jobCircleNoteLists.list = data.data
    state.jobCircleNoteLists.total = data.meta.total
  },
  [GET_JOB_CIRCLE_COMMENT_FIRST_LISTS] (state, data) {
    state.jobCircleCommentFirstLists.list = data.data
    state.jobCircleCommentFirstLists.total = data.meta.total
  },
  [GET_JOB_CIRCLE_COMMENT_SECOND_LISTS] (state, data) {
    state.jobCircleCommentSecondLists.list = data.data
    state.jobCircleCommentSecondLists.total = data.meta.total
  }
}

const getters = {
  jobCircleLists: state => state.jobCircleLists,
  jobCircleMemberLists: state => state.jobCircleMemberLists,
  jobCircleDetails: state => state.jobCircleDetails,
  jobCircleOrganizationLists: state => state.jobCircleOrganizationLists,
  jobCircleHitLists: state => state.jobCircleHitLists,
  jobCircleNoteLists: state => state.jobCircleNoteLists,
  jobCircleCommentFirstLists: state => state.jobCircleCommentFirstLists,
  jobCircleCommentSecondLists: state => state.jobCircleCommentSecondLists
}

const actions = {

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取工作圈列表
   * @return   {[type]}          [description]
   */
  getJobCircleListsApi(store, params) {
    return getJobCircleListsApi(params)
      .then(res => {
        store.commit(GET_WORK_ZONE_LISTS, res.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取获取工作圈组织
   * @return   {[type]}          [description]
   */
  getJobCircleOrganizationListsApi(store, params) {
    return getJobCircleOrganizationListsApi(params)
      .then(res => {
        store.commit(GET_JOB_CIRCLE_ORGANIZATION_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取工作圈不可见成员
   * @return   {[type]}          [description]
   */
  getJobCircleHitListsApi(store, params) {
    return getJobCircleHitListsApi(params)
      .then(res => {
        store.commit(GET_JOB_CIRCLE_HIT_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取工作圈成员列表
   * @return   {[type]}          [description]
   */
  getJobCircleMemberListsApi(store, params) {
    return getJobCircleMemberListsApi(params)
      .then(res => {
        store.commit(GET_JOB_CIRCLE_MENBER_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   编辑工作圈
   * @return   {[type]}          [description]
   */
  putJobCircleApi(store, params) {
    return putJobCircleApi(params)
      .then(res => {
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取工作圈详情
   * @return   {[type]}          [description]
   */
  getJobCircleDetailsApi(store, params) {
    return getJobCircleDetailsApi(params)
      .then(res => {
        store.commit(GET_JOB_CIRCLE_MENBER_DETAILS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   添加工作圈
   * @return   {[type]}          [description]
   */
  postJobCircleApi(store, params) {
    return postJobCircleApi(params)
      .then(res => {
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取工作圈帖子列表
   * @return   {[type]}          [description]
   */
  getJobCircleNoteListsApi(store, params) {
    return getJobCircleNoteListsApi(params)
      .then(res => {
        store.commit(GET_JOB_CIRCLE_NOTE_LISTS, res.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   删除帖子列表
   * @return   {[type]}          [description]
   */
  deleteJobCircleNoteApi(store, params) {
    return deleteJobCircleNoteApi(params)
      .then(res => {
        // store.commit(GET_JOB_CIRCLE_NOTE_LISTS, res.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   设置帖子置顶
   * @return   {[type]}          [description]
   */
  setJobCircleNotetoTopApi(store, params) {
    return setJobCircleNotetoTopApi(params)
      .then(res => {
        // store.commit(GET_JOB_CIRCLE_NOTE_LISTS, res.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   圈主设置工作圈帖子隐藏/公开
   * @return   {[type]}          [description]
   */
  updateJobCircleNoteVisibleApi(store, params) {
    return updateJobCircleNoteVisibleApi(params)
      .then(res => {
        // store.commit(GET_JOB_CIRCLE_NOTE_LISTS, res.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   工作圈帖子删除恢复
   * @return   {[type]}          [description]
   */
  recoverJobCircleNoteApi(store, params) {
    return recoverJobCircleNoteApi(params)
      .then(res => {
        // store.commit(GET_JOB_CIRCLE_NOTE_LISTS, res.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   工作圈一级评论
   * @return   {[type]}          [description]
   */
  getJobCircleCommentSecondListsApi(store, params) {
    return getJobCircleCommentSecondListsApi(params)
      .then(res => {
        store.commit(GET_JOB_CIRCLE_COMMENT_SECOND_LISTS, res.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   工作圈二级评论
   * @return   {[type]}          [description]
   */
  getJobCircleCommentFirstListsApi(store, params) {
    return getJobCircleCommentSearchListsApi(params)
      .then(res => {
        store.commit(GET_JOB_CIRCLE_COMMENT_FIRST_LISTS, res.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   删除评论
   * @return   {[type]}          [description]
   */
  deleteJobCircleCommentApi(store, params) {
    return deleteJobCircleCommentApi(params)
      .then(res => {
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   恢复已删除的评论
   * @return   {[type]}          [description]
   */
  recoverJobCircleCommentApi(store, params) {
    return recoverJobCircleCommentApi(params)
      .then(res => {
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   设置热门评论
   * @return   {[type]}          [description]
   */
  setJobCircleHotCommentApi(store, params) {
    return setJobCircleHotCommentApi(params)
      .then(res => {
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   取消热门评论
   * @return   {[type]}          [description]
   */
  cancleJobCircleHotCommentApi(store, params) {
    return cancleJobCircleHotCommentApi(params)
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
