import {
  SHOW_MSG,
  HIDE_MSG,
  SWITCH_OPEN_MODAL,
  HIDE_AJAX_LOADING,
  SHOW_AJAX_LOADING,
  LOGIN,
  LOGOUT
} from '../mutation-types'

import { getAccessToken, removeAccessToken } from '@/store/cacheService'
// import {
//   articleGetArticleListApi,
//   articlePostArticleApi,
//   articleDeleteArticleApi,
//   articlePutArticleApi
// } from 'API/common'

const state = {
  token: getAccessToken(),
  userInfos: {},
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
  [SHOW_MSG](state, { content, type = 'error', duration = 5000 }) {
    state.message = { content, type, duration }
  },
  [HIDE_MSG](state) {
    state.message.content = ''
  },
  [SHOW_AJAX_LOADING] (state) {
    state.ajaxLoading = true
  },

  [HIDE_AJAX_LOADING] (state) {
    state.ajaxLoading = false
  },

  [SWITCH_OPEN_MODAL] (state, open) {
    state.openModal = !!open
  },

  [LOGIN] (state, data) {
    state.userInfos = data
  },

  [LOGOUT] (state) {
    state.userInfos = data
  }
}

const getters = {
  message: state => state.message,
  showDialog: state => state.showDialog,
  ajaxLoading: state => state.ajaxLoading,
  openModal: state => state.openModal,
  token: state => state.token,
  userInfos: state => state.userInfos
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
  getUploadToken(store) {},
  // 登录接口
  login (store, params) {
    login(params)
      .then(res => {
        store.commit(LOGIN, res.data.info)
        return res
      })
      .catch(error => {
        return error
      })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
