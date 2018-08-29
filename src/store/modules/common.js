import {
  SHOW_MSG,
  HIDE_MSG,
  SWITCH_OPEN_MODAL,
  HIDE_AJAX_LOADING,
  SHOW_AJAX_LOADING
} from '../mutation-types'

const state = {
  showDialog: false,
  ajaxLoading: false,
  openModal: false // 是否处于打开modal层状态
}

const mutations = {
  [SHOW_MSG](state) {
    state.showDialog = true
  },
  [HIDE_MSG](state) {
    state.showDialog = false
  },
  [SHOW_AJAX_LOADING] (state) {
    state.ajaxLoading = true
  },

  [HIDE_AJAX_LOADING] (state) {
    state.ajaxLoading = false
  },

  [SWITCH_OPEN_MODAL] (state, open) {
    state.openModal = !!open
  }
}

const getters = {
  showDialog: state => state.showDialog,
  ajaxLoading: state => state.ajaxLoading,
  openModal: state => state.openModal
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
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
