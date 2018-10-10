<template>
  <div id="images-viewer" v-if="visiable">
    <div class="mask"></div>
    <span class="btn-close" @click="close"><i class="el-icon-close"></i></span>
    <button class="my-btn2018 my-btn-prev"><i class="el-icon-arrow-left"></i></button>
    <button class="my-btn2018 my-btn-next"><i class="el-icon-arrow-right"></i></button>
    <div class="box">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
          <div class="swiper-slide">Slide 4</div>
          <div class="swiper-slide">Slide 5</div>
          <div class="swiper-slide">Slide 6</div>
          <div class="swiper-slide">Slide 7</div>
          <div class="swiper-slide">Slide 8</div>
          <div class="swiper-slide">Slide 9</div>
          <div class="swiper-slide">Slide 10</div>
        </div>
      </div>
    </div>
    <!-- <div class="image-btn-ul">
      <div>
        <ul>
          <li v-for="item in 15" :key="item">{{item}}</li>
        </ul>
      </div>
    </div> -->
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
    height: 450px;
    width: 680px;
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
  }
  .my-btn-prev{
    left: 40px;
  }
  .my-btn-next{
    right: 40px;
  }
  .swiper-container {
    width: 600px;
    height: 300px;
  }
  .image-btn-ul {
    position: fixed;
    width: 100%;
    z-index: 1000;
    height: 100px;
    bottom: 0;
    left: 0;
    ul{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      font-size: 0;
      line-height: 0;
    }
    li {
      width:118px;
      height:96px;
      border-radius:4px;
      border:2px solid rgba(255,226,102,1);
      background: red;
      margin-right: 24px;
      display: inline-block;
      line-height: 96px;
      text-align: center;
      font-size: 30px;
    }
  } 
}

</style>
<style>
  html, body {
    position: relative;
    height: 100%;
  }
  body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color:#000;
    margin: 0;
    padding: 0;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>