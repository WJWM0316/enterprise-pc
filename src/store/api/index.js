// http://web.xplus.ziwork.com/laohu/api/docs#
import axios from 'axios'
import { Loading } from 'element-ui'
import router from '@/router/index'
let loadingInstance = null

const company = location.href.split('/')[3]

import { removeAccessToken } from '@/store/cacheService'

export const API_ROOT = process.env.NODE_ENV === 'development' ? `http://web.xplus.ziwork.com/${company}` : `${process.env.VUE_APP_API}/${company}`

// 请求的跟地址
export const upload_api = `${API_ROOT}/attaches`

axios.defaults.baseURL = API_ROOT
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // config.headers.common['Authorization'] = getAccessToken()
    if(window.localStorage.getItem('Authorization')) {
      config.headers.common['Authorization'] = window.localStorage.getItem('Authorization')
    }
    if(window.localStorage.getItem('Authorization-Sso')) {
      config.headers.common['Authorization-Sso'] = window.localStorage.getItem('Authorization-Sso')
    }
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
      removeAccessToken()
      if(location.origin === 'http://ent.xplus.ziwork.com') {
        window.location.href = 'http://www.xplus.ziwork.com/login-manager'
      } else {
        window.location.href = 'https://www.xplus.xiaodengta.com/login-manager'
      }
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
