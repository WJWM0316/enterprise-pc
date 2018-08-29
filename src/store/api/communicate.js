/**
 * 成员交流
 */
import { post, get, DELETE, put } from './api'

/**
 * 获取成员交流列表
 * @method post
 * @param {*} data
 */
export const getCommunicateCommentList = data => post({
  url: '/beacon/community/communications/list',
  data
})

/**
 * 获取一级评论
 * @method post
 * @param {*} data
 */
export const getCommunicateFirstComment = data => get({
  url: '/beacon/community/communications/comment',
  data
})

/**
 * 获取二级评论
 * @method post
 * @param {*} data
 */
export const getCommunicateSecondComment = data => get({
  url: '/beacon/community/communications/comment/subreview',
  data
})
/**
 * 删除评论
 * @method delete
 * @param {*} data
 */
export const deleteCommunicateComment = data => DELETE({
  url: `/beacon/community/communications/comment/${data.comment_id}`,
  data
})

/**
 * 成员交流评论-上热评
 * @method delete
 * @param {*} data
 */
export const updateCommunicateCommentToHot = data => put({
  url: `/beacon/community/communications/comment/${data.id}`,
  data
})
