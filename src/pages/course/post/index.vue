<template>
<div id="course-post">
  <el-breadcrumb separator=">" class="zike-breadcrumb">
    <el-breadcrumb-item :to="{ name: 'course' }">课程管理</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name === 'coursePost' ? '新建课程' : '编辑课程'}}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    :model="form"
    :rules="rules"
    ref="form"
    label-width="160px"
    >

      <div class="walk-title">课程基础信息</div>

      <!-- 请填写课程名 -->
      <el-form-item
        label="课程名称"
        prop="title"
        class="limit-width"
        >
          <el-input v-model="form.title" :value="form.title" style="width: 380px;" placeholder="最多25个字" />
      </el-form-item>
      
      <!-- 课程分类 -->
      <el-form-item
        label="课程分类"
        prop="check_category_id"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.category_id.show">
            <span
              @click="removeSingleChecked('category_id', cateItem)"
              :key="cateIndex"
              v-for="(cateItem, cateIndex) in form.category_id.tem">
                {{ cateItem.categoryName }}<i class="el-icon-close"></i>
            </span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            @click="openModal('category_id')"
            :class="{'zike-btn-selected': form.category_id.show}">
              {{form.category_id.show ? '重新选择' : '点击选择'}}
          </el-button>
      </el-form-item>
      
      <!-- 选择导师 -->
      <el-form-item
        label="选择导师"
        prop="check_master_uid"
        class="limit-width"
        > 
          <div class="selected-item" v-show="form.master_uid.show" :class="{'no-margin-bottom': form.id}">
            <span @click="removeSingleChecked('master_uid', form.master_uid.tem)" v-if="!form.id">
              {{ form.master_uid.tem.realname }}<i class="el-icon-close"></i>
            </span>
            <span v-else>
              {{ form.master_uid.tem.realname }}
            </span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            @click="openModal('master_uid')"
            v-if="!form.id"
            :class="{'zike-btn-select      ed': form.master_uid.show}">
              {{form.master_uid.show ? '重新选择' : '点击选择'}}
          </el-button>
      </el-form-item>

      <div class="walk-title">课程详细信息</div>

      <!-- 课程封面 -->
      <el-form-item
        label="课程封面"
        prop="check_icon"
        class="limit-width item_cover"
        >
        <div class="img-box" v-if="form.icon.tem && !imageUpload.showError">
          <img :src="form.icon.tem" class="upload-cover">
          <img src="~IMAGES/up_clo_2.png" class="deleteImg" @click="removeImg">
        </div>
        <my-cropper
          :hasUploaded="imageUpload.hasUploaded"
          :btnTxt="imageUpload.btnTxt"
          :accept="imageUpload.accept"
          @success="imageUploadSuccess"
          @fail="imageUploadFail"></my-cropper>
        <div class="upload-error-tips" :class="{'upload-error-tips-show': imageUpload.showError}">
          <div class="tips">
            <p><i class="el-icon-error"></i></p>
            <p>上传失败</p>
          </div>
        </div>
        <div class="upload-image-tips">{{imageUpload.tips}}</div>
      </el-form-item>
      
      <!-- 课程简介 -->
      <el-form-item
        label="课程简介"
        prop="intro"
        >
          <editor v-model="form.intro" :isClear="false" @input="handleContentEditorBlur" />
      </el-form-item>
      
      <!-- 选择必修学员 -->
      <el-form-item
        label="选择必修学员"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.members.show">
            <span
              @click="removeMultipleCheck('members', hIndex)"
              v-for="(hItem, hIndex) in form.members.tem"
              :key="hIndex">
                {{hItem.realname}}<i class="el-icon-close"></i>
            </span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            :class="{'zike-btn-selected': form.members.show}"
            @click="openModal('members')">
              {{form.members.show ? '重新选择' : '点击选择'}}
          </el-button>
      </el-form-item>

      <!-- 不可见学员 -->
      <el-form-item
        label="选择不可见学员"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.hits.show">
            <span
              @click="removeMultipleCheck('hits', hIndex)"
              v-for="(hItem, hIndex) in form.hits.tem"
              :key="hIndex">
                {{hItem.realname}}<i class="el-icon-close"></i>
            </span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            :class="{'zike-btn-selected': form.hits.show}"
            @click="openModal('hits')">
              {{form.hits.show ? '重新选择' : '点击选择'}}
          </el-button>
          <el-popover
            placement="top-start"
            ref="hits"
            width="200"
            trigger="hover"
            content="选择的学员在员工端将无法看到该内容的露出">
          </el-popover>
          <i class="el-icon-question" v-popover:hits></i>
      </el-form-item>

      <div class="walk-title">其他设置</div>

      <!-- 权重设置 -->
      <el-form-item
        label="权重设置"
        class="limit-width"
        >
          <el-input-number
            v-model="form.sort"
            controls-position="right"
            :min="1" :max="1000000"
            class="click-item quanzhong"
            style="width: 240px"
            :controls="false" />
          <el-popover
            placement="top-start"
            ref="sort"
            width="200"
            trigger="hover"
            content="权重数越大，排序越靠前。权重数一样的情况下，按创建时间晚的排前面。">
          </el-popover>
          <i class="el-icon-question" v-popover:sort></i>
      </el-form-item>

      <!-- 是否上线 -->
      <el-form-item label="是否上线">
        <el-radio v-model="form.status" :label="1">上线</el-radio>
        <el-radio v-model="form.status" :label="0">下线</el-radio>
      </el-form-item>
      
      <!-- 所属组织 -->
      <el-form-item
        label="归属于"
        prop="check_group_id"
        class="limit-width"
        >
          <div class="selected-item group"  v-show="form.group_id.show">
            <span
              @click="removeMultipleCheck('group_id', groupIndex, groupItem)"
              :key="groupIndex"
              v-for="(groupItem, groupIndex) in form.group_id.tem">
                {{groupItem.groupName}}<i class="el-icon-close"></i>
            </span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            :class="{'zike-btn-selected': form.group_id.show}"
            @click="openModal('group_id')">
              {{form.group_id.show ? '重新选择' : '点击选择'}}
          </el-button>
          <el-popover
            placement="top-start"
            ref="group_id"
            width="200"
            trigger="hover"
            content="选择此内容的管理权限所属的部门组织">
          </el-popover>
          <i class="el-icon-question" v-popover:group_id></i>
      </el-form-item>
      <!-- 确认提交 -->
      <el-form-item class="footer-button">
        <el-button type="primary" @click="checkSubmit" :loading="!submitBtnClick" class="form-submit-btn">{{ submitBtnTxt }}</el-button>
      </el-form-item>
  </el-form>
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
      <div slot="title" style="margin-left: 0px;">
        <h3 class="dialog-title">
          {{models.title}} 
        </h3>
      </div>
      <div slot="customize-html">
        <div class="customize-html-content">

          <!-- 课程分类-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'category_id'">
            <div class="group-list">
              <button class="common-btn" v-for="(cateItem, cateIndex) in categoryList"
                :key="cateIndex"
                :class="{'common-btn-active': cateItem.active}"
                @click="selectCategory(cateItem, 'categoryList')">
                {{cateItem.categoryName}}
              </button>
              <el-popover
                placement="top"
                width="304"
                trigger="click"
                popper-class="my-popover0001"
                v-model="categoryModal.show">
                <div class="header">新建分类</div>
                <div class="main">
                  <el-input v-model="categoryModal.name" placeholder="请输入分类名，限制10个字以内" :maxlength="10"></el-input>
                </div>
                <div class="footer-btn-box">
                  <el-button size="mini" @click="categoryModal.show = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="getCategory" :loading="categoryModal.loading">确定</el-button>
                </div>
                <el-button size="large" slot="reference">
                  + &nbsp;新建分类
                </el-button>
              </el-popover>
            </div>
            <div class="tips">
              如果需要对部门组织进行修改，请点击
              <a @click="routeJump('setSort')">【分类设置】</a>
              进行修改；如无权限，请联系管理员修改。
            </div>
          </div>
          <!-- 课程分类-end -->

          <!-- 选择导师-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'master_uid'">
            <div style="margin: 30px 0;">
              <search-bar
                width="464px"
                @search="handleSearchTutor"
                v-model="ownerUidName"
                placeholder="请输入导师名称" />
                <div class="transition-flex-box tutor-nodata" v-if="searchResult.tutor">
                Ops，暂时没有找到这个导师，点击右下方按钮，添加新的外部导师吧
              </div>
            </div>
            <div class="selected-item" v-show="form.master_uid.show">
              已选择：
              <span @click="removeSingleChecked('master_uid', form.master_uid.tem)">
                {{ form.master_uid.tem.realname }}<i class="el-icon-close"></i>
              </span>
            </div>
            <div class="group-list">
              <!-- <button class="common-btn" @click="tutorClassification('uid', 'outer')">外部导师</button> -->
              <button class="common-btn"
                v-for="(groupItem, groupIndex) in selfTutorLists"
                :key="groupIndex"
                :class="{'common-btn-active': groupItem.active}"
                @click="tutorClassification('uid', groupItem)">
                {{groupItem.groupName}}
              </button>
            </div>
            <div class="menber-list limit-menber-height">
              <div
                class="common-checkbox"
                :class="{'common-checkbox-active': tutorItem.active}"
                v-for="(tutorItem, tutorIndex) in temTutorLists"
                @click="fetchTutor(tutorItem)"
                :key="tutorIndex">
                <i class="icon iconfont icon-checked" v-show="tutorItem.active"></i>
                <i class="icon iconfont icon-radio_default" v-show="!tutorItem.active"></i>
                <span>{{tutorItem.realname}}</span>
              </div>
            </div>
          </div>
          <!-- 选择课程成员-end -->

          <!-- 组织-start -->
          <div class="groupList-type-list" v-if="models.currentModalName === 'group_id'">
            <button class="common-btn" 
              v-for="(groupItem, groupIndex) in groupLists"
               @click="seleteGroup(groupItem, 'groupLists')"
              :class="{'common-btn-active': groupItem.active}"
              :key="groupIndex">
              {{groupItem.groupName}}
            </button>
            <p class="tips">
              如果需要对部门组织进行修改，请点击左侧的
              <a class="set" @click="routeJump('organization')">【组织】</a>
              进行修改；如无权限，请联系管理员修改。
            </p>
          </div>
          <!-- 组织-end -->

          <!-- 必修学员-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'members'">
            <div style="margin: 30px 0;">
              <search-bar
                width="464px"
                @search="handleSearch(1)"
                v-model="ownerUidName"
                placeholder="请输入学员名称" />
                <div class="transition-flex-box tutor-nodata" v-if="searchResult.student_1">
                Ops，暂时没有找到这个导师，点击右下方按钮，添加新的外部导师吧
              </div>
            </div>
            <div class="group-list">
              <button
                class="common-btn"
                v-for="(groupItem, groupIndex) in hasMemberGroupList"
                :key="groupIndex"
                :class="{'common-btn-active': groupItem.active}"
                @click="filterMenber('groupList', groupItem)">
                {{groupItem.groupName}}
              </button>
            </div>
            <div class="menber-list limit-menber-height">
              <div
                v-for="(menberItem, menberIndex) in menberLists"
                :key="menberIndex"
                @click="multipleSelection('members', menberItem, menberIndex)"
                :class="{'common-checkbox-active': menberItem.active}"
                class="common-checkbox">
                <i class="icon iconfont icon-check-circle" v-show="menberItem.active"></i>
                <i class="icon iconfont icon-radio_default" v-show="!menberItem.active"></i>
                <span>{{menberItem.realname}}</span>
              </div>
            </div>
          </div>
          <!-- 必修学员-end -->

           <!-- 不可见学员-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'hits'">
            <div style="margin: 30px 0;">
              <search-bar
                width="464px"
                @search="handleSearch(2)"
                v-model="ownerUidName"
                placeholder="请输入学员名称" />
                <div class="transition-flex-box tutor-nodata" v-if="searchResult.student_2">
                Ops，暂时没有找到这个导师，点击右下方按钮，添加新的外部导师吧
              </div>
            </div>
            <div class="group-list">
              <button
                v-for="(groupItem, groupIndex) in hasMemberGroupList"
                class="common-btn"
                :class="{'common-btn-active': groupItem.active}"
                :key="groupIndex"
                @click="filterMenber('groupList', groupItem)">{{groupItem.groupName}}</button>
            </div>
            <div class="menber-list limit-menber-height">
              <div
                v-for="(menberItem, menberIndex) in menberLists"
                :key="menberIndex"
                @click="multipleSelection('hits', menberItem, menberIndex)"
                :class="{'common-checkbox-active': menberItem.active}"
                class="common-checkbox">
                <i class="icon iconfont icon-check-circle" v-show="menberItem.active"></i>
                <i class="icon iconfont icon-radio_default" v-show="!menberItem.active"></i>
                <span>{{menberItem.realname}}</span>
              </div>
            </div>
          </div>
          <!-- 不可见学员-end -->
        </div>
      </div>
  </modal-dialog>
