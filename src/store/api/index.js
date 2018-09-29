/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
// import Qs from 'qs'
import { Loading } from 'element-ui'
import router from '@/router/index'
let loadingInstance = null
// import store from '@/store'
import { getAccessToken, removeAccessToken } from '@/store/cacheService'
export const API_ROOT = 'http://web.xplus.ziwork.com/tiger'
console.log('text')
// 请求的跟地址
export const upload_api = `${API_ROOT}/attaches`

axios.defaults.baseURL = API_ROOT
// 请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers.common['Authorization'] = getAccessToken()
    return config
  },
  error => {
    return Promise.error(error)
  }
)

axios.interceptors.response.use(
  res => {
    if (loadingInstance) loadingInstance.close()
    return res
  },
  err => {
    switch(err.response.data.httpStatus) {
      case 401:
        router.push({name: 'login'})
        removeAccessToken()
        break
      default:
        break
    }
    if (loadingInstance) loadingInstance.close()
    return Promise.reject(err.response)
  }
)


export const request = (url, method, params = {}) => {
  if (params.globalLoading) {
    loadingInstance = Loading.service({})
    delete params.globalLoading
  }
  return axios[method](url, method === 'get' ? { params } : params)
}
