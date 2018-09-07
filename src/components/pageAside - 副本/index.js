import Vue from 'vue'
import Component from 'vue-class-component'
import { routes } from '@/router/routes'
import Cropper from 'cropperjs'

@Component({
  name: 'page-asise',
  /* eslint-disable */
  methods: {
    ...mapActions(['showMsg'])
  },
  /* eslint-enable */
})
export default class PageAside extends Vue {

  cropper = null

  flag = {
    imgHasLoad: false,
    cropperHasInit: false,
    btnTips: {
      disable: false,
      value: '裁剪完成，立即上传'
    }
  }

  // 侧边栏路由
  routes = routes
  // 企业LOGO
  companyLogoUrl = 'http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg'

  /**
   * 用户点击头像
   */
  onSelectFile() {
    const el = this.$refs.hiddenFile
    if (!el) return
    el.click()
    el.value = ''
  }

  /**
   * 用户选择好文件了
   * @param  {Event} e  文件改变事件
   */
  /* eslint-disable */
  onFileChange(e) {
    const files = e.target.files
    const len = files.length
    const fileName = files[0].name
    const ext = this.getFileExt(fileName)

    // 允许上传文件尺寸上限 1M
    const ALLOW_MAX_SIZE = 1024 * 1024

    // 允许文件格式 jpg\png
    const ALLOW_FILE_TYPE = [
      'png',
      'jpeg',
      'jpg'
    ]

    // 文件数量一定要判断
    if (len > 0) {
      const file = files.item(0)
      if (ALLOW_FILE_TYPE.indexOf(ext) === -1) {
        this.showMsg({ content: '选择的文件格式不对~', type: 'error', duration: 10000 })
      } else if (file.size > ALLOW_MAX_SIZE) {
        this.showMsg({ content: '选择的文件太大啦~', type: 'error', duration: 10000 })
      } else {
        let inputImage = document.querySelector('#uplaod-file')
        let URL = window.URL || window.webkitURL
        let blobURL
        blobURL = URL.createObjectURL(file)

        this.flag.imgHasLoad = true

        if (!this.flag.cropperHasInit) {
          this.loadCropper()
          this.cropper.replace(blobURL)
          return
        }
        this.cropper.reset().replace(blobURL)
        inputImage.value = null
      }
    }
  }

  loadCropper() { //加载裁剪工具
    const image = document.querySelector('#cropperBox > img')
    const preview = document.querySelector('#cropperRes')
    const previewImage = preview.getElementsByTagName('img').item(0)
    const options = {
      aspectRatio: 1 / 1,
      preview: '#cropperRes'
    }
    this.cropper = new Cropper(image, options)
    this.flag.cropperHasInit = true
  }

  finishCropImage() {//完成裁剪，并输出裁剪结果，然后传到七牛
    this.flag.btnTips.value = '正在上传，请稍等'
    this.flag.btnTips.disable = true
    const croppedCanvas = this.cropper.getCroppedCanvas()
    const croppedDataUrl = croppedCanvas.toDataURL()

    const blob = this.dataURLtoBlob(croppedDataUrl)

    // 每次更新头像都要获取一次 token
    this.getUploadToken()
      .then(() => {
        const formData = new FormData()
        formData.append('token', this.qiniu.token)
        formData.append('key', this.qiniu.key)
        formData.append('file', blob)
        return this.uploadAvatar(formData)
      })
      .then(uploadResponse => {
        return this.updateAvatar({
          avatar: uploadResponse.data.url,
        })
      })
      .then(updateResponse => {
        this.cropper.destroy()
        this.flag.imgHasLoad = false
        this.flag.imgHasLoad = false
        this.flag.btnTips.value = '裁剪完成，立即上传'
        this.flag.btnTips.disable = false
        return updateResponse
      })
      .catch(err => {
        this.showMsg({ content: '更换头像失败~', type: 'error', duration: 10000 })
      })
  }

  // dataUrl 转 blob
  dataURLtoBlob(dataurl) {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  // 获取文件后缀名
  getFileExt(filename) {
    const tem = filename.split('.')
    return tem[tem.length-1]
  }
}