/**
 * 工具函数类
 */
import moment from 'moment'
/* eslint-disable */
class Util {

  /**
   * 设置页面链接query参数
   * @param {*} key
   * @param {*} value
   * @param {*} replace 是否使用replace替换路由
   */
  setPathQuery (key, value, replace = false) {
    // 如果传入单个对象，则拆分
    if (key instanceof Object && !(key instanceof Array)) {
      for (let [k, v] of Object.entries(key)) {
        this.setPathQuery(k, v)
      }
      return
    }
    const path = this.$route.path
    const query = Object.assign({}, this.$route.query)
    if (value || value === 0) {
      if (value instanceof Array) {
        // 如果是数组，则用逗号拼装
        query[key] = value.join(',')
      } else if (value instanceof Object) {
        // 如果是对象，则转换成字符串
        query[key] = JSON.stringify(value)
      } else {
        query[key] = value
      }
    } else {
      delete query[key]
    }

    if (!query[key] && value !== 0) {
      delete query[key]
    }

    // 替换新路由
    const newRoute = {
      path,
      query
    }
    if (replace) {
      this.$router.replace(newRoute)
    } else {
      this.$router.push(newRoute)
    }
  }

  /**
   * 过滤请求参数
   * @param {Object} params
   * @return {Object}
   */
  filterParams (params) {
    if (!(params instanceof Object) || params instanceof Array) {
      return params
    }

    const result = {}
    for (let [key, value] of Object.entries(params)) {
      // 空数组、空对象、非0的空值，跳过赋值
      if ((value instanceof Array && value.length <= 0) ||
          (value instanceof Object && Object.keys(value).length <= 0) ||
          (value !== 0 && !value)) {
        continue
      }

      result[key] = value
    }

    return result
  }

  /**
   * 根据键值从源对象中抽取对象
   * @param {Object} source 源对象
   * @param {Array} keys 键值数组
   * @param {Object} keyOptions 键值转换对象
   */
  getObjectByKeys (source, keys, keyOptions = {}) {
    const obj = {}
    for (let [key, value] of Object.entries(source)) {
      if (keys.indexOf(key) > -1) {
        const objKey = keyOptions[key] ? keyOptions[key] : key
        obj[objKey] = value
      }
    }

    return obj
  }

  // 获取cookie
  getcookie(name) {
   const arr = document.cookie.match(new RegExp('[sS]*'+ name +'=([^;]*)'))
   if(arr !== null)
    return unescape(arr[1])
   return null
  }
  
  /**
   * 改变数组某项索引（直接修改源数组）
   * @param {Array} array 操作数组
   * @param {Number} index 修改索引的目标项索引
   * @param {Number} targetIndex 目标索引
   * @return {Array} 返回结果数组
   */
  changeArrayItemIndex (array, index, targetIndex) {
    const items = array.splice(index, 1)
    array.splice(targetIndex, 0, ...items)
    return array
  }

  /**
   * 判断是否是绝对url路径
   * @param {String} url
   */
  isAbsoulteURL (url) {
    const reg = /^(https?:\/\/)/
    return reg.test(url)
  }

  /**
   * 列表页从url query获取初始数据
   * @param {*} source 初始表单对象(用于判断是否赋值)
   * @param {*} queryParams url query对象
   * @param {*} types 需要强制转换的类型对象，如 { title: 'string' }
   */
  getListInitDataByQueryParams (source = {}, queryParams = {}, types = {}) {
    const form = {}
    const pagination = {}
    for (let [key, value] of Object.entries(queryParams)) {
      if (!/(page|pageSize)/.test(key)) {
        if (typeof source[key] === 'undefined') {
          continue
        }

        if (types[key]) {
          // 如果存在强制类型转换
          switch (types[key]) {
            case 'string':
              form[key] = value.toString()
              break
            case 'number':
              form[key] = parseFloat(value)
              break
            case 'array':
              form[key] = value.split(',')
              break
            case 'object':
              form[key] = JSON.parse(value)
              break
            default:
              form[key] = value
          }
        } else {
          // 如果没有强制类型转换就采用默认的类型转换
          if (Number(value)) {
            form[key] = parseFloat(value)
          } else if (source[key] instanceof Array) {
            form[key] = value.split(',')
          } else if (source[key] instanceof Object) {
            form[key] = JSON.parse(value)
          } else {
            form[key] = value
          }
        }
      } else {
        pagination[key] = parseInt(value)
      }
    }

    return {
      form,
      pagination
    }
  }

  /**
   * 换行符转换br标签
   * @param reverse 是否反向转换（将br标签转换成换行符），默认false
   */
  transformBlank (source, reverse = false) {
    if (!source) {
      return ''
    }

    source = source.toString()
    return reverse
      ? source.replace(/<br\s*\/?>/g, '\n').replace(/&nbsp;/g, ' ')
      : source.replace(/\n\s*\r/g, '<br/>').replace(/\n/g, '<br/>').replace(/\r/g, '<br/>').replace(/\s/g, '&nbsp;')
  }

  /**
   * 保留小数点后n位
   * @param {Number} num
   * @param {*} fractionDigits 位数
   * @param {*} type 保留值类型：round=>四舍五入，ceil=>往上增，floor=>直接截取
   */
  toFixed (num, fractionDigits, type = 'round') {
    if (typeof num !== 'number') {
      return
    }
    const offsets = {
      round: 0.5,
      ceil: 0.9,
      floor: 0.1
    }
    return parseInt(num * Math.pow(10, fractionDigits) + offsets[type]) / Math.pow(10, fractionDigits)
  }

  /**
   * 下载文件
   * @param {Blob} fileBlob 文件Blob对象
   * @param {String} suffix 文件后缀名
   */
  downloadFile (fileBlob, filename, suffix = 'xlsx') {
    const url = URL.createObjectURL(fileBlob)
    const downloadLink = document.createElement('a')
    downloadLink.download = `${filename || moment(new Date()).format('YYYY-MM-DD')}.${suffix}`
    downloadLink.href = url
    downloadLink.style.display = 'none'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
}

export default new Util()
