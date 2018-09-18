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
        prop="name"
        class="limit-width"
        >
          <el-input v-model="form.name" :maxlength="30" style="width: 380px;" />
      </el-form-item>
      <!-- 请填写课节名 end-->
      
      <!-- 上传视频或者音频 start-->
      <el-form-item
        label="音频/视频"
        prop="name"
        class="limit-width">
        <el-upload
          class="upload-demo"
          ref="file"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          show-file-list="false"
          list-type="['mp3']"
          :multiple="false"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">格式支持mp3、mp4</div>
        </el-upload>
      </el-form-item>
      <!-- 上传视频或者音频 start-->

      <!-- 图文编辑 start-->
      <el-form-item
        label="图文编辑"
        prop="content"
        >
          <editor
            class="editor"
            :content="ContentEditor.content"
            v-model="form.content"
            :path="ContentEditor.path"
            :height="ContentEditor.height" />
      </el-form-item>
      <!-- 图文编辑 end-->

      <!-- 设置打卡标题 start-->
      <el-form-item label="设置打卡标题">
        <el-input type="textarea" v-model="form.desc" :rows="10"></el-input>
      </el-form-item>
      <!-- 设置打卡标题 end-->

      <!-- 上传图片 start-->
      <el-form-item>
        <ul class="img-list">
          <li v-for="(imgItem, imgIndex) in fileList" :key="imgIndex" @click="handlePreview">
            <img :src="imgItem.url" alt="">
          </li>
        </ul>
        <el-upload
          class="upload-demo"
          ref="image"
          show-file-list="false"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :multiple="true"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">JPG、PNG格式，最多可上传9张</div>
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