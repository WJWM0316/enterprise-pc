<template>
  <div id="file-viewer" v-show="visiable">
    <div class="mask"></div>
    <div class="box">
      <span class="btn-close" @click="close"><i class="el-icon-close"></i></span>
      <div class="inner">
        <div class="img-box">PDF</div>
        <div class="text-box">
          <p class="filename">{{data.fileName}}</p>
          <p class="filesize">{{data.sizeM}}</p>
        </div>
        <div class="btn-box">
          <el-button type="primary" @click="download">下载文件</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ComponentVideoViewer from './index'
export default ComponentVideoViewer
</script>
<style lang="scss" scoped>
#file-viewer {
  .mask{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background:rgba(0,0,0,0.82);
    z-index: 5;
  }
  .box {
    padding: 71px 32px;
    background: #fff;
    width: 670px;
    height: 250px;
    position: relative;
    border: 1px solid #ebeef5;
    position: relative;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    border-radius: 4px;
    overflow: hidden;
    .filename {
      margin: 0;
      line-height: 1;
      color: #666;
      font-size: 14px;
      margin-top: 12px;
    }
    .filesize {
      margin: 0;
      line-height: 1;
      color: #666;
      font-size: 14px;
      margin-top: 20px;
    }
  }
  .text-box {
    flex-grow: 1;
    padding: 0 16px; 
  }
  .img-box {
    width: 72px;
    height: 72px;
    background: #FA3939;
    text-align: center;
    line-height: 72px;
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
  .btn-box {
    width: 124px;
    height: 72px;
    line-height: 72px;
  }
  .inner {
    width:606px;
    height:108px;
    background:rgba(248,248,248,1);
    border-radius:4px;
    border:1px solid rgba(237,237,237,1);
    display: flex;
    box-sizing: border-box;
    padding: 18px;
  }
  .el-button {
    width: 100%;
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
    right: 4px;
    top: 4px;
    z-index: 6;
    color: #929292;
  }
}
</style>