</div>
</template>
<script>
import CoursePost from './index'
export default CoursePost
</script>
<style lang="scss">
@import "~cropperjs/dist/cropper.min.css";
#course-post {
  background: white;
  .el-form-item {
    margin-bottom: 32px;
  }
  .el-form {
    margin-bottom: 50px;
  }
  .quanzhong-row {
    input{
      text-align: left;
    }
  }
  .limit-width {
    width: 100%;
  }
  .walk-title {
    font-size: 16px;
    padding-bottom: 15px;
    line-height: 1;
    border-bottom: 1px solid #ebeef5;
    font-size: 20px;
    margin: 56px 44px 30px 0px;
    color: #354048;
  }
  .customize-html-content {
    flex-grow: 1;
    overflow: hidden;
  }
  .course-type-list {
    margin-top: 20px;
    .tips {
      color: #666;
      font-size: 12px;
      margin: 30px 0 0 16px;
    }
    .set{
      cursor: pointer;
      color: #4080AD;
    }
    .add-type {
      cursor: pointer;
      color: #4080AD;
      font-size: 14px;
    }
  }
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
      min-width: 128px;
      padding: 10px 20px;
      margin: 0px 16px 16px 0px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .menber-compulsory-type-list {
    margin: 24px 18px 18px;
    .search-bar {
      border-radius: 4px;
      border: 1px solid rgba(220,223,230,1);
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 465px;
      position: relative;
      overflow: hidden;
      margin-bottom: 25px;
      input {
        width: 100%;
        height: calc(100% - 2px);
        position: absolute;
        left: 0;
        top: 0;
        outline: none;
        border: none;
        display: block;
        box-sizing: border-box;
        padding: 0 10px;
      }
      span {
        width: 40px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        outline: none;
        border: none;
        display: block;
        box-sizing: border-box;
        padding: 0 10px;
        text-align: center;
        cursor: pointer;
      }
    }
    .el-button {
      min-width: 128px;
      padding: 10px 20px;
      margin: 0px 16px 16px 0px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tips {
      font-size:12px;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height: 1;
      margin: 16px 0;
      span {
        color: #4080AD;
      }
      a {
        color: #4080AD;
        text-decoration: none;
      }
    }
  }
  .item_cover {
    .upload-image {
      padding: 12px 0;
      width: 96px;
      height: 40px;
    }
  }
  .el-form-item__label {
    padding-right: 16px;
  }

  .el-radio {
    margin: 10px 32px 10px 0px;
    &.is-checked {
      .el-radio__inner {
        border-color: rgba(215,171,112,1);
        background:rgba(215,171,112,1);
      }
      .el-radio__label {
        color:rgba(215,171,112,1);
      }
    }
    color:rgba(188,188,188,1);
  }

  .el-checkbox {
    margin-top: 10px !important;
    margin-left: 0px !important;
    margin-bottom: 10px !important;
    margin-right: 10px !important;
  }

  .el-icon-question {
    color: rgba(214,214,214,1);
    &::before {
      font-size: 16px;
    }
  }
  .selected-item {
    font-size: 12px;
    font-weight: 400;
    color: rgba(146,146,146,1);
    line-height: 40px;
    margin-bottom: 6px;
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
  .zike-btn-active {
    color: rgb(230, 203, 92);
    border-color: rgb(230, 203, 92); 
    outline: 0;
    background-color: rgb(255, 252, 240);
  }
  .zike-btn-selected {
    background:rgba(237,237,237,1);
    border-radius:4px;
    font-size:14px;
    font-weight:400;
    color:#929292 !important;
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
  .header-seleted-item {
    font-size: 12px;
    font-weight: 400;
    color: #000000;
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
    span {
      background: #f8f8f8;
      border-radius: 4px;
      border: 1px solid gainsboro;
      display: inline-block;
      padding: 4px 8px;
      font-size: 12px;
      color:rgba(0,0,0,0.65);
      display: inline-block;
    }
  }
  .my-btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    width: 128px;
    padding: 10px 20px;
    margin: 0px 16px 16px 0px;
  }
  .upload-image-tips {
    font-size:12px;
    font-weight:400;
    color:rgba(188,188,188,1);
    line-height:1;
  }
  .click-item {
    margin-right: 8px;
    color:rgba(53,64,72,1);
  }
  .quanzhong {
    .el-input__inner {
      text-align: left;
    }
  }
  .img-box {
    //overflow: hidden;
    position: relative;
    margin-bottom: 15px;
    .upload-cover {
      width:96px;
      height:96px;
      border-radius:4px;
      display: block;
    }
    .deleteImg {
      width:18px;
      height:18px;
      position: absolute;
      left: 88px;
      top: -9px;
      cursor: pointer;
    }
  }
  .upload-error-tips {
    width:0;
    height:0;
    background:rgba(237,237,237,1);
    border-radius:4px;
    vertical-align: middle;
    margin-right: 16px;
    transition: all ease .4s;
    position: relative;
    margin: 16px 0;
    transform: scale(0);
    transform-origin: 100% 100%;
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
    transform: scale(1);
    width:96px;
    height:96px;
  }
}
.my-popover0001 {
  z-index: 100000000000 !important;
  padding: 16px;
  .footer-btn-box {
    text-align: center;
  }
  button {
    width: 76px;
    margin: 0 8px;
  }
  .header {
    font-size:14px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height: 1;
    text-align: center;
    margin-bottom: 20px;
  }
  .main {
    margin-bottom: 50px;
  }
  .el-input__inner{
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    border: 1px solid #bcbcbc;
  }
  .el-button:focus, .el-button:hover {
    color: unset;
    border-color: unset;
    background-color: unset;
  }
  .el-checkbox__label{
    min-width: 70px;
  }
}
.footer-button {
  margin: 40px 0;
  button {
    width: 120px;
  }
}

.transition-flex-box {
  margin-top: 20px;
  height: 48px;
  border-radius: 4px;
  display: flex;
  line-height: 48px;
  width: 464px;
  font-size:14px;
  font-weight:400;
  color:rgba(90,94,102,1);
  margin-bottom: 50px;
  .img-box {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(0,0,0,.1);
    margin-right: 16px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .text-inner-content{
    flex-grow: 1;
  }
  .phone-box {
    font-size:14px;
    color:rgba(53,64,72,1);
  }
  p {
    margin: 0;
    line-height: 1;
  }
  .user-name {
    font-size:14px;
    font-weight:400;
    color:rgba(53,64,72,1);
    margin-top: 8px;
  }
  .user-degree {
    font-size:12px;
    font-weight:400;
    color:rgba(102,102,102,1);
    margin-top: 5px;
  }
}

.tutor-nodata {
  background: #fff;
  min-width: 150px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  padding: 12px;
  z-index: 2000;
  color: #606266;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  height: 24px;
  line-height: 24px;
  position: relative;
  &:before{
    width: 0;
    height: 0;
    border-color: red;
    position: absolute;
    top: -16px;
    left: 40px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent #ebeef5 transparent;
    display: block;
    content: '';
  };
  &:after{
    width: 0;
    height: 0;
    border-color: red;
    position: absolute;
    top: -15px;
    left: 40px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
    display: block;
    content: '';
  };
}

</style>