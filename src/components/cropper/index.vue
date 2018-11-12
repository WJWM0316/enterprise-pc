<template>
	<div id="zike-cropper">
    <div class="upload-image click-item" role="button" @click="onSelectFile" :class="{'zike-btn-selected': hasUploaded}">
      <i  class="icon iconfont icon-update"></i> {{ btnTxt }}
      <input type="file" id="uplaod-file" ref="hiddenFile" name="file" @change="onFileChange" style="display: none;" :accept="accept"/>
    </div>
		<div class="cropper-alert-mask" :class="{show: flag.imgHasLoad}">
	    <div class="cropper-alert" :class="{show: flag.imgHasLoad}">
        <div class="modal-position">{{tips}}</div>
        <i class="el-icon-close" @click="flag.imgHasLoad=false"></i>
	      <div class="cropper">
	        <div class="cropper-box" id="cropperBox">
	          <img id="uploadPreview" style="width:100px;height:100px;"/>
	        </div>
	        <div class="cropper-res-wrap">
	          <div :class="{'radiu': picShape === 'radiu'}" class="cropper-res" id="cropperRes">
	            <img style="width:100px;height:100px;"  />
	          </div>
            <!-- <p class="label-tips">{{tips}}</p> -->
            <p class="label-tips">图片预览</p>
	        </div>
	      </div>
	      <div class="cropper-btns-wrap">
          <el-button @click="flag.imgHasLoad=false">取消</el-button>
          <el-button type="primary" :disabled="flag.btnTips.disable" @click="finishCropImage">{{ flag.btnTips.value }}</el-button>
	      </div>
	    </div>
	  </div>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import Cropper from 'cropperjs'

@Component({
  methods: {
    ...mapActions([
      'uploadApi'
    ])
  },
  props: {

    // 弹窗类型
    type: {
      type: String,
      default: ''
    },

    // 裁剪标题
    tips: {
      type: String,
      default: '裁剪图片'
    },

    // 按钮文字
    btnTxt: {
      type: String,
      default: '上传封面'
    },
    // 按钮的状态
    hasUploaded: {
      type: Boolean,
      default: false
    },
    // 允许上传的类型
    accept: {
      type: String,
      default: ''
    },

    // 上传图片形状
    picShape: {
      type: String,
      default: 'square'
    }
  }
})
export default class ComponentCropper extends Vue {

