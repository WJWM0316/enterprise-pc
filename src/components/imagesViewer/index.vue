<template>
  <div id="images-viewer" v-show="show">
    <div class="header">
      <span class="btn-close" @click="close"><i class="el-icon-close"></i></span>
    </div>
	  <div class="swiper-container gallery-top">
      <div class="swiper-wrapper">
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/微信图片_20180812192222.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/szuigreatbanner.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/banner39.jpg)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/微信图片_20180812192222.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/szuigreatbanner.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/banner39.jpg)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/微信图片_20180812192222.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/szuigreatbanner.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/banner39.jpg)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/微信图片_20180812192222.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/szuigreatbanner.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/banner39.jpg)"></div>
      </div>
      <div class="swiper-button-next swiper-button-white"></div>
      <div class="swiper-button-prev swiper-button-white"></div>
	  </div>
	  <div class="swiper-container gallery-thumbs">
	    <div class="swiper-wrapper">
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/微信图片_20180812192222.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/szuigreatbanner.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/banner39.jpg)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/微信图片_20180812192222.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/szuigreatbanner.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/banner39.jpg)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/微信图片_20180812192222.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/szuigreatbanner.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/banner39.jpg)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/微信图片_20180812192222.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/szuigreatbanner.png)"></div>
        <div class="swiper-slide" style="background-image:url(http://img.uigreat.com/banner39.jpg)"></div>
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
  height: 450px;
  width: 680px;
  position: relative;
  .header {
    position: absolute;
    height: 50px;
    line-height: 50px;
    text-align: right;
    width: 100%;
    z-index: 2;
    .btn-close {
      width: 30px;
      line-height: 30px;
      height: 30px;
      border-radius: 50%;
      background: transparent;
      display: inline-block;
      text-align: center;
      margin-right: 10px;
      font-size: 20px;
      transition: all ease .4s;
      cursor: pointer;
      color: #666;
      &:hover {
        background: red;
        color: #fff;
      };
    }
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .gallery-top {
    height: 80%;
    width: 100%;
  }
  .gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
}

</style>