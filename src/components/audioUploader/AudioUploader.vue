<template>
  <div class="m-audio-uploader">
    <div class="uploader-control">
      <div class="progress" v-show="chooseFilename">
        <audio :src="src" ref="audio" preload></audio>
        <!-- 当前进度条 -->
        <span class="progress-bar" :style="{ width: `${progress}%` }"></span>
        <h3 class="filename"><i class="u-icon-audio no-offset"></i> <span class="f-iblock">{{chooseFilename}}</span></h3>
        <div class="addon">
          <p v-text="uploadStatus"></p>
          <button type="button" class="cancel-upload u-btn" @click="handleCancel" v-show="status !== 'success' && status !== 'error'"><i class="u-icon-close-red"></i></button>
        </div>
      </div>
      <el-button type="primary" size="small" class="u-file-btn" v-if="!disabled" @click="handleChoose">
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
import AudioUploader from './audioUploader'
export default AudioUploader
</script>

<style lang="scss" scoped>
@import '~SCSS/variables;
@import '~SCSS/mixins;

.m-audio-uploader {
  @include setFileUploader;
}
</style>

