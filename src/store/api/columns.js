/**
 * 栏目模块接口
 */
import { post, put, get, DELETE } from './api'

/**
 * 获取栏目下面的列表
 * @method GET
 * @param {*} data
 */
export const getColumnLists = data => post({
  url: '/beacon/community/tagCommunity',
  data
})

/**
 * 下架栏目课程
 * @method post
 * @param {*} data
 */
export const offlineRecommend = data => post({
  url: '/beacon/community/offline',
  data
})

/**
 * 添加栏目
 * @method post
 * @param {*} data
 */
export const createRecommendColumn = data => post({
  url: '/beacon/community/tagCommunity/create',
  data
})

/**
 * 获取运营位
 * @method post
 * @param {*} data
 */
export const getOperationTag = data => post({
  url: '/beacon/community/operationTag',
  data
})

/**
 * 更新排序
 * @method post
 * @param {*} data
 */
export const updateCommunitySort = data => post({
  url: '/beacon/community/updateSort',
  data
})

/**
 * 帖子列表
 * @method post
 * @param {*} data
 */
export const getCommunityNoteList = data => post({
  url: '/beacon/community/post',
  data
})

/**
 * 删除帖子
 * @method post
 * @param {*} data
 */
export const delCommunityNote = data => post({
  url: '/beacon/community/post/del',
  data
})

/**
 * 帖子置顶
 * @method post
 * @param {*} data
 */
export const makeNoteToTop = data => post({
  url: '/beacon/community/post/postTop',
  data
})

/**
 * 更新帖子精选状态
 * @method put
 * @param {*} data
 */
export const updateSelectionStatus = data => put({
  url: `/beacon/community/post/selection/${data.id}`,
  data
})

/**
 * 获取精选列表
 * @method put
 * @param {*} data
 */
export const getNoteSelectionList = data => get({
  url: `/beacon/community/selection`,
  data
})

/**
 * 下架精选
 * @method delete
 * @param {*} data
 */
export const downNoteSelection = data => DELETE({
  url: `/beacon/community/selection/${data.id}`,
  data
})

/**
 * 更改精选排序
 * @method put
 * @param {*} data
 */
export const updateNoteSelection = data => put({
  url: `/beacon/community/selection/${data.id}`,
  data
})
