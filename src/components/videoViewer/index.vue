<template>
  <div id="video-viewer" v-show="show">
    <div class="header">
      <span class="btn-close" @click="close"><i class="el-icon-close"></i></span>
    </div>
    <div class="content">
    	<video :src="videoLink" controls="controls"> your browser does not support the video tag </video>
    </div>
    <div class="footer">
    	 <el-button type="primary" @click="download">下载</el-button>
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
  .content {
    video {
      width: 100%;
      display: block;
    }
  }
  .footer {
    text-align: center;
    padding: 20px;
    button {
      width: 150px;
    }
  }
}
</style>