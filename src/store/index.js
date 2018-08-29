import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import article from './modules/article'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common,
    article
  }
})

export default store