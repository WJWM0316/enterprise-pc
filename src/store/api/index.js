/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
import QS from 'qs'
import { Loading } from 'element-ui'
let loadingInstance = null
import store from '@/store'
import { getAccessToken } from '@/store/cacheService'

// 请求的跟地址
let API_ROOT = null

// 环境的切换
switch (process.env.NODE_ENV) {
  case 'development':
    API_ROOT = 'http://web.xplus.ziwork.com/tiger'
    break
  case 'production':
    API_ROOT = 'http://www.test2.com'
    break
  default:
    break
}

// 请求超时时间
axios.defaults.timeout = 10000
axios.defaults.baseURL = API_ROOT
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // config.headers['Authorization'] = getAccessToken()
    return config
  },
  error => {
    return Promise.error(error)
  }
)

axios.interceptors.response.use(response => {
  if (loadingInstance) {
    loadingInstance.close()
  }
  return response
}, error => {

  if (loadingInstance) {
    loadingInstance.close()
  }
  return Promise.reject(error.response)
})

export const request = (url, method, params) => {
  if (params.globalLoading) {
    loadingInstance = Loading.service({})
    delete params.globalLoading
  }
  return axios[method](url, method === 'get' || method === 'delete' ? { params } : QS.stringify(params))
}
