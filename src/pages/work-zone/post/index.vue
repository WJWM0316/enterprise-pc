<template>
<div id="work-zone-post">
  <el-breadcrumb separator=">" class="zike-breadcrumb">
    <el-breadcrumb-item :to="{ name: 'course' }">工作圈管理</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name === 'coursePost' ? '新建工作圈' : '更新工作圈'}}</el-breadcrumb-item>
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
          <el-input v-model="form.name" :maxlength="30" style="width: 380px;" />
      </el-form-item>
      
      <!-- 选择圈主 -->
      <el-form-item
        label="选择圈主"
        prop="check_owner_uid"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.owner_uid.show">
            已选择：<span @click="removeSingleChecked('owner_uid')">{{form.owner_uid.tem.realname}}<i class="el-icon-close"></i></span>
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
        prop="check_menbers"
        class="limit-width"
        > 
          <div class="selected-item" v-show="form.members.show">
            已选择：
            <span
              @click="removeMultipleCheck('members', mIndex)"
              :key="mIndex"
              v-for="(mItem, mIndex) in form.members.tem">
                {{ mItem }}<i class="el-icon-close"></i>
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

      <!-- 所属组织 -->
      <el-form-item
        label="所属组织"
        prop="check_organizations"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.organizations.show">
            已选择：
            <span
              @click="removeMultipleCheck('organizations', oIndex)"
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
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
          </el-popover>
          <i class="el-icon-question" v-popover:organizations></i>
      </el-form-item>

      <div class="walk-title">工作圈详细信息</div>

      <!-- 工作圈封面 -->
      <el-form-item
        label="工作圈封面"
        prop="check_cover_img_id"
        class="limit-width"
        >
        <div class="upload-error-tips upload-error-tips-show" v-if="form.cover_img_id.showError">
          <div class="tips">
            <p><i class="el-icon-error"></i></p>
            <p>上传失败</p>
          </div>
        </div>
        <div class="upload-image click-item" role="button" @click="onSelectFile" :class="{'zike-btn-selected': form.cover_img_id.tem}">
          <i  class="el-icon-upload"></i> {{form.cover_img_id.tem ? '重新上传' : '上传封面'}}
          <input type="file" id="uplaod-file" ref="hiddenFile" name="file" @change="onFileChange" style="display: none;" />
        </div>
        <div class="img-box" v-if="form.cover_img_id.tem">
          <img :src="form.cover_img_id.tem" class="upload-cover">
        </div>
        <div class="upload-image-tips">建议尺寸160X160px ，JPG、PNG格式，图片小于5M</div>
      </el-form-item>
      
      <el-form-item
        label="工作圈介绍"
        prop="content"
        >
          <editor
            class="editor"
            :content="ContentEditor.content"
            v-model="form.content"
            :path="ContentEditor.path"
            :height="ContentEditor.height"
            @blur="handleContentEditorBlur" />
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
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
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
          <!-- 选择圈主-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'owner_uid'">
            <div style="margin: 30px 0;">
              <search-bar
                width="464px"
                @search="handleSearch"
                v-model="ownerUidName"
                placeholder="请输入导师名称" />
            </div>
            <div class="group-list">
              <el-button
                size="large"
                v-for="(groupItem, groupIndex) in groupLists"
                :key="groupIndex"
                @click="filterWorkZoneMenber(groupItem)">
                  {{groupItem.groupName}}
              </el-button>
            </div>
            <div class="menber-list">
              <el-radio v-model="form.owner_uid.value"
                :label="menberItem.uid"
                :key="menberIndex"
                @change="singleSelection('owner_uid', menberItem)"
                v-for="(menberItem, menberIndex) in temMenberLists">
                  {{menberItem.realname}}
              </el-radio>
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
                placeholder="请输入导师名称" />
            </div>
            <div class="group-list">
              <el-button size="large" @click="memberClassification('members', 'all')">所有人</el-button>
              <el-button
                size="large"
                v-for="(groupItem, groupIndex) in groupLists"
                :key="groupIndex"
                @click="memberClassification('members', groupItem.id)">
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
          <!-- 选择工作圈成员-end -->
          <!-- 组织-start -->
          <div class="organizations-type-list" v-if="models.currentModalName === 'organizations'">
            <el-checkbox-group v-model="form.organizations.tem">
              <el-checkbox
                :label="groupItem.groupName"
                v-for="(groupItem, groupIndex) in groupLists"
                :key="groupIndex"
                @change="seleteGroup('organizations', groupItem)" />
            </el-checkbox-group>
            <p class="tips">如果需要对部门组织进行修改，请点击左侧的<a class="set">【组织】</a>进行修改；如无权限，请联系管理员修改。</p>
          </div>
          <!-- 组织-end -->
          <!-- 选择不可见学员-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'hits'">
            <div style="margin: 30px 0;">
              <search-bar
                width="464px"
                @search="handleSearch"
                v-model="ownerUidName"
                placeholder="请输入导师名称" />
            </div>
            <div class="group-list">
              <el-button size="large" @click="memberClassification('members', 'all')">所有人</el-button>
              <el-button
                size="large"
                v-for="(groupItem, groupIndex) in groupLists"
                :key="groupIndex"
                @click="memberClassification('organizations', groupItem.id)">
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
          <!-- 选择不可见学员-end -->
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
import WorkZonePost from './index'
export default WorkZonePost
</script>
<style lang="scss">
@import "~cropperjs/dist/cropper.min.css";
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
      width: 128px;
      padding: 10px 20px;
      margin: 0px 16px 16px 0px;
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
}

#work-zone-post {
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
</style>