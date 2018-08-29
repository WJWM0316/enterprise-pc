/**
 * 社区管理-社区模块接口
 */
import { get, post, put, DELETE } from './api'

/**
 * 获取社区列表
 * @method GET
 * @param {*} data
 */
export const getCommunityList = data => get({
  url: '/beacon/community',
  data
})

/**
 * 获取创建社区所需数据
 * @method GET
 * @param {*} data
 */
export const getCreateCommunityData = data => get({
  url: '/beacon/community/create',
  data
})

/**
 * 创建新社区
 * @method POST
 * @param {*} data
 */
export const postCreateCommunity = data => post({
  url: '/beacon/community',
  data
})

/**
 * 获取社区数据（详情）
 * @method GET
 * @param {*} id 社区id
 * @param {*} data
 */
export const getCommunityInfo = (id, data) => get({
  url: `/beacon/community/${id}`,
  data
})

/**
 * 获取社区数据（编辑）
 * @method GET
 * @param {*} id 社区id
 * @param {*} data
 */
export const getCommunityEdit = (id, data) => get({
  url: `/beacon/community/${id}/edit`,
  data
})

/**
 * 保存社区数据（编辑）
 * @method PUT
 * @param {*} id 社区id
 * @param {*} data
 */
export const putSaveCommunity = (id, data) => put({
  url: `/beacon/community/${id}`,
  data
})

/**
 * 获取集赞参与人列表
 * @param {*} data
 */
export const getFreeJoinList = data => get({
  url: '/beacon/community/like',
  data
})

/* ==== 社区朋友圈内容 ==== */

/**
 * 获取社区内容列表
 * @method GET
 * @param {*} data
 */
export const getCircleList = data => get({
  url: '/beacon/community/circle',
  data
})

/**
 * 获取创建社区内容所需数据
 * @method GET
 * @param {*} data
 */
export const getCreateCircleData = data => get({
  url: '/beacon/community/circle/create',
  data
})

/**
 * 新增内容表单数据
 * @method GET
 * @param {*} data
 */
export const getCreateCircleData2 = data => get({
  url: `/beacon/community/${data}/circle/create`
})

/**
 * 创建新社区内容
 * @method POST
 * @param {*} data
 */
export const postCreateCircle = data => post({
  url: '/beacon/community/circle',
  data
})

/**
 * 获取社区内容数据（详情）
 * @method GET
 * @param {*} id 社区内容id
 * @param {*} data
 */
export const getCircleInfo = (id, data) => get({
  url: `/beacon/community/circle/${id}`,
  data
})

/**
 * 获取社区内容数据（编辑）
 * @method GET
 * @param {*} id 社区内容id
 * @param {*} data
 */
export const getCircleEdit = (id, data) => get({
  url: `/beacon/community/circle/${id}/edit`,
  data
})

/**
 * 保存社区内容数据（编辑）
 * @method PUT
 * @param {*} id 社区内容id
 * @param {*} data
 */
export const putSaveCircle = (id, data) => put({
  url: `/beacon/community/circle/${id}`,
  data
})

/* ==== 社区精选动态 ==== */

/* ==== 交流社区 ==== */

/**
 * 获取交流社区列表
 * @method GET
 * @param {*} data
 */
export const getExchangeList = data => get({
  url: '/beacon/community/communications',
  data
})

/**
 * 一级评论
 * @method GET
 * @param {*} data
 */
export const getEcStairList = data => get({
  url: '/beacon/community/communications/comment',
  data
})

/**
 * 二级评论
 * @method GET
 * @param {*} data
 */
export const getEcSecondList = data => get({
  url: '/beacon/community/communications/comment/subreview',
  data
})

/**
 * 删除帖子
 * @method GET
 * @param {*} data
 */
export const delPost = (data) => DELETE({
  url: `/beacon/community/communications/${data.post_id}?modelType=${data.modelType}`
})

/**
 * 删除评论
 * @method GET
 * @param {*} data
 */
export const delComment = (id) => DELETE({
  url: `/beacon/community/communications/comment/${id}`
})

/**
 * 上下热评
 * @method GET
 * @param {*} data
 */
export const exchangeToHot = (id, data) => put({
  url: `/beacon/community/communications/comment/${id.comment_id}`,
  data
})

/* ==== 交流社区 ==== */

/**
 * 修改内容精选状态
 * @method PUT
 * @param {*} id
 * @param {*} data
 */
export const putUpdateSelection = (id, data) => put({
  url: `/beacon/community/circle/selection/${id}`,
  data
})

/**
 * 新修改内容精选状态
 * @method PUT
 * @param {*} id
 * @param {*} data
 */
export const neWutUpdateSelection = (id, data) => put({
  url: `/beacon/community/circleSelection/${id}?type=${data.type}`
})

/**
 * 获取社区内容列表
 * @method GET
 * @param {*} data
 */
export const getSelectionList = data => get({
  url: '/beacon/community/circle/selection',
  data
})

/**
 * 新增交流社区表单数据获取
 * @method GET
 * @param {*} id 社区id
 * @param {*} data
 */
export const getAddPostMsg = (id, data) => get({
  url: `beacon/community/${id}/communications/create`,
  data
})

/**
 * 新增交流社区（帖子）
 * @method post
 * @param {*} id 社区id
 * @param {*} data
 */
export const postAdd = (communityId, data) => post({
  url: `beacon/community/${communityId}/communications`,
  data
})

/**
 * 编辑交流社区（帖子）
 * @method post
 * @param {*} id 社区id
 * @param {*} data
 */
export const postEdit = (communicationId, data) => put({
  url: `beacon/community/communications/${communicationId}`,
  data
})

/**
 * 修改交流社区表单数据
 * @method GET
 * @param {*} id 社区id
 * @param {*} data
 */
export const getEditPostMsg = (communicationId, data) => get({
  url: `beacon/community/communications/${communicationId}/edit`,
  data
})
