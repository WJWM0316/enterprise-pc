<template>
  <div id="notice">
		<my-cropper></my-cropper>
  </div>
</template>
<script>
import pageNotice from './index'
export default pageNotice
</script>
<style lang="scss">
.upload-btn {
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
	color: #354048;
  margin-right: 8px;
}
</style>