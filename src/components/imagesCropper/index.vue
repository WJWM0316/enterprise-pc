<template>
  <div id="images-cropper">
  	<div class="cropper-alert-mask" :class="{show: flag.imgHasLoad}">
      <div class="cropper-alert" :class="{show: flag.imgHasLoad}">
        <i class="el-icon-circle-close" @click="flag.imgHasLoad=false"></i>
        <div class="cropper">
          <div class="cropper-box" id="cropperBox">
            <img id="uploadPreview" style="width:100px;height:100px;"/>
          </div>
          <div class="cropper-res-wrap">
            <div class="cropper-res" id="cropperRes">
              <img style="width:100px;height:100px;"/>
            </div>
          </div>
        </div>
        <div class="cropper-btns-wrap">
          <button id="cropper-btn" @click="finishCropImage" :disabled="flag.btnTips.disable">{{ flag.btnTips.value }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ImagesCropper from './index'
export default ImagesCropper
</script>
<style lang="scss">
@import './index.scss'
</style>