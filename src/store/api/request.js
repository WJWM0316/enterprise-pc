import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@/store'

Vue.use(VueAxios, axios)

// 动态设置本地和线上接口域名
Vue.axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://demo2016.thetiger.com.cn'

const minLoadingTime = 1000 // 最小loading时长
let requestCount = 0 // 当前请求数
export const request = ({type = 'post', url, data = {}, config = {}} = {}) => {
  const globalLoading = data.globalLoading
  if (data.globalLoading) {
    delete data.globalLoading
  }
  if (globalLoading && ++requestCount > 0) {
    store.dispatch('showAjaxLoading')
  }
  let datas = type === 'get' ? { params: data } : data
  const startTime = new Date() // 请求的起始时间点

  // 隐藏loading公共方法
  const hideLoading = () => {
    // 如果请求时间不超过最小时长，则延迟关闭loading
    const diff = new Date().getTime() - startTime.getTime()
    if (!globalLoading || --requestCount > 0) return

    if (diff < minLoadingTime) {
      setTimeout(() => {
        store.dispatch('hideAjaxLoading')
      }, minLoadingTime - diff)
    } else {
      store.dispatch('hideAjaxLoading')
    }
  }

  return Vue.axios[type](url, datas, config)
    .catch(response => {
      hideLoading()
      if (Vue.axios.isCancel(response)) {
        return Promise.reject(response)
      } else {
        /* eslint-disable prefer-promise-reject-errors */
        return Promise.reject({ code: 500, message: '服务器繁忙' })
      }
    })
    .then((response) => {
      hideLoading()
      let { data } = response
      if (typeof data === 'string') { // 转换返回json
        data = JSON.parse(data)
      }
      if (data && data instanceof Blob) {
        return data
      }
      if (data && data.status_code === 200) {
        return data.data === undefined ? {} : data.data
      }
      if (data && data.status_code === 401) {
        location.href = data.data.login_url
        Promise.reject(data)
      }
      return Promise.reject(data)
    })
    .catch(err => {
      hideLoading()
      return Promise.reject(err)
    })
}

export default request
