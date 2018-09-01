<template>  
  <div id="demo">
    <input type="file" id="change" accept="image" @change="change">
    <img :src="headerImage" alt="">
    <div class="cropper-box-image" v-show="panel">
      <div class="mask" :class="{'show-cropper-mask': panel}"></div>
      <div class="container" v-show="panel" style="" :class="{'container-show': panel}">
        <img id="image" :src="url" alt="Picture">
        <div class="cropper-footer">
          <p @click="commit">确定</p>
          <p @click="cancel">取消</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import coursePost from './index'
export default coursePost
</script> 
<style type="text/css" scoped>
@import "~cropperjs/dist/cropper.min.css"
</style>
<style lang="scss">
.cropper-box-image {
  background: #fff;
  width: 300px;
  height: 360px;
  padding: 20px;
  border: 15px solid rgba(58, 58, 58, .5);
  text-align: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 90;
    background: rgba(0,0,0,.1);
    visibility: hidden;
    transition: all .4s ease;
    opacity: 0;
  }
  .show-cropper-mask {
    visibility: visible;
    opacity: 1;
  }
  .container {
    width: 250px;
    height:250px;
    z-index: 1000000000000;
    opacity: 0;
    transition: all .3s ease;
    visibility: hidden;
    border-radius: 5px;
    text-align: center;
    display: inline-block;
  }
  .container-show {
    opacity: 1;
    visibility: visible;
  }
  .cropper-footer {
    line-height: 40px;
    p {
      margin-bottom: 10px;
      border-radius: 4px;
      background: rgba(0,0,0,.1)
    }
  }
}
</style>