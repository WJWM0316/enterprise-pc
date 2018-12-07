<template>
  <section class="page-note-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'workZoneList' }">工作圈管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'notesList', query: {id: this.$route.query.noteId} }">帖子管理</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="header">
      <div class="list-total">
        共<strong>{{jobCircleCommentFirstLists.total}}</strong>条评论
      </div>
      <div class="action-zone">
        <search-bar
          width="400px"
          @search="handleSearch"
          v-model="form.keyword"
          placeholder="输入内容或者发布者" />
      </div>
    </div>
    <table-list
    :list="jobCircleCommentFirstLists.list"
    :fields="fields"
    :page="jobCircleCommentFirstLists.page"
    :total="jobCircleCommentFirstLists.total"
    >
      <template slot-scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            v-if="props.scope.row.status"
            @click="todoAction('delete', props.scope.row)">
              删除
          </el-button>
          <el-button
            type="text"
            v-if="!props.scope.row.status"
            @click="todoAction('recover', props.scope.row)">
              恢复
          </el-button>
          <el-button
            type="text"
            v-if="!props.scope.row.isHot && props.scope.row.status"
            @click="todoAction('hot', props.scope.row)">
              热门评论
          </el-button>
          <el-button
            type="text"
            v-if="props.scope.row.isHot && props.scope.row.status"
            @click="todoAction('cancelHot', props.scope.row)">
              取消热门
          </el-button>
          <el-button
            type="text"
            v-if="props.scope.row.commentCount > 0"
            @click="todoAction('comment', props.scope.row)">
              二级评论
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
  .action-zone {
    float: right;
    display: inline-block;
    .zike-common-search-bar {
      display: inline-block;
      vertical-align: middle;
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
