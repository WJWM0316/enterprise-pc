/**
 * 直播模块api
 */
import { request } from './index.js'
import Qs from 'qs'

// 添加直播
export const postLiveApi = data => request('/live/create', 'post', Qs.stringify(data))
// 编辑接口
export const putLiveApi = params => request(`/live/${params.id}/edit`, 'post', Qs.stringify(params))
// 直播回顾
export const getLiveReviewListApi = params => request(`/live/review/${params.id}`, 'get',  params)
// 获取直播详情
export const getLiveDetailApi = params => request(`/live/info/${params.id}`, 'get')
// 获取必修学员列表
export const getLiveMenberListApi = params => request(`/live/member/${params.id}`, 'get')
// 获取不可见学员列表
export const getLiveInvisibleMenberListApi = params => request(`/live/invisible/${params.id}`, 'get')
// 获取直播列表
export const getLiveListApi = params => request(`/live`, 'get', params)
// 更新直播状态
export const updateLiveApi = params => request(`/live/message/${params.id}`, 'patch', params)
// 问答区
export const getLiveProblemListApi = params => request(`/live/problemList`, 'post', Qs.stringify(params))