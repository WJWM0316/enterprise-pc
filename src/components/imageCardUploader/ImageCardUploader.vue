<template>
  <div class="m-image-card-uploader">
    <el-upload
        list-type="picture-card"
        :action="action"
        :file-list.sync="files"
        :accept="accept"
        :data="data"
        :before-upload="handleBeforeUpload"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError">
      <i class="el-icon-plus"></i>
    </el-upload>

    <!-- :on-preview="handlePictureCardPreview" -->
    <!-- <el-dialog v-model="dialog.show" size="tiny">
      <img width="100%" :src="dialog.imageUrl" alt="">
    </el-dialog> -->
  </div>
</template>

<script>
import ImageCardUploader from './imageCardUploader'
export default ImageCardUploader
</script>

<style lang="scss" scoped>
@import '~SCSS/variables';
@import '~SCSS/mixins';;

.m-image-card-uploader {

}
</style>
