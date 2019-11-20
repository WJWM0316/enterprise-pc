/**
 * 课程模块api
 */
import { request } from './index.js'
export const getListCourse = params => request('/course/listCourse', 'post', params)
import Qs from 'qs'
/* eslint-disable */

// 添加课程
export const postCourseApi = data => request('/course/addCourse', 'post', Qs.stringify(data))
// 编辑课程
export const putCourseApi = data => request('/course/editCourse', 'post', Qs.stringify(data))
// 获取课程列表
export const getCourseListsApi = data => request('/course/listCourse', 'post', data)
// 获取课程详情
export const getCourseDetailApi = data => request('/course/infoCourse', 'post', Qs.stringify(data))
// 获取课程学员
export const getCoursePeopleApi = data => request('/course/peopleCourse', 'post', Qs.stringify(data))
// 获取课程所属组织
export const getCourseOrganizationsApi = data => request('/course/OrganizationsCourse', 'post', Qs.stringify(data))
// 获取课程所属分类
export const getCourseCategoryApi = data => request('/course/CategoryCourse', 'post', Qs.stringify(data))
