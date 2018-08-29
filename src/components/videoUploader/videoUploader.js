import Vue from 'vue'
import Component from 'vue-class-component'
import { getBeaconUploadFileConfig, putUploadFileToOSS } from '@/api/common'

@Component({
  name: 'video-uploader',
  // model: {
  //   prop: 'src',
  //   event: 'input'
  // },
  props: {
    // 提示文本
    tips: String,

    // 视频文件名
    filename: {
      type: String,
      default: ''
    },

    // 文件接收类型,默认只支持MP4
    accept: {
      type: String,
      default: 'video/mp4'
    },

    // 文件最大大小
    maxFileSize: {
      type: Number,
      default: 50
    },

    // 是否禁止重新上传
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    filename: {
      handler (val, oldVal) {
        if (val) {
          this.status = 'success'
        }
      },
      immediate: true
    }
  }
})
export default class VideoUploader extends Vue {

  file = null // 视频文件对象
  fileInput = null // 文件选择表单对象
  video = null // 视频DOM对象
  src = '' // 视频预览src
  status = 'ready' // 文件上传状态，ready为选择文件 loading读取文件中 uploading上传中 success上传成功 error上传失败 cancel取消上传
  progress = 0 // 当前上传进度
  cancelToken = Vue.axios.CancelToken // cancel token
  cancelTokenSource = null

  // 当前选择文件名
  get chooseFilename () {
    return (this.file && this.file.name) || this.filename || ''
  }

  // 选择的文件后缀
  get fileSuffix () {
    let suffix = ''

    if (this.file && this.file.name) {
      const filename = this.file.name
      suffix = filename.substr(filename.lastIndexOf('.'))
    }

    return suffix
  }

  // 当前上传状态
  get uploadStatus () {
    let status = ''
    switch (this.status) {
      case 'ready':
        status = '未选择文件'
        break
      case 'loading':
        status = '读取文件中'
        break
      case 'uploading':
        status = '上传中'
        break
      case 'success':
        status = '上传成功'
        break
      case 'error':
        status = '上传失败'
        break
      case 'cancel':
        status = '取消上传'
    }
    return status
  }

  mounted () {
    this.fileInput = this.$refs.fileInput
    this.video = this.$refs.video

    // 更新
    this.video.addEventListener('durationchange', () => {
      if (!this.src || !this.video.src) {
        return
      }

      this.getUploadFileConfig()
    })
  }

  /**
   * 清除数据
   */
  clear () {
    this.src = ''
    this.clearFileInput()
    this.cancelUpload()
    this.file = null
    this.status = 'ready'
    this.progress = 0
  }

  /**
   * 取消上传
   */
  cancelUpload () {
    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel('已取消上传')
    }
  }

  /**
   * 清除文件域已选择的文件
   * @param {HTMLInputElement} fileInput
   */
  clearFileInput (fileInput) {
    fileInput = fileInput || this.fileInput
    if (fileInput) {
      fileInput.value = ''
    }
  }

  /**
   * 获取单个视频的url
   * @param {Object} file
   */
  getVideoURL (file) {
    let url = null
    if (window.createObjectURL !== undefined) {
      // basic
      url = window.createObjectURL(file)
    } else if (window.URL !== undefined) {
      // mozilla(firefox)
      url = window.URL.createObjectURL(file)
    } else if (window.webkitURL !== undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file)
    }
    return url
  }

  /**
   * 获取上传视频配置
   */
  async getUploadFileConfig () {
    try {
      this.status = 'uploading' // 上传中（整个获取授权到上传过程都定为上传中）
      const params = {
        file: {
          original_name: this.file.name,
          running_time: this.video.duration
        },
        file_type: 'video'
      }
      const { oss_config: ossConfig, system_config: systemConfig } = await getBeaconUploadFileConfig(params)
      this.progress = 0 // 进度重置为0
      this.uploadFile(ossConfig, systemConfig)
    } catch (e) {
      this.$message.error(e.message || '获取视频上传配置出错')
      this.status = 'error' // 统一上传失败
    }
  }

  /**
   * 上传文件
   * @param {*} ossConfig
   * @param {*} systemConfig
   */
  async uploadFile (ossConfig, systemConfig) {
    try {
      const formData = new FormData()
      this.cancelTokenSource = this.cancelToken.source()

      formData.append('name', this.file.name)
      formData.append('key', `${ossConfig.dir}${systemConfig.file_name}${this.fileSuffix}`)
      formData.append('policy', ossConfig.policy)
      formData.append('OSSAccessKeyId', ossConfig.accessid)
      formData.append('success_action_status', '200')
      formData.append('callback', ossConfig.callback)
      formData.append('signature', ossConfig.signature)
      formData.append('file', this.file)

      await putUploadFileToOSS(ossConfig.host, formData, {
        onUploadProgress: this.handleUploadProgress,
        cancelToken: this.cancelTokenSource.token
      })

      this.file.fileId = systemConfig.file_id
      this.status = 'success'
      this.$emit('success', this.file)
    } catch (e) {
      this.$message.error(e.message)
      this.status = 'error' // 统一上传失败
    }
  }

  /**
   * 上传进度
   * @param {*} progressEvent
   */
  handleUploadProgress (progressEvent) {
    this.status = 'uploading'
    this.progress = (progressEvent.loaded / progressEvent.total) * 100
    // if (this.progress >= 100) {
    //   this.status = 'success' // 进度100%，上传成功
    // }
  }

  /**
   * 选择文件
   * @param {Object} event
   */
  handleChangeFile (event) {
    let file = null
    const files = event.target.files
    if (!files || files.length <= 0) {
      console.log('文件选择错误')
      this.clearFileInput()
      return
    }
    file = files[0]
    // 判断文件类型
    if (!/^video\//.test(file.type)) {
      console.log(`文件格式不正确：${file.type}`)
      this.$emit('type-error')
      this.clearFileInput()
      return
    }
    // 判断文件大小
    if (file.size > 1024 * 1024 * this.maxFileSize) {
      console.log(`文件大小不能超过${this.maxFileSize}M`)
      this.$emit('max-size-error', this.maxFileSize)
      this.clearFileInput()
      return
    }

    if (this.status === 'uploading') {
      this.cancelTokenSource.cancel('已开始重新上传')
    }

    this.file = file
    this.status = 'loading' // 读取文件中
    const url = this.getVideoURL(file)
    this.src = url
    this.clearFileInput()
  }

  /**
   * 点击取消上传
   */
  handleCancel () {
    this.cancelUpload()
  }

  /**
   * 点击选择文件按钮
   */
  handleChoose () {
    $(this.$refs.fileInput).click()
  }
}
