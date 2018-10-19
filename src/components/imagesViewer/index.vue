<template>
  <div id="images-viewer" v-show="visiable">
    <div class="mask"></div>
    <span class="btn-close" @click="close"><i class="el-icon-close"></i></span>
    <button class="my-btn2018 my-btn-prev"><i class="el-icon-arrow-left"></i></button>
    <button class="my-btn2018 my-btn-next"><i class="el-icon-arrow-right"></i></button>
    <div class="box">
      <div class="swiper-container gallery-top">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(imgItem, imgIndex) in list" :key="imgIndex">
            <img :src="imgItem.url" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-container gallery-thumbs">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(imgItem1, imgIndex1) in list" :key="imgIndex1">
          <img :src="imgItem1.url" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ComponentImagesViewer from './index'
export default ComponentImagesViewer
</script>
<style lang="scss" scoped>
@import '~swiper/dist/css/swiper.min.css';
#images-viewer {
  .mask{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background:rgba(0,0,0,0.82);
    z-index: 5;
  }
  .box{
    height: 768px;
    width: 1106px;
    position: relative;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
  .btn-close {
    width: 30px;
    line-height: 30px;
    height: 30px;
    display: inline-block;
    text-align: center;
    font-size: 20px;
    transition: all ease .4s;
    cursor: pointer;
    position: fixed;
    right: 40px;
    top: 20px;
    z-index: 6;
    color: rgba(255,255,255,.8);
    &:hover {
      color: rgba(255,255,255,1);
    };
  }
  .my-btn2018 {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    border-radius: 50%;
    width:64px;
    height:64px;
    background:rgba(102,102,102,1);
    outline: unset;
    border: unset;
    font-size: 30px;
    font-weight: bolder;
    color: white;
    transition: all ease .4s;
    cursor: pointer;
    &:hover{
      background: #FFE266;
      color: #354048;
    };
  }
  .my-btn-prev{
    left: 40px;
  }
  .my-btn-next{
    right: 40px;
  }
  .swiper-container {
    width: 100%;
    height: 300px;
  }
  .gallery-top {
    height: 80%;
    width: 100%;
    .swiper-slide {
      background-size: cover;
      background-position: center;
      text-align: center;
      img{
        height: 100%;
      }
    }
  }
  .gallery-thumbs {
    height: 96px !important;;
    box-sizing: border-box;
    position: fixed;
    width: auto;
    left: 90px;
    right: 90px;
    bottom: 30px;
    z-index: 10;
    .swiper-slide {
      width: 118px !important;
      height: 96px;
      border-radius: 4px;
      margin-right: 24px;
      position: relative;
      display: inline-block;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .swiper-slide-thumb-active {}
  }
}

</style>