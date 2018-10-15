<template>
  <section class="broadcast-index-list">
    <div class="page-position">直播管理</div>
    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <search-bar
          width="500px"
          @search="handleSearch"
          v-model="form.liveName"
          placeholder="请输入直播名称或关键词" />
      </el-col>
      <el-col :span="12" class="action-zone">
        <el-button type="primary" @click="addBroadcast">新建直播</el-button>
      </el-col>
    </el-row>
    <table-list
    :list="liveLists.list"
    :fields="fields"
    :total="liveLists.total"
    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            v-if="props.scope.row.status === 1 || props.scope.row.status === 2"
            @click="routeJump(props.scope.row.liveId, 'broadcastUpdate')">
              编辑
            </el-button>
          <el-button
            type="text"
            v-if="props.scope.row.status === 3"
            @click="routeJump(props.scope.row.liveId, 'broadcastResponseList')">
              问答区
            </el-button>
          <el-button
            type="text"
            v-if="props.scope.row.status === 3"
            @click="routeJump(props.scope.row.liveId, 'broadcastReviewList')">
              直播回顾
            </el-button>
        </div>
        <!-- 重新定义课程名这一列的显示 -->
        <div v-else-if="props.scope.column.property === 'liveName'" class="flex-box">
          <div class="img-box">
            <el-popover
              ref="popoverCover"
              placement="right"
              width="400">
              <i class="u-image auto"><img :src="props.scope.row.cover.smallUrl"></i>
            </el-popover>
            <div class="cover-wrapper">
              <i class="cover u-image auto" v-popover:popoverCover>
                <img :src="props.scope.row.cover.smallUrl">
              </i>
            </div>
          </div>
          <div class="content">
            <div>
                <div class="limit-row-num-2"> {{ props.scope.row.liveName}} </div>
                <div class="lalel">
                  <span class="group-name" v-if="props.scope.row.roleId === '5'">{{props.scope.row.roleName}}</span>
                  <span class="name" v-if="props.scope.row.roleId === '5'">{{props.scope.row.userTitle}}</span>
                  <span class="group-name" v-if="props.scope.row.roleId === '4'">{{props.scope.row.masterGroup}}</span>
                  <span class="name" v-if="props.scope.row.roleId === '4'">{{props.scope.row.masterName}}</span>
                </div>
            </div>
          </div>
        </div>
        <div v-else-if="props.scope.column.property === 'statusName'">
          <span v-if="props.scope.row.status === 1" class="live-status-icon-pending">
            {{ props.scope.row.statusName }}
          </span>
          <span v-else-if="props.scope.row.status === 2" class="live-status-icon-doing">
            {{ props.scope.row.statusName }}
          </span>
          <span v-else class="live-status-icon-completed">
            {{ props.scope.row.statusName }}
          </span>
        </div>
        <!-- 其他列按后端给回的字段显示 -->
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
      </template>
    </table-list>
  </section>
</template>

<script>
import BroadcastIndex from './index'
export default BroadcastIndex
</script>

<style lang="scss">
@import "~COLORS/variables";
.broadcast-index-list {
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
    .outer-group-name {
      background: transparent;
      color: #929292;
    }
    .outer-name {
      background: transparent;
      color: #929292;
    }
  }
  .live-status-icon-doing{
    line-height: 1;
    &:before{
      content: '';
      display: inline-block;
      width:6px;
      height:6px;
      background:rgba(38,191,129,1);
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .live-status-icon-completed{
    line-height: 1;
    &:before{
      content: '';
      display: inline-block;
      width:6px;
      height:6px;
      background:rgba(255,52,52,1);
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .live-status-icon-pending{
    line-height: 1;
    &:before{
      content: '';
      display: inline-block;
      width:6px;
      height:6px;
      background:rgba(188,188,188,1);
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
</style>
