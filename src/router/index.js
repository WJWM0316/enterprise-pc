import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes.js'
// import { getAccessToken } from '@/store/cacheService'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
  next()
})

export default router