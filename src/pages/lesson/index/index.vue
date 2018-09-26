<template>
  <section class="page-course-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'courseList' }">课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课节管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <search-bar
          width="500px"
          @search="handleSearch"
          v-model="form.name"
          placeholder="课节名称" />
      </el-col>
      <el-col :span="12" class="action-zone">
        <el-button type="primary" @click="todoAction('add')" class="click-item">新建课节</el-button>
      </el-col>
    </el-row>
    <table-list
    :list="jobCircleLists.list"
    :fields="fields"
    :total="jobCircleLists.total"
    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="todoAction('edit', props.scope.row)">
              编辑
            </el-button>
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="todoAction('punch', props.scope.row)">
              打卡管理
            </el-button>
        </div>
        <!-- 重新定义课程名这一列的显示 -->
        <div v-else-if="props.scope.column.property === 'name'" class="flex-box">
          <div class="img-box">
            <el-popover
              ref="popoverCover"
              placement="right"
              width="400">
              <i class="u-image auto"><img :src="props.scope.row.img"></i>
            </el-popover>
            <div class="cover-wrapper">
              <i class="cover u-image auto" v-popover:popoverCover>
                <img src="http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg">
              </i>
            </div>
          </div>
          <div class="content">
            <div>
                <div class="limit-row-num-2"> {{ props.scope.row.name}} </div>
                <div class="lalel">
                  <span class="group-name">{{props.scope.row.groupName}}</span>
                  <span class="name">{{props.scope.row.realname}}</span>
                </div>
            </div>
          </div>
        </div>
        <div v-else-if="props.scope.column.property === 'status'">
          {{ props.scope.row.status }}
        </div>
        <!-- 其他列按后端给回的字段显示 -->
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
      </template>
    </table-list>
  </section>
</template>

<script>
import CourseList from './index'
export default CourseList
</script>

<style lang="scss">
@import "./index.scss"
</style>
