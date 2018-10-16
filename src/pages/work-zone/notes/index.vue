<template>
  <section class="page-note-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'workZoneList' }">工作圈管理</el-breadcrumb-item>
      <el-breadcrumb-item>帖子管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <search-bar
          width="500px"
          @search="handleSearch"
          v-model="form.keyword"
          placeholder="输入内容或者发布者" />
      </el-col>
    </el-row>
    <table-list
    :list="jobCircleNoteLists.list"
    :fields="fields"
    :total="jobCircleNoteLists.total"
    :tableRowClassName="tableRowClassName"
    :page="jobCircleNoteLists.page"
    >
      <template scope="props" slot="columns">
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
              删除
          </el-button>
          <el-button
            type="text"
            v-if="props.scope.row.deletedAt !== '已删除'"
            @click="todoAction('hide', props.scope.row)">
              {{props.scope.row.visible === '公开' ? '隐藏' : '公开'}}
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
        <div v-else-if="props.scope.column.property === 'content'" class="limit-row-num-2">
          {{ props.scope.row.content }}
        </div>
        <div v-else-if="props.scope.column.property === 'type'" class="limit-row-num-2-2" @click="showModal(props.scope.row)">
          {{ props.scope.row.type }}
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
    text-align: right;
  }
  .header {
    margin: 30px 0;
  }
  .row-delete {
    background:rgba(248,250,251,1);
    text-decoration: line-through;
    color: #DCDCDC;
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
}
</style>
