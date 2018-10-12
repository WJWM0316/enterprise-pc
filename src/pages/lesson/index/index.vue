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
          placeholder="请输入关键词" />
      </el-col>
      <el-col :span="12" class="action-zone">
        <el-button type="primary" @click="todoAction('add')" class="click-item">新建课节</el-button>
      </el-col>
    </el-row>
    <!-- :total="jobCircleLists.total" -->
    <table-list
    :list="lessonList.list"
    :fields="fields"
    :total="lessonList.total"

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
        <!-- 排序 -->
        <div v-else-if="props.scope.column.property === 'sort'" class="sort">

          <img src="~IMAGES/icon_up_dis.png" class="sort_blo up forbid" v-if="form.page === 1 && props.scope.row.index===0"></img>
          <img src="~IMAGES/icon_up.png" class="sort_blo up" @click="setSort('up',props.scope.row)" v-else />

          <img src="~IMAGES/icon_down_dis.png" class="sort_blo up forbid" v-if="lessonList.list.length < zikeDefaultPageSize && props.scope.row.index===lessonList.list.length-1"></img>
          <img src="~IMAGES/icon_down.png" class="sort_blo down" @click="setSort('down',props.scope.row)" v-else />
        </div>
        <!-- 重新定义课程名这一列的显示 -->
        <div v-else-if="props.scope.column.property === 'title'" class="flex-box">
          <div class="limit-row-num-2"> {{ props.scope.row.title}} </div>
        </div>
        <div v-else-if="props.scope.column.property === 'status'">
          {{ props.scope.row.status == 1? '上线':'下线' }}
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
