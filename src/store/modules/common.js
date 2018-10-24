import {
  SHOW_MSG,
  HIDE_MSG,
  SWITCH_OPEN_MODAL,
  HIDE_AJAX_LOADING,
  SHOW_AJAX_LOADING,
  GET_UPLOAD_CONFIG,
  GET_CATEGORY_LIST,
  GET_MENBER_LISTS,
  UPDATE_CATEGORY_LIST,
  UPDATE_CATEGORY_LIST_NO_CHECKED,
  GET_COMPANY_INFOS,
  UPDATE_GROUP_LISTS,
  NO_CHECK_UPDATE_GROUP_LISTS,
  GET_GROUP_LISTS,
  SELECT_ALL_MENBER_LISTS,
  GET_MENBER_DYNAMICS_LIST,
  UPDATE_MENBER_LISTS,
  UPDATE_MENBER_LISTS_MULTIPLE,
  UPDATE_MENBER_LISTS_All,
  UPDATE_MENBER_LISTS_BY_ID,
  SWITCH_CHECKED_GROUP_LISTS,
  CLASSIFY_MENBER_LISTS_BY_GROUPID,
  ADD_SELF_GROUP_BY_USER,
  REMOVE_SELF_GROUP_ITEM,
  UPDATE_All_GROUP_LISTS_STATUS,
  SWITCH_SINGLE_GROUP_LISTS,
  UPDATE_MENBER_SINGLE,
  UPDATE_ALL_MENBER_STATUS
} from '../mutation-types'

import {
  postUploadConfigApi,
  uploadApi,
  getCategoryListsApi,
  getMenberListsApi,
  getCategoryApi,
  getCompanyInfoApi,
  getGroupListsApi,
  getMemberDynamicsListApi,
  getMemberCheckNewDynamicsApi
} from 'API/common'

const state = {
  groupLists: [],
  // 有成员的组织列表
  hasMemberGroupList: [],
  categoryList: {},
  uploadConfig: {},
  menberLists: [],
  message: {
    content: '',
    type: 'error',
    duration: 5000,
  },
  showDialog: false,
  ajaxLoading: false,
  openModal: false, // 是否处于打开modal层状态
  companyInfo: {},
  memberDynamics: {}
}

