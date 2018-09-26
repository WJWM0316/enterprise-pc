<template>
  <section class="page-note-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'workZoneList' }">工作圈管理</el-breadcrumb-item>
      <el-breadcrumb-item>评论</el-breadcrumb-item>
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
    :list="jobCircleCommentFirstLists.list"
    :fields="fields"
    :total="jobCircleCommentFirstLists.total"
    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            @click="todoAction('delete', props.scope.row)">
              删除
          </el-button>
          <el-button
            type="text"
            @click="todoAction('hide', props.scope.row)">
              热门评论
          </el-button>
          <el-button
            type="text"
            @click="todoAction('top', props.scope.row)">
              {{props.scope.row.isTop ? '取消置顶' : '设置置顶'}}
          </el-button>
          <el-button
            type="text"
            @click="todoAction('recover', props.scope.row)">
              二级评论
          </el-button>
        </div>
        <!-- 重新定义课程名这一列的显示 -->
        <!-- <div v-else-if="props.scope.column.property === 'name'" class="flex-box">
          <div class="img-box">
            <el-popover
              ref="popoverCover"
              placement="right"
              width="400">
              <i class="u-image auto"><img :src="props.scope.row.img"></i>
            </el-popover>
            <div class="cover-wrapper">
              <i class="cover u-image auto" v-popover:popoverCover>
                <img src="http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg">
              </i>
            </div>
          </div>
          <div class="content">
            <div>
                <div class="limit-row-num-2"> {{ props.scope.row.name}} </div>
                <div class="lalel">
                  <span class="group-name">{{props.scope.row.groupName}}</span>
                  <span class="name">{{props.scope.row.realname}}</span>
                </div>
            </div>
          </div>
        </div> -->
        <!-- 其他列按后端给回的字段显示 -->
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
  .input-with-select {
    width: 400px;
  }
  .action-zone {
    text-align: right;
  }
  .deleted {
    background:rgba(248,250,251,1);
  }
  .header {
    margin: 30px 0;
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
}
</style>
