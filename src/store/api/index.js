// http://web.xplus.ziwork.com/laohu/api/docs#
import axios from 'axios'
import { Loading } from 'element-ui'
import { removeAccessToken, getAccessToken } from '@/store/cacheService'

// 获取cookie
const getcookie = (name) =>{
 const arr = document.cookie.match(new RegExp('[sS]*'+ name +'=([^;]*)'))
 if(arr !== null)
  return unescape(arr[1])
 return null
}

let company = getcookie('code')
let loadingInstance = null

/*if(!company) {
  window.location.href = process.env.VUE_APP__LOGIN_URL
}*/

if(process.env.NODE_ENV === 'development') {
  company = process.env.VUE_APP__TEST_COMPANY
  document.cookie=`Authorization-Sso=${process.env.VUE_APP__TEST_SSO_TOKEN};`
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
      removeAccessToken()
      window.location.href = process.env.VUE_APP__LOGIN_URL
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
