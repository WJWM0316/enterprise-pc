/**
 * 个人中心模块api
 */
import { request } from './index.js'
import Qs from 'qs'

// 个人课程信息接口
export const getPersonalInfoLessonsApi = params => request(`/personal/info/${params.id}/lessons`, 'get')
// 个人学习信息接口
export const getPersonalInfoStudyApi = params => request(`/personal/info/${params.id}/study`, 'get')
// 个人信息接口
export const getPersonalInfoBaseApi = params => request(`/personal/info/${params.id}/base`, 'get')
// 个人直播信息接口
export const getPersonalInfoLivesApi = params => request(`/personal/info/${params.id}/lives`, 'get')
// 个人空间工作圈信息接口
export const getPersonalInfoJobCirclesApi = params => request(`/personal/info/${params.id}/jobcircles`, 'get')
// 获取学员信息
export const getMemberInfosApi = params => request(`/member/info/${params.id}`, 'get')
// 编辑成员资料
export const updateMemberInfosApi = params => request(`/member/${params.id}/edit`, 'post', Qs.stringify(params))
// 删除成员
export const deleteMemberApi = params => request(`/member/${params.id}`, 'delete')
// 获取试卷信息
export const getQuestionInfosApi = params => request('/exam/info/', 'get', params)
