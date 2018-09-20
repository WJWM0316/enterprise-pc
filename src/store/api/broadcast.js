/**
 * 直播模块api
 */
import { request } from './index.js'
import Qs from 'qs'

// 添加直播
export const postLiveApi = data => request('/live/create', 'post', Qs.stringify(data))
// 编辑接口
export const putLiveApi = params => request(`/live/${params.id}/edit`, 'put', Qs.stringify(data))
// 直播回顾
export const getLiveReviewListApi = params => request(`/live/review/${params.id}`, 'get')
