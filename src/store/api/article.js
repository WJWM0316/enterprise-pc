/**
 * 文章管理模块接口
 */
import { post } from './api'

/**
 * 获取文章列表
 * @method POST
 * @param {*} data
 */
export const getArticleList = data => post({
  url: '/article/lists',
  data
})

/**
 * 创建文章
 * @method POST
 * @param {*} data
 */
export const postCreateArticle = data => post({
  url: '/article/add',
  data
})

/**
 * 修改文章
 * @method POST
 * @param {*} data
 */
export const postEditArticle = data => post({
  url: '/article/edit',
  data
})

/**
 * 获取文章详情
 * @method POST
 * @param {*} data
 */
export const getArticleInfo = data => post({
  url: '/article/details',
  data
})
