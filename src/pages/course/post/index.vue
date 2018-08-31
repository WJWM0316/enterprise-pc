<template>
<div id="course-post">
  <el-breadcrumb separator=">" class="page-navigation">
    <el-breadcrumb-item :to="{ name: 'course' }">课程管理</el-breadcrumb-item>
    <el-breadcrumb-item>新建课程</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    :model="form"
    :rules="rules"
    ref="form"
    label-width="120px"
    label-suffix="："
    class="demo-form">
      
      <div class="walk-title">课程基础信息</div>

      <!-- 请填写课程名称 -->
      <el-form-item label="课程名称" prop="courseName" class="limit-width">
        <el-input v-model="form.courseName" :maxlength="30" />
      </el-form-item>
      
      <!-- 课程分类 -->
      <el-form-item label="课程分类" prop="courseType" class="limit-width">
        <span class="click-item">点击选择</span>
        <span v-show="form.courseType">已选择：【产品-阿杰】</span>
      </el-form-item>
      
      <!-- 选择导师 -->
      <el-form-item label="选择导师" prop="tutor" class="limit-width">
        <span class="click-item">点击选择</span>
        <span v-show="form.tutor">已选择：【产品-阿杰】</span>
      </el-form-item>

      <!-- 所属组织 -->
      <el-form-item label="所属组织" prop="organization" class="limit-width">
        <el-tooltip class="item" effect="dark" content="这是所属组织的提示文案哦~" placement="top-start">
          <i class="el-icon-question label-belong-tips-icon"></i>
        </el-tooltip>
        <span class="click-item">点击选择</span>
        <span v-show="form.organization">已选择：【产品-阿杰】</span>
      </el-form-item>

      <div class="walk-title">课程详细信息</div>
      <!-- 课程封面 -->
      <el-form-item label="课程封面" prop="classification" class="limit-width">
        <span class="click-item">点击选择</span>
        <span v-show="form.classification">已选择：【产品-阿杰】</span>
      </el-form-item>
      
       <el-form-item class="full" label="课程介绍" prop="introduction">
        <editor class="editor"
                :content="communityIntroEditor.content"
                v-model="form.introduction"
                :path="communityIntroEditor.path"
                :height="communityIntroEditor.height"
                @blur="handleCommunityIntroEditorBlur" />
      </el-form-item>

      <div class="walk-title">其他设置</div>
      <!-- 权重 -->
      <el-form-item label="权重" class="limit-width">
        <el-tooltip class="item" effect="dark" content="这是权重的提示文案哦~" placement="top-start">
          <i class="el-icon-question label-qunzhong-ips-icon"></i>
        </el-tooltip>
        <el-input v-model="form.sort"></el-input>
      </el-form-item>

      <!-- 是否上线 -->
      <el-form-item label="是否上线">
        <el-radio v-model="form.online" :label="1">上线</el-radio>
        <el-radio v-model="form.online" :label="0">下线</el-radio>
      </el-form-item>

      <!-- 确认提交 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
      </el-form-item>
  </el-form>
  <modal-dialog class="confirm-dialog"
                type="confirm"
                v-model="confirm.show"
                :title="confirm.title"
                :show-close="confirm.showClose"
                :confirm-text="confirm.confirmText"
                @confirm="confirm.confirm">
    <h3 class="title" v-text="confirm.contentTitle"></h3>
    <div slot="content">
      <div class="tutor-box">
        <div class="search-box">
          <el-autocomplete v-model="state4" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect" style="margin-top: 5px;"/>
        </div>
        <div class="tutor-list">
          <el-button type="primary" v-for="item in 10" style="margin: 6px;">导师</el-button>
        </div>
      </div>
      <div style="margin-top: 10px;">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="复选框 A" v-for="item in 30">备选项</el-checkbox>
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
<style lang="scss" scoped>
@import './index.scss'
</style>