/**
 * 所有工作圈对应的接口请求
 */
import { request } from './index.js'

// 获取工作圈列表
export const getJobCircleLists = params => request('/job/circle', 'get', params)
// 获取获取工作圈成员
export const getJobCircleOrganizationLists = params => request(`/job/circleorganization/${params.id}`, 'get')
// 获取工作圈不可见成员
export const getJobCircleHitLists = params => request(`/job/circlehit/${params.id}`, 'get')
// 获取工作圈成员
export const getJobCircleMemberLists = params => request(`/job/circlemember/${params.id}`, 'get')
// 编辑工作圈
export const putJobCircle = params => request(`/job/circle/${params.id}`, 'put')
// 获取工作圈详情
export const getJobCircleDetails = params => request(`/job/circle/${params.id}`, 'get')
// 添加工作圈
export const postJobCircle = data => request('/job/circle', 'post', data)