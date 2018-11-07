<template>
  <section class="page-course-list">

    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'memberList' }">组织管理</el-breadcrumb-item>
      <el-breadcrumb-item>分组管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="header">
      <el-col :span="24" class="right-content">
        <el-button type="primary" @click="todoAction('add')" class="click-item " style="float: right">新建分组</el-button>
      </el-col>
    </el-row>
    <table-list
    :list="groupList.list"
    :fields="fields"
    :total="groupList.total"
    >
      <template scope="props" slot="columns">

        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="todoAction('edit', props.scope.row)"
            >
              编辑
          </el-button>
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="todoAction('delete', props.scope.row)"
            >
              删除
          </el-button>
        </div>
        <!-- 排序 -->
        <div v-else-if="props.scope.column.property === 'sort'" class="sort">
          <span class="triangle_up disabled" v-if="form.page === 1 && props.scope.row.index==0"></span>
          <span class="triangle_up"  @click="setSort('up', props.scope.row)" v-else></span>
          <span class="triangle_down disabled" v-if="pageNum == form.page && props.scope.row.index-0+1 === groupList.list.length"></span>
          <span class="triangle_down" @click="setSort('down', props.scope.row)" v-else ></span>
        </div>

        <div v-else style="margin-left: 40px;">{{props.scope.row[props.scope.column.property]}}</div>

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

.triangle_up {
  margin-left: 20px;
  width:0;
  height:0;
  border-width:0 9px 12px;
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
  height: 40px;
  position: relative;
}
.triangle_down{
  display:block;
  width:0;
  height:0;
  border-width:12px 9px 0;
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
}
</style>
