import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'discount-input',
  props: {
    value: [Number, String],
    // 类型,0=>默认 1=>带确定按钮
    type: {
      type: Number,
      default: 0
    },
    // 最小值
    min: {
      type: Number,
      default: 0.01
    },
    // 最大值
    max: {
      type: Number,
      default: 9.99
    },
    // 跨度
    step: {
      type: Number,
      default: 1
    }
  },
  watch: {
    value: {
      handler (val) {
        this.discount = val || ''
        // if (this.discount instanceof Number) {
        //   this.discount = this.discount.toFixed(2)
        // }
      },
      immediate: true
    }
  }
})
export default class DiscountInput extends Vue {
  discount = ''
  oldDiscount = ''

  // 提示文本
  get placeholer () {
    return this.type === 0 ? '' : '请输入'
  }

  /**
   * 清除
   */
  clear () {
    this.discount = ''
    this.oldDiscount = ''
  }

  /**
   * 更新数据
   */
  update () {
    let discount = Number(this.discount)
    if (this.oldDiscount === this.discount) {
      return
    }

    const reg = /^((([0-9])(\.[0-9]{1,2})?)|(10(\.0+)?))$/
    let valid = true
    if (!discount && discount !== 0) {
      this.clear()
      valid = false
      this.$emit('input-error', { type: 'type' })
    } else if (discount < this.min) {
      this.clear()
      valid = false
      this.$emit('input-error', { type: 'min' })
    } else if (discount > this.max) {
      console.log(discount)
      this.clear()
      valid = false
      this.$emit('input-error', { type: 'max' })
    } else if (!reg.test(discount)) {
      // discount = parseFloat(discount.toFixed(2))
      discount = this.$util.toFixed(discount, 2, 'floor')
    }

    if (valid) {
      this.discount = discount
      this.$emit('input', this.discount)
      this.$emit('change', this.discount)
    }

    return valid
  }

  /**
   * 获取焦点
   */
  handleFocus () {
    this.oldDiscount = this.discount
  }

  /**
   * 失去焦点，更新数据
   */
  handleBlur () {
    if (this.type === 0) {
      this.update()
    }
  }

  /**
   * 点击增加
   */
  handleAdd () {
    let discount = parseFloat(this.discount || 0) + 1
    if (discount > this.max) {
      discount = this.max
    }
    this.discount = discount
    this.handleBlur()
  }

  /**
   * 点击减少
   */
  handleMinus () {
    let discount = parseFloat(this.discount || 0) - 1
    if (discount < this.min) {
      discount = this.min
    }
    this.discount = discount
    this.handleBlur()
  }

  /**
   * 点击确认
   */
  handleConfirm () {
    if (this.update()) {
      this.$emit('confirm', this.discount)
    }
  }

  /**
   * 取消
   */
  handleCancel () {
    this.$emit('cancel')
  }
}
