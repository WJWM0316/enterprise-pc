/**
 * 限时特惠管理模块接口
 */
import { get, post, put } from '../api'

/**
 * 获取限时特惠列表
 * @method GET
 * @param {*} data
 */
export const getFlashsalesList = data => get({
  url: '/activity',
  data
})

/**
 * 获取创建限时特惠所需数据
 * @method GET
 * @param {*} data
 */
export const getCreateFlashsalesData = data => get({
  url: '/activity/create',
  data
})

/**
 * 创建新限时特惠
 * @method POST
 * @param {*} data
 */
export const postCreateFlashsales = data => post({
  url: '/activity',
  data
})

/**
 * 获取限时特惠数据（详情）
 * @method GET
 * @param {*} id 限时特惠id
 * @param {*} data
 */
export const getFlashsalesInfo = (id, data) => get({
  url: `/activity/${id}`,
  data
})

/**
 * 获取限时特惠数据（编辑）
 * @method GET
 * @param {*} id 限时特惠id
 * @param {*} data
 */
export const getFlashsalesEdit = (id, data) => get({
  url: `/activity/${id}/edit`,
  data
})

/**
 * 保存限时特惠数据（编辑）
 * @method PUT
 * @param {*} id 限时特惠id
 * @param {*} data
 */
export const putSaveFlashsales = (id, data) => put({
  url: `/activity/${id}`,
  data
})

/**
 * 获取所有的活动产品
 * @param {*} data
 */
export const getProducts = data => get({
  url: `/activity/product`,
  data
})

/**
 * 获取限时特惠列表
 * @method GET
 * @param {*} data
 */
export const getcouponList = data => get({
  url: '/coupon',
  data
})

/**
 * 导出兑换码
 * @method GET
 * @param {*} data
 */
export const getcouponCode = (data, config) => post({
  url: '/couponCode',
  data,
  config
})

/**
 * 优惠券下线
 * @method PUT
 * @param {*} id 限时特惠id
 * @param {*} data
 */
export const putOfflinecoupon = (id, data) => put({
  url: `/coupon/${id}`,
  data
})
