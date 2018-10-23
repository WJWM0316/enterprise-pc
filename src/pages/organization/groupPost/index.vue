<template>
  <div id="course-post">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'memberList' }">组织管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'groupManage' }">分组管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.name === 'addGroup' ? '新建分组' : '编辑分组'}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      >
        <div v-if="$route.name === 'addGroup'">
          <div class="walk-title">新建分组名称</div>
          <!-- 请填写课程名称 -->
          <el-form-item
            prop="name"
            class="limit-width"
            >
              <el-input v-model="form.name" :maxlength="20" style="width: 400px;" placeholder="请输入分组名，限制20个字以内..."/>
          </el-form-item>
        </div>
        <div v-else>
          <div class="walk-title">编辑分组名称</div>
          <!-- 请填写课程名称 -->
          <el-form-item
            label="分组名称"
            prop="name"
            class="limit-width"
            >
              <el-input v-model="form.name" :maxlength="20" style="width: 400px;" placeholder="请输入分组名，限制20个字以内..."/>
          </el-form-item>
        </div>


        <div class="walk-title select ">选择分组成员</div>


        <el-row class="header">
          <el-col :span="12" class="search-zone">
            <search-bar
              width="400px"
              @search="handleSearch"
              v-model="searchName"
              placeholder="输入搜索名称" />
          </el-col>
        </el-row>
        <div class="groupList">
          <el-button
            size="large"
            v-for="(groupItem, groupIndex) in groupList"
            :key="groupIndex"
            class="list-item"
            :class="{'btn-active-selected': groupItem.active}"
            @click="memberClassification(groupItem)">
              {{groupItem.groupName}}
          </el-button>
        </div>

        <div class="menber-list">
          <div
            v-for="(memberItem, memberIndex) in memberList"
            :key="memberIndex"
            @click="multipleSelection(memberItem)"
            :class="{'common-checkbox-active': memberItem.active}"
            class="common-checkbox">
            <i class="icon iconfont icon-check-circle" v-show="memberItem.active"></i>
            <i class="icon iconfont icon-radio_default" v-show="!memberItem.active"></i>
            <span>{{memberItem.realname}}</span>
          </div>
        </div>

        <!-- 确认提交 -->
        <el-form-item class="footer-button">
          <el-button type="primary" class="click-item " @click="checkSubmit" :loading="!submitBtnClick">{{ submitBtnTxt }}</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import coursePost from './index'
export default coursePost
</script>
<style lang="scss">
@import './index.scss'
</style>