import ImageCardUploader from './ImageCardUploader.vue'

ImageCardUploader.install = function (Vue) {
  Vue.component(ImageCardUploader.options.name, ImageCardUploader)
}

export default ImageCardUploader
