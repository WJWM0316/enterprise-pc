import {
  GET_WORK_ZONE_LISTS,
  GET_JOB_CIRCLE_ORGANIZATION_LISTS,
  GET_JOB_CIRCLE_HIT_LISTS,
  GET_JOB_CIRCLE_MENBER_LISTS,
  GET_JOB_CIRCLE_MENBER_DETAILS
} from '../mutation-types'

import {
  getJobCircleLists,
  getJobCircleOrganizationLists,
  getJobCircleHitLists,
  getJobCircleMemberLists,
  putJobCircle,
  getJobCircleDetails,
  postJobCircle
} from 'API/workZone'

const state = {
  jobCircleLists: {
    list: [],
    total: 0
  }
}

const mutations = {
  [GET_WORK_ZONE_LISTS] (status, data) {
    state.jobCircleLists.list = data.data
    state.jobCircleLists.total = data.meta.total
  }
}

const getters = {
  jobCircleLists: state => state.jobCircleLists
}

const actions = {

  // 获取工作圈列表
  getJobCircleLists(store, params) {
    return getJobCircleLists(params)
      .then(res => {
        store.commit(GET_WORK_ZONE_LISTS, res.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  // 获取获取工作圈成员
  getJobCircleOrganizationLists(store, params) {
    return getJobCircleOrganizationLists(params)
      .then(res => {
        console.log(res)
        // store.commit(GET_WORK_ZONE_LISTS, res.data.info)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  // 获取工作圈不可见成员
  getJobCircleHitLists(store, params) {
    return getJobCircleHitLists(params)
      .then(res => {
        console.log(res)
        // store.commit(GET_WORK_ZONE_LISTS, res.data.info)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  // 获取工作圈成员
  getJobCircleMemberLists(store, params) {
    return getJobCircleMemberLists(params)
      .then(res => {
        console.log(res)
        // store.commit(GET_WORK_ZONE_LISTS, res.data.info)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  // 编辑工作圈
  putJobCircle(store, params) {
    return putJobCircle(params)
      .then(res => {
        console.log(res)
        // store.commit(GET_WORK_ZONE_LISTS, res.data.info)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  // 获取工作圈详情
  getJobCircleDetails(store, params) {
    return getJobCircleDetails(params)
      .then(res => {
        console.log(res)
        // store.commit(GET_WORK_ZONE_LISTS, res.data.info)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  // 添加工作圈
  postJobCircle(store, params) {
    return postJobCircle(params)
      .then(res => {
        console.log(res)
        // store.commit(GET_WORK_ZONE_LISTS, res.data.info)
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
