import FileUploader from './FileUploader.vue'

FileUploader.install = function (Vue) {
  Vue.component(FileUploader.options.name, FileUploader)
}

export default FileUploader
