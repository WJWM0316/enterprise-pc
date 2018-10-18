import Vue from 'vue'
import Component from 'vue-class-component'
import Swiper from 'swiper'
// https://via.placeholder.com/1000x500
@Component({
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // 列表数据
    list: {
      type: Array,
      default() {
        return []
      }
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
    },
    list: {
      handler(list) {
        if(list.length) {
          setTimeout(() => {this.init() }, 16.7)
        }
      },
      immediate: true
    },
  }
})
export default class ComponentImagesViewer extends Vue {
  visiable = false

  close() {
    this.visiable = false
  }

  init() {
    const galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 24,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    new Swiper('.gallery-top', {
      navigation: {
        nextEl: '.my-btn-next',
        prevEl: '.my-btn-prev',
      },
      thumbs: {
        swiper: galleryThumbs
      }
    })
  }
}
