// http://web.xplus.ziwork.com/laohu/api/docs#
import axios from 'axios'
import { Loading } from 'element-ui'
import { removeAccessToken, getAccessToken } from '@/store/cacheService'
import Cookies from 'js-cookie'
let company = Cookies.get('code')
let loadingInstance = null

// if(!company) {
//   window.location.href = process.env.VUE_APP__LOGIN_URL
// }

if(process.env.NODE_ENV === 'development') {
  company = process.env.VUE_APP__TEST_COMPANY
  Cookies.set('Authorization-Sso', process.env.VUE_APP__TEST_SSO_TOKEN)
}

export const API_ROOT = `${process.env.VUE_APP_API}/${company}`
export const WEBSOKET_API = `${process.env.VUE_APP__WEBSOKET_API}/${company}`

// 请求的跟地址
export const upload_api = `${API_ROOT}/attaches`

axios.defaults.baseURL = API_ROOT
// 请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers.common['Authorization'] = getAccessToken()
    config.headers.common['Authorization-Sso'] = Cookies.get('Authorization-Sso')
    return config
  },
  error => {
    return Promise.error(error)
  }
)

axios.interceptors.response.use(
  res => {
    // window.localStorage.removeItem('UFC')
    if (loadingInstance) loadingInstance.close()
    return res
  },
  err => {
    // 登陆过期或者未登录
    if(err.response.data.httpStatus === 401) {
      removeAccessToken()
      Cookies.remove('Authorization-Sso', { path: '' })
      window.location.href = process.env.VUE_APP__LOGIN_URL
      return
    }
    // 还没有修改密码
    // if(err.response.data.httpStatus === 400 && err.response.data.code === 801) {
    //   window.localStorage.setItem('UFC', 1)
    // }
    if(loadingInstance) loadingInstance.close()
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
