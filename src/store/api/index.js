/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
import QS from 'qs'
import { Loading } from 'element-ui'
import router from '@/router/index'
let loadingInstance = null
// import store from '@/store'
import { getAccessToken } from '@/store/cacheService'

// 请求的跟地址
export const API_ROOT = process.env.NODE_ENV === 'development' ? `http://web.xplus.ziwork.com/tiger` : ''

// 请求超时时间
axios.defaults.timeout = 10000
axios.defaults.baseURL = API_ROOT
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截器
axios.interceptors.request.use(
  config => {
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
  if(error.response.data.httpStatus === 401) {
    router.push({name: 'login'})
  } else {
    return Promise.reject(error.response)
  }
})

export const request = (url, method, params = {}) => {
  if (params.globalLoading) {
    loadingInstance = Loading.service({})
    delete params.globalLoading
  }
  return axios[method](getAccessToken() ? `${url}?token=${getAccessToken()}` : url, method === 'get' || method === 'delete' ? { params } : QS.stringify(params))
}
