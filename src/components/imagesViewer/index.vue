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
import imagesViewer from './index'
export default imagesViewer
</script>
<style lang="scss" scoped>
@import './index.scss'
</style>