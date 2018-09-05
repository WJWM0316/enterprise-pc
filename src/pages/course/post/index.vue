<template>
<div id="course-post">
  <el-breadcrumb separator=">" class="page-navigation">
    <el-breadcrumb-item :to="{ name: 'course' }">课程管理</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name === 'coursePost' ? '新建课程' : '更新课程'}}</el-breadcrumb-item>
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
        label="课程名称"
        prop="courseName"
        class="limit-width"
        >
          <el-input v-model="form.courseName" :maxlength="30" />
      </el-form-item>
      
      <!-- 课程分类 -->
      <el-form-item
        label="课程分类"
        prop="courseType"
        class="limit-width"
        >
          <span class="click-item" @click="openModal('courseType')">点击选择</span>
          <span v-show="form.courseType">已选择：【产品-阿杰】</span>
      </el-form-item>
      
      <!-- 选择导师 -->
      <el-form-item
        label="选择导师"
        prop="tutor"
        class="limit-width"
        >
          <span class="click-item" @click="openModal('tutor')">点击选择</span>
          <span v-show="form.tutor">已选择：【产品-阿杰】</span>
      </el-form-item>

      <!-- 所属组织 -->
      <el-form-item
        label="所属组织"
        prop="organization"
        class="limit-width"
        >
          <el-tooltip
            effect="dark"
            content="这是所属组织的提示文案哦~"
            placement="top-start">
            <i class="el-icon-question label-belong-tips-icon"></i>
          </el-tooltip>
          <span class="click-item" @click="openModal('organization')">点击选择</span>
          <span v-show="form.organization">已选择：【产品-阿杰】</span>
      </el-form-item>

      <div class="walk-title">课程详细信息</div>

      <!-- 课程封面 -->
      <el-form-item
        label="课程封面"
        prop="classification"
        class="limit-width"
        > <span><i class="el-icon-upload"></i> 选择封面</span>
      </el-form-item>
      
      <el-form-item
        label="课程介绍"
        prop="introduction"
        >
          <editor
            class="editor"
            :content="ContentEditor.content"
            v-model="form.introduction"
            :path="ContentEditor.path"
            :height="ContentEditor.height"
            @blur="handleContentEditorBlur" />
      </el-form-item>
      
      <!-- 选择必修学员 -->
      <el-form-item
        label="选择必修学员"
        prop="tutor"
        class="limit-width"
        >
          <span class="click-item" @click="openModal('menberCompulsory')">点击选择</span>
          <span v-show="form.menberCompulsory && form.menberCompulsory.length > 0">已选择{{form.menberCompulsory.length}}名学员</span>
      </el-form-item>

      <!-- 选择不可见学员 -->
      <el-form-item
        label="选择不可见学员"
        prop="organization"
        class="limit-width"
        >
          <el-tooltip
            effect="dark"
            content="这是选择不可见学员的提示文案哦~"
            placement="top-start"
            >
              <i class="el-icon-question label-hidden-tips-icon"></i>
          </el-tooltip>
          <span class="click-item" @click="openModal('menberInvisible')">点击选择</span>
          <span v-show="form.menberInvisible && form.menberInvisible.length > 0">已选择{{form.menberInvisible.length}}名学员</span>
      </el-form-item>

      <div class="walk-title">其他设置</div>
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
        <el-radio v-model="form.online" :label="1">上线</el-radio>
        <el-radio v-model="form.online" :label="0">下线</el-radio>
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
          <!-- 课程类型 -->
          <el-radio-group v-model="selectedModal.courseType" v-show="models.currentModalName==='courseType'">
            <el-radio :label="courseItem" v-for="(courseItem, courseIndex) in courseTypeList" :key="courseIndex">{{courseItem.label}}</el-radio>
          </el-radio-group>
          <!-- 导师 -->
          <el-radio-group v-model="selectedModal.tutor" v-show="models.currentModalName==='tutor'">
            <el-radio :label="tutorItem" v-for="(tutorItem, tutorIndex) in tutorList" :key="tutorIndex">{{tutorItem.label}}</el-radio>
          </el-radio-group>
          <!-- 组织 -->
          <el-checkbox-group v-model="selectedModal.organization" v-show="models.currentModalName==='organization'">
            <el-checkbox :label="organizationItem.label" v-for="(organizationItem, organizationIndex) in organizationList" :key="organizationIndex"></el-checkbox>
          </el-checkbox-group>
          <!-- 必修学员 -->
          <el-checkbox-group v-model="selectedModal.menberCompulsory" v-show="models.currentModalName==='menberCompulsory'">
            <el-checkbox :label="menberCompulsoryItem.label" v-for="(menberCompulsoryItem, menberCompulsoryIndex) in menberCompulsoryList" :key="menberCompulsoryIndex"></el-checkbox>
          </el-checkbox-group>
          <!-- 不可见成员 -->
          <el-checkbox-group v-model="selectedModal.menberInvisible" v-show="models.currentModalName==='menberInvisible'">
            <el-checkbox :label="menberInvisibleItem.label" v-for="(menberInvisibleItem, menberInvisibleIndex) in menberInvisibleList" :key="menberInvisibleIndex"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
  </modal-dialog>
</div>
</template>
<script>
import coursePost from './index'
export default coursePost
</script>
<style lang="scss">
@import './index.scss'
</style>