import Vue from 'vue'
import Component from 'vue-class-component'
import Clipboard from 'clipboard'

@Component({
	props: {
    // 是否显示
    show: {
      type: Boolean,
      default: true
    },
    fileLink: {
      type: String,
      default: 'http://www.w3school.com.cn/i/movie.ogg'
    }
  },
  model: {
    prop: 'show',
    event: 'input'
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
          this.$emit('input')
        }
      }
    },
    fileLink: {
      handler (fileLink) {
        this.fileLink = fileLink
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['showMsg'])
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
