<template>
  <section class="page-course-list">
    <div class="page-position">课程管理</div>
    <div class="header">
      <div class="list-total">
        共<strong>{{courseList.total}}</strong>门课程
      </div>
      <div class="action-zone">
        <search-bar
          width="400px"
          @search="handleSearch"
          v-model="form.name"
          placeholder="搜索课程名称或导师" />
        <el-button type="primary" @click="addCourse" class="btn-limit-width">创建课程</el-button>
      </div>
    </div>
    <table-list
    :list="courseList.list"
    :fields="fields"
    :total="courseList.total"
    :page="courseList.page"
    >
      <template slot-scope="props" slot="columns">
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
              课节管理
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
                  <span class="inner-tutor-groupname" v-if="props.scope.row.groupName">{{props.scope.row.groupName}}</span>
                  <span class="inner-tutor-realname">{{props.scope.row.realname}}</span>
                </div>
                <div class="tutor-name" v-if="props.scope.row.masterInfo.roleId == 5">
                  <span class="inner-tutor-groupname" v-if="props.scope.row.groupName">{{props.scope.row.masterInfo.roleName}}</span>
                  <span class="inner-tutor-realname">{{props.scope.row.masterInfo.realname}}</span>
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
    float: right;
    display: inline-block;
    .zike-common-search-bar {
      display: inline-block;
      vertical-align: middle;
      margin-right: 16px;
    }
    .el-button--primary{
      display: inline-block;
      vertical-align: middle;
    }
  }
  .header {
    margin: 36px 0 24px 0;
  }
  .list-total {
    font-size:16px;
    font-weight:400;
    color:rgba(53,64,72,1);
    line-height: 40px;
    vertical-align: middle;
    display: inline-block;
    strong {
      color: #D7AB70;
      font-weight: 500;
      margin: 0 2px;
    }
  }
  .tutor-name {
    color: #929292;
    overflow: hidden;
    margin-top: 8px;
    line-height: 1;
  }
  .inner-tutor-groupname {
    background:rgba(53,64,72,1);
    font-size:12px;
    font-weight:400;
    color:rgba(255,255,255,1);
    padding: 4px;
    display: inline-block;
    line-height: 1;
  }
  .inner-tutor-realname {
    background:#FFF9D9;
    font-size:12px;
    font-weight:300;
    color:#D7AB70;
    padding: 4px;
    display: inline-block;
    line-height: 1;
  }
  .flex-box{
    margin-right: 40px;
  }

}


</style>
