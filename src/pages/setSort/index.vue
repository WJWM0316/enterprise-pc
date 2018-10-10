<template>
  <section class="page-classify-list">

    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item>设置</el-breadcrumb-item>
    </el-breadcrumb>
    <p>* 这里的排序会影响员工端的分类排序。</p>

    <el-row class="header">
      <el-col :span="24" class="right-content">
        <el-button type="primary" @click="todoAction('add')" class="click-item " style="float: right">新建分类</el-button>
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

          <img src="~IMAGES/icon_up_dis.png" class="sort_blo up forbid" v-if="form.page === 1 && props.scope.row.index===0"></img>
          <img src="~IMAGES/icon_up.png" class="sort_blo up" @click="setSort('up', props.scope.row)" v-else />

          <img src="~IMAGES/icon_up_dis.png" class="sort_blo up forbid" v-if="groupList.list.length < zikeDefaultPageSize && props.scope.row.index=== groupList.list.length-1"></img>
          <img src="~IMAGES/icon_down.png" class="sort_blo down" @click="setSort('down', props.scope.row)" v-else />
        </div>

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
.page-classify-list {
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

  .sort {
    .sort_blo {
      width:14px;
      height:10px;
      display: block;
      margin: 0 auto;
      //background:rgba(188,188,188,1);
      &.up {
        margin-bottom: 8px;
      }
      &.forbid {
        //background:rgba(237,237,237,1);
      }
    }
  }
}
</style>
