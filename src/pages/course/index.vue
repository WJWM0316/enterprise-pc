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
        <el-button type="primary">添加课程</el-button>
      </el-col>
    </el-row>
    <el-table
      ref="table"
      :data="courseList"
      style="width: 100%"
      :header-row-class-name="'zikebackend-table-header'"
      :row-class-name="tableRowClassName"
      @header-click="onTableHeaderClick"
      @sort-change="handleSortChange"
      border>
      <el-table-column
        align="center"
        prop="course"
        label="课程"
        width="400">
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
        width="150"
        :filters="[{ text: '全部', value: 0 }, { text: '上线', value: 1 }, { text: '下线', value: 2 }]"
        :filter-method="handleOnlineStatusChange"
        :filter-multiple="false"
        :render-header="renderOnlineHeader"
        :filter-change="filterChange"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          {{scope.row.online === 1 ? '上线' : '下线'}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="type"
        label="类型"
        width="100"
        :filters="[{ text: '未分类', value: 0 }, { text: '产品', value: 1 }, { text: '运营', value: 2 }, { text: '开发', value: 3 }]"
        :filter-method="handleTypeStatusChange"
        :filter-multiple="false"
        :filter-change="filterChange"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          {{scope.row.type === 1 ? '未定义' : scope.row.type === 2 ? '产品' : scope.row.type === 3 ? '设计' : scope.row.type === 4 ? '大佬' : ''}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="range"
        label="排序"
        width="100"
        :filters="[{ text: '升序', value: 'asc' }, { text: '降序', value: 'desc' }]"
        :filter-multiple="false"
        :filter-method="handleRangeStatusChange"
        :render-header="renderRangeHeader"
        :filter-change="filterChange"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          {{scope.row.range | sortFilter}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="action"
        label="操作">
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
