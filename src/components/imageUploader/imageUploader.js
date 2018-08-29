import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'image-uploader',
  model: {
    prop: 'src',
    event: 'input'
  },
  props: {
    // 提示文本
    tips: String,

    // 预览图片宽
    width: {
      type: [Number, String],
      default: 225
    },

    // 预览图片高
    height: {
      type: [Number, String],
      default: 102
    },

    // 图片路径
    src: {
      type: String,
      default: ''
    },

    // 文件接收类型
    accept: {
      type: String,
      default: 'image/png,image/jpeg'
    },

    // 文件最大大小，单位M
    maxFileSize: {
      type: Number,
      default: 4
    },

    // 文件是否处于上传服务器中，用于开启上传loading，由父组件上传文件过程中修改
    uploading: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    src: {
      handler (val, oldVal) {
        this.previewSrc = val
      },
      immediate: true
    }
  }
})
export default class ImageUploader extends Vue {

  // 预览图片的src
  previewSrc = null
  fileInput = null

  /**
   * 图片容器宽度
   * @return {String}
   */
  get imageWidth () {
    const width = this.width.toString()
    return width.substr(width.length - 2) === 'px' ? width : width + 'px'
  }

  /**
   * 图片容器高度
   * @return {String}
   */
  get imageHeight () {
    const height = this.height.toString()
    return height.substr(height.length - 2) === 'px' ? height : height + 'px'
  }

  mounted () {
    this.fileInput = this.$refs.fileInput
  }

  /**
   * 获取单个图片的url
   * @param {Object} file
   */
  getImageURL (file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.onload = (event) => {
        resolve(event.target.result)
      }

      fileReader.onerror = (event) => {
        reject(event)
      }

      fileReader.readAsDataURL(file)
    })
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
   * 选择文件
   * @param {Object} event
   */
  handleChangeFile (event) {
    let file = null
    const files = event.target.files
    if (!files || files.length <= 0) {
      console.log('文件选择错误')
      this.clearFileInput(event.target)
      return
    }
    file = files[0]
    // 判断文件类型
    if (!/^image\//.test(file.type)) {
      console.log(`文件格式不正确：${file.type}`)
      this.$message.error('图片文件格式不正确')
      this.clearFileInput(event.target)
      return
    }
    // 判断文件大小
    if (file.size > 1024 * 1024 * this.maxFileSize) {
      console.log(`文件大小不能超过${this.maxFileSize}M`)
      this.$message.error(`图片文件大小不能超过${this.maxFileSize}M`)
      this.clearFileInput(event.target)
      return
    }

    this.$emit('before-load', file)
    this.getImageURL(file)
        .then(url => {
          file.preview = url
          this.previewSrc = url
          this.$emit('input', this.previewSrc)
          this.$emit('loaded', file)
          // this.clearFileInput(event.target)
        }).catch(e => {
          console.log('获取图片文件报错', e)
          this.$emit('load-error', e)
          this.clearFileInput(event.target)
        })
  }

  /**
   * 点击选择文件按钮
   */
  handleChoose () {
    $(this.$refs.fileInput).click()
  }
}
