<template>
  <section class="broadcast-review-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'broadcast' }">直播管理</el-breadcrumb-item>
      <el-breadcrumb-item>问答区</el-breadcrumb-item>
    </el-breadcrumb>
    <table-list
    :list="liveReviewList.list"
    :fields="fields"
    :total="liveReviewList.total"
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
        <div v-else-if="props.scope.column.property === 'content'">
          {{props.scope.row.content}}
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
  .deleted {
    background:rgba(248,250,251,1);
  }
}
</style>
