<template>
  <div id="link-viewer" v-show="visiable">
    <div class="mask"></div>
    <div class="box">
      <span class="btn-close" @click="close"><i class="el-icon-close"></i></span>
      <div class="inner">
        <div class="img-box"></div>
        <div class="text-box">
          <p class="filename">这里是链接的名称，完整显示</p>
          <div class="link-m-box">
            <input type="text" class="link-input" :value="fileLink">
            <button class="filelink" id="btn" @click="copy" :data-clipboard-text="fileLink">复制链接</button>
          </div>
        </div>
      </div>
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
    .filename {
      margin: 0;
      line-height: 1.4;
      color: #666;
      font-size: 16px;
    }
  }
  .text-box {
    flex-grow: 1;
    padding: 0 0 0 16px; 
  }
  .img-box {
    width: 72px;
    height: 72px;
    background: rgba(0,0,0,.1);
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
  .link-input {
    height:38px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(220,220,220,1);
    box-sizing: border-box;
    flex-grow: 1;
    outline: none;
    box-sizing: border-box;
    padding: 0 5px;
  }
  .filelink {
    -webkit-appearance: none;
    -webkit-box-sizing: border-box;
    -webkit-transition: .1s;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    outline: 0;
    padding: 11px 20px;
    text-align: center;
    transition: .1s;
    white-space: nowrap;
    background-color: #ffe266;
    border-color: #ffe266;
    color: #354048;
    width: 124px;
    margin-left: 4px;
  }
  .link-m-box {
    display: flex;
    margin-top: 10px;
  }
}
</style>