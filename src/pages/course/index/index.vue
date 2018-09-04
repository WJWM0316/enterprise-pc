<template>
  <section class="page-course-list">
    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12" class="action-zone">
        <el-button type="primary" @click="addCourse">添加课程</el-button>
      </el-col>
    </el-row>
    <table-list
    :list="courseList"
    :fields="fields"
    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button type="text" :disabled="props.scope.row.isDeleted === 1 ? true : false">编辑</el-button>
          <el-button type="text" :disabled="props.scope.row.isDeleted === 1 ? true : false">课节</el-button>
          <el-button type="text" :disabled="props.scope.row.isDeleted === 1 ? true : false">成员交流</el-button>
        </div>
        <!-- 重新定义课程名这一列的显示 -->
        <div v-else-if="props.scope.column.property === 'courseName'" class="flex-box">
          <div class="img-box">
            <el-popover
              ref="popoverCover"
              placement="right"
              width="400">
              <i class="u-image auto"><img :src="props.scope.row.img"></i>
            </el-popover>
            <div class="cover-wrapper">
              <i class="cover u-image auto" v-popover:popoverCover>
                <img :src="props.scope.row.img">
              </i>
            </div>
          </div>
          <div class="content">
            <div>
                <div class="limit-row-num"> {{ props.scope.row.courseName}} </div>
                <div>导师名称-组织架构</div>
            </div>
          </div>
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
