/**
 * 所有统计对应的接口请求
 */
import { request } from './index.js'
// 获取用户相关统计
export const getUserRelativeStatisticsListApi = params => request(`sta/user`, 'get', params)

