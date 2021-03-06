/**
 * 所有导师对应的接口请求
 */
import { request } from './index.js'
import Qs from 'qs'

//获取导师列表
export const getTutorListApi = params => request('/tutor', 'get', params)

// 删除外部导师
export const deletetTutorApi = params => request(`/tutor/${params.id}`, 'delete', Qs.stringify(params))

// 搜索外部导师
export const searchTutorApi = params => request(`/tutor/search/${params.mobile}`, 'get')

// 创建外部导师
export const createTutorApi = params => request(`/tutor/create/`, 'post', Qs.stringify(params))

// 添加搜索的外部导师
export const addSearchTutorApi = params => request(`/tutor/addSearchTutor/${params.mobile}`, 'put', params)
