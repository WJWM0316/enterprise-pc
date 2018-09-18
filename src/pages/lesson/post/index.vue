<template>
<div id="lesson-post">
  <el-breadcrumb separator=">" class="zike-breadcrumb">
    <el-breadcrumb-item :to="{ name: 'course' }">课程管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ name: 'course' }">课节管理</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name === 'lessonPost' ? '新建课节' : '更新课节'}}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    :model="form"
    :rules="rules"
    ref="form"
    label-width="160px"
    label-suffix="："
    >
      <!-- 请填写课节名 start-->
      <el-form-item
        label="课节标题"
        prop="title"
        class="limit-width"
        >
          <el-input v-model="form.title" :maxlength="30" style="width: 380px;" />
      </el-form-item>
      <!-- 请填写课节名 end-->
      
      <!-- 上传视频或者音频 start-->
      <el-form-item
        label="音频/视频"
        class="limit-width">
        <el-upload
          ref="file"
          name="file"
          :accept="fileUpload.accept"
          :data="fileUpload.params"
          :action="fileUpload.action"
          :before-upload="beforeFileUpload"
          :on-success="handleFileSuccess"
          :show-file-list="false"
          :limit="fileUpload.limit"
          :on-progress="uploadFileProcess">
          <el-button slot="trigger" size="small" type="primary">{{imageUpload.btnTxt}}</el-button>
          <div slot="tip" class="el-upload__tip">{{imageUpload.tips}}</div>
        </el-upload>
      </el-form-item>
      <!-- 上传视频或者音频 start-->

      <!-- 图文编辑 start-->
      <el-form-item
        label="图文编辑"
        >
          <editor
            class="editor"
            :content="ContentEditor.content"
            v-model="form.datails"
            :path="ContentEditor.path"
            :height="ContentEditor.height" />
      </el-form-item>
      <!-- 图文编辑 end-->

      <!-- 设置打卡标题 start-->
      <el-form-item label="设置打卡标题">
        <el-input type="textarea" v-model="form.punjch_card_title" :rows="10"></el-input>
      </el-form-item>
      <!-- 设置打卡标题 end-->

      <!-- 上传图片 start-->
      <el-form-item>
        <ul class="img-list">
          <li v-for="(imgItem, imgIndex) in imageUpload.list" :key="imgIndex">
            <img :src="imgItem.url" alt="">
          </li>
        </ul>
        <el-upload
          ref="image"
          name="image"
          :accept="imageUpload.accept"
          :data="imageUpload.params"
          :action="imageUpload.action"
          :before-upload="beforeImageUpload"
          :on-success="handleImageSuccess"
          :show-file-list="false"
          :limit="imageUpload.limit">
          <el-button slot="trigger" size="small" type="primary">{{imageUpload.btnTxt}}</el-button>
          <div slot="tip" class="el-upload__tip">{{imageUpload.tips}}</div>
        </el-upload>
      </el-form-item>
      <!-- 上传图片 start-->

      <!-- 是否上线 start-->
      <el-form-item label="是否上线">
        <el-radio v-model="form.status" :label="1">上线</el-radio>
        <el-radio v-model="form.status" :label="0">下线</el-radio>
      </el-form-item>
      <!-- 是否上线 end-->

      <!-- 确认提交 -->
      <el-form-item>
        <el-button type="primary" @click="submit" :loading="!submitBtnClick">{{ submitBtnTxt }}</el-button>
      </el-form-item>
  </el-form>
</div>
</template>
<script>
import WorkZonePost from './index'
export default WorkZonePost
</script>
<style lang="scss">
#lesson-post {
  background: white;
  .limit-width {
    width: 100%;
  }
  .img-list {
    overflow: hidden;
    li {
      width: 96px;
      height: 96px;
      border-radius: 4px;
      margin: 0px 16px 16px 0;
      float: left;
      background: rgba(0,0,0,.05);
      position: relative;
    }
    img{
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }
}
</style>