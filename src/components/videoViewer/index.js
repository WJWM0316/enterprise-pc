import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
	props: {
    // 是否显示
    show: {
      type: Boolean,
      default: true
    },
    videoLink: {
      type: String,
      default: 'http://www.w3school.com.cn/i/movie.ogg'
    }
  },
  watch: {
    videoLink: {
      handler (videoLink) {
        this.videoLink = videoLink
      },
      immediate: true
    }
  }
})
export default class ComponentVideoViewer extends Vue {

	close() {
    this.show = !this.show
  }

  download() {
    const newBlank = window.open(this.videoLink, '_blank')
    setTimeout(() => {
      newBlank.close()
    }, 5000)
  }
}
