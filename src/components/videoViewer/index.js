import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
	props: {
    // 是否显示
    show: {
      type: Boolean,
      default: true
    },
    // 是否显示
    data: {
      type: Object,
      default: {}
    }
  },
  model: {
    prop: 'show',
    event: 'close'
  },
  watch: {
    show: {
      handler(show) {
        this.visiable = show
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
export default class ComponentVideoViewer extends Vue {

	visiable = false
  close() {
    this.visiable = false
  }
}
