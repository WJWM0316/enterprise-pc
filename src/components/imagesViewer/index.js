import Vue from 'vue'
import Component from 'vue-class-component'
import Swiper from 'swiper'

@Component({
  props: {
    show: {
      type: Boolean,
      default: true
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
    }
  }
})
export default class ComponentImagesViewer extends Vue {
  swiper1 = null
  visiable = false
  mounted() {
    this.$nextTick(function() {
      this.swiper1 = new Swiper('.swiper-container', {
        navigation: {
          nextEl: '.my-btn-next',
          prevEl: '.my-btn-prev',
        },
        observer:true
      })
    })
  }

  close() {
    this.visiable = false
  }
}
