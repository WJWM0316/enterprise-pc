import {
  GET_WORK_ZONE_LISTS,
  GET_JOB_CIRCLE_ORGANIZATION_LISTS,
  GET_JOB_CIRCLE_HIT_LISTS,
  GET_JOB_CIRCLE_MENBER_LISTS,
  GET_GROUP_LISTS,
  GET_MENBER_LISTS,
  GET_JOB_CIRCLE_MENBER_DETAILS
} from '../mutation-types'

import {
  getJobCircleListsApi,
  getJobCircleOrganizationListsApi,
  getJobCircleHitListsApi,
  getJobCircleMemberListsApi,
  putJobCircleApi,
  getJobCircleDetailsApi,
  postJobCircleApi,
  getMenberListsApi,
  getGroupListsApi
} from 'API/workZone'

const state = {
  // 工作圈首页列表
  jobCircleLists: {
    list: [],
    total: 0
  },
  jobCircleMemberLists: [],
  groupLists: [],
  menberLists: [],
  jobCircleDetails: {},
  jobCircleOrganizationLists: [],
  jobCircleHitLists: []
}

const mutations = {
  [GET_WORK_ZONE_LISTS] (status, data) {
    state.jobCircleLists.list = data.data
    state.jobCircleLists.total = data.meta.total
  },
  [GET_JOB_CIRCLE_MENBER_LISTS] (status, data) {
    state.jobCircleMemberLists = data
  },
  [GET_GROUP_LISTS] (status, data) {
    state.groupLists = data
  },
  [GET_JOB_CIRCLE_MENBER_LISTS] (status, data) {
    state.jobCircleMemberLists = data
  },
  [GET_MENBER_LISTS] (status, data) {
    data.map(field => {
      field.selfGroup = []
      field.group.map(val => {
        field.selfGroup.push(val.groupId)
      })
    })
    state.menberLists = data
  },
  [GET_JOB_CIRCLE_MENBER_DETAILS] (status, data) {
    state.jobCircleDetails = data
  },
  [GET_JOB_CIRCLE_ORGANIZATION_LISTS] (status, data) {
    state.jobCircleOrganizationLists = data
  },
  [GET_JOB_CIRCLE_HIT_LISTS] (status, data) {
    state.jobCircleHitLists = data
  }
}

const getters = {
  jobCircleLists: state => state.jobCircleLists,
  jobCircleMemberLists: state => state.jobCircleMemberLists,
  groupLists: state => state.groupLists,
  menberLists: state => state.menberLists,
  jobCircleDetails: state => state.jobCircleDetails,
  jobCircleOrganizationLists: state => state.jobCircleOrganizationLists,
  jobCircleHitLists: state => state.jobCircleHitLists
}

const actions = {

  // 获取工作圈列表
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
  // 获取获取工作圈组织
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
  // 获取工作圈不可见成员
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
  // 获取工作圈成员列表
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
  // 编辑工作圈
  putJobCircleApi(store, params) {
    return putJobCircleApi(params)
      .then(res => {
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  // 获取工作圈详情
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
  // 添加工作圈
  postJobCircleApi(store, params) {
    return postJobCircleApi(params)
      .then(res => {
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  // 获取成员列表
  getMenberListsApi(store, params) {
    return getMenberListsApi(params)
      .then(res => {
        store.commit(GET_MENBER_LISTS, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  // 获取分组列表
  getGroupListsApi(store, params) {
    return getGroupListsApi(params)
      .then(res => {
        store.commit(GET_GROUP_LISTS, res.data.data)
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
