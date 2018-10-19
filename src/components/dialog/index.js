import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'modal-dialog',
  computed: {
    ...mapGetters(['openModal'])
  },
  model: {
    prop: 'show',
    event: 'input'
  },
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false
    },

    // 弹窗类型
    type: {
      type: String,
      default: 'alert'
    },

    //头部类型 1黄条。2 空格。3错误。4 正确
    headType: {
      type: String,
      default: '1'
    },

    //按钮类型 1默认固定宽度。2 padding
    bottomType: {
      type: String,
      default: '1'
    },

    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },

    // 弹窗标题
    title: {
      type: String,
      default: '提示'
    },

    // 弹窗内容
    content: {
      type: String,
      default: ''
    },

    // 弹窗宽度
    width: {
      type: [Number, String],
      default: 682
    },

    // 弹窗最小高度
    minHeight: {
      type: [Number, String],
      default: 90
    },

    // 确定按钮文本
    confirmText: {
      type: String,
      default: '确定'
    },

    // 取消按钮文本
    cancelText: {
      type: String,
      default: '取消'
    },

    //是否隐藏 1是。2 否
    isHideBtn: {
      type: String,
      default: '2'
    }
  },
  watch: {
    show: {
      handler(show) {
        this.visiable = show
        this.$store.dispatch('switchOpenModal', show)
      },
      immediate: true
    },
    visiable: {
      handler(visiable) {
        if (!visiable) {
          this.$emit('close')
        }
      }
    }
  }
})
export default class ComponentDialog extends Vue {

  visiable = false

  // 弹窗宽度
  get dialogWidth() {
    const width = this.width
    return width.toString().indexOf('px') >= 0 ? width : `${width}px`
  }

  // 弹窗最小高度
  get dialogMinHeight() {
    const minHeight = this.minHeight
    return minHeight.toString().indexOf('px') >= 0 ? minHeight : `${minHeight}px`
  }

  /**
   * 关闭弹窗
   */
  handleCloseDialog() {
    this.visiable = false
    this.$emit('input', this.visiable)
  }

  /**
   * 点击确定
   */
  handleConfirm() {
    this.$emit('confirm')
  }

  /**
   * 点击取消
   */
  handleCancel() {
    this.handleCloseDialog()
    this.$emit('cancel')
  }
}
