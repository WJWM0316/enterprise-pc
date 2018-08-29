import ImageUploader from './ImageUploader.vue'

ImageUploader.install = function (Vue) {
  Vue.component(ImageUploader.options.name, ImageUploader)
}

export default ImageUploader
