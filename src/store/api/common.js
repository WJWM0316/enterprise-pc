/**
 * 权限模块api
 */
import { request } from './index.js'

// 上传问价文件
export const uploadApi = data => request('/attaches', 'post', data)
// 获取上传配置
export const postUploadConfigApi = data => request('/attaches/config', 'post', data)
