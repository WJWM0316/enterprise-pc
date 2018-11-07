/**
 * 所有课节对应的接口请求
 */
import { request } from './index.js'
// import Qs from 'qs'

// 获取书籍列表
export const getBooksListApi = params => request(`books`, 'get', params)

// 设置书籍状态
export const setBooksStatusApi = params => request(`/books/setBookStatus/${params.id}`, 'patch', params)

// 书籍一级标签列表
export const getBooksFirstListApi = params => request('/books/tagList', 'get')



