/**
 * 所有课节对应的接口请求
 */
import { request } from './index.js'
// import Qs from 'qs'

// 【课节打卡】获取一级评论
export const getLessonCommentFirstListsApi = params => request(`/coursesectioncard/comment/commentList/${params.id}`, 'get', params)

// 【课节打卡】搜索一级评论
export const getLessonSearchCommentListsApi = params => request('/coursesectioncard/searchComment', 'get', params)

// 【课节打卡】获取二级评论（测试commentId可使用202）
export const getLessonCommentSecondListsApi = params => request(`/coursesectioncard/comment/replyList/${params.id}`, 'get', params)

// 【课节打卡】设置热评
export const putLessonPunchApi = params => request(`/coursesectioncard/comment/hot/${params.id}`, 'put')

// 【课节打卡】取消设置热评
export const deleteLessonPunchApi = params => request(`/coursesectioncard/comment/hot/${params.id}`, 'delete')

// 【课节打卡】删除评论
export const deleteLessonPunchCommentApi = params => request(`/coursesectioncard/comment/${params.id}`, 'delete')

// 【课节打卡】恢复已删除的评论
export const postLessonPunchCommentApi = params => request(`/coursesectioncard/comment/recover/${params.id}`, 'post')

// 获取课程课节打卡列表
export const getLessonPunchListsApi = params => request(`/CourseSectionCard?jsonData=${params.jsonData}&page=${params.page}&count=${params.pageCount}`, 'get')

// 删除或者恢复课程课节打卡
export const distoryAndRegaihnLessonPunchApi = params => request(`/CourseSection/CourseSectionCard/distoryAndRegain`, 'post', params)

// 设置或者删除课程课节优秀打卡
export const setExcellentCourseCardApi = params => request(`/CourseSection/CourseSectionCard/setExcellentCourseCard`, 'post',params)

// 获取课程课节列表
export const getLessonListsApi = params => request(`/CourseSection`, 'get', params)

// 新增课程课节
export const putLessonApi = params => request(`CourseSection/${params.id}`, 'put', params)



// 新增课程课节
export const postLessonApi = params => request(`/CourseSection`, 'post', params)

//获取课程课节详情
export const getLessonEditApi = params => request(`/CourseSection/${params.id}/edit`, 'get')

//编辑课程课节
export const lessonEditApi = params => request(`/CourseSection/${params.lessonId}`, 'put', params)

//课程课节列表-修改排序
export const sortUpdateApi = params => request(`/CourseSection/sortUpdate`, 'post', params)



