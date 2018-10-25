import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes.js'
import store from '../store'
Vue.use(Router)

const base = location.href.split('/')[3]

const router = new Router({
  mode: 'history',
  base,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  store.dispatch('setPageName', {name: to.name})
  next()
})

export default router