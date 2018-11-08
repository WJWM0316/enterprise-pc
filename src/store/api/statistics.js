/**
 * 所有统计对应的接口请求
 */
import { request } from './index.js'
// 获取用户相关统计
export const getUserRelativeStatisticsListApi = params => request('sta/user', 'get', params)

// 获取不同部门学习总人数
export const getDeparmentRelativeStatisticsListApi = params => request('sta/group/studyPeople', 'get', params)

// 获取工作圈统计
export const getWorkZoneStatisticsListApi = params => request('job/statistic', 'get', params)

// 获取课程来源分布
export const getCourseSourseStatisticsListApi = params => request('/sta/course/courseSource', 'get', params)

// 获取课程类型分布
export const getCourseTypeStatisticsListApi = params => request('/sta/course/courseDistributed', 'get', params)

// 获取课程学习人数
export const getCourseStudyStatisticsListApi = params => request('/sta/course/coursePeople', 'get', params)
