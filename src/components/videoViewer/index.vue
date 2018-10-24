<template>
  <div id="video-viewer" v-show="visiable">
    <div class="mask show-mask"  @click="close"></div>
    <div class="box show-box">
      <div class="content">
      	<video :src="data.url" controls="controls"> your browser does not support the video tag </video>
      </div>
    </div>
  </div>
</template>
<script>
import ComponentVideoViewer from './index'
export default ComponentVideoViewer
</script>
<style lang="scss" scoped>
#video-viewer {
  background: #fff;
  width: 560px;
  position: relative;
  border: 1px solid #ebeef5;
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
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 2011;
    opacity: 0;
    visibility: hidden;
    transition: all ease .4s;
    transform: scale(10);
  }
  .mask.show-mask {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
  .box {
    background: white;
    border-radius: 2px;
    transition: all ease-in-out .4s;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 2012;
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    width:600px;
    background:black;
    border:8px solid rgba(255,255,255,1);
    width:980px;
    height: 560px;
    text-align: center;
    video {
      height: 544px;
      margin: 0 auto;
    }
  }

  .box.show-box {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>