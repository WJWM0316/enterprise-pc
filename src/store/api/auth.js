/**
 * 权限模块api
 */
import { request } from './index.js'

// 登陆接口
export const login = data => request('/auth/login', 'post', data)
