/**
 * 所有工作圈对应的接口请求
 */
import { request } from './index.js'
import Qs from 'qs'

// 获取工作圈列表
export const getJobCircleListsApi = params => request('/job/circle', 'get', params)
// 获取获取工作圈组织列表
export const getJobCircleOrganizationListsApi = params => request(`/job/circleorganization/${params.id}`, 'get')
// 获取工作圈不可见成员
export const getJobCircleHitListsApi = params => request(`/job/circlehit/${params.id}`, 'get')
// 获取工作圈成员
export const getJobCircleMemberListsApi = params => request(`/job/circlemember/${params.id}`, 'get')
// 编辑工作圈
export const putJobCircleApi = data => request(`/job/circle/${data.id}`, 'put', Qs.stringify(data))
// 获取工作圈详情
export const getJobCircleDetailsApi = params => request(`/job/circle/${params.id}`, 'get')
// 添加工作圈
export const postJobCircleApi = data => request('/job/circle', 'post', Qs.stringify(data))
// 获取分组成员列表
export const getGroupListsApi = params => request('/group', 'get', params)