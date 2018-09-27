<template>
  <div id="course-post">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'memberList' }">组织成员管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'groupManage' }">组织管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.name === 'addGroup' ? '新建分组' : '更新课程'}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      >

        <div class="walk-title">新建分组名称</div>

        <!-- 请填写课程名称 -->
        <el-form-item
          prop="groupName"
          class="limit-width"
          >
            <el-input v-model="form.groupName" :maxlength="20" style="width: 400px;" placeholder="请输入分组名，限制20个字以内..."/>
        </el-form-item>


        <div class="walk-title">选择分组成员</div>


        <el-row class="header">
          <el-col :span="12" class="search-zone">
            <search-bar
              width="400px"
              @search="handleSearch"
              v-model="searchName"
              placeholder="输入搜索名称" />
          </el-col>
        </el-row>
        <div>
          <el-button size="large" @click="memberClassification('all')" class="list-item" v-if="groupLists.length > 0">所有人</el-button>
          <el-button
            size="large"
            v-for="(groupItem, groupIndex) in groupLists"
            :key="groupIndex"
            class="list-item"
            @click="memberClassification(groupItem.groupId)">
              {{groupItem.groupName}}
          </el-button>
        </div>
        <div class="menber-list">
          <el-checkbox-group v-model="checkList.tem">
            <el-checkbox
              :label="menberItem.realname"
              :key="menberIndex"
              @change="multipleSelection"
              v-for="(menberItem, menberIndex) in temMenberLists" />
          </el-checkbox-group>
        </div>

        <!-- 确认提交 -->
        <el-form-item class="footer-button">
          <el-button type="primary" class="click-item " @click="submit" :loading="!submitBtnClick">{{ submitBtnTxt }}</el-button>
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