<template>
<div id="lesson-post">
  <el-breadcrumb separator=">" class="zike-breadcrumb">
    <el-breadcrumb-item :to="{ name: 'course' }">课程管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'lessonList' , query:{'course_id': form.course_id}}">课节管理</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name === 'lessonAdd' ? '新建课节' : '编辑课节'}}</el-breadcrumb-item>
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
        style="margin: 56px 0 32px 0;"
        >
          <el-input placeholder="最多25个字" v-model="form.title" style="width: 380px;" />
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
                <img class="video_icon" src="~IMAGES/video.png" >
                <span class="file-name ">{{fileUpload.infos.name}}</span>
              </div>
              <div class="file-status" >
                <span
                  class="status-text"
                  :class="{'processing': fileUpload.status === 'processing', 'success': fileUpload.status === 'success', 'error': fileUpload.status === 'error'}">
                    {{fileUpload.progressText}}
                  </span>
                <i class="el-icon-error" :class="{'loading': fileUpload.status==='loading'}" @click="removeVideo"></i>
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
            :on-progress="uploadFileProcess">
            <el-button slot="trigger" size="large" class="base_btn" :class="{'btn-change': fileUpload.show}">{{fileUpload.btnTxt}}</el-button>
          </el-upload>
          <div class="tips">{{fileUpload.tips}}</div>
        </div>
      </el-form-item>
      <!-- 上传视频或者音频 start-->

      <!-- 图文编辑 start-->
      <el-form-item
        label="图文编辑"
        >
          <editor v-model="form.details" @blur="handleContentEditorBlur" @input="handleContentEditorInput" />
            <p class="editor_p" >* 音频/视频 和 图文 两者必须填一项。</p>
      </el-form-item>
      <!-- 图文编辑 end-->

      <!-- 设置打卡标题 start-->
      <el-form-item label="设置打卡标题">
        <el-input type="textarea" v-model="form.punch_card_title" :rows="10"></el-input>
      </el-form-item>
      <!-- 设置打卡标题 end-->

      <!-- 上传图片 start-->
      <el-form-item>
        <ul class="img-list" v-if="imageUpload.list.length>0">
          <div style="float: left" class="imgLoadSatus" v-show="imageUpload.status==='loading'||imageUpload.status==='error'">
            <img src="~IMAGES/loading.png" class="loading" v-if="imageUpload.status==='loading'"/>
            <div class="error" v-if="imageUpload.status==='error'">
              <i class="icon iconfont icon-shibai"></i>
              <p >上传失败</p>
            </div>
          </div>
          <li v-for="(imgItem, imgIndex) in imageUpload.list" :key="imgIndex"
          >
            <img class="" :src="imgItem.url" alt="" >
            <img src="~IMAGES/up_clo_2.png" class="deleteImg" @click="imgOp(imgIndex)">
          </li>
        </ul>
        <el-upload
          class="upload_img"
          ref="image"
          name="image"
          :accept="imageUpload.accept"
          :data="imageUpload.params"
          :action="imageUpload.action"
          :before-upload="beforeImageUpload"
          :on-success="handleImageSuccess"
          :on-error="handleImageError"
          :show-file-list="false"
          :file-list="imageUpload.list"
          :limit="imageUpload.limit" v-if="imageUpload.list.length<9">

            
          <el-button class="upload_img_btn" slot="trigger" size="small" type="primary">{{imageUpload.btnTxt}}</el-button>

          <div slot="tip" style="" class="upload_img_tips">{{imageUpload.tips}}</div>
        </el-upload>

        <p class="upload_p" >{{imageUpload.hintTxt}}</p>
      </el-form-item>
      <!-- 上传图片 start-->

      <!-- 是否上线 start-->
      <el-form-item label="是否上线" >
        <el-radio v-model="form.status" :label="1">上线</el-radio>
        <el-radio v-model="form.status" :label="0">下线</el-radio>
      </el-form-item>
      <!-- 是否上线 end-->

      <!-- 确认提交 -->
      <el-form-item class="footer-button">
        <el-button class="" type="primary" @click="checkSubmit" :loading="!submitBtnClick">{{ submitBtnTxt }}</el-button>
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
@import "~COLORS/variables";

