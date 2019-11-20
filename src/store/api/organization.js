/**
 * 所有组织对应的接口请求
 */
/* eslint-disable */
import { request } from './index.js'

//获取成员列表
export const getMemberListApi = params => request('/member', 'get', params)

// 添加成员
export const addMemberApi = params => request('/member/create', 'post', params)

// 编辑成员资料
export const editMemberApi = params => request(`/member/${params.id}/edit`, 'post',params)

// 删除成员
export const deleteMemberApi = params => request(`/member/${params.id}`, 'delete', params)

// 获取学员信息
export const getMemberInfoApi = params => request(`/member/info/${params.id}`, 'get', params)

// Excel导入成员信息
export const importMemberByExcelApi = params => request(`/member/importMemberByExcel/${params.fileId}`, 'post', params)

// 提交获取上传基本信息
export const downloadMsgApi = params => request('/member/excelDemo', 'get')



//获取分组列表
export const getGroupListApi = params => request('/group', 'get', params)

// 添加分组
export const addGroupApi = params => request('/group/create', 'get', params)

// 编辑分组资料
export const editGroupApi = params => request(`/group/${params.id}/edit`, 'get',params)

// 删除分组
export const deleteGroupApi = params => request(`/group/${params.id}`, 'delete', params)

// 更新分组排序
export const putGroupApi = params => request(`/group/${params.id}`, 'put', params)

// 获取内容管理员可操作的分组
export const getContentAdminGroupApi = params => request(`/group/contentAdminGroup/${params.id}`, 'get', params)


// 公司信息
export const getContentAdminGroupApi1 = params => request(`/group/contentAdminGroup/${params.id}`, 'get', params)



