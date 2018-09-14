<template>
  <section class="page-course-list">
    <div class="page-position">导师管理</div>

    <el-button-group>
      <el-button :type=teaType @click="selectTea(1)">内部导师</el-button>
      <el-button :type=teaType2 @click="selectTea(2)">外部导师</el-button>
    </el-button-group>

    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <div class="search-bar">
          <input type="text" name="" class="search" placeholder="请输入关键词">
          <span><i class="el-icon-search"></i></span>
        </div>
      </el-col>
      <el-col :span="12" class="action-zone">
        <el-button type="primary" @click="addCourse" class="click-item">添加外部导师</el-button>
      </el-col>
    </el-row>
    <table-list
    :list="courseList"
    :fields="fields"
    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button type="text" :disabled="props.scope.row.isDeleted === 1 ? true : false" @click="removeTea">移除导师</el-button>
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
                <div class="limit-row-num-2"> {{ props.scope.row.courseName}} </div>
                <div class="tutor-name">导师名称-组织架构</div>
            </div>
          </div>
        </div>
        <div v-else-if="props.scope.column.property === 'online'">
          {{ props.scope.row.online == 0 ? '下线' : '上线' }}
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
  .action-zone {
    text-align: right;
  }
  .page-position {
    font-size: 16px;
    color: #000;
    line-height: 1;
    position: relative;
    margin: 16px 0;
    &:before{
      content: '';
      height: 100%;
      width:6px;
      height:16px;
      background:rgba(255,226,102,1);
      display: inline-block;
      margin-right: 8px;
      float: left;
    };
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
