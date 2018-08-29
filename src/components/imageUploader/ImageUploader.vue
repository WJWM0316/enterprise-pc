<template>
  <div class="m-image-uploader f-flex">
    <div class="preview f-flex-fixed" v-show="previewSrc" v-loading="uploading">
      <i class="u-image auto" :style="{ width: imageWidth, height: imageHeight, lineHeight: imageHeight }"><img :src="previewSrc" alt="预览图"></i>
    </div>
    <div class="uploader-control f-flex-auto f-flex">
      <div>
        <el-button type="primary" size="small" class="u-file-btn" @click="handleChoose">
          <span v-text="previewSrc ? '重新上传' : '选择文件'"></span>
          <input type="file" ref="fileInput" name="file" :accept="accept" @change="handleChangeFile">
        </el-button>
        <slot name="tips">
          <p class="help-block" v-text="tips" v-if="tips"></p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import ImageUploader from './imageUploader'
export default ImageUploader
</script>

<style lang="scss" scoped>
.m-image-uploader {

  .preview {
    margin-right: 20px;

    & > i {
      border: solid 1px #e2e3e5;
      border-radius: 2px;

      & > img {
        position: relative;
        top: -1px;
      }
    }
  }

  .uploader-control {
    align-items: center;
  }

  .help-block {
    margin: 5px 0;
    font-size: 12px;
    color: #bcbcbc;
  }
}
</style>

