<template>
  <div id="group-post">
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
          <el-col :span="12">
            <el-button type="text" class="add-menber-button" @click="openConfirmModel"><i class="icon iconfont icon-tianjiachengyuan"></i> 添加新成员</el-button>
          </el-col>
        </el-row>
        <div class="groupList">
          <div
            class="common-btn"
            v-for="(groupItem, groupIndex) in groupList"
            :key="groupIndex"
            :class="{'common-btn-active': groupItem.active}"
            @click="memberClassification(groupItem)">
              {{groupItem.groupName}}
          </div>
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
    <add-member-box v-model="confirmModels.show" @confirm="openConfirmModel"></add-member-box>
  </div>
</template>
<script>
import groupPost from './index'
export default groupPost
</script>
<style lang="scss">
@import './index.scss'
</style>