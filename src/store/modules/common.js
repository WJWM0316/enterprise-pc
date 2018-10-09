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
  GET_GROUP_LISTS,
  SELECT_ALL_MENBER_LISTS
} from '../mutation-types'

import {
  postUploadConfigApi,
  uploadApi,
  getCategoryListsApi,
  getMenberListsApi,
  getCategoryApi,
  getCompanyInfoApi,
  getGroupListsApi
} from 'API/common'

const state = {
  groupLists: [],
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
  companyInfo: {}
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
  [GET_MENBER_LISTS] (state, data) {
    data.map(field => {
      field.selfGroup = []
      field.group.map(val => {
        field.selfGroup.push(val.groupId)
      })
    })
    state.menberLists = data
  },
  [SELECT_ALL_MENBER_LISTS] (state, data) {
    state.menberLists.map(field => {})
  },
  // 获取公司信息
  [GET_COMPANY_INFOS] (state, data) {
    state.companyInfo = data
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
  companyInfo: state => state.companyInfo
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
}

export default {
  state,
  mutations,
  getters,
  actions
}
