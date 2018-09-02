<template>
  <div id="link-viewer" v-show="show">
    <div class="header"></div>
    <div class="content">
      <div class="inner">
        <p class="filename">这里是文件的名称，如果超长的话就换行，完整显示.文件后缀名</p>
        <p class="filelink" id="btn">{{ fileLink }}</p>
      </div>
    </div>
    <div class="footer">
    	 <span @click="copy" class="btn" data-clipboard-target="#btn">复制</span>
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