const mutations = {
  // 显示自定义信息
  [SHOW_MSG](state, { content, type = 'error', duration = 5000 }) {
    state.message = { content, type, duration }
  },
  // 隐藏自定义信息
  [HIDE_MSG](state) {
    state.message.content = ''
  },
  // 显示加载图
  [SHOW_AJAX_LOADING] (state) {
    state.ajaxLoading = true
  },
  // 关闭加载图
  [HIDE_AJAX_LOADING] (state) {
    state.ajaxLoading = false
  },
  // 切换限制弹窗
  [SWITCH_OPEN_MODAL] (state, open) {
    state.openModal = !!open
  },
  // 获取上传文件的配置
  [GET_UPLOAD_CONFIG] (state, data) {
    state.uploadConfig = data
  },
  // 获取分类
  [GET_CATEGORY_LIST] (state, data) {
    data.map(field => {field.active = false})
    state.categoryList = data
  },
  // 更新分类列表
  [UPDATE_CATEGORY_LIST] (state, params) {
    state.categoryList.map(field => {
      field.active = params.categoryId === field.categoryId ? true : false
    })
  },
   // 更新分类列表
  [UPDATE_CATEGORY_LIST_NO_CHECKED] (state) {
    state.categoryList.map(field => field.active = false)
  },
  // 获取成员列表
  [GET_MENBER_LISTS] (state, data) {
    data.map(field => {
      field.active = false
      field.selfGroup = []
      if(field.group) field.group.map(val => field.selfGroup.push(val.groupId))
    })
    state.menberLists = data
  },
  // 更新成员列表
  [UPDATE_MENBER_LISTS] (state, params) {
    state.menberLists.map((field, i) => {
      if(params.index === i) field.active = !field.active
    })
  },
  // 更新所有成员列表
  [UPDATE_MENBER_LISTS_All] (state, params) {
    state.menberLists.map(field => {
      field.active = params.bool
    })
  },
  // 通过uid更新成员列表
  [UPDATE_MENBER_LISTS_BY_ID] (state, params) {
    state.menberLists.map(field => {
      field.active = params.uid === field.uid ? !field.active : false
    })
  },
  // 批量更新成员列表
  [UPDATE_MENBER_LISTS_MULTIPLE] (state, params) {
    state.menberLists.map(field => {
      if(params.list.includes(String(field.uid)) || params.list.includes(field.uid)) field.active = true
    })
  },
  // 更新单个成员
  [UPDATE_MENBER_SINGLE] (state, params) {
    state.menberLists.map(field => {
      if(params.uid === field.uid || Number(params.uid) === field.uid) field.active = params.bool
    })
  },
  // 更新所有成员
  [UPDATE_ALL_MENBER_STATUS] (state, params) {
    state.menberLists.map(field => {
      field.active = params.bool
    })
  },
  // 选择所用成员列表
  [SELECT_ALL_MENBER_LISTS] (state, data) {
    state.menberLists.map(field => field.active = false)
  },
  // 获取公司信息
  [GET_COMPANY_INFOS] (state, data) {
    state.companyInfo = data
  },
  // 获取组列表
  [GET_GROUP_LISTS] (state, data) {
    data.map(field => {
      field.active = false
      if(field.count) state.hasMemberGroupList.push(field)
    })
    state.groupLists = data
  },
  // 更新组列表
  [UPDATE_GROUP_LISTS] (state, params) {
    if(!params.list) {
      state.groupLists.map(field => {
        if(field.groupId === params.groupId) field.active = !field.active
      })
    } else {
      state.groupLists.map(field => {
        field.active = params.list.includes(String(field.groupId)) || params.list.includes(field.groupId) ? true : false
      })
    }
  },
  // 更新全部组列表
  [UPDATE_All_GROUP_LISTS_STATUS] (state, params) {
    state.groupLists.map(field => field.active = params.bool)
  },
  // 取消圈闭选中
  [NO_CHECK_UPDATE_GROUP_LISTS] (state) {
    state.groupLists.map(field => field.active = false)
  },
  // 组织切换选中
  [SWITCH_CHECKED_GROUP_LISTS] (state, params) {
    state.groupLists.map(field => {
      if(params.groupId === field.groupId) field.active = !field.active
    })
  },
  // 组织切换选中
  [SWITCH_SINGLE_GROUP_LISTS] (state, params) {
    state.hasMemberGroupList.map(field => {
      if(params.groupId === field.groupId) field.active = params.bool
    })
  },
  // 通过组划分成员
  [CLASSIFY_MENBER_LISTS_BY_GROUPID] (state, params) {
    if(params.groupId === 'all') {
      params.bool ? state.menberLists.map(field => field.active = false) : state.menberLists.map(field => field.active = true)
      params.bool ? state.hasMemberGroupList.map(field => field.active = false) : state.hasMemberGroupList.map(field => field.active = true)
    } else {
      state.menberLists.map(field => {
        if(field.selfGroup && field.selfGroup.includes(params.groupId)) field.active = !field.active
      })
    }
  },
  // 获取成员动态
  [GET_MENBER_DYNAMICS_LIST] (state, data) {
    state.memberDynamics = data
  },
  [ADD_SELF_GROUP_BY_USER] (state) {
    const bool = state.hasMemberGroupList.every(field => field.groupId !== 'all')
    if(bool) state.hasMemberGroupList.unshift({groupName: '所有人', isUserDedined: true, active: false, groupId: 'all', sort: 'self'})
  },
  [REMOVE_SELF_GROUP_ITEM] (state) {
    const bool = state.hasMemberGroupList.every(field => field.groupId !== 'all')
    if(!bool) state.hasMemberGroupList.shift()
  }
}

const getters = {
  message: state => state.message,
  groupLists: state => state.groupLists,
  showDialog: state => state.showDialog,
  ajaxLoading: state => state.ajaxLoading,
  openModal: state => state.openModal,
  uploadConfig: state => state.uploadConfig,
  menberLists: state => state.menberLists,
  categoryList: state => state.categoryList,
  companyInfo: state => state.companyInfo,
  memberDynamics: state => state.memberDynamics,
  hasMemberGroupList: state => state.hasMemberGroupList
}

