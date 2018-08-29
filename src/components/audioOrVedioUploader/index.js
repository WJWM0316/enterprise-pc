import VideoUploader from './VideoUploader.vue'

VideoUploader.install = function (Vue) {
  Vue.component(VideoUploader.options.name, VideoUploader)
}

export default VideoUploader
