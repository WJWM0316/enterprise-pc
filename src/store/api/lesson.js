/**
 * 课节
 */
import { get, post, put } from './api'

/**
 * 获取课节列表
 * @method GET
 * @param {*} data
 */
export const getLessonList = data => get({
  url: '/beacon/community/course',
  data
})

/**
 * 获取创建课节所需数据
 * @method GET
 * @param {*} data
 */
export const getCreateLessonData = data => get({
  url: '/beacon/community/course',
  data
})

/**
 * 创建新课节
 * @method POST
 * @param {*} data
 */
export const postCreateCourse = data => post({
  url: '/beacon/community/course',
  data
})

/**
 * 获取课节数据（详情）
 * @method GET
 * @param {*} id 课节id
 * @param {*} data
 */
export const getCourseInfo = (id, data) => get({
  url: `/beacon/community/course${id}}`,
  data
})

/**
 * 获取课节数据
 * @method GET
 * @param {*} id 课节id
 * @param {*} data
 */
export const getLessonEdit = (id, data) => get({
  url: `/beacon/community/course/${id}/edit`,
  data
})

/**
 * 保存课节数据（编辑）
 * @method PUT
 * @param {*} id 课节id
 * @param {*} data
 */
export const putSaveLesson = (id, data) => put({
  url: `/beacon/community/course/${id}`,
  data
})

/**
 * 获取成员列表
 * @method get
 * @param {*} id 课节id
 * @param {*} data
 */
export const getCommunityPeople = (data) => get({
  url: `/beacon/community/people`,
  data
})

/**
 * 获取打卡列表
 * @method get
 * @param {*} id 课节id
 * @param {*} data
 */
export const getCommunityCardList = data => post({
  url: `/beacon/community/card`,
  data
})

/**
 * 更新打卡状态
 * @method get
 * @param {*} id 课节id
 * @param {*} data
 */
export const updateCardStatus = data => post({
  url: `/beacon/community/card/excellent`,
  data
})

/**
 * 删除打卡
 * @method get
 * @param {*} id 课节id
 * @param {*} data
 */
export const delCommunityCard = data => post({
  url: `/beacon/community/card/del`,
  data
})

/**
 * 删除打卡评论
 * @method delete
 * @param {*} data
 */
export const deleteCardComment = data => post({
  url: '/beacon/community/delCardComment',
  data
})

/**
 * 获取打卡内容
 * @method delete
 * @param {*} data
 */
export const getCardContent = data => post({
  url: '/beacon/community/cardComment',
  data
})

/**
 * 更新打卡评论的热门状态
 * @method delete
 * @param {*} data
 */
export const updateCardCommentHot = data => post({
  url: '/beacon/community/cardCommentHot',
  data
})
