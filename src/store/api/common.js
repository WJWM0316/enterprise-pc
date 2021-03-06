/**
 * 权限模块api
 */
import { request } from './index.js'

// 上传问价文件
export const uploadApi = data => request('/attaches', 'post', data)
// 获取上传配置
export const postUploadConfigApi = data => request('/attaches/config', 'post', data)
// 获取分类
export const getCategoryListsApi = params => request('/category', 'get', params)
// 添加分类
export const getCategoryApi = params => request('/category/create', 'get', params)
// 获取成员列表
export const getMenberListsApi = params => request('/member', 'get', params)
// 获取公司信息
export const getCompanyInfoApi = params => request('/company', 'get')
// 获取分组成员列表
export const getGroupListsApi = params => request('/group', 'get', params)
//获取成员动态
export const getMemberDynamicsListApi = params => request('/member/dynamics', 'get', params)
//获取是否有最新动态
export const getMemberCheckNewDynamicsApi = params => request(`/member/checkNewDynamics/${params.timestamp}`, 'get')
// 添加成员
export const addMemberApi = params => request('/member/create', 'post', params)