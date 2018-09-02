import Vue from 'vue'
import Component from 'vue-class-component'
import Swiper from 'swiper'

@Component({
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: true
    }
  }
  // watch: {
  //   show: {
  //     handler (show) {
  //       this.visiable = show
  //     },
  //     immediate: true
  //   }
  // }
})
export default class imagesViewer extends Vue {
  mounted() {
    const galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
    const galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: true,
    });
    galleryTop.controller.control = galleryThumbs
    galleryThumbs.controller.control = galleryTop
  }

  close() {
    this.show = !this.show
  }
}
