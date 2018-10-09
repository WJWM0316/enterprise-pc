/**
 * 所有控制台对应的接口请求
 */
/**
 * 权限模块api
 */
import { request } from './index.js'
import Qs from 'qs'

// 获取首页成员列表
export const getUserListsApi = params => request('/users', 'get', params)
//工作台首页接口
export const getDesktopInfosApi = params => request('/desktop', 'get')