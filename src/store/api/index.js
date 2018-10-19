import axios from 'axios'
import { Loading } from 'element-ui'
import router from '@/router/index'
let loadingInstance = null
import { getAccessToken, removeAccessToken } from '@/store/cacheService'
export const API_ROOT = `${process.env.VUE_APP_API}`
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
    // 登陆过期或者未登录
    if(err.response.data.httpStatus === 401) {
      router.push({name: 'login'})
      removeAccessToken()
      return
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
