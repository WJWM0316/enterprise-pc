<template>
  <div id="user-post">
  	<div class="page-position">编辑成员</div>
  	<el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="120px">

        <!-- 姓名 start-->
    		<el-form-item
          label="姓名"
          prop="name">
  		      <el-input v-model="form.name" class="limit-width"></el-input>
  		  </el-form-item>
        <!-- 姓名 end-->

        <!-- 头像 start-->
  		  <el-form-item
          label="头像">
    		    <div class="upload-error-tips upload-error-tips-show" v-if="form.avatarId.showError">
              <div class="tips">
                <p><i class="el-icon-error"></i></p>
                <p>上传失败</p>
              </div>
            </div>
            <div class="upload-image click-item" role="button" @click="onSelectFile" :class="{'zike-btn-selected': form.avatarId.tem}">
              <input type="file" id="uplaod-file" ref="hiddenFile" name="file" @change="onFileChange" style="display: none;" />
              <img :src="avatarUrl" class="upload-cover">
              <div class="upload-cover-mask"></div>
            </div>
  		  </el-form-item>
        <!-- 头像 end-->
        <!-- 所属部门 start-->
  		  <el-form-item
          label="所属部门"
          prop="groupId">
    		    <el-select v-model="form.groupId" placeholder="请选择所属部门" class="limit-width" @change="change">
              <el-option
                v-for="item in tem_groupLists"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
    		    </el-select>
  		  </el-form-item>
        <!-- 所属部门 end-->

        <!-- 职位 start-->
  		  <el-form-item
          label="职位"
          prop="occupation">
  		      <el-input v-model="form.occupation" class="limit-width"></el-input>
  		  </el-form-item>
        <!-- 职位 end -->
        
        <!-- 邮箱 start -->
  		  <el-form-item
          label="邮箱"
          prop="email">
  		      <el-input v-model="form.email" class="limit-width"></el-input>
  		  </el-form-item>
        <!-- 邮箱 end -->

        <!-- 设置密码 start-->
  		  <el-form-item
          label="设置密码"
          prop="password">
  		      <el-button type="primary">点击修改</el-button>
  		  </el-form-item>
        <!-- 设置密码 end-->

        <!-- 手机号码 start -->
  		  <el-form-item
          label="手机号码">
  		      <el-input v-model="form.mobile" class="limit-width"></el-input>
  		  </el-form-item>
        <!-- 手机号码 end -->

        <!-- 微信号 start -->
  		  <el-form-item
          label="微信号">
  		      <el-input v-model="form.wechat" class="limit-width"></el-input>
  		  </el-form-item>
        <!-- 微信号 end -->
        
        <!-- 权限管理 start -->
        <el-form-item
          label="权限管理">
            <el-select
              v-model="value10"
              multiple
              filterable
              allow-create
              default-first-option
              class="limit-width"
              placeholder="选择权限管理">
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <!-- 权限管理 end -->

        <!-- 选择管理分组 start-->
        <el-form-item
          label="选择管理分组"
          prop="name"
          >
            <div class="selected-item" v-show="form.contentAdminGroup.show">
              已选择：
              <span
                @click="removeMultipleCheck('groupId', groupIndex)"
                :key="groupIndex"
                v-for="(groupItem, groupIndex) in form.contentAdminGroup.tem">
                  {{groupItem.groupName}}<i class="el-icon-close"></i>
              </span>
            </div>
            <el-button
              class="click-item"
              type="primary"
              :class="{'zike-btn-selected': form.groupId.show}"
              @click="openModal('contentAdminGroup')">
                {{form.contentAdminGroup.show ? '重新选择' : '点击选择'}}
            </el-button>
        </el-form-item>
        <!-- 选择管理分组 end-->

        <!-- 微信号 start -->
  		  <el-form-item>
  		    <el-button type="primary" class="form-btn">提交</el-button>
  		    <el-button class="form-btn">删除该账号</el-button>
  		  </el-form-item>
        <!-- 微信号 end -->
  	</el-form>
  	<div class="cropper-alert-mask" :class="{show: flag.imgHasLoad}">
	    <div class="cropper-alert" :class="{show: flag.imgHasLoad}">
        <div class="modal-position">{{tips}}</div>
	      <i class="el-icon-close" @click="flag.imgHasLoad=false"></i>
	      <div class="cropper">
	        <div class="cropper-box" id="cropperBox">
	          <img id="uploadPreview" style="width:96px;height:96px;"/>
	        </div>
	        <div class="cropper-res-wrap">
	          <div class="cropper-res" id="cropperRes">
	            <img style="width:96px;height:96px;"/>
	          </div>
            <p class="label-tips">{{tips}}</p>
	        </div>
	      </div>
	      <div class="cropper-btns-wrap">
	        <el-button @click="flag.imgHasLoad=false">取消</el-button>
          <el-button type="primary" :disabled="flag.btnTips.disable" @click="finishCropImage">{{ flag.btnTips.value }}</el-button>
	      </div>
	    </div>
	  </div>
    <modal-dialog
      v-model="models.show"
      :title="models.title"
      :show-close="models.showClose"
      :confirm-text="models.confirmText"
      :type="models.type"
      :width="models.width"
      :min-height="models.minHeight"
      @confirm="confirm"
      @cancel="cancel"
      >
        <div slot="title" style="margin-left: 10px;">
          <h3 class="dialog-title">
            {{models.title}} 
          </h3>
        </div>
        <div slot="customize-html">
          <div class="customize-html-content">
            <!-- 组织-start -->
            <div class="groupList-type-list" v-if="models.currentModalName === 'contentAdminGroup'">
              <el-button
                size="large"
                v-for="(groupItem, groupIndex) in tem_groupLists"
                 @click="seleteGroup(groupItem, 'groupLists')"
                :class="{'zike-btn-active-selected': groupItem.active}"
                :key="groupIndex">
                  {{groupItem.groupName}}
              </el-button>
              <p class="tips">
                如果需要对部门组织进行修改，请点击左侧的
                <router-link :to="{name: 'organization'}" class="set">【组织】</router-link>
                进行修改；如无权限，请联系管理员修改。
              </p>
            </div>
            <!-- 组织-end -->
          </div>
        </div>
    </modal-dialog>
  </div>
