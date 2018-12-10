<template>
  <section class="page-lesson-index-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'courseList' }">课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课节管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="header">
      <div class="list-total">
        共<strong>{{lessonList.total}}</strong>堂课节
      </div>
      <div class="action-zone">
        <search-bar
          width="400px"
          @search="handleSearch"
          v-model="form.name"
          placeholder="搜索课节名称" />
        <el-button type="primary" @click="todoAction('add')" class="btn-limit-width">新建课节</el-button>
      </div>
    </div>
    <!-- :total="jobCircleLists.total" -->
    <table-list
    :list="lessonList.list"
    :fields="fields"
    :page="Number(form.page)"
    :total="lessonList.total"

    >
      <template slot-scope="props" slot="columns">
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
          <span class="triangle_up disabled" v-if="form.page === 1 && props.scope.row.index==0"></span>
          <span class="triangle_up"  @click="setSort('up', props.scope.row)" v-else></span>
          <span class="triangle_down disabled" v-if="pageNum == form.page && props.scope.row.index-0+1 === lessonList.list.length"></span>
          <span class="triangle_down" @click="setSort('down', props.scope.row)" v-else ></span>
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
@import "~COLORS/variables";
.page-lesson-index-list {
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
  .deleted {
    background:rgba(248,250,251,1);
  }
  .click-item {
    color: #354048;
    padding: 12px 33px;
    font-weight: 400;
  }
  .content {
    .lalel{
      font-size: 12px;
      line-height: 1;
      margin-top: 8px;
    }
    .group-name{
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:1;
      background:rgba(53,64,72,1);
      padding: 2px 5px;
    }
    .name {
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:1;
      padding: 2px 5px;
      background:rgba(255,249,217,1);
      color:rgba(215,171,112,1);
    }
  }
  .sort {
    .sort_blo {
      width:14px;
      height:10px;
      display: block;
      cursor: pointer;
      //background:rgba(188,188,188,1);
      &.up {
        margin-bottom: 8px;
      }
      &.forbid {
        cursor:inherit;
        //background:rgba(237,237,237,1);
      }
    }
  }
}

.triangle_up {
  margin-left: 20px;
  width:0;
  height:0;
  border-width:0 7px 10px;
  border-style:solid;
  border-color:transparent transparent rgba(188,188,188,1);
  margin:40px auto;
  position:relative;
  top: -20px;
  &.disabled{
    border-color:transparent transparent #DCDCDC;
    &:hover{
      border-color:transparent transparent #DCDCDC;
      cursor: inherit;
    }
  }
  &:hover{
    border-color:transparent transparent #FFE266;
    cursor:pointer;
  }
}
.sort {
  height: 30px;
  position: relative;
}
.triangle_down{
  display:block;
  width:0;
  height:0;
  border-width:10px 7px 0;
  border-style:solid;
  border-color:rgba(188,188,188,1) transparent transparent;
  position:absolute;
  bottom:0px;
  left:0px;

  &.disabled{
    border-color:#DCDCDC transparent transparent;
    &:hover{
      border-color:#DCDCDC transparent transparent ;
      cursor: inherit;
    }
  }
  &:hover{
    border-color: #FFE266 transparent transparent ;
    cursor:pointer;
  }
}
</style>
