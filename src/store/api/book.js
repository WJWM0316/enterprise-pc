/**
 * 电子书管理模块接口
 */
import { get, post, put } from './api'

/**
 * 获取书籍列表
 * @method GET
 * @param {*} data
 */
export const getBookList = data => get({
  url: '/voicebook',
  data
})

/**
 * 获取创建书籍所需数据
 * @method GET
 * @param {*} data
 */
export const getCreateBookData = data => get({
  url: '/voicebook/create',
  data
})

/**
 * 创建新书籍
 * @method POST
 * @param {*} data
 */
export const postCreateBook = data => post({
  url: '/voicebook',
  data
})

/**
 * 获取书籍数据（详情）
 * @method GET
 * @param {*} id 书籍id
 * @param {*} data
 */
export const getBookInfo = (id, data) => get({
  url: `/voicebook/${id}`,
  data
})

/**
 * 获取书籍数据（编辑）
 * @method GET
 * @param {*} id 书籍id
 * @param {*} data
 */
export const getBookEdit = (id, data) => get({
  url: `/voicebook/${id}/edit`,
  data
})

/**
 * 保存书籍数据（编辑）
 * @method PUT
 * @param {*} id 书籍id
 * @param {*} data
 */
export const putSaveBook = (id, data) => put({
  url: `/voicebook/${id}`,
  data
})
