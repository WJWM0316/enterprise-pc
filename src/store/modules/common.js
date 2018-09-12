import {
  SHOW_MSG,
  HIDE_MSG,
  SWITCH_OPEN_MODAL,
  HIDE_AJAX_LOADING,
  SHOW_AJAX_LOADING,
  GET_UPLOAD_CONFIG
} from '../mutation-types'

import {
  postUploadConfigApi,
  uploadApi
} from 'API/common'

const state = {
  uploadConfig: {},
  message: {
    content: '',
    type: 'error',
    duration: 5000,
  },
  showDialog: false,
  ajaxLoading: false,
  openModal: false // 是否处于打开modal层状态
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
  }
}

const getters = {
  message: state => state.message,
  showDialog: state => state.showDialog,
  ajaxLoading: state => state.ajaxLoading,
  openModal: state => state.openModal,
  token: state => state.token,
  uploadConfig: state => state.uploadConfig
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
  // 获取上传的配置
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
  // 上传文件
  uploadApi(store, params) {
    return uploadApi(params)
      .then(res => {
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
