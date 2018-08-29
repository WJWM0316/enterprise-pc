import AudioUploader from './AudioUploader.vue'

AudioUploader.install = function (Vue) {
  Vue.component(AudioUploader.options.name, AudioUploader)
}

export default AudioUploader
