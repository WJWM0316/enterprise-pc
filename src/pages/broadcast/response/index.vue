<template>
  <section class="broadcast-review-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'broadcast' }">直播管理</el-breadcrumb-item>
      <el-breadcrumb-item>问答区</el-breadcrumb-item>
    </el-breadcrumb>
    <table-list
    :list="liveProblemList.list"
    :fields="fields"
    :total="liveProblemList.total"
    :tableRowClassName="tableRowClassName"
    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="todoAction(props.scope.row)">
              删除
          </el-button>
        </div>
        <!-- 重新定义课程名这一列的显示 -->
        <div v-else-if="props.scope.column.property === 'askContent'" class="limit-row-num-3">
          {{props.scope.row.askContent}}
        </div>
        <!-- 其他列按后端给回的字段显示 -->
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
  .zike-breadcrumb {
    margin-bottom: 30px;
  }
  .row-deleted {
    background:rgba(248,250,251,1);
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
