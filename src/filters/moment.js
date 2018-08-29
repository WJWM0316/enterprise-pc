/**
 * 日期相关处理
 * --- 所有传入的时间戳单位都精确到毫秒
 */
import Vue from 'vue'
import moment from 'moment'
moment.locale('zh-cn')

/**
 * 计算年差
 * @param first
 * @param second 默认现在时间
 * @return {number}
 */
function getYearDiff (first, second = new Date()) {
  return new Date(second.getTime() - first.getTime()).getFullYear() - 1970
}

/**
 * 日期格式化
 * @param format 格式化字符串
 */
export const dateFilter = Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => value > 0 ? moment(value).format(format) : '-')

/**
 * 工作年限过滤
 */
Vue.filter('workTime', (value) => {
  const date = moment(value).toDate()
  let year = getYearDiff(date)
  if (year <= 0) {
    year = 1
  } else if (new Date().getMonth() - date.getMonth() > 1) {
    year += 1
  }

  return year
})

/**
 * 年龄过滤
 */
Vue.filter('age', (value) => getYearDiff(moment(value).toDate()))

/**
 * 时长过滤
 * @param type 0=>格式化成 mm:ss（默认） 1=>格式化成 HH:mm:ss 2=>格式化成 mm分ss秒
 */
Vue.filter('longTime', (value, type = 0) => {
  const duration = moment.duration(value)
  const hours = duration.hours()
  const minutes = duration.minutes()
  const seconds = duration.seconds()
  const format = (val) => ('00' + val).substr(val.toString().length)
  let result = ''
  const asHours = duration.asHours()
  const asMinutes = duration.asMinutes()
  switch (type) {
    case 1:
      result = format(asHours >= 24 ? asHours : hours) + ':' + format(minutes) + ':' + format(seconds)
      break
    case 2:
      result = format(minutes) + '分' + format(seconds) + '秒'
      break
    default:
      result = format(asMinutes >= 60 ? asMinutes : minutes) + ':' + format(seconds)
  }
  return result
})

/**
 * 时间段过滤(将时间段数组转换成字符串)
 */
Vue.filter('range', value => {
  if (!value || value.length < 2) {
    return ''
  }

  return `${moment(value[0]).format('YYYY-MM-DD HH:mm')} 至 ${moment(value[1]).format('YYYY-MM-DD HH:mm')}`
})