const actions = {
  showDialog(store) {
    store.commit(SHOW_MSG)
  },
  hideDialog(store) {
    store.commit(HIDE_MSG)
  },
  showAjaxLoading (store) {
    store.commit(SHOW_AJAX_LOADING)
  },
  hideAjaxLoading (store) {
    store.commit(HIDE_AJAX_LOADING)
  },
  switchOpenModal (store, open) {
    store.commit(SWITCH_OPEN_MODAL, open)
  },
  showMsg (store, { content, type, duration }) {
    store.commit(SHOW_MSG, { content, type, duration })
  },
  hideMsg (store) {
    store.commit(HIDE_MSG)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   获取上传的配置
   * @return   {[type]}          [description]
   */
  postUploadConfigApi(store, params) {
    return postUploadConfigApi(params)
      .then(res => {
        store.commit(GET_UPLOAD_CONFIG, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   上传文件
   * @return   {[type]}          [description]
   */
  uploadApi(store, params) {
    return uploadApi(params)
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
        store.commit(GET_CATEGORY_LIST, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   更新分类列表
   * @return   {[type]}          [description]
   */
  updateCategoryListsApi (store, params) {
    store.commit(UPDATE_CATEGORY_LIST, params)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   都不选
   * @return   {[type]}          [description]
   */
  noCheckedCategoryListsApi (store, params) {
    store.commit(UPDATE_CATEGORY_LIST_NO_CHECKED)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   上传文件
   * @return   {[type]}          [description]
   */
  getCategoryApi(store, params) {
    return getCategoryApi(params)
      .then(res => {
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   获取成员列表
   * @return   {[type]}          [description]
   */
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
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   获取成员列表
   * @return   {[type]}          [description]
   */
  getCompanyInfoApi(store, params) {
    return getCompanyInfoApi(params)
      .then(res => {
        store.commit(GET_COMPANY_INFOS, res.data.data)
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
   * @detail   更新分组列表
   * @return   {[type]}          [description]
   */
  updateMenberListsApi(store, params) {
    store.commit(UPDATE_MENBER_LISTS, params)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   更新分组列表
   * @return   {[type]}          [description]
   */
  updateMenberListsByIdApi(store, params) {
    store.commit(UPDATE_MENBER_LISTS_BY_ID, params)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   更新分组列表
   * @return   {[type]}          [description]
   */
  updateMultipleMenberListsApi(store, params) {
    store.commit(UPDATE_MENBER_LISTS_MULTIPLE, params)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   更新分组列表
   * @return   {[type]}          [description]
   */
  updateMenberListsAllApi(store, params) {
    store.commit(UPDATE_MENBER_LISTS_All, params)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   分组全不选
   * @return   {[type]}          [description]
   */
  noCheckGroupListsApi(store) {
    store.commit(NO_CHECK_UPDATE_GROUP_LISTS)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   分组全不选
   * @return   {[type]}          [description]
   */
  switchCheckGroupListsApi(store, params) {
    store.commit(SWITCH_CHECKED_GROUP_LISTS, params)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   成员分组
   * @return   {[type]}          [description]
   */
  classifyMemberListsByGroupIdApi(store, params) {
    store.commit(CLASSIFY_MENBER_LISTS_BY_GROUPID, params)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取分组列表
   * @return   {[type]}          [description]
   */
  getMemberDynamicsListApi(store, params) {
    return getMemberDynamicsListApi(params)
      .then(res => {
        store.commit(GET_MENBER_DYNAMICS_LIST, res.data.data)
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
  getMemberCheckNewDynamicsApi(store, params) {
    return getMemberCheckNewDynamicsApi(params)
      .then(res => {
        // store.commit(GET_MENBER_DYNAMICS_LIST, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取所有分组
   * @return   {[type]}          [description]
   */
  setSelfDefinedGroup(store) {
    store.commit(ADD_SELF_GROUP_BY_USER)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取所有分组
   * @return   {[type]}          [description]
   */
  removeSelfDefinedGroup(store) {
    store.commit(REMOVE_SELF_GROUP_ITEM)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   更新所有的分组列表 UPDATE_All_GROUP_LISTS_STATUS
   * @return   {[type]}          [description]
   */
  updateAllGroupListStatus(store, params) {
    store.commit(UPDATE_All_GROUP_LISTS_STATUS, params)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   更新单个组的选中状态
   * @return   {[type]}          [description]
   */
  updateSingleGrouptatus(store, params) {
    store.commit(SWITCH_SINGLE_GROUP_LISTS, params)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   更新单个成员选中状态
   * @return   {[type]}          [description]
   */
  updateSingleMemberStatus(store, params) {
    store.commit(UPDATE_MENBER_SINGLE, params)
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   更新成员选中状态
   * @return   {[type]}          [description]
   */
  updateAllMemberStatus(store, params) {
    store.commit(UPDATE_ALL_MENBER_STATUS, params)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
