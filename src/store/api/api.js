import request from './request'

/**
 * GET请求
 * @param {*} url
 * @param {*} data
 * @param {*} config
 */
const get = ({url, data = {}, config = {}} = {}) => request({
  type: 'get',
  url,
  data,
  config
})

/**
 * POST请求
 * @param {*} url
 * @param {*} data
 * @param {*} config
 */
const post = ({url, data = {}, config = {}} = {}) => request({
  type: 'post',
  url,
  data,
  config
})

/**
 * PUT请求
 * @param {*} url
 * @param {*} data
 * @param {*} config
 */
const put = ({url, data = {}, config = {}} = {}) => request({
  type: 'put',
  url,
  data,
  config
})

/**
 * DELETE请求
 * @param {*} url
 * @param {*} data
 * @param {*} config
 */
const DELETE = ({url, data = {}, config = {}} = {}) => request({
  type: 'delete',
  url,
  data,
  config
})

export { get, post, put, DELETE, request }
