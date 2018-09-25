import {
  GET_WORK_ZONE_LISTS,
  GET_JOB_CIRCLE_ORGANIZATION_LISTS,
  GET_JOB_CIRCLE_HIT_LISTS,
  GET_JOB_CIRCLE_MENBER_LISTS,
  GET_GROUP_LISTS,
  GET_JOB_CIRCLE_MENBER_DETAILS,
  UPDATE_GROUP_LISTS,
  GET_JOB_CIRCLE_NOTE_LISTS
} from '../mutation-types'

import {
  getJobCircleListsApi,
  getJobCircleOrganizationListsApi,
  getJobCircleHitListsApi,
  getJobCircleMemberListsApi,
  putJobCircleApi,
  getJobCircleDetailsApi,
  postJobCircleApi,
  getGroupListsApi,
  getJobCircleNoteListsApi,
  deleteJobCircleNoteApi,
  setJobCircleNotetoTopApi,
  updateJobCircleNoteVisibleApi
} from 'API/workZone'

const state = {
  // 工作圈首页列表
  jobCircleLists: {
    list: [],
    total: 0
  },
  jobCircleMemberLists: [],
  groupLists: [],
  jobCircleDetails: {},
  jobCircleOrganizationLists: [],
  jobCircleHitLists: [],
  jobCircleNoteLists: {
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
  [GET_GROUP_LISTS] (state, data) {
    data.map(field => {field.active = false})
    state.groupLists = data
  },
  [UPDATE_GROUP_LISTS] (state, params) {
    state.groupLists.map(field => {
      if(field.groupId === params.groupId) {
        field.active = !field.active
      }
    })
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
  }
}

const getters = {
  jobCircleLists: state => state.jobCircleLists,
  jobCircleMemberLists: state => state.jobCircleMemberLists,
  groupLists: state => state.groupLists,
  jobCircleDetails: state => state.jobCircleDetails,
  jobCircleOrganizationLists: state => state.jobCircleOrganizationLists,
  jobCircleHitLists: state => state.jobCircleHitLists,
  jobCircleNoteLists: state => state.jobCircleNoteLists
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
   * @detail   获取分组列表
   * @return   {[type]}          [description]
   */
  getGroupListsApi(store, params) {
    return getGroupListsApi(params)
      .then(res => {
        store.commit(GET_GROUP_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   更新分组列表
   * @return   {[type]}          [description]
   */
  updateGroupListsApi(store, params) {
    store.commit(UPDATE_GROUP_LISTS, params)
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
}

export default {
  state,
  mutations,
  getters,
  actions
}
