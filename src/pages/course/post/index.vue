<template>
<div id="course-post">
  <el-breadcrumb separator=">" class="zike-breadcrumb">
    <el-breadcrumb-item :to="{ name: 'broadcast' }">课程管理</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name === 'broadcastPost' ? '新建课程' : '更新课程'}}</el-breadcrumb-item>
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
          <el-input v-model="form.title" :maxlength="30" style="width: 380px;" />
      </el-form-item>
      
      <!-- 课程分类 -->
      <el-form-item
        label="课程分类"
        prop="check_category_id"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.category_id.show">
            已选择：
            <span
              @click="removeMultipleCheck('category_id', cateIndex)"
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
      
      <!-- 课程导师 -->
      <el-form-item
        label="课程导师"
        prop="check_master_uid"
        class="limit-width"
        > 
          <div class="selected-item" v-show="form.master_uid.show">
            已选择：
            <span @click="removeSingleChecked('master_uid')">
              {{ form.master_uid.tem.realname }}<i class="el-icon-close"></i>
            </span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            @click="openModal('master_uid')"
            :class="{'zike-btn-selected': form.master_uid.show}">
              {{form.master_uid.show ? '重新选择' : '点击选择'}}
          </el-button>
      </el-form-item>

      <!-- 所属组织 -->
      <el-form-item
        label="所属组织"
        prop="check_group_id"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.group_id.show">
            已选择：
            <span
              @click="removeMultipleCheck('group_id', groupIndex)"
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

      <div class="walk-title">课程详细信息</div>

      <!-- 课程封面 -->
      <el-form-item
        label="课程封面"
        prop="check_icon"
        class="limit-width"
        >
        <div class="upload-error-tips upload-error-tips-show" v-if="form.icon.showError">
          <div class="tips">
            <p><i class="el-icon-error"></i></p>
            <p>上传失败</p>
          </div>
        </div>
        <div class="upload-image click-item" role="button" @click="onSelectFile" :class="{'zike-btn-selected': form.icon.tem}">
          <i  class="el-icon-upload"></i> {{form.icon.tem ? '重新上传' : '上传封面'}}
          <input type="file" id="uplaod-file" ref="hiddenFile" name="file" @change="onFileChange" style="display: none;" />
        </div>
        <div class="img-box" v-if="form.icon.tem">
          <img :src="form.icon.tem" class="upload-cover">
        </div>
        <div class="upload-image-tips">建议尺寸160X160px ，JPG、PNG格式，图片小于5M</div>
      </el-form-item>
      
      <!-- 课程简介 -->
      <el-form-item
        label="课程简介"
        >
          <editor
            class="editor"
            :content="ContentEditor.content"
            v-model="form.intro"
            :path="ContentEditor.path"
            :height="ContentEditor.height"
            @blur="handleContentEditorBlur" />
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
                {{hItem}}<i class="el-icon-close"></i>
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
        label="不可见学员"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.hits.show">
            <span
              @click="removeMultipleCheck('hits', hIndex)"
              v-for="(hItem, hIndex) in form.hits.tem"
              :key="hIndex">
                {{hItem}}<i class="el-icon-close"></i>
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
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
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

      <!-- 确认提交 -->
      <el-form-item>
        <el-button type="primary" @click="checkSubmit" :loading="!submitBtnClick">{{ submitBtnTxt }}</el-button>
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
      <div slot="title" style="margin-left: 10px;">
        <h3 class="dialog-title">
          {{models.title}} 
        </h3>
      </div>
      <div slot="customize-html">
        <div class="customize-html-content">
          <!-- 课程分类-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'category_id'">
            <div class="group-list">
              <el-button
                size="large"
                v-for="(cateItem, cateIndex) in temcategoryList"
                :key="cateIndex"
                :class="{'zike-btn-active-selected': cateItem.active}"
                @click="selectCategory(cateItem, 'categoryList')">
                  {{cateItem.categoryName}}
              </el-button>
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
              如果需要对部门组织进行修改，请点击<span>【分类设置】</span>进行修改；如无权限，请联系管理员修改。
            </div>
          </div>
          <!-- 课程分类-end -->
          <!-- 选择课程导师-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'master_uid'">
            <div style="margin: 30px 0;">
              <search-bar
                width="464px"
                @search="handleSearch"
                v-model="ownerUidName"
                placeholder="请输入导师名称" />
            </div>
            <div class="group-list">
              <el-button size="large" @click="tutorClassification('master_uid', 'outer')">外部导师</el-button>
              <el-button
                size="large"
                v-for="(groupItem, groupIndex) in groupLists"
                :key="groupIndex"
                :class="{'zike-btn-active-selected': groupItem.active}"
                @click="tutorClassification('master_uid', groupItem)">
                  {{groupItem.groupName}}
              </el-button>
            </div>
            <div class="menber-list">
              <el-radio v-model="form.master_uid.value"
                :label="tutorItem.uid"
                :key="tutorIndex"
                @change="singleSelection('master_uid', tutorItem)"
                v-for="(tutorItem, tutorIndex) in temTutorLists">
                  {{tutorItem.realname}}
              </el-radio>
            </div>
          </div>
          <!-- 选择课程成员-end -->
          <!-- 组织-start -->
          <div class="groupList-type-list" v-if="models.currentModalName === 'group_id'">
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
          <!-- 必修学员-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'members'">
            <div style="margin: 30px 0;">
              <search-bar
                width="464px"
                @search="handleSearch"
                v-model="ownerUidName"
                placeholder="请输入导师名称" />
            </div>
            <div class="group-list">
              <el-button size="large" @click="memberClassification('uid', 'all')">所有人</el-button>
              <el-button
                size="large"
                v-for="(groupItem, groupIndex) in groupLists"
                :key="groupIndex"
                @click="filterWorkZoneMenber('groupList', groupItem.groupId)">
                  {{groupItem.groupName}}
              </el-button>
            </div>
            <div class="menber-list">
              <el-checkbox-group v-model="form.members.tem">
                <el-checkbox
                  :label="menberItem.realname"
                  :key="menberIndex"
                  @change="multipleSelection('members', menberItem)"
                  v-for="(menberItem, menberIndex) in temMenberLists" />
              </el-checkbox-group>
            </div>
          </div>
          <!-- 必修学员-end -->
           <!-- 不可见学员-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'hits'">
            <div style="margin: 30px 0;">
              <search-bar
                width="464px"
                @search="handleSearch"
                v-model="ownerUidName"
                placeholder="请输入导师名称" />
            </div>
            <div class="group-list">
              <el-button size="large" @click="memberClassification('uid', 'all')">所有人</el-button>
              <el-button
                size="large"
                v-for="(groupItem, groupIndex) in groupLists"
                :key="groupIndex"
                @click="filterWorkZoneMenber('groupList', groupItem.groupId)">
                  {{groupItem.groupName}}
              </el-button>
            </div>
            <div class="menber-list">
              <el-checkbox-group v-model="form.hits.tem">
                <el-checkbox
                  :label="menberItem.realname"
                  :key="menberIndex"
                  @change="multipleSelection('hits', menberItem)"
                  v-for="(menberItem, menberIndex) in temMenberLists" />
              </el-checkbox-group>
            </div>
          </div>
          <!-- 不可见学员-end -->
        </div>
      </div>
  </modal-dialog>
  <div class="cropper-alert-mask" :class="{show: flag.imgHasLoad}">
    <div class="cropper-alert" :class="{show: flag.imgHasLoad}">
      <i class="el-icon-circle-close" @click="flag.imgHasLoad=false"></i>
      <div class="cropper">
        <div class="cropper-box" id="cropperBox">
          <img id="uploadPreview" style="width:100px;height:100px;"/>
        </div>
        <div class="cropper-res-wrap">
          <div class="cropper-res" id="cropperRes">
            <img style="width:100px;height:100px;"/>
          </div>
        </div>
      </div>
      <div class="cropper-btns-wrap">
        <button id="cropper-btn" @click="finishCropImage" :disabled="flag.btnTips.disable">{{ flag.btnTips.value }}</button>
      </div>
    </div>
  </div>
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
    line-height: 1;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(220,223,230,1);
    font-size: 20px;
    margin: 40px 44px 30px 0px;
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
      width: 128px;
      padding: 10px 20px;
      margin: 0px 16px 16px 0px;
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
      width: 128px;
      padding: 10px 20px;
      margin: 0px 16px 16px 0px;
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
    }
  }
  .el-radio {
    margin: 10px 30px 10px 0px;
  }
  .el-checkbox {
    margin-top: 10px !important;
    margin-left: 0px !important;
    margin-bottom: 10px !important;
    margin-right: 10px !important;
  }
  .el-radio__label {
    box-sizing: border-box;
    width: 70px;
    padding-left: 5px;
    display: inline-block; 
  }
  .el-icon-question {
    color: rgba(214,214,214,1);
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
}

#course-post {
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
    padding: 30px;
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
    width: 400px;
    height: 300px;
    padding: 80px 150px;
    background-color: #f8f8f8;
  }
  .cropper-box {
    width: 300px;
    height: 300px;
  }
  .cropper-res-wrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    padding: 15px;
    background-color: #f8f8f8;
    box-sizing: content-box;
  }
  .cropper-res {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: 1px solid #e1e1e1;
    background-color: white;
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
  }
}
</style>