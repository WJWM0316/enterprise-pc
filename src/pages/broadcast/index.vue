<template>
  <router-view />
</template>
<script>
export default {}
</script>
<style lang="scss">
#broadcast-post {
  .click-item {
    color: #354048;
    margin-right: 8px;
  }
  .quanzhong {
    .el-input__inner {
      text-align: left;
    }
  }
  .img-box {
    overflow: hidden;
    margin-bottom: 15px;
    .upload-cover {
      width:96px;
      height:96px;
      border-radius:4px;
      display: block;
    }
  }
  .upload-image-tips {
    font-size:12px;
    font-weight:400;
    color:rgba(188,188,188,1);
    line-height:1;
    margin-top: 10px;
  }
  .upload-error-tips {
    width:0;
    height:0;
    background:rgba(237,237,237,1);
    border-radius:4px;
    vertical-align: middle;
    margin-right: 16px;
    transition: all ease .4s;
    position: relative;
    margin: 16px 0;
    transform: scale(0);
    transform-origin: 100% 100%;
    .tips {
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
      font-size: 12px;
      color:rgba(146,146,146,1);
    }
    p {
      line-height: 1.5;
      margin: 0;
      text-align: center;
      width: 100%;
    }
  }
  .upload-error-tips-show {
    transform: scale(1);
    width:96px;
    height:96px;
  }
}
</style>