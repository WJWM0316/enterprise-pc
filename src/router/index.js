import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes.js'
import { getAccessToken, saveAccessToken } from '@/store/cacheService'
Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes
})

saveAccessToken('lphva', 10000)
router.beforeEach((to, from, next) => {
	// 未登录
	// if(!getAccessToken()) {
	// 	window.location.href = window.location.host + '/login'
	// 	next('/login')
	// }
	// if (to.name) {
	// 	if (!getAccessToken()) {
	// 		window.location.href = 'http://localhost:8080/login'
	// 	} else {
	// 		next()
	// 	}
	// } else {
	// 	next(false)
	// }
	next()
})

export default router