  // 初始化裁剪对象
  cropper = null
  // 裁剪设置
  flag = {
    imgHasLoad: false,
    cropperHasInit: false,
    btnTips: {
      disable: false,
      value: '确定'
    }
  }

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
  onFileChange(e) {
    const files = e.target.files
    const len = files.length
    const fileName = files[0].name
    const ext = this.getFileExt(fileName)
    this.flag.file = files[0]

    // 允许上传文件尺寸上限 10M
    const ALLOW_MAX_SIZE = 1024 * 1024 * 20

    // 允许文件格式 jpg\png
    const ALLOW_FILE_TYPE = [
      'png',
      'jpg',
      'jpeg'
    ]

    // 文件数量一定要判断
    if (len > 0) {
      const file = files.item(0)
      if (ALLOW_FILE_TYPE.indexOf(ext.toLocaleLowerCase()) === -1) {
        this.$emit('fail', '选择的文件格式不对~')
      } else if (file.size > ALLOW_MAX_SIZE) {
        this.$emit('fail', '上传文件大小不符，文件不能超过 20 MB')
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
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   加载裁剪工具
   * @return   {[type]}   [description]
   */
  loadCropper() {
    const image = document.querySelector('#cropperBox > img')
    const options = {
      aspectRatio: 1 / 1,
      preview: '#cropperRes'
    }
    this.cropper = new Cropper(image, options)
    this.flag.cropperHasInit = true
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   完成裁剪，并输出裁剪结果，然后上传
   * @return   {[type]}   [description]
   */
  finishCropImage() {
    this.flag.btnTips.value = '确定'
    this.flag.btnTips.disable = true
    const croppedCanvas = this.cropper.getCroppedCanvas()
    const croppedDataUrl = croppedCanvas.toDataURL()
    const blob = this.dataURLtoFile(croppedDataUrl)
    const formData = new FormData()
    formData.append('attach_type', 'img')
    formData.append('img1', blob)
    this.uploadApi(formData)
      .then((res) => {
        const infos = res.data.data[0]
        this.cropper.destroy()
        this.flag.imgHasLoad = false
        this.flag.imgHasLoad = false
        // this.flag.btnTips.value = '裁剪完成，立即上传'
        this.flag.btnTips.disable = false
        this.$emit('success', infos)
      })
      .catch(err => {
        this.$emit('fail', err)
        this.flag.btnTips.disable = false
        this.flag.imgHasLoad = false
        this.flag.btnTips.value = '确定'
      })
  }

  // dataUrl 转 blob
  dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-13
   * @detail   将base64转换成file对象
   * @return   {[type]}            [description]
   */
  dataURLtoFile (dataurl, filename = 'file') {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let suffix = mime.split('/')[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${filename}.${suffix}`, {type: mime})
  }

  // 获取文件后缀名
  getFileExt(filename) {
    const tem = filename.split('.')
    return tem[tem.length-1]
  }
}
</script>
<style lang="scss">
@import "~cropperjs/dist/cropper.min.css";
#zike-cropper {
  .upload-image {
    display: inline-block;
    line-height: 1;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #354048;
		background-color: #FFE266;
		border-color: #FFE266;
    color: #354048;
    margin-right: 8px;
  }
  .click-item {
    color: #354048;
    margin-right: 8px;
  }
  .btn-done {
    background: rgba(237,237,237,1);
    border-color: rgba(237,237,237,1);
    color:rgba(146,146,146,1);
  }
  .quanzhong {
    .el-input__inner {
      text-align: left;
    }
  }
  .img-box {
    overflow: hidden;
    margin-top: 15px;
    .upload-cover {
      width:96px;
      height:96px;
      border-radius:4px;
      display: block;
    }
  }
  .upload-image-tips {
    font-size:12px;
    font-weight:400;
    color:rgba(188,188,188,1);
    line-height:1;
    margin-top: 10px;
  }
  .upload-error-tips {
    width:96px;
    height:96px;
    background:rgba(237,237,237,1);
    border-radius:4px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 16px;
    transition: all ease .4s;
    position: relative;
    margin-top: 16px;
    .tips {
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
      font-size: 12px;
      color:rgba(146,146,146,1);
    }
    p {
      line-height: 1.5;
      margin: 0;
      text-align: center;
      width: 100%;
    }
  }
  .cropper-alert-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 90;
    background: rgba(black, .5);
    visibility: hidden;
    height: 0;
    transition: all .3s ease;
  }
  .cropper-alert-mask.show {
    visibility: visible;
    height: 100%;
  }
  .cropper-alert {
    opacity: 0;
    transition: all .3s ease;
    visibility: hidden;
    transform: scale(2);
    padding: 30px 30px;
    position: fixed;
    z-index: 90;
    top: 50px;
    left: 50%;
    margin-left: -265px;
    background-color: white;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    overflow: hidden;
    &.show {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }
  .cropper {
    position: relative;
    width: 332px;
    height: 332px;
    /*height: 414px;*/
    padding: 25px 138px 58px 0px;
  }
  .cropper-box {
    width: 332px;
    height: 332px;
    border-radius: 4px;
    overflow: hidden;
  }
  .cropper-res-wrap {
    position: absolute;
    top: 26px;
    right: 0;
    width: 96px;
    height: 96px;
    /*background-color: #f8f8f8;*/
    box-sizing: content-box;
    text-align: center;
  }
  .cropper-res {
    width: 96px;
    height: 96px;
    overflow: hidden;
    background-color: white;
    /*border-radius: 50%;*/
  }
  #cropper-btn{
    width: 100%;
    height: 30px;
    background: white;
    border: 1px solid #e1e1e1;
    color: #646464;
  }
  .head-pic {
    width: 80px;
    height: 80px;
    position: relative;
    background: rgba(0,0,0,.1);
    overflow: hidden;
    line-height: 80px;
    text-align: center;
    border-radius: 100%;
    font-size: 20px;
  }
  .cropper-btns-wrap{
    text-align: right;
    .el-button{
      width: 124px;
      margin-left: 16px;
    }
  }
  .label-tips{
    font-size:14px;
    font-weight:400;
    color: #666666;
    line-height: 1;
  }
  .el-icon-close {
    position: absolute;
    right: 15px;
    top: 15px;
  }
  .modal-position {
    font-size: 16px;
    color: #000;
    line-height: 1;
    position: relative;
    &:before{
      content: '';
      height: 100%;
      width:6px;
      height:16px;
      background:rgba(255,226,102,1);
      display: inline-block;
      margin-right: 10px;
      float: left;
    };
  }
  .icon-update {
    font-size: 14px;
  }
  .zike-btn-selected {
    background:rgba(237,237,237,1);
    border-radius:4px;
    font-size:14px;
    font-weight:400;
    color:rgba(146,146,146,1);
    border-color: rgba(237,237,237,1);
  }

  .radiu {
    border-radius: 50%;
  }
}
</style>