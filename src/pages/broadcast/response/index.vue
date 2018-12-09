<template>
  <section class="broadcast-review-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'broadcast' }">直播管理</el-breadcrumb-item>
      <el-breadcrumb-item>问答区</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="header">
      <div class="list-total">共<strong>{{liveProblemList.total}}</strong>条内容</div>
      <div class="action-zone">
        <search-bar
          class="search"
          width="400px"
          @search="handleSearch"
          v-model="form.name"
          placeholder="搜索提问内容或提问者姓名" />
      </div>
    </div>
    <table-list
    :list="liveProblemList.list"
    :fields="fields"
    :total="liveProblemList.total"
    :page="liveProblemList.page"
    :tableRowClassName="tableRowClassName"
    >shi
      <template slot-scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            v-if="props.scope.row.status === '正常'"
            @click="todoAction('delete', props.scope.row)">
              隐藏
          </el-button>
          <el-button
            type="text"
            v-if="props.scope.row.status !== '正常'"
            @click="todoAction('recover', props.scope.row)">
              恢复
          </el-button>
        </div>
        <!-- 重新定义提问内容这一列的显示 -->
        <div v-else-if="props.scope.column.property === 'askContent'" class="limit-row-num-3" :title="props.scope.row.askContent">
          <template v-if="props.scope.row.askType === 'text'">{{props.scope.row.askContent}}</template>
        </div>
        <!-- 重新定义提问内容这一列的显示 -->
        <div v-else-if="props.scope.column.property === 'replyContent'" class="limit-row-num-3-3">
          <template v-if="props.scope.row.replyType === 'text'">
            {{props.scope.row.replyContent}}
          </template>
          <template v-if="props.scope.row.replyType === 'audio'">
            <div class="deleteAudio" v-if="props.scope.row.status !== '正常'"></div>
            <my-audio :theUrl="props.scope.row.replyContent" :disabled="props.scope.row.status!== '正常'" />
          </template>
        </div>
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
      </template>
    </table-list>
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
    color: rgba(220,220,220,1);
    .limit-row-num-3,.limit-row-num-3-3,.cell {
      color: rgba(220,220,220,1);
    }
  }
  .deleteAudio {
    //background: #FFF9D9;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: .6;
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
    padding-right: 40px;
  }
  .limit-row-num-3-3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 14px;
    line-height: 1.4;
    padding: 40px;
    padding-right: 30px;
    padding-left: 0;
  }
}
</style>
