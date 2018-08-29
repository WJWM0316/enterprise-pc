import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'checkbox',
  model: {
    prop: 'model',
    event: 'input'
  },
  props: {
    // 唯一标识，必须
    id: {
      required: true,
      type: String
    },

    // 原生name值
    name: String,

    // 原生checkbox的value值
    value: [String, Number],

    // 没有slot时显示的文本值
    label: String,

    // 双向绑定的值
    model: [Boolean, Array]
  },
  watch: {
    model: {
      handler (value) {
        // 如果是数组，则拷贝一个新的数组
        this.currentModel = value instanceof Array ? [].concat(value) : value
      },
      immediate: true
    }
  }
})
export default class Checkbox extends Vue {

  currentModel = false

  /**
   * 修改勾选
   */
  handleChange () {
    this.$emit('input', this.currentModel)
    this.$emit('change', this.currentModel)
  }
}
