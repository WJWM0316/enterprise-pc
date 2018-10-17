<template>
  <section class="page-course-list">
    <div class="page-position">课程管理</div>
    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <search-bar
          width="400px"
          @search="handleSearch"
          v-model="form.name"
          placeholder="请输入课程名或导师..." />
      </el-col>
      <el-col :span="12" class="action-zone">
        <el-button type="primary" @click="addCourse" class="btn-limit-width">添加课程</el-button>
      </el-col>
    </el-row>
    <table-list
    :list="courseList.list"
    :fields="fields"
    :total="courseList.total"
    :page="courseList.page"
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
                <div class="tutor-name" v-if="props.scope.row.masterInfo.roleId == 4">
                  <span class="inner-tutor-groupname">{{props.scope.row.realname}}</span>
                  <span class="inner-tutor-realname">{{props.scope.row.groupName}}</span>
                </div>
                <div class="tutor-name" v-if="props.scope.row.masterInfo.roleId == 5">
                  <span>外聘导师 - {{props.scope.row.realname}}</span>
                </div>
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
  .tutor-name {
    color: #929292;
  }
  .inner-tutor-groupname {
    background:rgba(53,64,72,1);
    font-size:12px;
    font-weight:400;
    color:rgba(255,255,255,1);
    padding: 2px 4px;
  }
  .inner-tutor-realname {
    background:#FFF9D9;
    font-size:12px;
    font-weight:400;
    color:#D7AB70;
    padding: 2px 4px;
  }
  .flex-box{
    margin-right: 40px;
  }
}
</style>
