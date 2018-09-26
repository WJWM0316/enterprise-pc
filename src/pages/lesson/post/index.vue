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
        <div class="uploader-control">
          <div class="progress" :class="{'uploader-error': fileUpload.status === 'error'}" v-show="fileUpload.show">
            <div class="progress-bar" :style="{width: fileUpload.progress + '%'}"></div>
            <div class="box">
              <div class="file-infos">
                <i class="el-icon-question"></i>
                <span class="file-name limit-row-num-1">{{fileUpload.infos.name}}</span>
              </div>
              <div class="file-status" >
                <span
                  class="status-text"
                  :class="{'processing': fileUpload.status === 'processing', 'success': fileUpload.status === 'success', 'error': fileUpload.status === 'error'}">
                    {{fileUpload.progressText}}
                  </span>
                <!-- <i class="el-icon-error"></i> -->
              </div>
            </div>
          </div>
          <el-upload
            ref="file"
            name="file"
            :accept="fileUpload.accept"
            :data="fileUpload.params"
            :action="fileUpload.action"
            :before-upload="beforeFileUpload"
            :on-error="handleFileError"
            :on-success="handleFileSuccess"
            :show-file-list="false"
            :limit="fileUpload.limit"
            :multiple="true"
            :on-progress="uploadFileProcess">
            <el-button slot="trigger" size="large" type="primary" :class="{'btn-change': fileUpload.show}">{{fileUpload.btnTxt}}</el-button>
          </el-upload>
          <div class="tips">{{fileUpload.tips}}</div>
        </div>
      </el-form-item>
      <!-- 上传视频或者音频 start-->

      <!-- 图文编辑 start-->
      <el-form-item
        label="图文编辑"
        >
          <editor
            class="editor"
            :content="ContentEditor.content"
            v-model="form.details"
            :path="ContentEditor.path"
            :height="ContentEditor.height" />
      </el-form-item>
      <!-- 图文编辑 end-->

      <!-- 设置打卡标题 start-->
      <el-form-item label="设置打卡标题">
        <el-input type="textarea" v-model="form.punch_card_title" :rows="10"></el-input>
      </el-form-item>
      <!-- 设置打卡标题 end-->

      <!-- 上传图片 start-->
      <el-form-item>
        <ul class="img-list">
          <li v-for="(imgItem, imgIndex) in imageUpload.list" :key="imgIndex">

            <img class="" :src="imgItem.url" alt="" @mouseover="imgOp (imgIndex,'over') "
            @mouseout="imgOp(imgIndex,'out')" >
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
          :limit="imageUpload.limit" v-if="imageUpload.list.length<9">
          <el-button slot="trigger" size="small" type="primary">{{imageUpload.btnTxt}}</el-button>
          <div slot="tip" class="el-upload__tip">{{imageUpload.tips}}</div>
        </el-upload>

        <p class="upload_p">{{imageUpload.hintTxt}}</p>
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
        <el-button type="primary" @click="checkSubmit" :loading="!submitBtnClick">{{ submitBtnTxt }}</el-button>
      </el-form-item>
  </el-form>
</div>
</template>
<script>
import WorkZonePost from './index'
export default WorkZonePost
</script>
<style lang="scss">
@import "~cropperjs/dist/cropper.min.css";

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
      &:after {

      }
    }
  }
}
.uploader-control {
  .progress {
    width:380px;
    height:38px;
    padding: 0 16px;
    border-radius:2px;
    border:1px solid rgba(220,220,220,1);
    position: relative;
    font-size: 12px;
    float: left;
    margin-right: 16px;
  }
  .uploader-error {
    border-color: red;
  }
  .progress-bar{
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(38,191,129,.08);
    width: 0%;
    height: 100%;
    border-radius: 2px;
    z-index:1;
  }
  .box {
    position: relative;
    z-index:2;
    display: flex;
  }
  .file-infos {
    flex-grow: 1;
    text-align: left;
    i{
      margin-right: 5px;
      color: #354048;
    }
  }
  .file-status {
    flex-grow: 1;
    text-align: right;
    i{
      margin-left: 5px;
      color: #FF3434;
    }
  }
  .file-name {
    color: #354048;
  }
  .tips {
    font-size:12px;
    font-weight:400;
    color:rgba(188,188,188,1);
  }
  .processing {
    color: #929292;
  }
  .success {
    color: #929292;
  }
  .error {
    color: #FF3434;
  }
  .btn-change {
    background:rgba(237,237,237,1);
    border-radius:4px;
    font-weight:400;
    color:rgba(146,146,146,1);
    border-color: rgba(237,237,237,1);
  }
}
.upload_p {
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(146,146,146,1);
  line-height:22px;
}
</style>