.footer-button {
  margin: 40px 0;
  button {
    width: 120px;
  }
}

#lesson-post {
  background: white;
  .limit-width {
    width: 100%;
  }
  .img-list {
    overflow: hidden;
    padding-top: 10px;
    margin-bottom: 10px;
    li {
      width: 96px;
      height: 96px;
      border-radius: 4px;
      margin: 0px 16px 16px 0;
      float: left;
      background: rgba(0,0,0,.05);
      position: relative;
      .deleteImg {
        width:18px;
        height:18px;
        position: absolute;
        right: -9px;
        top: -9px;
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
}
.upload_img {
  font-family:PingFangSC;
  font-weight:400;
  .upload_img_btn {
    padding: 13px 20px;
  }
  .upload_img_tips {
    margin: 8px 0 8px 0;
    line-height: 22px; 
    font-family:PingFangSC;
    color: #bcbcbc;
    font-size: 14px;
  }
}

.uploader-control {
  .progress {
    width:380px;
    height:38px;
    padding: 0 16px;
    box-sizing: border-box;
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
    background: #FFF9D9;
    width: 0%;
    height: 100%;
    border-radius: 2px;
    z-index:1;
  }
  .box {
    position: relative;
    z-index:2;
    display: flex;
    flex-direction: row;
  }
  .file-infos {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    overflow: hidden;

    .video_icon{
      width:15px;
      height:14px;
      margin-right: 5px;
    }
    i{
      margin-right: 5px;
      color: #354048;
    }
    .file-name {
      flex: 1;
      display: block;
      color: #354048;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .file-status {
    width: 70px;
    text-align: right;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 5px;
    i{
      margin-left: 5px;
      color: rgba(188,188,188,1);
      cursor: pointer;
      &.loading {
        color: #FF3434;
      }
    }
    
  }
  
  .tips {
    font-size:12px;
    font-weight:400;
    color:rgba(188,188,188,1);
    line-height: 22px;
    margin-top: 8px;
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
  .base_btn {
    background:rgba(255,226,102,1);
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(53,64,72,1);
    border: none;
  }
  .btn-change {
    background:rgba(237,237,237,1);
    border-radius:4px;
    font-weight:400;
    color:#929292;
    border-color: rgba(237,237,237,1);
  }
}
.upload_p {
  margin: 0;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(146,146,146,1);
  line-height:22px;
}

.editor_p {
  font-size:14px;
  font-family:PingFangSC;
  font-weight:400;
  color:rgba(188,188,188,1);
  margin: 0;
  line-height: 22px;
  margin-top: 8px;
}

@-webkit-keyframes rotation{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
}

.imgLoadSatus {
  width: 96px;
  height: 96px;
  text-align: center;
  display: inline-block;
  background: #f8f8f8;
  margin-right: 10px;
  .loading{
    width: 30px;
    height: 30px;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
    -webkit-transform: rotate(360deg);
    animation: rotation 2s linear infinite;
    -moz-animation: rotation 2s linear infinite;
    -webkit-animation: rotation 2s linear infinite;
    -o-animation: rotation 2s linear infinite;
  }
  .error {
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    height: 96px;
    p {
      height:20px;
      margin: 0 0 0 0;
      color: #929292;
      line-height: 20px;
    }
    .icon-shibai {
      width: 16px;
      height: 16px;
      line-height: 16px;
      color: #929292;
      display: block;

    }

  }
  .imgHint {
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,52,52,1);
  }
}

.el-radio {
  margin: 10px 32px 10px 0px;
  &.is-checked {
    .el-radio__inner {
      border-color: rgba(215,171,112,1);
      background:rgba(215,171,112,1);
    }
    .el-radio__label {
      padding-left: 8px;
      color:rgba(215,171,112,1);
    }
  }
  color:rgba(188,188,188,1);
}
.el-radio+.el-radio {
    margin-left: 0px;
}



</style>