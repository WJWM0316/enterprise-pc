/**
 * 文章管理模块接口
 */
import { post } from './api'

/**
 * 获取小课订单列表
 * @method POST
 * @param {*} data
 * @param {*} config
 */
export const getCourseOrderList = (data, config) => post({
  url: '/order/courseLists',
  data,
  config
})

/**
 * 获取小课订单详情
 * @method POST
 * @param {*} data
 */
export const getCourseOrderInfo = data => post({
  url: '/order/courseDetails',
  data
})

/**
 * 获取电子书订单列表
 * @method POST
 * @param {*} data
 * @param {*} config
 */
export const getBookOrderList = (data, config) => post({
  url: '/order/bookLists',
  data,
  config
})

/**
 * 获取电子书订单详情
 * @method POST
 * @param {*} data
 */
export const getBookOrderInfo = data => post({
  url: '/order/bookDetails',
  data
})

/**
 * 获取充值（IAP）订单列表
 * @method POST
 * @param {*} data
 * @param {*} config
 */
export const getIAPOrderList = (data, config) => post({
  url: '/order/iapLists',
  data,
  config
})

/**
 * 获取充值（IAP）订单详情
 * @method POST
 * @param {*} data
 */
export const getIAPOrderInfo = data => post({
  url: '/order/iapDetails',
  data
})

/**
 * 获取社区报名订单列表
 * @method POST
 * @param {*} data
 * @param {*} config
 */
export const getCommunityApplyOrderList = (data, config) => post({
  url: '/order/beaconCommunity',
  data,
  config
})

/**
 * 获取社区报名订单详情
 * @method POST
 * @param {*} data
 */
export const getCommunityApplyOrderInfo = data => post({
  url: '/order/beaconCommunityDetails',
  data
})
