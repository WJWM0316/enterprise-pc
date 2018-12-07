<template>
  <section class="page-note-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'workZoneList' }">工作圈管理</el-breadcrumb-item>
      <el-breadcrumb-item>帖子管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="header">
      <div class="list-total">
        共<strong>{{jobCircleNoteLists.total}}</strong>条内容
      </div>
      <div class="action-zone">
        <search-bar
          width="400px"
          @search="handleSearch"
          v-model="form.keyword"
          placeholder="搜索内容，发布者" />
      </div>
    </div>
    <table-list
    :list="jobCircleNoteLists.list"
    :fields="fields"
    :total="jobCircleNoteLists.total"
    :tableRowClassName="tableRowClassName"
    :page="jobCircleNoteLists.page"
    >
      <template slot-scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            v-if="props.scope.row.deletedAt !== '已删除'"
            @click="todoAction('comment', props.scope.row)">
              评论
          </el-button>
          <el-button
            type="text"
            v-if="props.scope.row.deletedAt !== '已删除'"
            @click="todoAction('delete', props.scope.row)">
              隐藏
          </el-button>
          <el-button
            type="text"
            v-if="props.scope.row.deletedAt !== '已删除'"
            @click="todoAction('hide', props.scope.row)">
              {{props.scope.row.visible === '公开' ? '仅成员可见' : '公开'}}
          </el-button>
          <el-button
            type="text"
            v-if="props.scope.row.deletedAt !== '已删除' && props.scope.row.isTop"
            @click="todoAction('notop', props.scope.row)">
              取消置顶
          </el-button>
          <el-button
            type="text"
            v-if="props.scope.row.deletedAt !== '已删除' && !props.scope.row.isTop"
            @click="todoAction('top', props.scope.row)">
              设置置顶
          </el-button>
          <el-button
            type="text"
            v-if="props.scope.row.deletedAt === '已删除'"
            @click="todoAction('recover', props.scope.row)">
              恢复
          </el-button>
        </div>
        <div v-else-if="props.scope.column.property === 'content'">
          <el-popover
            placement="top-start"
            width="310"
            trigger="click"
            :content="props.scope.row.content">
            <div slot="reference" class="limit-row-num-2">
              {{ props.scope.row.content }}
            </div>
          </el-popover>
        </div>
        <div
          v-else-if="props.scope.column.property === 'type'"
          :class="{'can-click': props.scope.row.type !== '无文件', 'no-click': props.scope.row.type === '无文件'}"
          @click="showModal(props.scope.row)">
          {{ props.scope.row.type === '无文件' ? '-' : props.scope.row.type }}
        </div>
        <div v-else-if="props.scope.column.property === 'createdAt'">
          {{ props.scope.row.createdAt.slice(0, 10) }}
        </div>
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
      </template>
    </table-list>
    <images-viewer v-model="imagesViewer.show" @cancel="cancel('imagesViewer')" :list="imagesViewer.list" />
    <file-viewer v-model="fileViewer.show"  @cancel="cancel('fileViewer')" :data="fileViewer.data" />
    <link-viewer v-model="linkViewer.show"  @cancel="cancel('linkViewer')" :data="linkViewer.data" />
    <video-viewer v-model="videoViewer.show"  @cancel="cancel('videoViewer')" :data="videoViewer.data" />
  </section>
</template>

<script>
import NoteList from './index'
export default NoteList
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
  .row-delete {
    background:rgba(248,250,251,1);
    text-decoration: line-through;
    color: #DCDCDC;
    .limit-row-num-2 {
      background:rgba(248,250,251,1);
      text-decoration: line-through;
      color: #DCDCDC;
    }
    .limit-row-num-2-2 {
      background:rgba(248,250,251,1);
      text-decoration: line-through;
      color: #DCDCDC;
    }
  }
  .limit-row-num-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #354048;
    font-size: 14px;
    line-height: 1.4;
    padding-left: 40px;
  }
  .limit-row-num-2-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #354048;
    font-size: 14px;
    line-height: 1.4;
  }
  .can-click{
    color: #4080AD;
    cursor: pointer;
    display: inline;
  }
  .no-click{
    color: #929292;
  }
}
</style>
