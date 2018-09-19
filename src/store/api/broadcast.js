/**
 * 直播模块api
 */
import { request } from './index.js'
import Qs from 'qs'

// 添加直播
export const postLiveApi = data => request('/live/create', 'post', Qs.stringify(data))
// 编辑接口
export const putLiveApi = params => request(`/live/${params.id}/edit`, 'put', Qs.stringify(data))
// 获取分类
export const getCategoryListsApi = params => request('/category', 'get', params)