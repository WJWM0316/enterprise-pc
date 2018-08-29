/**
 * 公共接口
 */
import { post } from './api'

/**
 * 获取上传音频配置接口
 * @method POST
 * @param {*} data
 */
export const getUploadFileConfig = data => post({
  url: '/common/fileHandle/getUploadFileConfig',
  data
})

/**
 * 获取社区上传oss配置接口
 * @method POST
 * @param {*} data
 */
export const getBeaconUploadFileConfig = data => post({
  url: '/common/fileHandle/getBeaconUploadFileConfig',
  data
})

/**
 * 编辑器上传图片
 * @method POST
 * @param {*} data
 */
export const uploadImg = data => post({
  url: '/common/editor/uploadImg',
  data
})

/**
 * 编辑器上传图片base64
 * @method POST
 * @param {*} data
 */
export const uploadImgBs = data => post({
  url: '/common/fileHandle/uploadImg',
  data
})

/**
 * 上传文件到oss
 * @param {*} url
 * @param {*} data
 */
export const putUploadFileToOSS = (url, data, config) => post({
  url,
  data,
  config
})

/**
 * 列表修改排序
 * @param {*} id
 * @param {*} data
 */
export const postChangeSort = (id, data) => post({
  url: `/common/sort/${id}`,
  data
})

/**
 * 获取标签列表
 * @param {*} data
 */
export const getTagList = (data) => post({
  url: '/common/getTagList',
  data
})
