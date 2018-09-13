<template>
  <router-view />
</template>
<script>
export default{}
</script>
<style lang="scss">
#broadcast-post {
  .upload-image {
    display: inline-block;
    line-height: 1;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #354048;
		background-color: #FFE266;
		border-color: #FFE266;
  }
  .click-item {
    color: #354048;
    margin-right: 8px;
  }
  .btn-done {
    background: rgba(237,237,237,1);
    border-color: rgba(237,237,237,1);
    color:rgba(146,146,146,1);
  }
  .quanzhong {
    .el-input__inner {
      text-align: left;
    }
  }
  .img-box {
    overflow: hidden;
    margin-top: 15px;
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
    width:96px;
    height:96px;
    background:rgba(237,237,237,1);
    border-radius:4px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 16px;
    opacity: 0;
    visibility: 0;
    transition: all ease .4s;
    position: relative;
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
    opacity: 1;
    visibility: visible;
  }
}
</style>