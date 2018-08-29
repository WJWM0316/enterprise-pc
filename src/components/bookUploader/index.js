import BookUploader from './BookUploader.vue'

BookUploader.install = function (Vue) {
  Vue.component(BookUploader.options.name, BookUploader)
}

export default BookUploader
