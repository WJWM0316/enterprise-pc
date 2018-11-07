/**
 * 所有统计对应的接口请求
 */
import { request } from './index.js'
// 获取用户相关统计
export const getUserRelativeStatisticsListApi = params => request(`sta/user`, 'get', params)

// 获取部门相关统计
export const getDeparmentRelativeStatisticsListApi = params => request(`sta/user`, 'get', params)
