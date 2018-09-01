import Vue from 'vue'
import Component from 'vue-class-component'
import Cropper from 'cropperjs'

@Component({})
export default class coursePost extends Vue {
  headerImage = null
  cropper = null
  croppable = true
  panel = false
  url = ''

  mounted () {
    //初始化这个裁剪框
    this.cropper = new Cropper(document.querySelector('#image'), {
      aspectRatio: 1,
      viewMode: 1,
      background: true,
      zoomable: true,
      ready() {
        this.croppable = true
      }
    })
  }

  cancel () {
    this.panel = false
    if (this.cropper) {
      this.cropper.replace('')
    }
  }
  //创建url路径
  getObjectURL (file) {
    let url = null
    if (window.createObjectURL !== undefined) {
      url = window.createObjectURL(file)
    } else if (window.URL !== undefined) {
      url = window.URL.createObjectURL(file)
    } else if (window.webkitURL !== undefined) {
      url = window.webkitURL.createObjectURL(file)
    }
    return url
  }
  //input框change事件，获取到上传的文件
  change (e) {

    let files = e.target.files || e.dataTransfer.files

    // 文件的大小
    let size = files[0].size //文件的大小，判断图片的大小

    // 文件的名字
    const filename = files[0].name

    // 文集爱你的后缀名
    const ext = this.getFileExt(filename)

    // 允许上传的文件类型
    const allowImgTypes = [
      'jpg',
      'png'
    ]

    if (allowImgTypes.indexOf(ext) === -1) {
      this.$message.error('请选择我们支持的图片格式！')
      return false
    }

    if (size > 5242880) {
      this.$message.error('请选择5M以内的图片！')
      return false
    }

    this.url = this.getObjectURL(files[0])
    //每次替换图片要重新得到新的url
    if (this.cropper) {
      this.cropper.replace(this.url)
    }
    this.panel = true
  }

  getFileExt (filename) {
    const tem = filename.split('.')
    return tem[tem.length-1]
  }
  //确定提交
  commit () {
    this.panel = false
    if (!this.croppable) {
      return
    }
    // Crop
    const croppedCanvas = this.cropper.getCroppedCanvas()
    // Round
    const roundedCanvas = this.getRoundedCanvas(croppedCanvas)
    this.headerImage = roundedCanvas.toDataURL()
    //上传图片
    this.postImg()
  }
  //canvas画图
  getRoundedCanvas (sourceCanvas) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const width = sourceCanvas.width
    const height = sourceCanvas.height
    canvas.width = width
    canvas.height = height
    context.imageSmoothingEnabled = true
    context.drawImage(sourceCanvas, 0, 0, width, height)
    context.globalCompositeOperation = "destination-in"
    context.beginPath()
    context.arc(
      width / 2,
      height / 2,
      Math.min(width, height) / 2,
      0,
      2 * Math.PI,
      true
    )
    context.fill()
    return canvas
  }
  //提交上传函数
  postImg () {
    // alert("上传成功")
    //这边写图片的上传
  }
}