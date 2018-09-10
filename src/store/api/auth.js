/**
 * 权限模块api
 */
import { request } from './index.js'

// 登陆接口
export const loginApi = data => request('/auth/login', 'post', data)
// 退出接口
export const logoutApi = data => request('/auth/logout', 'get')