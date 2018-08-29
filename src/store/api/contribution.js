/**
 * 投稿管理模块接口
 */
import { get, put } from './api'

/**
 * 获取投稿列表
 * @method GET
 * @param {*} data
 */
export const getContributionList = data => get({
  url: '/article_contribution',
  data
})

/**
 * 获取投稿数据（详情）
 * @method GET
 * @param {*} id 投稿id
 * @param {*} data
 */
export const getContributionInfo = (id, data) => get({
  url: `/article_contribution/${id}`,
  data
})

/**
 * 保存投稿数据（编辑）
 * @method PUT
 * @param {*} id 投稿id
 * @param {*} data
 */
export const putSaveContribution = (id, data) => put({
  url: `/article_contribution/${id}`,
  data
})
