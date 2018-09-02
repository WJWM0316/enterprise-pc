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
  watch: {
    fileLink: {
      handler (fileLink) {
        this.fileLink = fileLink
      },
      immediate: true
    }
  },
  /* eslint-disable */
  methods: {
    ...mapActions(['showMsg'])
  },
  /* eslint-enable */
})
export default class VideoViewer extends Vue {

	close() {
    this.show = !this.show
  }

  copy(e) {
    const clipboard = new Clipboard('.btn')
    clipboard.on('success', (e) => {
      this.showMsg({ content: '复制成功~', type: 'success', duration: 5000 })
      e.clearSelection();
    })
    clipboard.on('error', (e) => {
      this.showMsg({ content: '复制失败~', type: 'error', duration: 5000 })
    })
  }
}
