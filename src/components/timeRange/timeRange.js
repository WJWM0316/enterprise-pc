import Vue from 'vue'
import Component from 'vue-class-component'
import moment from 'moment'

@Component({
  name: 'time-range',
  model: {
    prop: 'range',
    event: 'input'
  },
  props: {
    // 选择的范围值
    range: {
      type: Array,
      default () {
        return []
      }
    },
    // 开始时间空占位符
    startPlaceholder: {
      type: String,
      default: '选择开始时间'
    },
    // 结束时间空占位符
    endPlaceholder: {
      type: String,
      default: '选择结束时间'
    },

    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    range: {
      handler (range) {
        this.start = range[0]
        this.end = range[range.length - 1]
      },
      immediate: true
    },
    start: {
      handler (start) {
        this.endDisabled = !(start && start instanceof Date)
      },
      immediate: true
    }
  }
})
export default class TimeRange extends Vue {
  start = ''
  end = ''
  format = 'yyyy-MM-dd HH:mm'
  endOptions = {
    disabledDate: function () {}
  }
  endDisabled = false

  /**
   * 动态计算禁止日期
   * @param {*} date
   */
  endDisabledDateFunc (date) {
    if (this.start && this.start instanceof Date) {
      return moment(date).isBefore(this.start, 'day')
    } else {
      return false
    }
  }

  /**
   * 更新时间
   */
  update () {
    const start = this.start
    const end = this.end
    let range = []
    if (start && start instanceof Date && end && end instanceof Date) {
      range = [start, end]
      this.$emit('input', range)
    }

    this.$emit('change', range, start, end)
  }

  /**
   * 选择开始时间
   * @param {*} value
   */
  handleChangeStart (value) {
    const start = this.start
    const end = this.end
    this.endOptions.disabledDate = this.endDisabledDateFunc

    if (start && start instanceof Date && end && end instanceof Date && start.getTime() > end.getTime()) {
      this.end = ''
    }

    this.update()
  }

  /**
   * 选择结束时间
   * @param {*} value
   */
  handleChangeEnd (value) {
    const start = this.start
    const end = this.end
    if (end.getTime() <= start.getTime()) {
      this.$message.warning('结束时间不能早于开始时间')
      this.end = start
    }

    this.update()
  }
}
