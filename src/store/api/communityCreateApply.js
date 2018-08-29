/**
 * 社区管理-建塔申请模块接口
 */
import { get, put } from './api'

/**
 * 获取建塔申请列表
 * @method GET
 * @param {*} data
 */
export const getCommunityCreateApplyList = data => get({
  url: '/apply',
  data
})

/**
 * 获取建塔申请数据（详情）
 * @method GET
 * @param {*} id 建塔申请id
 * @param {*} data
 */
export const getCommunityCreateApplyInfo = (id, data) => get({
  url: `/apply/${id}`,
  data
})

/**
 * 修改建塔申请审核状态
 * @method GET
 * @param {*} id 建塔申请id
 * @param {*} data
 */
export const putUpdateCommunityCreateApplyStatus = (id, data) => put({
  url: `/apply/${id}`,
  data
})
