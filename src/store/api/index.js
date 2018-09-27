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

// 请求的跟地址
export const upload_api = `${window.location.origin}/tiger/attaches`

// 请求超时时间
// axios.defaults.timeout = 10000
// axios.defaults.withCredentials = true
// axios.defaults.crossDomain = true
if(process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://web.xplus.ziwork.com/tiger/'
}
axios.defaults.headers.common['token'] = getAccessToken()
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
    // 跳转登陆页面
    router.push({name: 'login'})
    // 移除本地缓存的token
    removeAccessToken()
  } else {
    return Promise.reject(error.response)
  }
})


export const request = (url, method, params = {}) => {
  if (params.globalLoading) {
    loadingInstance = Loading.service({})
    delete params.globalLoading
  }
  const realurl = getAccessToken() ? `${url}?token=${getAccessToken()}` : url
  switch(method) {
    case 'get':
      return axios.get(url, { params: {...params, token: getAccessToken()} })
    case 'post':
      return axios.post(realurl, params)
    case 'put':
      return axios.put(realurl, params)
    case 'delete':
      return axios.delete(realurl, params)
    case 'patch':
      return axios.patch(realurl, params)
    default:
      break
  }
}
