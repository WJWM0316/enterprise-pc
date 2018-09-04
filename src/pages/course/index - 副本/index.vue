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
    <el-table
      ref="table"
      :data="courseList"
      style="width: 100%"
      :header-row-class-name="'zikebackend-table-header'"
      :row-class-name="tableRowClassName"
      border>
      <el-table-column
        align="center"
        prop="course"
        label="课 程"
        min-width="20%">
        <template slot-scope="scope">
          <div class="flex-box">
            <div class="img-box"> <img :src="scope.row.img" alt="图片加载中..."> </div>
            <div class="content">
              <div>
                <div class="limit-row-num"> {{scope.row.course}} </div>
                <div>导师名称-组织架构</div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="online"
        label="是否上线"
        min-width="10%"
        :filtered-value="[{label: '全部', value: 'online-全部'}, {label: '上线', value: 'online-上线'}, {label: '下线', value: 'online-下线'}]"
        filter-placement="上线：在员工端显示，下线：不在员工端显示"
        :render-header="renderHeader">
        <template slot-scope="scope">
          {{scope.row.online === 1 ? '上线' : '下线'}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="type"
        label="类 型"
        min-width="10%"
        :filtered-value="[{label: '全部', value: 'type-全部'}, {label: '产品', value: 'type-产品'}, {label: '技术', value: 'type-技术'}]"
        filter-placement="类型提示"
        :render-header="renderHeader">
        <template slot-scope="scope">
          {{scope.row.type === 1 ? '未定义' : scope.row.type === 2 ? '产品' : scope.row.type === 3 ? '设计' : scope.row.type === 4 ? '大佬' : ''}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="range"
        label="排 序"
        min-width="10%"
        :filtered-value="[{label: '全部', value: 'range-全部'}, {label: '升序', value: 'range-升序'}, {label: '降序', value: 'range-降序'}]"
        filter-placement="排序提示"
        :render-header="renderHeader">
        <template slot-scope="scope">
          {{scope.row.range}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="action"
        min-width="20%"
        label="操 作">
        <template slot-scope="scope">
          <el-button type="primary" :disabled="scope.row.isDeleted === 1 ? true : false">编辑</el-button>
          <el-button type="primary" :disabled="scope.row.isDeleted === 1 ? true : false">课节</el-button>
          <el-button type="primary" :disabled="scope.row.isDeleted === 1 ? true : false">成员交流</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      v-if="total > 20"
      @current-change="handleCurrentPageChange" />
  </section>
</template>

<script>
import CourseList from './index'
export default CourseList
</script>

<style lang="scss">
@import "./index.scss"
</style>
