<template>
<div id="work-zone-post">
  <el-breadcrumb separator=">" class="page-navigation">
    <el-breadcrumb-item :to="{ name: 'course' }">工作圈管理</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name === 'coursePost' ? '新建工作圈' : '更新工作圈'}}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    :model="form"
    :rules="rules"
    ref="form"
    label-width="160px"
    label-suffix="："
    >

      <div class="walk-title">课程基础信息</div>

      <!-- 请填写课程名称 -->
      <el-form-item
        label="工作圈名"
        prop="name"
        class="limit-width"
        >
          <el-input v-model="form.name" :maxlength="30" />
      </el-form-item>
      
      <!-- 课程分类 -->
      <el-form-item
        label="选择圈主"
        prop="owner_uid"
        class="limit-width"
        >
          <el-button class="click-item" type="warning" @click="openModal('owner_uid')">点击选择</el-button>
          <span v-show="form.owner_uid">已选择：【产品-阿杰】</span>
      </el-form-item>
      
      <!-- 选择成员 -->
      <el-form-item
        label="选择成员"
        prop="members"
        class="limit-width"
        >
          <el-button class="click-item" type="warning" @click="openModal('members')">点击选择</el-button>
          <span v-show="form.members">已选择：【产品-阿杰】</span>
      </el-form-item>

      <!-- 所属组织 -->
      <el-form-item
        label="所属组织"
        prop="organizations"
        class="limit-width"
        >
          <el-tooltip
            effect="dark"
            content="这是所属组织的提示文案哦~"
            placement="top-start">
            <i class="el-icon-question label-belong-tips-icon"></i>
          </el-tooltip>
          <el-button class="click-item" type="warning" @click="openModal('organizations')">点击选择</el-button>
          <span v-show="form.organizations">已选择：【产品-阿杰】</span>
      </el-form-item>

      <div class="walk-title">课程详细信息</div>

      <!-- 课程封面 -->
      <el-form-item
        label="工作圈封面"
        prop="classification"
        class="limit-width"
        >
        <img :src="companyLogoUrl" class="avatar">
        <div class="upload-image" role="button" @click="onSelectFile">
          <i  class="el-icon-upload"></i> 上传封面
          <input type="file" id="uplaod-file" ref="hiddenFile" @change="onFileChange" style="display: none;"/>
        </div>
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
        prop="organizations"
        class="limit-width"
        >
          <el-tooltip
            effect="dark"
            content="这是选择不可见学员的提示文案哦~"
            placement="top-start"
            >
              <i class="el-icon-question label-hidden-tips-icon"></i>
          </el-tooltip>
          <el-button class="click-item" type="warning" @click="openModal('menberInvisible')">点击选择</el-button>
          <span v-show="form.hits">已选择1名学员</span>
      </el-form-item>

      <!-- 权重 -->
      <el-form-item
        label="权重"
        class="limit-width"
        >
          <el-tooltip
            effect="dark"
            content="这是权重的提示文案哦~"
            placement="top-start">
            <i class="el-icon-question label-qunzhong-ips-icon"></i>
          </el-tooltip>
          <el-input-number
            v-model="form.sort"
            controls-position="right"
            :min="1" :max="1000000"
            class="limit-width quanzhong-row"
            :controls="false" />
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
    @confirm="confirm"
    >
      <div slot="customize-html">
        <div class="tutor-box">
          <div class="search-box">
            <el-autocomplete
              :fetch-suggestions="debounce"
              placeholder="请输入内容"
              @select="handleSelect(models.currentModalName)"
              style="margin-top: 5px;" 
              />
          </div>
          <div class="tutor-list">
            <el-button
              type="primary"
              v-for="item in 10"
              style="margin: 6px;"
              :key="item"
              >
                导师
            </el-button>
          </div>
        </div>
        <div style="margin-top: 10px;">
          <!-- 选择圈主 -->
          <el-radio-group v-model="selectedModal.owner_uid" v-show="models.currentModalName==='owner_uid'">
            <el-radio
              :label="courseItem"
              v-for="(courseItem, courseIndex) in courseTypeList"
              :key="courseIndex">
                {{courseItem.label}}
            </el-radio>
          </el-radio-group>
          <!-- 选择成员 -->
          <el-radio-group v-model="selectedModal.members" v-show="models.currentModalName==='members'">
            <el-radio
              :label="tutorItem"
              v-for="(tutorItem, tutorIndex) in tutorList"
              :key="tutorIndex">
                {{tutorItem.label}}
            </el-radio>
          </el-radio-group>
          <!-- 组织 -->
          <el-checkbox-group v-model="selectedModal.organizations" v-show="models.currentModalName==='organizations'">
            <el-checkbox
              :label="organizationsItem.label"
              v-for="(organizationsItem, organizationsIndex) in organizationsList"
              :key="organizationsIndex" />
          </el-checkbox-group>
          <!-- 必修学员 -->
          <el-checkbox-group v-model="selectedModal.menberCompulsory" v-show="models.currentModalName==='menberCompulsory'">
            <el-checkbox
              :label="menberCompulsoryItem.label"
              v-for="(menberCompulsoryItem, menberCompulsoryIndex) in menberCompulsoryList"
              :key="menberCompulsoryIndex" />
          </el-checkbox-group>
          <!-- 不可见成员 -->
          <el-checkbox-group v-model="selectedModal.menberInvisible" v-show="models.currentModalName==='menberInvisible'">
            <el-checkbox
              :label="menberInvisibleItem.label"
              v-for="(menberInvisibleItem, menberInvisibleIndex) in menberInvisibleList"
              :key="menberInvisibleIndex" />
          </el-checkbox-group>
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
@import './index.scss'
</style>