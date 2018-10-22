import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes.js'

Vue.use(Router)

const base = location.href.split('/')[3] || 'tiger'

const router = new Router({
  mode: 'history',
  base,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (from.name !== to.name) {
    window.scrollTo(0, 0)
  }
  next(true)
})

export default router