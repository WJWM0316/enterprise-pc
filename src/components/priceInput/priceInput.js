import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'price-input',
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
      default: 0
    },
    // 最大值
    max: {
      type: Number,
      default: 3000
    }
  },
  watch: {
    value: {
      handler (val) {
        this.price = val
        // if (this.price instanceof Number) {
        //   this.price = this.price.toFixed(2)
        // }
      },
      immediate: true
    }
  }
})
export default class PriceInput extends Vue {
  price = ''
  oldPrice = ''

  // 提示文本
  get placeholer () {
    return this.type === 0 ? '' : '请输入'
  }

  /**
   * 清除
   */
  clear () {
    this.price = ''
    this.oldPrice = ''
  }

  /**
   * 更新数据
   */
  update () {
    let price = Number(this.price)
    if (this.oldPrice === this.price) {
      return
    }

    const reg = new RegExp(`^((([0-9])(\\.[0-9]{1,2})?)|(${this.max}(\\.0+)?))$`)
    let valid = true
    if (!price && price !== 0) {
      this.clear()
      valid = false
      this.$emit('input-error', { type: 'invalid' })
    } else if (price < this.min) {
      this.clear()
      valid = false
      this.$emit('input-error', { type: 'min' })
    } else if (price > this.max) {
      this.clear()
      valid = false
      this.$emit('input-error', { type: 'max' })
    } else if (!reg.test(price.toString())) {
      // price = parseFloat(price.toFixed(2))
      price = this.$util.toFixed(price, 2, 'floor')
    }

    if (valid) {
      this.price = price
      this.$emit('input', this.price)
      this.$emit('change', this.price)
    }

    return valid
  }

  /**
   * 获取焦点
   */
  handleFocus () {
    this.oldPrice = this.price
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
   * 点击确认
   */
  handleConfirm () {
    if (this.update()) {
      this.$emit('confirm', this.price)
    }
  }

  /**
   * 取消
   */
  handleCancel () {
    this.$emit('cancel')
  }
}
