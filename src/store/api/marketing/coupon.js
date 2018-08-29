/**
 * 限时特惠管理模块接口
 */
import { post } from '../api'

/**
 * 获取限时特惠列表
 * @method GET
 * @param {*} data
 */
export const createCoupon = data => post({
  url: '/coupon',
  data
})
