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
import VideoViewer from './index'
export default VideoViewer
</script>
<style lang="scss" scoped>
@import './index.scss'
</style>