import Vue from 'vue'
import Component from 'vue-class-component'

import { getBeaconUploadFileConfig } from '@/api/common'

@Component({
  name: 'image-card-uploader',
  model: {
    prop: 'files',
    event: 'input'
  },
  props: {
    // 文件类型
    accept: {
      type: String,
      default: 'image/png,image/jpg,image/jpeg'
    },

    // 已上传的文件列表，必须是[{ name: '', url: '' }]格式
    files: {
      type: Array,
      default () {
        return []
      }
    },

    // 文件最大大小，单位M
    maxFileSize: {
      type: Number,
      default: 4
    },

    // 图片最大张数
    maxCount: {
      type: Number,
      default: 9
    }
  }
})
export default class ImageCardUploader extends Vue {
  // 文件上传路径
  action = ''

  // 上传文件附带参数
  data = {
    name: '',
    key: '',
    policy: '',
    OSSAccessKeyId: '',
    success_action_status: '',
    callback: '',
    signature: ''
  }

  // 预览弹窗
  dialog = {
    show: false,
    imageUrl: ''
  }

  /**
   * 获取上传文件配置
   * @param {*} file
   */
  async getUploadFileConfig (file) {
    try {
      const suffix = file.name.substr(file.name.lastIndexOf('.'))
      const params = {
        file: {
          original_name: file.name,
          running_time: 0
        },
        file_type: 'image',
        globalLoading: true
      }
      const { oss_config: ossConfig, system_config: systemConfig } = await getBeaconUploadFileConfig(params)
      this.data.name = file.name
      this.data.key = `${ossConfig.dir}${systemConfig.file_name}${suffix}`
      this.data.policy = ossConfig.policy
      this.data.OSSAccessKeyId = ossConfig.accessid
      this.data.success_action_status = '200'
      this.data.callback = ossConfig.callback
      this.data.signature = ossConfig.signature
      this.action = ossConfig.host
      file.fileId = systemConfig.file_id
      return Promise.resolve()
    } catch (error) {
      this.$emit('error', error)
      return Promise.reject(error)
    }
  }

  /**
   * 上传文件前（用于获取上传配置）
   * @param {*} file
   */
  handleBeforeUpload (file) {
    // 判断文件类型
    if (!/^image\//.test(file.type)) {
      console.log(`文件格式不正确：${file.type}`)
      this.$emit('error', { type: 'fileTypeError', message: '图片文件格式不正确' })
      return false
    }

    // 判断文件大小
    if (file.size > 1024 * 1024 * this.maxFileSize) {
      console.log(`文件大小不能超过${this.maxFileSize}M`)
      this.$emit('error', { type: 'fileSizeError', data: { maxFileSize: this.maxFileSize }, message: `图片文件大小不能超过${this.maxFileSize}M` })
      return false
    }

    // 判断图片数
    if (this.files.length >= this.maxCount) {
      console.log(`图片最多只能上传${this.maxCount}张`)
      this.$emit('error', { type: 'fileCountError', data: { maxCount: this.maxCount }, message: `图片最多只能上传${this.maxCount}张` })
      return false
    }

    return this.getUploadFileConfig(file)
  }

  /**
   * 上传文件成功
   * @param {*} response
   * @param {*} file
   * @param {*} fileList
   */
  handleSuccess (response, file, fileList) {
    file.fileId = file.raw.fileId
    this.$emit('success', response, file, fileList)
    this.$emit('input', fileList)
  }

  /**
   * 上传文件失败
   * @param {*} error
   * @param {*} file
   * @param {*} fileList
   */
  handleError (error, file, fileList) {
    this.$emit('error', error)
  }

  /**
   * 移除文件
   * @param {*} file
   * @param {*} fileList
   */
  handleRemove (file, fileList) {
    this.$emit('remove', file, fileList)
    this.$emit('input', fileList)
  }

  /**
   * 预览图片
   * @param {*} file
   */
  handlePictureCardPreview (file) {
    this.dialog.imageUrl = file.url
    this.dialog.show = true
  }
}
