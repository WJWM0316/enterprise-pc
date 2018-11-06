<template>
<div id="work-zone-post">
  <el-breadcrumb separator=">" class="zike-breadcrumb">
    <el-breadcrumb-item :to="{ name: 'workZoneList' }">工作圈管理</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name === 'workZonePost' ? '新建工作圈' : '更新工作圈'}}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    :model="form"
    :rules="rules"
    ref="form"
    label-width="160px"
    >

      <div class="walk-title">工作圈基础信息</div>

      <!-- 请填写工作圈名 -->
      <el-form-item
        label="工作圈名"
        prop="name"
        class="limit-width"
        >
          <el-input v-model="form.name" style="width: 380px;" placeholder="最多25个字" />
      </el-form-item>
      
      <!-- 选择圈主 -->
      <el-form-item
        label="选择圈主"
        prop="check_owner_uid"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.owner_uid.show">
            <span @click="removeSingleChecked('owner_uid')">{{form.owner_uid.tem.realname}}<i class="el-icon-close"></i></span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            @click="openModal('owner_uid')"
            :class="{'zike-btn-selected': form.owner_uid.show}">
              {{form.owner_uid.show ? '重新选择' : '点击选择'}}
          </el-button>
      </el-form-item>
      
      <!-- 选择成员 -->
      <el-form-item
        label="选择成员"
        prop="check_members"
        class="limit-width"
        > 
          <div class="selected-item" v-show="form.members.show">
            <span
              @click="removeMultipleCheck('members', mIndex)"
              :key="mIndex"
              v-for="(mItem, mIndex) in form.members.tem">
                {{ mItem.realname }}<i class="el-icon-close"></i>
            </span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            @click="openModal('members')"
            :class="{'zike-btn-selected': form.members.show}">
              {{form.members.show ? '重新选择' : '点击选择'}}
          </el-button>
      </el-form-item>


      <div class="walk-title">工作圈详细信息</div>

      <!-- 工作圈封面 -->
      <el-form-item
        label="工作圈封面"
        prop="check_cover_img_id"
        class="limit-width"
        >
        <div class="img-box" v-if="form.cover_img_id.tem && !imageUpload.showError">
          <img :src="form.cover_img_id.tem" class="upload-cover">
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
      
      <el-form-item
        label="工作圈介绍"
        prop="content"
        >
          <editor v-model="form.content" @change="handleContentEditorBlur" />
      </el-form-item>
      
      <div class="walk-title">其他设置</div>
      <!-- 选择不可见学员 -->
      <el-form-item
        label="选择不可见学员"
        prop="check_hits"
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

      <!-- 权重 -->
      <el-form-item
        label="权重"
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
        prop="check_organizations"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.organizations.show">
            <span
              @click="removeMultipleCheck('organizations', oIndex, oItem)"
              :key="oIndex"
              v-for="(oItem, oIndex) in form.organizations.tem">
                {{oItem}}<i class="el-icon-close"></i>
            </span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            :class="{'zike-btn-selected': form.organizations.show}"
            @click="openModal('organizations')">
              {{form.organizations.show ? '重新选择' : '点击选择'}}
          </el-button>
          <el-popover
            placement="top-start"
            ref="organizations"
            width="200"
            trigger="hover"
            content="选择此内容的管理权限所属的部门组织">
          </el-popover>
          <i class="el-icon-question" v-popover:organizations></i>
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
      <div slot="title" style="margin-left: 0px;">
        <h3 class="dialog-title">
          {{models.title}} 
        </h3>
      </div>
      <div slot="customize-html">
        <div class="customize-html-content">

          <!-- 选择圈主-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'owner_uid'">
            <div style="margin: 30px 0;">
              <search-bar
                width="464px"
                @search="handleSearch"
                v-model="ownerUidName"
                placeholder="请输入圈主名称" />
            </div>
            <div class="group-list">
