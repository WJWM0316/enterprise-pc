<template>
  <div id="file-viewer" v-show="show">
    <div class="header"></div>
    <div class="content">
      <div class="inner">
        <p class="filename">这里是文件的名称，如果超长的话就换行，完整显示.文件后缀名</p>
        <p class="filesize">8.63M （这里是文件的大小，K→M→G，保留小数点后2位）</p>
      </div>
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