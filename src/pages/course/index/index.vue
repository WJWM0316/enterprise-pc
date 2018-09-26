<template>
  <section class="page-course-list">
    <div class="page-position">课程管理</div>
    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <search-bar
          width="500px"
          @search="handleSearch"
          v-model="form.name"
          placeholder="请输入课程名或导师..." />
      </el-col>
      <el-col :span="12" class="action-zone">
        <el-button type="primary" @click="addCourse" class="click-item">添加课程</el-button>
      </el-col>
    </el-row>
    <table-list
    :list="courseList.list"
    :fields="fields"
    :total="courseList.total"
    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="routeJump(props.scope.row.id, 'courseUpdate')"
            >
              编辑
          </el-button>
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="routeJump(props.scope.row.id, 'lessonList')"
            >
              课节
          </el-button>
          <!-- <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="routeJump(props.scope.row, '')"
            >
              成员交流
          </el-button> -->
        </div>
        <!-- 重新定义课程名这一列的显示 -->
        <div v-else-if="props.scope.column.property === 'title'" class="flex-box">
          <div class="img-box">
            <el-popover
              ref="popoverCover"
              placement="right"
              width="400">
              <i class="u-image auto"><img :src="props.scope.row.coverImg"></i>
            </el-popover>
            <div class="cover-wrapper">
              <i class="cover u-image auto" v-popover:popoverCover>
                <img :src="props.scope.row.coverImg">
              </i>
            </div>
          </div>
          <div class="content">
            <div>
                <div class="limit-row-num-2"> {{ props.scope.row.title}} </div>
                <div class="tutor-name">导师名称-组织架构</div>
            </div>
          </div>
        </div>
        <div v-else-if="props.scope.column.property === 'category'">
          {{ props.scope.row.category.name}}
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
@import "~COLORS/variables";
.page-course-list {
  background: white;
  .action-zone {
    text-align: right;
  }
  .header {
    margin: 20px 0;
  }
  .search-zone {
    display: flex;
  }
  .search-bar {
    border-radius: 4px;
    border: 1px solid rgba(220,223,230,1);
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    position: relative;
    overflow: hidden;
    input {
      width: 100%;
      height: calc(100% - 2px);
      position: absolute;
      left: 0;
      top: 0;
      outline: none;
      border: none;
      display: block;
      box-sizing: border-box;
      padding: 0 10px;
    }
    span {
      width: 40px;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      outline: none;
      border: none;
      display: block;
      box-sizing: border-box;
      padding: 0 10px;
      text-align: center;
      cursor: pointer;
    }
  }
  .tutor-name {
    color: #929292;
  }
}
</style>
