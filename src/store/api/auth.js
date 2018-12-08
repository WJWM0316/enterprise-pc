/**
 * 权限模块api
 */
import { request } from './index.js'
import Qs from 'qs'

// 登陆接口
export const loginApi = data => request('/auth/login', 'post', Qs.stringify(data))
// 退出接口
export const logoutApi = data => request('/auth/logout', 'get')

// 重置密码
export const editPwdApi = data => request('/member/editPwd', 'post', Qs.stringify(data))