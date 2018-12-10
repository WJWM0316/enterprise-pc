<template>
  <section class="broadcast-review-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'broadcast' }">直播管理</el-breadcrumb-item>
      <el-breadcrumb-item>直播回顾</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="header">
      <div class="list-total">共<strong>{{liveReviewList.total}}</strong>条内容</div>
      <div class="action-zone">
        <search-bar
          class="search"
          width="400px"
          @search="handleSearch"
          v-model="form.searchContent"
          placeholder="搜索内容、发布者" />
      </div>
    </div>
    <table-list
    :list="liveReviewList.list"
    :fields="fields"
    :total="liveReviewList.total"
    :page="liveReviewList.page"
    :tableRowClassName="tableRowClassName"
    >
      <template slot-scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            v-if="props.scope.row.status"
            @click="todoAction('delete', props.scope.row)">
              隐藏
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
            <img
              class="cont_img"
              :src="props.scope.row.file.url"
              alt=""
              style="display: inline-block;"
              :class="{'img-disable': !props.scope.row.status}"
              @click="handleViewImage(props.scope.row)">
          </template>
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
import BroadcastReview from './index'
export default BroadcastReview
</script>

<style lang="scss">
@import "~COLORS/variables";
.broadcast-review-list {
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
  .zike-breadcrumb {
    margin-bottom: 30px;
  }
  .row-delete {
    background:rgba(248,250,251,1);
    text-decoration: line-through;
    color: #DCDCDC;
  }
  .limit-row-num-3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 14px;
    line-height: 1.4;
    padding-left: 40px;
    .audio-box {
      position: absolute;
      left: 50px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .img-disable{
    opacity: .5;
  }
  .cont_img {
    height: 102px;
    width: auto;
  }
  .td_base {
    height: 130px;
    box-sizing: border-box;
  }
  tbody {
    tr {
      height: 130px;
      box-sizing: border-box;
    }
  }
  .zike-table-list .el-table td {
    padding: 0;
  }

}
.el-dropdown-menu__item {
    padding: 0 32px;
  }
</style>
