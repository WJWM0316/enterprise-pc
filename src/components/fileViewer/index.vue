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
import ComponentVideoViewer from './index'
export default ComponentVideoViewer
</script>
<style lang="scss" scoped>
#file-viewer {
  background: #fff;
  width: 560px;
  position: relative;
  border: 1px solid #ebeef5;
  .content {
    margin: 20px 20px 0 20px;
    .inner {
      padding: 10px;
      border: 1px solid #ebeef5;
    }
    .filename {
      margin: 0;
      line-height: 1;
      color: #666;
      font-size: 14px;
    }
    .filesize {
      margin: 0;
      line-height: 1;
      color: #666;
      font-size: 14px;
      margin-top: 20px;
    }
  }
  .footer {
    text-align: right;
    padding: 20px;
  }
}
</style>