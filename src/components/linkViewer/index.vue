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
import ComponentLinkViewer from './index'
export default ComponentLinkViewer
</script>
<style lang="scss" scoped>
#link-viewer {
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
    .filelink {
      margin: 0;
      line-height: 1;
      color: rgb(63, 81, 181);
      font-size: 14px;
      margin-top: 20px;
    }
  }
  .footer {
    text-align: right;
    padding: 20px;
    span {
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      text-align: center;
      transition: .1s;
      font-weight: 500;
      padding: 5px 10px;
      font-size: 14px;
      border-radius: 4px;
      display: inline-block;
    }
  }
}
</style>