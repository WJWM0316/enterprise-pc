import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes.js'
// import { getAccessToken } from '@/store/cacheService'
Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes
})

router.beforeEach((to, from, next) => {
	// if (to.name) {
	// 	if (!getAccessToken()) {
	// 		window.location.href = 'http://localhost:8080/login'
	// 	} else {
	// 		next()
	// 	}
	// } else {
	// 	next(false)
	// }
	next(true)
})

export default router