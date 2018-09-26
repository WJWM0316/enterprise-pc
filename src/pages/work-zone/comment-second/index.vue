<template>
  <section class="page-note-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'workZoneList' }">工作圈管理</el-breadcrumb-item>
      <el-breadcrumb-item>帖子管理</el-breadcrumb-item>
      <el-breadcrumb-item>二级评论</el-breadcrumb-item>
    </el-breadcrumb>
    <table-list
    :list="jobCircleCommentSecondLists.list"
    :fields="fields"
    :total="jobCircleCommentSecondLists.total"
    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            v-if="props.scope.row.status"
            @click="todoAction('delete', props.scope.row)">
              删除
          </el-button>
        </div>
        <div v-else-if="props.scope.column.property === 'status'">
          {{ props.scope.row.status === 1 ? '正常' : '已删除' }}
        </div>
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
      </template>
    </table-list>
  </section>
</template>

<script>
import CommentList from './index'
export default CommentList
</script>

<style lang="scss">
@import "~COLORS/variables";
.page-note-list {
  background: white;
  .zike-breadcrumb {
    margin-bottom: 30px;
  }
  .deleted {
    background:rgba(248,250,251,1);
  }
}
</style>
