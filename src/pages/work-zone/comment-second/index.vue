<template>
  <section class="page-note-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'workZoneList' }">工作圈管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'notesList',query: {id: this.$route.query.noteId} }">帖子管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'commentList',query: {noteId: this.$route.query.noteId, id: this.$route.query.firstId} }">评论管理</el-breadcrumb-item>
      <el-breadcrumb-item>二级评论</el-breadcrumb-item>
    </el-breadcrumb>
    <table-list
    :list="jobCircleCommentSecondLists.list"
    :fields="fields"
    :page="jobCircleCommentSecondLists.page"
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
        <div v-else-if="props.scope.column.property === 'content'" class="limit-row-num-2">
          {{ props.scope.row.content }}
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
  .limit-row-num-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 14px;
    line-height: 1.4;
    padding-left: 40px;
    padding-right: 40px;
  }
}
</style>
