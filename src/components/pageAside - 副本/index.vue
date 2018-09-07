<template>
  <aside id="page-aside">
    <section>
      <div>
        <div class="logo">
          <div class="avatar-uploader">
            <img :src="companyLogoUrl" class="avatar">
            <div class="company-logo" role="button" @click="onSelectFile">
              <i  class="el-icon-upload"></i>
              <input type="file" id="uplaod-file" ref="hiddenFile" @change="onFileChange" style="display: none;"/>
            </div>
          </div>
        </div>
        <ul>
          <li
            v-for="(item, index) in routes"
            :key="`item.name`+index"
            v-show="item.meta.useNav"
            :class="{'active' : $route.meta.module === item.meta.module}">
              <router-link :to="{ name: item.name}"> <i class="zike-icon" :class="item.meta.icon"></i>  {{ item.title }}</router-link>
          </li>
        </ul>
      </div>
    </section>
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
  </aside>
</template>
<script>
import PageAsise from './index'
export default PageAsise
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
<!-- 弹窗需要的样式 -->
<style lang="scss">
@import "~cropperjs/dist/cropper.min.css";
#page-aside {
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
    padding: 30px;
    position: fixed;
    z-index: 10000000000;
    top: 50px;
    left: 50%;
    margin-left: -300px;
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
    width: 400px;
    height: 300px;
    padding: 80px 150px;
    background-color: #f8f8f8;
  }
  .cropper-box {
    width: 300px;
    height: 300px;
  }
  .cropper-res-wrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    padding: 15px;
    background-color: #f8f8f8;
    box-sizing: content-box;
  }
  .cropper-res {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: 1px solid #e1e1e1;
    background-color: white;
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
}
</style>