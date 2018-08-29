import TimeRange from './TimeRange.vue'

TimeRange.install = function (Vue) {
  Vue.component(TimeRange.options.name, TimeRange)
}

export default TimeRange