<!--               <button class="common-btn" @click="filterOwnerUid('owner_uid', 'all')">所有人</button>
 -->              <button
                class="common-btn"
                v-for="(groupItem, groupIndex) in hasMemberGroupList"
                :key="groupIndex"
                @click="filterOwnerUid('owner_uid', groupItem)">
                {{groupItem.groupName}}
              </button>
            </div>
            <div class="menber-list limit-menber-height">
              <div
                v-for="(menberItem, menberIndex) in menberLists"
                :key="menberIndex"
                @click="seleteOwnerUid(menberItem)"
                :class="{'common-checkbox-active': menberItem.active}"
                class="common-checkbox">
                <i class="icon iconfont icon-check-circle" v-show="menberItem.active"></i>
                <i class="icon iconfont icon-radio_default" v-show="!menberItem.active"></i>
                <span>{{menberItem.realname}}</span>
              </div>
            </div>
          </div>
          <!-- 选择圈主-end -->

          <!-- 选择工作圈成员-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'members'">
            <div style="margin: 30px 0;">
              <search-bar
                width="464px"
                @search="handleSearch"
                v-model="ownerUidName"
                placeholder="请输入成员名称" />
            </div>
            <div class="group-list">
              <button
                class="common-btn"
                v-for="(groupItem, groupIndex) in hasMemberGroupList"
                :key="groupIndex"
                :class="{'common-btn-active': groupItem.active}"
                @click="filterMenber('members', groupItem)">
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
          <!-- 选择工作圈成员-end -->

          <!-- 组织-start -->
          <div class="organizations-type-list" v-if="models.currentModalName === 'organizations'">
            <button
              class="common-btn"
              v-for="(groupItem, groupIndex) in groupLists"
              :key="groupIndex"
              :class="{'common-btn-active': groupItem.active}"
              @click="seleteGroup(groupItem, 'groupLists')">
              {{groupItem.groupName}}
            </button>
            <p class="tips">
              如果需要对部门组织进行修改，请点击左侧的
              <router-link target="_blank" :to="{name: 'organization'}" class="set">【组织】</router-link>
              进行修改；如无权限，请联系管理员修改。
            </p>
          </div>
          <!-- 组织-end -->
          <!-- 选择不可见学员-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'hits'">
            <div style="margin: 30px 0;">
              <search-bar
                width="464px"
                @search="handleSearch"
                v-model="ownerUidName"
                placeholder="请输入成员名称" />
            </div>
            <div class="group-list">
              <button
                class="common-btn"
                v-for="(groupItem, groupIndex) in hasMemberGroupList"
                :key="groupIndex"
                :class="{'common-btn-active': groupItem.active}"
                @click="filterMenber('hits', groupItem)">
                {{groupItem.groupName}}
              </button>
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
          <!-- 选择不可见学员-end -->
        </div>
      </div>
  </modal-dialog>
</div>
</template>
<script>
import WorkZonePost from './index'
export default WorkZonePost
</script>
<style lang="scss">
#work-zone-post {
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
  .organizations-type-list {
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
  .zike-btn-active-selected {
    background:rgba(255,226,102,0.2);
    border-radius:4px;
    font-size:14px;
    font-weight:400;
    color:#D7AB70;
    border-color: #EDEDED;
  }
  .menber-compulsory-type-list {
    margin: 20px 18px 18px;
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
    min-width: 70px;
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
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(146,146,146,1);
    border-color: rgba(237,237,237,1);
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
  .click-item {
    color: #354048;
    margin-right: 8px;
  }
  .quanzhong {
    .el-input__inner {
      text-align: left;
    }
  }
  .img-box {
    overflow: hidden;
    margin-bottom: 15px;
    .upload-cover {
      width:96px;
      height:96px;
      border-radius:4px;
      display: block;
    }
  }
  .upload-image-tips {
    font-size:12px;
    font-weight:400;
    color:rgba(188,188,188,1);
    line-height:1;
    margin-top: 10px;
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
</style>