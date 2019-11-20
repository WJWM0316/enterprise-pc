/**
 * 所有工作圈对应的接口请求
 */
/* eslint-disable */
import { request } from './index.js'
import Qs from 'qs'

// 获取工作圈列表
export const getJobCircleListsApi = params => request('/job/circle', 'get', params)
// 获取获取工作圈组织列表
export const getJobCircleOrganizationListsApi = params => request(`/job/circleorganization/${params.id}`, 'get')
// 获取工作圈不可见成员
export const getJobCircleHitListsApi = params => request(`/job/circlehit/${params.id}`, 'get')
// 获取工作圈成员
export const getJobCircleMemberListsApi = params => request(`/job/circlemember/${params.id}`, 'get')
// 编辑工作圈
export const putJobCircleApi = data => request(`/job/circle/${data.id}`, 'put', Qs.stringify(data))
// 获取工作圈详情
export const getJobCircleDetailsApi = params => request(`/job/circle/${params.id}`, 'get')
// 添加工作圈
export const postJobCircleApi = data => request('/job/circle', 'post', Qs.stringify(data))
// 获取分组成员列表
export const getGroupListsApi = params => request('/group', 'get', params)
// 获取工作圈帖子列表
export const getJobCircleNoteListsApi = params => request(`/jobcircle/postlist/${params.id}`, 'get', params)
// 获取工作圈一级评论
export const getJobCircleCommentFirstListsApi = params => request(`/jobcircle/comment/commentList/${params.id}`, 'get', params)
// 获取工作圈二级评论
export const getJobCircleCommentSecondListsApi = params => request(`/jobcircle/comment/replyList/${params.id}`, 'get', params)
// 【工作圈】搜索一级评论
export const getJobCircleCommentSearchListsApi = params => request('/jobcircle/searchComment', 'get', params)
// 【工作圈】设置热评
export const setJobCircleHotCommentApi = params => request(`/jobcircle/comment/hot/${params.id}`, 'put', params)
// 【工作圈】取消热评
export const cancleJobCircleHotCommentApi = params => request(`/jobcircle/comment/hot/${params.id}`, 'delete', params)
// 【工作圈】删除评论
export const deleteJobCircleCommentApi = params => request(`/jobcircle/comment/${params.id}`, 'delete')
// 【工作圈】恢复已删除评论
export const recoverJobCircleCommentApi = params => request(`/jobcircle/comment/recover/${params.id}`, 'post', params)
// 【工作圈】删除帖子
export const deleteJobCircleNoteApi = params => request(`/jobcircle/post/${params.id}`, 'delete')
// 【工作圈】设置置顶帖子
export const setJobCircleNotetoTopApi = params => request('/jobcircle/post/stick', 'put', params)
// 【工作圈】取消置顶帖子
export const cancleJobCircleNotetoTopApi = params => request('/jobcircle/post/nostick', 'put', params)
// 获取工作圈帖子详情
export const getJobCircleNoteDetailApi = params => request(`/jobcircle/post/${params.id}`, 'get')
// 添加工作圈帖子
export const postJobCircleNoteApi = params => request('/jobcircle/post', 'post', params)
// 圈主设置工作圈帖子隐藏/公开
export const updateJobCircleNoteVisibleApi = params => request('/jobcircle/post/visible', 'put', params)
// 获取工作圈分月相册
export const getJobCircleAlbumApi = params => request(`/jobcircle/picture/${params.id}`, 'get', params)
// 获取工作圈所有帖子
// export const getJobCircleFilesApi = params => request(`/jobcircle/files/${params.id}`, 'get', params)
// 获取工作圈所有帖子链接分页
export const getJobCircleUrlsApi = params => request(`/jobcircle/urls/${params.id}`, 'get', params)
// 工作圈帖子删除恢复
export const recoverJobCircleNoteApi = params => request('/jobcircle/post/recover', 'put', params)
// 获取工作圈帖子的置顶数
export const getJobCircleTopNumApi = params => request(`/jobcircle/toppost/${params.id}`, 'get')
// 取工作圈帖子图片/视频/文件/链接
export const getJobCircleFilesApi = params => request(`/jobcircle/files/${params.id}`, 'get')