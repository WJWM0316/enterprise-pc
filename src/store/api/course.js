/**
 * 课程管理模块接口
 */
import { get, post, put } from './https'

/**
 * 获取课程列表
 * @method GET
 * @param {*} data
 */
export const getCourseList = data => get({
  url: '/course',
  data
})

/**
 * 获取创建课程所需数据
 * @method GET
 * @param {*} data
 */
export const getCreateCourseData = data => get({
  url: '/course/create',
  data
})

/**
 * 创建新课程
 * @method POST
 * @param {*} data
 */
export const postCreateCourse = data => post({
  url: '/course',
  data
})

/**
 * 获取课程数据（详情）
 * @method GET
 * @param {*} id 课程id
 * @param {*} data
 */
export const getCourseInfo = (id, data) => get({
  url: `/course/${id}`,
  data
})

/**
 * 获取课程数据（编辑）
 * @method GET
 * @param {*} id 课程id
 * @param {*} data
 */
export const getCourseEdit = (id, data) => get({
  url: `/course/${id}/edit`,
  data
})

/**
 * 保存课程数据（编辑）
 * @method PUT
 * @param {*} id 课程id
 * @param {*} data
 */
export const putSaveCourse = (id, data) => put({
  url: `/course/${id}`,
  data
})