</template>
<script>
import userUpdate from './index'
export default userUpdate
</script>
<style lang="scss">
@import "~cropperjs/dist/cropper.min.css";
#user-post {
	background: white;
  .groupList-type-list {
    margin: 20px 0px 18px 16px;
    .tips {
      color: #666;
      font-size: 12px;
      margin: 30px 0 0 0;
    }
    .set{
      cursor: pointer;
      color: #4080AD;
    }
    .el-button {
      width: 128px;
      padding: 10px 20px;
      margin: 0px 16px 16px 0px;
    }
  }
  .limit-width{
    width: 224px;
  }
  .form-btn{
    width: 124px;
  }
  .zike-btn-active-selected {
    background:rgba(255,226,102,0.2);
    border-radius:4px;
    font-size:14px;
    font-weight:400;
    color:#D7AB70;
    border-color: #EDEDED;
  }
  .selected-item {
    font-size: 12px;
    font-weight: 400;
    color: rgba(146,146,146,1);
    line-height: 40px;
    margin-bottom: 15px;
    overflow: hidden;
    span {
      background:rgba(248,248,248,1);
      border-radius:4px;
      border:1px solid rgba(220,220,220,1);
      display: inline-block;
      line-height: 1;
      padding: 4px 8px;
      font-size: 12px;
      color:rgba(0,0,0,0.65);
      margin-right: 8px;
      i{
        margin-left: 5px;
      }
    }
  }
  .zike-btn-selected {
    background:rgba(237,237,237,1);
    border-radius:4px;
    font-size:14px;
    font-weight:400;
    color:rgba(146,146,146,1);
    border-color: rgba(237,237,237,1);
  }
  .zike-btn-active-selected {
    background:rgba(255,226,102,0.2);
    border-radius:4px;
    font-size:14px;
    font-weight:400;
    color:#D7AB70;
    border-color: #EDEDED;
  }
}
#user-post {
  .upload-image {
    cursor: pointer;
    transition: .1s;
		display: inline-block;
		vertical-align: middle;
		width:96px;
		height: 96px;
		border-radius: 50%;
    &:hover{
      .upload-cover-mask{
        opacity: .3;
        visibility: visible;
      }
    };
	}
	.upload-image-tips {
		font-size:12px;
		font-weight:400;
		color:rgba(188,188,188,1);
		line-height:1;
		margin-top: 10px;
	}
	.click-item {
    margin-right: 8px;
    color:rgba(53,64,72,1);
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
  .upload-cover {
    width:96px;
    height:96px;
    border-radius:50%;
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }
  .upload-cover-mask {
    width:96px;
    height:96px;
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background: black;
    border-radius:50%;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    transition: all ease .4s;
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
#user-post {
  .cropper-alert-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 90;
    background: rgba(black, .5);
    visibility: hidden;
    height: 0;
    transition: all .3s ease;
  }
  .cropper-alert-mask.show {
    visibility: visible;
    height: 100%;
  }
  .cropper-alert {
    opacity: 0;
    transition: all .3s ease;
    visibility: hidden;
    transform: scale(2);
    padding: 30px 48px;
    position: fixed;
    z-index: 90;
    top: 50px;
    left: 50%;
    margin-left: -300px;
    background-color: white;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    overflow: hidden;
    &.show {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }
  .cropper {
    position: relative;
    width: 424px;
    height: 450px;
    padding: 60px 150px 60px 0;
    /*background-color: #f8f8f8;*/
  }
  .cropper-box {
    width: 420px;
    height: 420px;
    border-radius: 4px;
    overflow: hidden;
  }
  .cropper-res-wrap {
    text-align: center;
    position: absolute;
    top: 44px;
    right: 0;
    width: 100px;
    height: 100px;
    padding: 15px;
    /*background-color: #f8f8f8;*/
    box-sizing: content-box;
  }
  .cropper-res {
    width: 96px;
    height: 96px;
    overflow: hidden;
    background-color: white;
    border-radius: 50%;
  }
  #cropper-btn{
    width: 100%;
    height: 30px;
    background: white;
    border: 1px solid #e1e1e1;
    color: #646464;
  }
  .head-pic {
    width: 80px;
    height: 80px;
    position: relative;
    background: rgba(0,0,0,.1);
    overflow: hidden;
    line-height: 80px;
    text-align: center;
    border-radius: 100%;
    font-size: 20px;
  }
  .el-icon-close {
    position: absolute;
    right: 15px;
    top: 15px;
  }
  .modal-position {
    font-size: 16px;
    color: #000;
    line-height: 1;
    position: relative;
    &:before{
      content: '';
      height: 100%;
      width:6px;
      height:16px;
      background:rgba(255,226,102,1);
      display: inline-block;
      margin-right: 10px;
      float: left;
    };
  }
  .cropper-btns-wrap{
    text-align: right;
    .el-button {
      width: 124px;
      margin-left: 16px;
    }
  }
  .label-tips{
    font-size:14px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height: 1;
  }
  .cropper-view-box,
  .cropper-face {
    border-radius: 50%;
  }
}
</style>