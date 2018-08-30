<template>
<div id="course-post">
  <el-form
    :model="form"
    :rules="rules"
    ref="form"
    label-width="100px"
    class="demo-form">
      
      <div class="walk-title">课程基础信息</div>
      <!-- 请填写课程名称 -->
      <el-form-item label="课程名称" prop="courseName" class="limit-width">
        <el-input v-model="form.courseName"></el-input>
      </el-form-item>
      
      <!-- 课程分类 -->
      <el-form-item label="课程分类" prop="classification" class="limit-width">
        <el-button type="success" plain>点击选择</el-button>
      </el-form-item>
      
      <!-- 选择导师 -->
      <el-form-item label="选择导师" prop="classification" class="limit-width">
        <el-button type="success" plain>点击选择</el-button>
      </el-form-item>

      <!-- 所属组织 -->
      <el-form-item label="所属组织" prop="classification" class="limit-width">
        <el-button type="success" plain>点击选择</el-button>
      </el-form-item>
      
      <!-- 确认提交 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
      </el-form-item>
  </el-form>
</div>
</template>
<script>
import coursePost from './index'
export default coursePost
</script>
<style lang="scss" scoped>
@import './index.scss'
</style>