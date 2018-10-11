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
  swiper = null
  visiable = false
  mounted() {
    // var galleryThumbs = new Swiper('.gallery-thumbs', {
    //   spaceBetween: 24,
    //   slidesPerView: 4,
    //   freeMode: true,
    //   watchSlidesVisibility: true,
    //   watchSlidesProgress: true,
    // });
    this.swiper = new Swiper('.gallery-top', {
      // spaceBetween: 10,
      navigation: {
        nextEl: '.my-btn-next',
        prevEl: '.my-btn-prev',
      },
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
      // thumbs: {
      //   swiper: galleryThumbs
      // }
    })
  }

  close() {
    this.visiable = false
  }
}
