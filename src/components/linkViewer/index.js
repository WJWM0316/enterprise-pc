import Vue from 'vue'
import Component from 'vue-class-component'
import Clipboard from 'clipboard'

@Component({
	props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false
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
export default class ComponentLinkViewer extends Vue {

	visiable = false

  close() {
    this.visiable = false
  }

  copy(e) {
    const clipboard = new Clipboard('.filelink')
    console.log(11)
    clipboard.on('success', (e) => {
      this.$message({message: '复制成功~', type: 'success'})
      e.clearSelection();
    })
    clipboard.on('error', (e) => {
      this.$message.error('您的浏览器不支持复制~');
    })
  }
}
