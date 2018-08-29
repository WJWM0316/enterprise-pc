<template>
  <div class="m-book-uploader">
    <div class="uploader-control">
      <div class="progress" v-show="chooseFilename">
        <!-- 当前进度条 -->
        <span class="progress-bar" :class="{ 'z-error': status === 'error' }" :style="{ width: `${progress}%` }"></span>
        <h3 class="filename"><i class="u-icon-audio no-offset"></i> <span class="f-iblock">{{chooseFilename}}</span></h3>
        <div class="addon">
          <p v-text="uploadStatus"></p>
          <button type="button" class="cancel-upload u-btn" @click="handleCancel" v-show="status !== 'success' && status !== 'error'"><i class="u-icon-close-red"></i></button>
        </div>
      </div>
      <el-button type="primary" size="small" class="u-file-btn" @click="handleChoose">
        <span v-text="chooseFilename ? '重新上传' : '选择文件'"></span>
        <input type="file" ref="fileInput" name="file" :accept="accept" @change="handleChangeFile">
      </el-button>
    </div>
    <slot name="tips">
      <p class="help-block" v-text="tips" v-if="tips"></p>
    </slot>
  </div>
</template>

<script>
import BookUploader from './bookUploader'
export default BookUploader
</script>

<style lang="scss" scoped>
@import '~SCSS/variables';
@import '~SCSS/mixins';;

.m-book-uploader {
  @include setFileUploader;
}
</style>

