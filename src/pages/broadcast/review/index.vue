<template>
  <section class="broadcast-review-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'broadcast' }">直播管理</el-breadcrumb-item>
      <el-breadcrumb-item>直播回顾</el-breadcrumb-item>
    </el-breadcrumb>
    <table-list
    :list="liveReviewList.list"
    :fields="fields"
    :total="liveReviewList.total"
    :tableRowClassName="tableRowClassName"
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
          <el-button
            type="text"
            v-if="!props.scope.row.status"
            @click="todoAction('recover', props.scope.row)">
              恢复
          </el-button>
        </div>
        <div v-else-if="props.scope.column.property === 'content'" class="limit-row-num-3">
          <template v-if="props.scope.row.type ==='text'">
            {{props.scope.row.content}} 
          </template>
          <template v-else-if="props.scope.row.type ==='audio'">
            <my-audio :theUrl="props.scope.row.file.url" :disabled="!props.scope.row.status" />
          </template>
          <template v-else>
            <img :src="props.scope.row.file.url" alt="" style="display: inline-block;" @click="cancel">
          </template>
        </div>
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
      </template>
    </table-list>
    <images-viewer v-model="imagesViewer.show" @cancel="cancel" />
    <file-viewer v-model="fileViewer.show"  @cancel="cancel" />
    <link-viewer v-model="linkViewer.show"  @cancel="cancel" />
    <video-viewer v-model="videoViewer.show"  @cancel="cancel" />
  </section>
</template>

<script>
import BroadcastReview from './index'
export default BroadcastReview
</script>

<style lang="scss">
@import "~COLORS/variables";
.broadcast-review-list {
  background: white;
  .zike-breadcrumb {
    margin-bottom: 30px;
  }
  .row-delete {
    background:rgba(248,250,251,1);
    text-decoration: line-through;
    color: #DCDCDC;
  }
  .zike-audio {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .limit-row-num-3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 14px;
    line-height: 1.4;
  }
}
</style>
