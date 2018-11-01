// http://web.xplus.ziwork.com/laohu/api/docs#
import axios from 'axios'
import { Loading } from 'element-ui'
let loadingInstance = null

// 请求的跟地址
export const upload_api = `${API_ROOT}/attaches`

// 获取cookie
const getcookie = (name) =>{
 const arr = document.cookie.match(new RegExp('[sS]*'+ name +'=([^;]*)'))
 if(arr !== null)
  return unescape(arr[1])
 return null
}

const company = getcookie('code') ? getcookie('code') : 'laohu'
import { removeAccessToken, getAccessToken } from '@/store/cacheService'

export const API_ROOT = `${process.env.VUE_APP_API}/${company}`

axios.defaults.baseURL = API_ROOT
// 请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers.common['Authorization'] = getAccessToken()
    config.headers.common['Authorization-Sso'] = getcookie('Authorization-Sso')
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
      // removeAccessToken()
      // window.location.href = process.env.VUE_APP__LOGIN_URL
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
