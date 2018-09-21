/**
 * 所有课程对应的接口请求
 */
import { request } from './index.js'
export const getListCourse = params => request('/course/listCourse', 'post', params)
